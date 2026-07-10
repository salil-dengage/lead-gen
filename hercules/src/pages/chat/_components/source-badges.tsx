import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils.ts";

type Source = { sourceFile: string; sourceLabel: string; heading: string };
type SourceBadgesProps = { sources: Source[]; className?: string };

const FILE_COLORS: Record<string, string> = {
  "01_PRODUCT_SPECS": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "02_RFP_KNOWLEDGE_BASE": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "03_CASE_STUDIES": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "04_SECURITY_COMPLIANCE": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "05_TECHNICAL_INFRA": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "06_INDUSTRY_COMMERCIAL": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "07_USE_CASES": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  "08_FULL_RFP_RESPONSES": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
};

export function SourceBadges({ sources, className }: SourceBadgesProps) {
  if (!sources || sources.length === 0) return null;

  const seen = new Set<string>();
  const unique = sources.filter((s) => {
    const key = `${s.sourceFile}|${s.heading}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return (
    <div className={cn("flex flex-wrap gap-1.5 mt-3", className)}>
      <span className="text-xs text-muted-foreground flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Sources:</span>
      {unique.map((s, i) => (
        <span key={i} className={cn("inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium", FILE_COLORS[s.sourceFile] ?? "bg-muted text-muted-foreground")} title={s.heading}>
          {s.sourceLabel}
          {s.heading && s.heading !== "Introduction" && (
            <span className="opacity-60">{" > "}{s.heading.slice(0, 30)}{s.heading.length > 30 ? "..." : ""}</span>
          )}
        </span>
      ))}
    </div>
  );
}
