"use node";

import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v, ConvexError } from "convex/values";

const KB_FILES = [
  { file: "01_PRODUCT_SPECS", label: "Product Specifications", path: "dengage-presales-claude-code/knowledge-base/01_PRODUCT_SPECS.md" },
  { file: "02_RFP_KNOWLEDGE_BASE", label: "RFP Knowledge Base", path: "dengage-presales-claude-code/knowledge-base/02_RFP_KNOWLEDGE_BASE.md" },
  { file: "03_CASE_STUDIES", label: "Case Studies", path: "dengage-presales-claude-code/knowledge-base/03_CASE_STUDIES.md" },
  { file: "04_SECURITY_COMPLIANCE", label: "Security & Compliance", path: "dengage-presales-claude-code/knowledge-base/04_SECURITY_COMPLIANCE.md" },
  { file: "05_TECHNICAL_INFRA", label: "Technical Infrastructure", path: "dengage-presales-claude-code/knowledge-base/05_TECHNICAL_INFRA.md" },
  { file: "06_INDUSTRY_COMMERCIAL", label: "Industry & Commercial", path: "dengage-presales-claude-code/knowledge-base/06_INDUSTRY_COMMERCIAL.md" },
  { file: "07_USE_CASES", label: "Use Cases", path: "dengage-presales-claude-code/knowledge-base/07_USE_CASES.md" },
  { file: "08_FULL_RFP_RESPONSES", label: "Full RFP Responses", path: "dengage-presales-claude-code/knowledge-base/08_FULL_RFP_RESPONSES.md" },
  { file: "09_PRESENTATION_TEMPLATE", label: "Presentation Templates", path: "dengage-presales-claude-code/knowledge-base/09_PRESENTATION_TEMPLATE_REFERENCE.md" },
  { file: "10_DOCX_TEMPLATE", label: "DOCX Templates", path: "dengage-presales-claude-code/knowledge-base/10_DOCX_TEMPLATE_REFERENCE.md" },
  { file: "D_ENGAGE_ONPREM_CDMP", label: "On-Premise CDMP Onboarding", path: "dengage-presales-claude-code/knowledge-base/D_engage_Onprem_CDMP_Onboarding.md" },
  { file: "D_ENGAGE_PROFESSIONAL_SERVICES", label: "Professional Services", path: "dengage-presales-claude-code/knowledge-base/D_engage_Opsiyonel_Profesyonel_Hizmetler_2023.md" },
];

const GITHUB_API_BASE = "https://api.github.com/repos/salil-dengage/lead-gen/contents";

function chunkMarkdown(
  text: string,
  sourceFile: string,
  sourceLabel: string,
): Array<{ sourceFile: string; sourceLabel: string; heading: string; content: string; chunkIndex: number }> {
  const lines = text.split("\n");
  const chunks: Array<{ sourceFile: string; sourceLabel: string; heading: string; content: string; chunkIndex: number }> = [];

  let h1 = "";
  let h2 = "";
  let h3 = "";
  let currentLines: string[] = [];
  let chunkIndex = 0;

  const getBreadcrumb = () => {
    const parts = [h1, h2, h3].filter(Boolean);
    return parts.length > 0 ? parts.join(" > ") : "Introduction";
  };

  const splitIntoSentenceChunks = (text: string, heading: string, maxLen = 2500) => {
    if (text.length <= maxLen) {
      if (text.trim().length > 50) {
        chunks.push({ sourceFile, sourceLabel, heading, content: text.trim(), chunkIndex: chunkIndex++ });
      }
      return;
    }
    const sentences = text.split(/(?<=[.!?])\s+/);
    let part = "";
    for (const sentence of sentences) {
      if ((part + " " + sentence).length > maxLen && part.length > 0) {
        if (part.trim().length > 50) {
          chunks.push({ sourceFile, sourceLabel, heading, content: part.trim(), chunkIndex: chunkIndex++ });
        }
        const lastSentence = part.split(/(?<=[.!?])\s+/).slice(-1)[0] ?? "";
        part = lastSentence + " " + sentence;
      } else {
        part = part ? part + " " + sentence : sentence;
      }
    }
    if (part.trim().length > 50) {
      chunks.push({ sourceFile, sourceLabel, heading, content: part.trim(), chunkIndex: chunkIndex++ });
    }
  };

  const flush = () => {
    const content = currentLines.join("\n").trim();
    if (content.length < 50) return;
    const heading = getBreadcrumb();
    const enriched = `${heading}\n\n${content}`;
    splitIntoSentenceChunks(enriched, heading);
    currentLines = [];
  };

  for (const line of lines) {
    const h1Match = /^#\s+(.+)/.exec(line);
    const h2Match = /^##\s+(.+)/.exec(line);
    const h3Match = /^###\s+(.+)/.exec(line);

    if (h1Match) { flush(); h1 = h1Match[1].trim(); h2 = ""; h3 = ""; }
    else if (h2Match) { flush(); h2 = h2Match[1].trim(); h3 = ""; }
    else if (h3Match) { flush(); h3 = h3Match[1].trim(); }
    else { currentLines.push(line); }
  }
  flush();

  return chunks;
}

export const ingestFile = internalAction({
  args: { file: v.string(), label: v.string(), path: v.string() },
  handler: async (ctx, args): Promise<{ chunkCount: number }> => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      throw new ConvexError("GITHUB_TOKEN secret is not set. Go to Advanced > Secrets and add GITHUB_TOKEN with a GitHub personal access token that has read access to the lead-gen repo.");
    }

    const url = `${GITHUB_API_BASE}/${args.path}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      throw new ConvexError(`GitHub API returned ${res.status} for ${args.path}. Check that GITHUB_TOKEN has read access to the salil-dengage/lead-gen repo.`);
    }

    const json = await res.json() as { content?: string; encoding?: string };
    if (!json.content || json.encoding !== "base64") {
      throw new ConvexError(`Unexpected GitHub API response for ${args.path}: missing base64 content.`);
    }

    const base64 = json.content.replace(/\n/g, "");
    const text = Buffer.from(base64, "base64").toString("utf-8");
    const chunks = chunkMarkdown(text, args.file, args.label);

    await ctx.runMutation(internal.kb.replaceChunks, {
      sourceFile: args.file,
      sourceLabel: args.label,
      chunks: chunks.map((c) => ({ heading: c.heading, content: c.content, chunkIndex: c.chunkIndex })),
    });

    return { chunkCount: chunks.length };
  },
});

export const ingestAll = action({
  args: {},
  handler: async (ctx): Promise<{ total: number }> => {
    let total = 0;
    for (const kbFile of KB_FILES) {
      const result = await ctx.runAction(internal.kb_ingest.ingestFile, {
        file: kbFile.file,
        label: kbFile.label,
        path: kbFile.path,
      });
      total += result.chunkCount;
    }
    return { total };
  },
});
