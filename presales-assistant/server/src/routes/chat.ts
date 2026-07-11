import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { anthropic, MODEL_BY_MODE } from "../lib/anthropic.js";
import { VERIFIED_CONSTANTS } from "../lib/verifiedConstants.js";
import { detectLanguage, detectRouting, detectTopics, postProcess } from "../lib/classify.js";
import { webSearch } from "../lib/webSearch.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const chatRouter = Router();

type KbChunkRow = {
  id: number;
  source_file: string;
  source_label: string;
  heading: string;
  content: string;
  is_table: boolean;
  rank: number;
};

type Source = { sourceFile: string; sourceLabel: string; heading: string };

chatRouter.post("/", requireAuth, asyncHandler(async (req, res) => {
  const { conversationId, question, mode } = req.body as {
    conversationId?: string;
    question?: string;
    mode?: "chat" | "rfp";
  };

  if (!question || !conversationId || (mode !== "chat" && mode !== "rfp")) {
    res.status(400).json({ error: "conversationId, question, and mode ('chat'|'rfp') are required" });
    return;
  }

  // Fix for finding #6: the conversation must belong to the authenticated
  // caller. No client-supplied history is trusted, history is read fresh
  // from the DB for this conversation.
  const { data: conversation, error: convError } = await supabase
    .from("conversations")
    .select("id")
    .eq("id", conversationId)
    .eq("user_id", req.userId)
    .maybeSingle();
  if (convError || !conversation) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }

  const { data: historyRows } = await supabase
    .from("messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(16);
  const history = (historyRows ?? []).slice(-8);

  // Store the user's message immediately.
  await supabase.from("messages").insert({
    conversation_id: conversationId,
    role: "user",
    content: question,
  });

  // 1. Retrieve relevant chunks, boosted by detected industry/geography
  //    (fix #8) with a relevance floor (fix #3) enforced in the RPC.
  const { industries, geographies } = detectTopics(question);
  const { data: chunks, error: searchError } = await supabase.rpc("search_kb_chunks", {
    q: question,
    match_limit: 12,
    min_rank: 0.02,
    boost_industry: industries,
    boost_geography: geographies,
  });
  if (searchError) {
    res.status(500).json({ error: `Search failed: ${searchError.message}` });
    return;
  }
  const kbChunks = (chunks ?? []) as KbChunkRow[];

  const contextBlocks = kbChunks
    .map(
      (c, i) =>
        `[S${i + 1}] SOURCE: ${c.source_label} > ${c.heading}${c.is_table ? " (structured table, quote values exactly)" : ""}\n${c.content}`,
    )
    .join("\n\n---\n\n");

  // 2. Optional web search for external proof points (fix #7: proper
  //    site-scoped query).
  const webResults = await webSearch(question);
  const webContext =
    webResults.length > 0
      ? "\n\nWEB SEARCH RESULTS (external proof points, supplementary only, do not treat as authoritative for d.engage facts):\n" +
        webResults.map((r, i) => `[W${i + 1}] ${r.title}\n${r.snippet}\nURL: ${r.url}`).join("\n\n")
      : "";

  // 3. Build the system prompt.
  const language = detectLanguage(question);
  const languageInstruction =
    language === "tr"
      ? "The prospect's question is in Turkish. Respond in Turkish, matching their register (formal business Turkish)."
      : "Respond in English unless the question is clearly in another language, in which case match that language.";

  const citationInstruction = `CITATION RULES:
- Each knowledge base block below is labeled [S1], [S2], etc. After any sentence that states a specific fact (a metric, a capability, a certification, a connector name, a customer name), put the matching marker(s) in square brackets right after it, for example: "Uptime SLA is 99.9%. [S2]"
- If you cannot support a specific claim with any block above, do NOT invent a plausible-sounding detail. Instead prefix that sentence with the correct honesty marker: [VERIFY] for something you are inferring, [REVIEW NEEDED] for something you cannot confirm at all, [ROADMAP] for a stated future capability, or [NOT SUPPORTED] for a capability the platform does not have.
- Never state a list (connectors, certifications, offices, integrations) from memory. Only state list items that appear verbatim in a [S#] block. If a block is truncated or unclear, say so and mark [VERIFY] rather than filling in plausible-sounding entries.`;

  const systemPrompt =
    mode === "rfp"
      ? `You are a senior pre-sales strategist at d.engage, an enterprise customer engagement and marketing automation platform. Craft precise, compelling, technically accurate RFP responses.

${VERIFIED_CONSTANTS}

${citationInstruction}

${languageInstruction}

Format as a ready-to-use professional RFP response paragraph. Open with Yes / No / Supported / Partially Supported / Roadmap, then elaborate.

KNOWLEDGE BASE:
${contextBlocks}${webContext}`
      : `You are a strategic AI assistant for d.engage's sales and pre-sales team. Help them prepare for meetings, answer prospect questions, understand competitive positioning, and find case studies and proof points.

${VERIFIED_CONSTANTS}

${citationInstruction}

${languageInstruction}

Be specific and actionable. Connect capabilities to business outcomes. A precise short answer beats a vague long one.

KNOWLEDGE BASE:
${contextBlocks}${webContext}`;

  const messages: Array<{ role: "user" | "assistant"; content: string }> = [
    ...history.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
    { role: "user", content: question },
  ];

  const response = await anthropic.messages.create({
    model: MODEL_BY_MODE[mode],
    system: systemPrompt,
    messages,
    max_tokens: 2000,
  });

  const rawAnswer = response.content[0]?.type === "text" ? response.content[0].text : "Sorry, I could not generate a response.";

  // 4. Deterministic backstop: dash/banned-string cleanup (fix #2 backstop).
  const { text: cleanedAnswer, flags: postFlags } = postProcess(rawAnswer);

  // 5. Fix for finding #4: only show sources the model actually cited via
  //    [S#] markers, not every chunk that happened to be retrieved. Falls
  //    back to the top 3 by rank if the model cited nothing (so the badge
  //    row is never silently empty).
  const citedIndices = new Set<number>();
  for (const match of cleanedAnswer.matchAll(/\[S(\d+)\]/g)) {
    const idx = Number(match[1]) - 1;
    if (idx >= 0 && idx < kbChunks.length) citedIndices.add(idx);
  }
  const usedIndices = citedIndices.size > 0 ? Array.from(citedIndices) : kbChunks.slice(0, 3).map((_, i) => i);
  const sources: Source[] = usedIndices.map((i) => ({
    sourceFile: kbChunks[i].source_file,
    sourceLabel: kbChunks[i].source_label,
    heading: kbChunks[i].heading,
  }));

  const displayAnswer = cleanedAnswer.replace(/\[S\d+\]/g, "").replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim();

  // 6. Fix for finding #5: structured routing, stored on the message.
  const routedTo = detectRouting(question, displayAnswer);

  const { data: assistantMessage } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role: "assistant",
      content: displayAnswer,
      sources,
      web_results: webResults,
      routed_to: routedTo,
      flags: postFlags,
    })
    .select()
    .single();

  await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);

  res.json({
    messageId: assistantMessage?.id,
    answer: displayAnswer,
    sources,
    webResults,
    flags: postFlags,
    routedTo,
    retrievedCount: kbChunks.length,
    citedCount: usedIndices.length,
  });
}));
