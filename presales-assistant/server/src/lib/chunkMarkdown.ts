// Fix for finding #3 (table-unaware chunking): the old chunker split purely
// on sentence-boundary regex, which mangles markdown tables (no sentence
// terminators, pipe-delimited columns). This is the most likely root cause
// of the fabricated connector list ("Dreamio", "Azure Data Lake") traced in
// the app review, the real connector row lives inside a markdown table and
// a sentence splitter can truncate or split it away from its heading.
//
// This version detects contiguous table blocks (lines starting with `|`)
// and keeps each table intact as its own chunk, tagged isTable: true, never
// run through sentence splitting. Non-table prose still uses heading
// tracking + sentence-aware splitting for readable chunk sizes.

import { GEOGRAPHY_KEYWORDS, INDUSTRY_KEYWORDS, matchKeywords } from "./topics.js";

export type Chunk = {
  heading: string;
  content: string;
  chunkIndex: number;
  isTable: boolean;
  industryTags: string[];
  geographyTags: string[];
};

function isTableLine(line: string): boolean {
  return /^\s*\|/.test(line);
}

export function chunkMarkdown(text: string): Chunk[] {
  const lines = text.split("\n");
  const chunks: Chunk[] = [];

  let h1 = "";
  let h2 = "";
  let h3 = "";
  let currentLines: string[] = [];
  let chunkIndex = 0;

  const getBreadcrumb = () => {
    const parts = [h1, h2, h3].filter(Boolean);
    return parts.length > 0 ? parts.join(" > ") : "Introduction";
  };

  const pushChunk = (content: string, heading: string, isTable: boolean) => {
    const trimmed = content.trim();
    if (trimmed.length < 50) return;
    chunks.push({
      heading,
      content: trimmed,
      chunkIndex: chunkIndex++,
      isTable,
      industryTags: matchKeywords(trimmed, INDUSTRY_KEYWORDS),
      geographyTags: matchKeywords(trimmed, GEOGRAPHY_KEYWORDS),
    });
  };

  const maxLen = 2500;

  const splitProseIntoSentenceChunks = (body: string, heading: string) => {
    const enriched = `${heading}\n\n${body}`;
    if (enriched.length <= maxLen) {
      pushChunk(enriched, heading, false);
      return;
    }
    const sentences = enriched.split(/(?<=[.!?])\s+/);
    let part = "";
    for (const sentence of sentences) {
      if ((part + " " + sentence).length > maxLen && part.length > 0) {
        pushChunk(part, heading, false);
        const lastSentence = part.split(/(?<=[.!?])\s+/).slice(-1)[0] ?? "";
        part = lastSentence + " " + sentence;
      } else {
        part = part ? part + " " + sentence : sentence;
      }
    }
    pushChunk(part, heading, false);
  };

  // A table block never gets sentence-split. If a single table genuinely
  // exceeds maxLen it's split on row boundaries (never mid-row) so a
  // connector/certification list can't be truncated mid-entry.
  const splitTableIntoRowChunks = (tableLines: string[], heading: string) => {
    const headerBlock = tableLines.slice(0, 2).join("\n"); // header row + separator row
    let part = `${heading}\n\n${headerBlock}`;
    let hasRows = false;
    for (const row of tableLines.slice(2)) {
      if ((part + "\n" + row).length > maxLen && hasRows) {
        pushChunk(part, heading, true);
        part = `${heading}\n\n${headerBlock}\n${row}`;
        hasRows = true;
      } else {
        part += "\n" + row;
        hasRows = true;
      }
    }
    pushChunk(part, heading, true);
  };

  const flush = () => {
    if (currentLines.length === 0) return;
    const heading = getBreadcrumb();

    // Walk currentLines and separate out contiguous table blocks from prose.
    let proseBuffer: string[] = [];
    let tableBuffer: string[] = [];

    const flushProse = () => {
      if (proseBuffer.length > 0) {
        splitProseIntoSentenceChunks(proseBuffer.join("\n"), heading);
        proseBuffer = [];
      }
    };
    const flushTable = () => {
      if (tableBuffer.length >= 2) {
        splitTableIntoRowChunks(tableBuffer, heading);
      } else if (tableBuffer.length > 0) {
        // Not a real table (just a stray line starting with `|`), treat as prose.
        proseBuffer.push(...tableBuffer);
      }
      tableBuffer = [];
    };

    for (const line of currentLines) {
      if (isTableLine(line)) {
        flushProse();
        tableBuffer.push(line);
      } else {
        flushTable();
        proseBuffer.push(line);
      }
    }
    flushTable();
    flushProse();

    currentLines = [];
  };

  for (const line of lines) {
    const h1Match = /^#\s+(.+)/.exec(line);
    const h2Match = /^##\s+(.+)/.exec(line);
    const h3Match = /^###\s+(.+)/.exec(line);

    if (h1Match) {
      flush();
      h1 = h1Match[1].trim();
      h2 = "";
      h3 = "";
    } else if (h2Match) {
      flush();
      h2 = h2Match[1].trim();
      h3 = "";
    } else if (h3Match) {
      flush();
      h3 = h3Match[1].trim();
    } else {
      currentLines.push(line);
    }
  }
  flush();

  return chunks;
}
