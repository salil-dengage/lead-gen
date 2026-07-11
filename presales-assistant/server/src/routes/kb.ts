import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const kbRouter = Router();

kbRouter.get("/status", requireAuth, asyncHandler(async (_req, res) => {
  const [{ data: ingestion, error: ingestionError }, { count, error: countError }] = await Promise.all([
    supabase.from("kb_ingestion").select("*").order("source_file"),
    supabase.from("kb_chunks").select("*", { count: "exact", head: true }),
  ]);

  if (ingestionError || countError) {
    res.status(500).json({ error: (ingestionError ?? countError)?.message });
    return;
  }

  res.json({ ingestion: ingestion ?? [], chunkCount: count ?? 0 });
}));
