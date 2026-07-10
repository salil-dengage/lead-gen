"use node";

import { action } from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const search = action({
  args: {
    query: v.string(),
    numResults: v.optional(v.number()),
  },
  handler: async (_ctx, args): Promise<{ results: Array<{ title: string; snippet: string; url: string }> }> => {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      throw new ConvexError("SERPER_API_KEY is not set. Add it in Advanced > Secrets to enable web search.");
    }

    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: args.query, num: args.numResults ?? 5, gl: "us", hl: "en" }),
    });

    if (!res.ok) {
      throw new ConvexError(`Serper API error: ${res.status}`);
    }

    const data = await res.json() as {
      organic?: Array<{ title: string; snippet?: string; link: string }>;
    };

    const results = (data.organic ?? []).slice(0, args.numResults ?? 5).map((r) => ({
      title: r.title ?? "",
      snippet: r.snippet ?? "",
      url: r.link ?? "",
    }));

    return { results };
  },
});
