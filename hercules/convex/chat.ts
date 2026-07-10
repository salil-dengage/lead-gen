"use node";

import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

type Source = {
  sourceFile: string;
  sourceLabel: string;
  heading: string;
};

type WebResult = {
  title: string;
  snippet: string;
  url: string;
};

export const askQuestion = action({
  args: {
    question: v.string(),
    mode: v.union(v.literal("chat"), v.literal("rfp")),
    conversationHistory: v.optional(
      v.array(
        v.object({
          role: v.union(v.literal("user"), v.literal("assistant")),
          content: v.string(),
        }),
      ),
    ),
  },
  handler: async (ctx, args): Promise<{ answer: string; sources: Source[]; webResults?: WebResult[] }> => {
    // 1. Retrieve relevant chunks from KB
    const chunks = await ctx.runQuery(api.kb_search.searchChunks, {
      query: args.question,
      limit: 12,
    });

    // 2. Build context from chunks
    const contextBlocks = chunks
      .map((c) => `[SOURCE: ${c.sourceLabel} > ${c.heading}]\n${c.content}`)
      .join("\n\n---\n\n");

    const sources: Source[] = chunks.map((c) => ({
      sourceFile: c.sourceFile,
      sourceLabel: c.sourceLabel,
      heading: c.heading,
    }));

    // 3. Optionally run a web search for external proof points
    let webResults: WebResult[] = [];
    let webContext = "";
    const hasSerper = !!process.env.SERPER_API_KEY;
    if (hasSerper) {
      try {
        const webSearchQuery = `d.engage ${args.question} site:dengage.com OR G2 OR Gartner OR Forrester OR case study`;
        const { results } = await ctx.runAction(api.web_search.search, {
          query: webSearchQuery,
          numResults: 4,
        });
        webResults = results;
        if (results.length > 0) {
          webContext =
            "\n\nWEB SEARCH RESULTS (external proof points, treat as supplementary):\n" +
            results
              .map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nURL: ${r.url}`)
              .join("\n\n");
        }
      } catch {
        // Web search is optional - don't fail if it errors
      }
    }

    // 4. Build system prompt
    const systemPrompt =
      args.mode === "rfp"
        ? `You are a senior pre-sales strategist at d.engage, an enterprise customer engagement and marketing automation platform. Your role is to craft precise, compelling, and technically accurate responses to RFP questions on behalf of d.engage's sales team.

THINKING APPROACH:
- First identify exactly what the evaluator is really asking (the underlying concern behind the question)
- Match the answer to what a senior evaluator at an enterprise bank or telco needs to see
- Lead with the capability or differentiator, support with specifics from the knowledge base
- Be concrete: use actual feature names, architecture details, compliance certifications, and customer references from the knowledge base
- If web results contain relevant analyst quotes or customer references, cite them

STRICT RULES:
- Base all claims on the knowledge base context provided
- Do NOT use em dashes (use commas or hyphens instead)
- Do NOT claim a 99.999% SLA unless explicitly stated in the knowledge base (use 99.9% or what the docs say)
- Never attribute capabilities to competitors (no Wizz Air or Braze or Salesforce claims as d.engage)
- If not in the knowledge base, say "This would need to be confirmed with the technical team"
- Format as a ready-to-use professional RFP response paragraph

KNOWLEDGE BASE:
${contextBlocks}${webContext}`
        : `You are a strategic AI assistant for d.engage's sales and pre-sales team. You help team members prepare for meetings, answer prospect questions, understand competitive positioning, and find relevant case studies and proof points.

THINKING APPROACH:
- Think like a senior sales engineer: understand the underlying business problem before answering
- Be specific and actionable - give the team member something they can use directly in a call or email
- Connect capabilities to business outcomes (not just features)
- Prioritize accuracy over completeness - a precise short answer beats a vague long one
- If the knowledge base has relevant case studies or customer names, lead with them
- If web results contain analyst rankings or third-party validation, mention them

STRICT RULES:
- Base all claims on the knowledge base context and web results provided
- Do NOT use em dashes (use commas or hyphens instead)
- Never invent customer names, certifications, or metrics not in the sources
- Always cite which source document your answer draws from
- If a question falls outside the knowledge base, say so and suggest who to ask

KNOWLEDGE BASE:
${contextBlocks}${webContext}`;

    // 5. Build history messages (Anthropic format)
    const historyMessages: Array<{ role: "user" | "assistant"; content: string }> = (
      args.conversationHistory ?? []
    )
      .slice(-8)
      .map((m) => ({ role: m.role, content: m.content }));

    const messages: Array<{ role: "user" | "assistant"; content: string }> = [
      ...historyMessages,
      { role: "user", content: args.question },
    ];

    // 6. Call Claude Haiku
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      system: systemPrompt,
      messages,
      max_tokens: 2000,
    });

    const answer =
      response.content[0]?.type === "text"
        ? response.content[0].text
        : "Sorry, I could not generate a response.";

    return { answer, sources, webResults: webResults.length > 0 ? webResults : undefined };
  },
});
