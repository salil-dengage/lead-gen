// Shared keyword maps used both at ingest time (tagging kb_chunks) and at
// query time (boosting search_kb_chunks towards the prospect's industry/
// geography), per CLAUDE.md Section 1.4: "Prioritise same-industry
// references... Never cite a non-matching-geography reference to a
// region-sensitive prospect without annotating the geography."

export const INDUSTRY_KEYWORDS: Record<string, string[]> = {
  banking: ["bank", "banking", "fintech", "financial services"],
  igaming: ["igaming", "casino", "betting", "gambling"],
  retail: ["retail", "fmcg", "grocery", "fashion", "e-commerce", "ecommerce"],
  telecom: ["telecom", "telco", "mobile operator"],
  healthcare: ["healthcare", "hospital", "pharma"],
  insurance: ["insurance", "insurer"],
};

export const GEOGRAPHY_KEYWORDS: Record<string, string[]> = {
  gcc: ["gcc", "saudi", "ksa", "uae", "dubai", "abu dhabi", "kuwait", "qatar", "bahrain", "oman", "dammam"],
  turkey: ["turkey", "turkish", "istanbul", "burgan", "fibabanka"],
  pakistan: ["pakistan", "karachi", "lahore", "islamabad", "mcb"],
  egypt: ["egypt", "cairo"],
  africa: ["africa", "nigeria", "kenya"],
  latam: ["latam", "latin america", "brazil", "mexico"],
  cis: ["cis", "russia", "moscow", "kazakhstan"],
};

export function matchKeywords(text: string, keywordMap: Record<string, string[]>): string[] {
  const lower = text.toLowerCase();
  const hits: string[] = [];
  for (const [tagName, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((k) => lower.includes(k))) hits.push(tagName);
  }
  return hits;
}
