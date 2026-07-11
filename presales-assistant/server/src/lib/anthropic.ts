import Anthropic from "@anthropic-ai/sdk";
import { env } from "./env.js";

export const anthropic = new Anthropic({ apiKey: env.anthropicApiKey() });

// Fix for finding #12: RFP-mode text carries direct commercial/legal risk
// (it can get pasted straight into a submitted document), and the one
// concrete failure traced in the app review was a structured-list recall
// error (fabricated connector names), a failure mode smaller models are
// more prone to. Chat mode (internal, exploratory) stays on Haiku for
// latency/cost; RFP mode steps up to Sonnet.
export const MODEL_BY_MODE: Record<"chat" | "rfp", string> = {
  chat: "claude-haiku-4-5-20251001",
  rfp: "claude-sonnet-5",
};
