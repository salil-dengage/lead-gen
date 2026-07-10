import { query } from "./_generated/server";
import { v } from "convex/values";

export const searchChunks = query({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 8;
    const results = await ctx.db
      .query("kb_chunks")
      .withSearchIndex("search_content", (q) => q.search("content", args.query))
      .take(limit);
    return results;
  },
});
