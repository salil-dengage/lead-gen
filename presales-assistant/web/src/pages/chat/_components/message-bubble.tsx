import { useState } from "react";
import { ThumbsUp, ThumbsDown, Copy, Check, Globe, AlertTriangle, Send } from "lucide-react";
import { SourceBadges } from "./source-badges.tsx";
import type { Message } from "@/lib/api.ts";

const GAP_MARKER_STYLE: Record<string, string> = {
  "[VERIFY]": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "[REVIEW NEEDED]": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "[ROADMAP]": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "[NOT SUPPORTED]": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};
const GAP_MARKER_REGEX = /(\[VERIFY\]|\[REVIEW NEEDED\]|\[ROADMAP\]|\[NOT SUPPORTED\])/g;

// Fix for finding #4: CLAUDE.md requires visible markers on unconfirmed
// claims. The old UI rendered the whole answer as one plain text blob with
// no distinct treatment for these markers, so a rep had no visual signal
// for "this part is a guess." This renders each gap marker as a colored
// inline badge instead of plain text.
function renderContent(content: string) {
  const parts = content.split(GAP_MARKER_REGEX);
  return parts.map((part, i) =>
    GAP_MARKER_STYLE[part] ? (
      <span key={i} className={`mx-1 inline-block rounded px-1.5 py-0.5 text-xs font-semibold ${GAP_MARKER_STYLE[part]}`}>
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function MessageBubble({ message, onFeedback }: { message: Message; onFeedback: (id: string, fb: "up" | "down") => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.role === "user") {
    return (
      <div className="mb-4 flex justify-end">
        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
        d.
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-sm border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-sm">
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--foreground)]">{renderContent(message.content)}</div>

          {message.routed_to && message.routed_to.length > 0 && (
            <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2 text-xs text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
              <Send className="mt-0.5 h-3 w-3 flex-shrink-0" />
              <span>Route to: {message.routed_to.join(", ")}</span>
            </div>
          )}

          {message.flags && message.flags.filter((f) => f.startsWith("review_needed")).length > 0 && (
            <div className="mt-2 flex items-start gap-1.5 text-xs text-red-600 dark:text-red-400">
              <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0" />
              <span>Auto-flagged for review: {message.flags.filter((f) => f.startsWith("review_needed")).join(", ")}</span>
            </div>
          )}

          {message.sources && message.sources.length > 0 && <SourceBadges sources={message.sources} />}

          {message.web_results && message.web_results.length > 0 && (
            <div className="mt-3 border-t border-[var(--border)]/50 pt-3">
              <div className="mb-2 flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                <Globe className="h-3 w-3" />
                <span>Web sources</span>
              </div>
              <div className="space-y-1.5">
                {message.web_results.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="block rounded-lg bg-black/5 p-2 text-xs hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10">
                    <div className="truncate font-medium">{r.title}</div>
                    <div className="mt-0.5 line-clamp-2 text-[var(--muted-foreground)]">{r.snippet}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="ml-1 mt-1.5 flex items-center gap-1">
          <button onClick={handleCopy} title="Copy response" className="rounded p-1.5 text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => onFeedback(message.id, "up")}
            title="Good response"
            className={`rounded p-1.5 hover:text-green-600 ${message.feedback === "up" ? "text-green-600" : "text-[var(--muted-foreground)]"}`}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onFeedback(message.id, "down")}
            title="Poor response"
            className={`rounded p-1.5 hover:text-red-500 ${message.feedback === "down" ? "text-red-500" : "text-[var(--muted-foreground)]"}`}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
