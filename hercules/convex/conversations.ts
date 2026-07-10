import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    mode: v.union(v.literal("chat"), v.literal("rfp")),
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("conversations", {
      title: args.title,
      mode: args.mode,
      sessionToken: args.sessionToken,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  },
});

export const updateTitle = mutation({
  args: {
    id: v.id("conversations"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
      updatedAt: new Date().toISOString(),
    });
  },
});

export const listBySession = query({
  args: {
    sessionToken: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_session", (q) => q.eq("sessionToken", args.sessionToken))
      .order("desc")
      .take(50);
  },
});

export const addMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    sources: v.optional(
      v.array(
        v.object({
          sourceFile: v.string(),
          sourceLabel: v.string(),
          heading: v.string(),
        }),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      role: args.role,
      content: args.content,
      sources: args.sources,
      createdAt: new Date().toISOString(),
    });
    await ctx.db.patch(args.conversationId, {
      updatedAt: new Date().toISOString(),
    });
    return id;
  },
});

export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId),
      )
      .order("asc")
      .collect();
  },
});

export const submitFeedback = mutation({
  args: {
    messageId: v.id("messages"),
    feedback: v.union(v.literal("up"), v.literal("down")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, { feedback: args.feedback });
  },
});
