import { Router } from "express";
import { supabase } from "../lib/supabase.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../lib/asyncHandler.js";

export const conversationsRouter = Router();

conversationsRouter.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { title, mode } = req.body as { title?: string; mode?: "chat" | "rfp" };
    if (!title || (mode !== "chat" && mode !== "rfp")) {
      res.status(400).json({ error: "title and mode ('chat'|'rfp') are required" });
      return;
    }
    const { data, error } = await supabase
      .from("conversations")
      .insert({ title: title.slice(0, 80), mode, user_id: req.userId })
      .select()
      .single();
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(data);
  }),
);

conversationsRouter.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { data, error } = await supabase
      .from("conversations")
      .select("*")
      .eq("user_id", req.userId)
      .order("updated_at", { ascending: false })
      .limit(50);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(data ?? []);
  }),
);

conversationsRouter.get(
  "/:id/messages",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { data: conversation } = await supabase
      .from("conversations")
      .select("id")
      .eq("id", req.params.id)
      .eq("user_id", req.userId)
      .maybeSingle();
    if (!conversation) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", req.params.id)
      .order("created_at", { ascending: true });
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(data ?? []);
  }),
);

conversationsRouter.patch(
  "/:id/title",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { title } = req.body as { title?: string };
    if (!title) {
      res.status(400).json({ error: "title is required" });
      return;
    }
    const { error } = await supabase
      .from("conversations")
      .update({ title: title.slice(0, 80), updated_at: new Date().toISOString() })
      .eq("id", req.params.id)
      .eq("user_id", req.userId);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ ok: true });
  }),
);

conversationsRouter.post(
  "/messages/:messageId/feedback",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { feedback } = req.body as { feedback?: "up" | "down" };
    if (feedback !== "up" && feedback !== "down") {
      res.status(400).json({ error: "feedback must be 'up' or 'down'" });
      return;
    }
    // Scope the update through the owning conversation so a user can only
    // flag feedback on messages inside their own conversations.
    const { data: message } = await supabase
      .from("messages")
      .select("id, conversation_id, conversations!inner(user_id)")
      .eq("id", req.params.messageId)
      .eq("conversations.user_id", req.userId)
      .maybeSingle();
    if (!message) {
      res.status(404).json({ error: "Message not found" });
      return;
    }
    const { error } = await supabase.from("messages").update({ feedback }).eq("id", req.params.messageId);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json({ ok: true });
  }),
);

// Fix for finding #11 (feedback captured but never closed into a loop): a
// minimal admin view over every down-voted answer across all users, so a
// bad answer becomes something the team can actually review and correct
// rather than a write-only log.
conversationsRouter.get(
  "/admin/feedback",
  requireAuth,
  requireAdmin,
  asyncHandler(async (req, res) => {
    const feedback = (req.query.type as string) === "up" ? "up" : "down";
    const { data, error } = await supabase
      .from("messages")
      .select("id, content, sources, flags, routed_to, created_at, conversation_id, conversations(title, mode)")
      .eq("feedback", feedback)
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }
    res.json(data ?? []);
  }),
);
