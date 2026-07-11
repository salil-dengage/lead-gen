import { ExternalLink } from "lucide-react";
import type { Source } from "@/lib/api.ts";

const PALETTE = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
];

// Fix for the low-severity "hardcoded 8-file color map" item: the old app
// couldn't assign a color to any infosec/ file (or any newly added KB
// file) because FILE_COLORS only listed 8 exact filenames. This hashes
// sourceFile to a stable palette slot instead, so it works for any file
// the ingester discovers.
function colorFor(sourceFile: string): string {
  let hash = 0;
  for (let i = 0; i < sourceFile.length; i++) hash = (hash * 31 + sourceFile.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

export function SourceBadges({ sources }: { sources: Source[] }) {
  if (!sources || sources.length === 0) return null;

  const seen = new Set<string>();
  const unique = sources.filter((s) => {
    const key = `${s.sourceFile}|${s.heading}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
        <ExternalLink className="h-3 w-3" /> Sources:
      </span>
      {unique.map((s, i) => (
        <span
          key={i}
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colorFor(s.sourceFile)}`}
          title={s.heading}
        >
          {s.sourceLabel}
          {s.heading && s.heading !== "Introduction" && (
            <span className="opacity-60">
              {" > "}
              {s.heading.slice(0, 30)}
              {s.heading.length > 30 ? "..." : ""}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
