import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { env } from "../lib/env.js";
import { fetchFileText, labelFromFilename, listMarkdownFiles, sourceFileKey } from "../lib/github.js";
import { chunkMarkdown } from "../lib/chunkMarkdown.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const ingestRouter = Router();

// Fix for finding #1: both knowledge-base/ and infosec/ are listed
// dynamically from GitHub (see lib/github.ts) instead of a hardcoded
// filename array, so all 29 infosec/ files are ingested and new files added
// to either directory are picked up automatically on the next re-index.
function sourceDirs() {
  return [
    { path: env.kbKnowledgeBasePath(), label: "Knowledge Base" },
    { path: env.kbInfosecPath(), label: "InfoSec" },
  ];
}

async function ingestOneFile(dirPath: string, dirLabel: string, filename: string) {
  const filePath = `${dirPath}/${filename}`;
  const sourceFile = sourceFileKey(dirLabel, filename);
  const sourceLabel = `${dirLabel}: ${labelFromFilename(filename)}`;

  try {
    const text = await fetchFileText(filePath);
    const chunks = chunkMarkdown(text);

    await supabase.from("kb_chunks").delete().eq("source_file", sourceFile);
    if (chunks.length > 0) {
      const { error: insertError } = await supabase.from("kb_chunks").insert(
        chunks.map((c) => ({
          source_file: sourceFile,
          source_label: sourceLabel,
          heading: c.heading,
          content: c.content,
          chunk_index: c.chunkIndex,
          is_table: c.isTable,
          industry_tags: c.industryTags,
          geography_tags: c.geographyTags,
        })),
      );
      if (insertError) throw new Error(insertError.message);
    }

    await supabase.from("kb_ingestion").upsert({
      source_file: sourceFile,
      source_label: sourceLabel,
      status: "done",
      chunk_count: chunks.length,
      error: null,
      updated_at: new Date().toISOString(),
    });

    return { sourceFile, chunkCount: chunks.length, error: null as string | null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await supabase.from("kb_ingestion").upsert({
      source_file: sourceFile,
      source_label: sourceLabel,
      status: "error",
      chunk_count: 0,
      error: message,
      updated_at: new Date().toISOString(),
    });
    return { sourceFile, chunkCount: 0, error: message };
  }
}

ingestRouter.post("/", requireAuth, requireAdmin, asyncHandler(async (_req, res) => {
  const results: Array<{ sourceFile: string; chunkCount: number; error: string | null }> = [];

  for (const dir of sourceDirs()) {
    // list files, then ingest sequentially to keep GitHub API usage gentle
    const files = await listMarkdownFiles(dir.path).catch((err) => {
      results.push({ sourceFile: `${dir.label}/*`, chunkCount: 0, error: err instanceof Error ? err.message : String(err) });
      return [];
    });
    for (const file of files) {
      results.push(await ingestOneFile(dir.path, dir.label, file.name));
    }
  }

  const total = results.reduce((sum, r) => sum + r.chunkCount, 0);
  const errors = results.filter((r) => r.error);
  res.json({ total, filesIngested: results.length, errors });
}));
