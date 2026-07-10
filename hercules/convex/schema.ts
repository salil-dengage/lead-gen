import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  // Knowledge base chunks for RAG retrieval
  kb_chunks: defineTable({
    sourceFile: v.string(), // e.g. "01_PRODUCT_SPECS"
    sourceLabel: v.string(), // Human-readable label
    heading: v.string(), // Section heading
    content: v.string(), // Chunk text
    chunkIndex: v.number(),
  })
    .index("by_source", ["sourceFile"])
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["sourceFile"],
    }),

  // Ingestion status tracking
  kb_ingestion: defineTable({
    sourceFile: v.string(),
    status: v.union(v.literal("pending"), v.literal("done"), v.literal("error")),
    chunkCount: v.number(),
    updatedAt: v.string(),
  }).index("by_source", ["sourceFile"]),

  // Conversation sessions
  conversations: defineTable({
    title: v.string(),
    mode: v.union(v.literal("chat"), v.literal("rfp")),
    createdAt: v.string(),
    updatedAt: v.string(),
    sessionToken: v.string(),
  }).index("by_session", ["sessionToken"]),

  // Individual messages
  messages: defineTable({
    conversationId: v.id("conversations"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    sources: v.optional(v.array(v.object({
      sourceFile: v.string(),
      sourceLabel: v.string(),
      heading: v.string(),
    }))),
    feedback: v.optional(v.union(v.literal("up"), v.literal("down"))),
    createdAt: v.string(),
  })
    .index("by_conversation", ["conversationId"]),
});
