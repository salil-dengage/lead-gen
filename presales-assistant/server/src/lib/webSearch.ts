import { env } from "./env.js";

export type WebResult = { title: string; snippet: string; url: string };

// Fix for finding #7: the old query was
// `d.engage ${question} site:dengage.com OR G2 OR Gartner OR Forrester OR case study`
// which, due to operator precedence, only binds `site:` to the first term;
// "OR G2"/"OR Gartner"/"OR Forrester" become unrestricted free-text
// alternation across the whole web. That's why the old app's "Web sources"
// were generic Forrester/Gartner/G2 homepage boilerplate instead of
// anything about d.engage. This groups the site restriction properly.
export async function webSearch(question: string, numResults = 4): Promise<WebResult[]> {
  const apiKey = env.serperApiKey();
  if (!apiKey) return [];

  const query = `("d.engage" OR "dengage") ${question} (site:dengage.com OR site:g2.com OR site:gartner.com OR site:forrester.com)`;

  try {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ q: query, num: numResults, gl: "us", hl: "en" }),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { organic?: Array<{ title: string; snippet?: string; link: string }> };
    return (data.organic ?? []).slice(0, numResults).map((r) => ({
      title: r.title ?? "",
      snippet: r.snippet ?? "",
      url: r.link ?? "",
    }));
  } catch {
    return []; // web search is optional, never fail the chat request over it
  }
}
