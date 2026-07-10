import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const replaceChunks = internalMutation({
  args: {
    sourceFile: v.string(),
    sourceLabel: v.string(),
    chunks: v.array(
      v.object({
        heading: v.string(),
        content: v.string(),
        chunkIndex: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("kb_chunks")
      .withIndex("by_source", (q) => q.eq("sourceFile", args.sourceFile))
      .collect();
    for (const chunk of existing) {
      await ctx.db.delete(chunk._id);
    }

    for (const chunk of args.chunks) {
      await ctx.db.insert("kb_chunks", {
        sourceFile: args.sourceFile,
        sourceLabel: args.sourceLabel,
        heading: chunk.heading,
        content: chunk.content,
        chunkIndex: chunk.chunkIndex,
      });
    }

    const existingStatus = await ctx.db
      .query("kb_ingestion")
      .withIndex("by_source", (q) => q.eq("sourceFile", args.sourceFile))
      .first();
    if (existingStatus) {
      await ctx.db.patch(existingStatus._id, {
        status: "done",
        chunkCount: args.chunks.length,
        updatedAt: new Date().toISOString(),
      });
    } else {
      await ctx.db.insert("kb_ingestion", {
        sourceFile: args.sourceFile,
        status: "done",
        chunkCount: args.chunks.length,
        updatedAt: new Date().toISOString(),
      });
    }
  },
});

export const getIngestionStatus = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("kb_ingestion").collect();
  },
});

export const getChunkCount = query({
  args: {},
  handler: async (ctx) => {
    const chunks = await ctx.db.query("kb_chunks").take(10000);
    return chunks.length;
  },
});
