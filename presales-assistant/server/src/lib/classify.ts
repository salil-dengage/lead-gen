import { BANNED_STRINGS } from "./verifiedConstants.js";
import { GEOGRAPHY_KEYWORDS, INDUSTRY_KEYWORDS, matchKeywords } from "./topics.js";

// Fix for finding #8 (no industry/geography-aware retrieval): extract
// boost tags from the question so search_kb_chunks can rank matching
// industry/geography chunks higher, rather than relying on accidental
// keyword overlap.
export function detectTopics(question: string): { industries: string[]; geographies: string[] } {
  return {
    industries: matchKeywords(question, INDUSTRY_KEYWORDS),
    geographies: matchKeywords(question, GEOGRAPHY_KEYWORDS),
  };
}

// Fix for finding #9 (no language matching): a coarse heuristic is enough
// to decide whether to instruct the model to answer in Turkish. This is not
// meant to be a full language detector, just a trigger for the system
// prompt instruction.
const TURKISH_CHARS = /[çğıöşüÇĞİÖŞÜ]/;
const TURKISH_WORDS = /\b(ve|için|nasıl|mı|misiniz|nedir|hangi|destekliyor|musunuz)\b/i;

export function detectLanguage(question: string): "tr" | "en" {
  if (TURKISH_CHARS.test(question) || TURKISH_WORDS.test(question)) return "tr";
  return "en";
}

// Fix for finding #5 (no commercial/security routing): CLAUDE.md Section 6
// requires commercial figures to route to Salil Gupta and security items to
// Köksal. Previously this was only a suggestion inside the model's prose,
// with nothing structured for a reviewer to query later. This scans both
// the question and the answer and returns a stable routedTo list stored on
// the message row.
const COMMERCIAL_PATTERN = /\b(price|pricing|cost|discount|quote|contract value|license fee|licensing fee|\$\s?\d|commercial (terms|figure))\b/i;
const SECURITY_PATTERN = /\b(iso ?27001|iso ?22301|iso ?27701|iso ?27018|soc ?2|gdpr|kvkk|pentest|penetration test|encryption|incident response|access control|data residency|audit log|compliance|infosec|vulnerability)\b/i;

export function detectRouting(question: string, answer: string): string[] {
  const combined = `${question}\n${answer}`;
  const routes: string[] = [];
  if (COMMERCIAL_PATTERN.test(combined)) routes.push("Salil Gupta (commercial sign-off)");
  if (SECURITY_PATTERN.test(combined)) routes.push("Köksal (InfoSec lead)");
  return routes;
}

// Fix for findings #2 and the "no automated em-dash check" low-severity
// item: the model is instructed not to use em/en dashes and not to state
// banned facts, but instructions to a small model are not a guarantee.
// This is a deterministic backstop that runs on every answer regardless of
// whether the model followed the prompt.
export function postProcess(rawText: string): { text: string; flags: string[] } {
  const flags: string[] = [];
  let text = rawText;

  if (/[—–]/.test(text)) {
    text = text.replace(/\s*[—–]\s*/g, ", ");
    flags.push("em_dash_stripped");
  }

  if (/99\.999%/.test(text)) {
    text = text.replace(/99\.999%/g, "99.9%");
    flags.push("sla_corrected");
  }

  for (const banned of BANNED_STRINGS) {
    if (banned === "99.999%") continue; // handled above with a substitution
    if (text.toLowerCase().includes(banned.toLowerCase())) {
      flags.push(`review_needed:${banned}`);
    }
  }

  if (/wizz\s?air/i.test(text)) {
    flags.push("review_needed:wizz_air_mentioned");
  }

  return { text, flags };
}
