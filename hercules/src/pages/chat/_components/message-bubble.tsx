import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import { ThumbsUp, ThumbsDown, Copy, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { SourceBadges } from "./source-badges.tsx";
import { cn } from "@/lib/utils.ts";
import { toast } from "sonner";

type Source = { sourceFile: string; sourceLabel: string; heading: string };
type WebResult = { title: string; snippet: string; url: string };
type MessageBubbleProps = {
  messageId?: Id<"messages">;
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  webResults?: WebResult[];
  feedback?: "up" | "down";
  isStreaming?: boolean;
};

export function MessageBubble({ messageId, role, content, sources, webResults, feedback, isStreaming }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const submitFeedback = useMutation(api.conversations.submitFeedback);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  const handleFeedback = async (fb: "up" | "down") => {
    if (!messageId) return;
    await submitFeedback({ messageId, feedback: fb });
  };

  if (role === "user") {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed shadow-sm">{content}</div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs mt-0.5">d.</div>
      <div className="flex-1 min-w-0">
        <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <div className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
            {content}
            {isStreaming && <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse" />}
          </div>
          {sources && sources.length > 0 && <SourceBadges sources={sources} />}
          {webResults && webResults.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                <Globe className="w-3 h-3" />
                <span>Web sources</span>
              </div>
              <div className="space-y-1.5">
                {webResults.map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="block text-xs p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="font-medium text-foreground truncate">{r.title}</div>
                    <div className="text-muted-foreground mt-0.5 line-clamp-2">{r.snippet}</div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        {!isStreaming && (
          <div className="flex items-center gap-1 mt-1.5 ml-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground" onClick={handleCopy} title="Copy response">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
            {messageId && (
              <>
                <Button variant="ghost" size="sm" className={cn("h-7 w-7 p-0 text-muted-foreground hover:text-green-600", feedback === "up" && "text-green-600")} onClick={() => handleFeedback("up")} title="Good response">
                  <ThumbsUp className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className={cn("h-7 w-7 p-0 text-muted-foreground hover:text-red-500", feedback === "down" && "text-red-500")} onClick={() => handleFeedback("down")} title="Poor response">
                  <ThumbsDown className="w-3.5 h-3.5" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
