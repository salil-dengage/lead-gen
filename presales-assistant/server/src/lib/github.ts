import { env } from "./env.js";

const API_BASE = "https://api.github.com/repos";

type GithubContentEntry = {
  name: string;
  path: string;
  type: "file" | "dir";
};

function headers() {
  return {
    Authorization: `Bearer ${env.githubToken()}`,
    Accept: "application/vnd.github.v3+json",
  };
}

// Fix for finding #1 (infosec/ never ingested): rather than hardcoding a
// fixed filename list (which silently drops new files and required someone
// to remember to add infosec/*.md by hand), this lists a directory's
// contents from the GitHub API and ingests every .md file found. Both
// knowledge-base/ and infosec/ are listed this way in routes/ingest.ts.
export async function listMarkdownFiles(path: string): Promise<GithubContentEntry[]> {
  const url = `${API_BASE}/${env.githubRepo()}/contents/${path}`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status} listing ${path}. Check GITHUB_TOKEN has read access to ${env.githubRepo()}.`);
  }
  const json = (await res.json()) as GithubContentEntry[];
  return json.filter((entry) => entry.type === "file" && entry.name.toLowerCase().endsWith(".md"));
}

export async function fetchFileText(path: string): Promise<string> {
  const url = `${API_BASE}/${env.githubRepo()}/contents/${path}`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status} for ${path}.`);
  }
  const json = (await res.json()) as { content?: string; encoding?: string };
  if (!json.content || json.encoding !== "base64") {
    throw new Error(`Unexpected GitHub API response for ${path}: missing base64 content.`);
  }
  return Buffer.from(json.content.replace(/\n/g, ""), "base64").toString("utf-8");
}

// Derives a human-readable label from a filename, e.g.
// "01_PRODUCT_SPECS.md" -> "Product Specs", "infosec-access-control-policy.md" -> "Access Control Policy"
export function labelFromFilename(name: string): string {
  const withoutExt = name.replace(/\.md$/i, "");
  const withoutLeadingNumber = withoutExt.replace(/^\d+[_-]?/, "").replace(/^infosec-(\d+-)?/i, "");
  const words = withoutLeadingNumber.replace(/[_-]+/g, " ").trim();
  return words
    .split(" ")
    .filter(Boolean)
    .map((w) => (w.length <= 3 && w === w.toUpperCase() ? w : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join(" ");
}

// sourceFile key used for storage/dedup, stable and filesystem-derived
// rather than a hand-maintained list.
export function sourceFileKey(dirLabel: string, filename: string): string {
  return `${dirLabel}/${filename.replace(/\.md$/i, "")}`;
}
