import { createClient } from "@supabase/supabase-js";

// Read from the runtime-injected /env.js (see server/src/index.ts), not
// Vite build-time env vars, so this works on deploy flows (like Fly's
// GitHub-launch UI) that only expose runtime environment variables, not
// Docker build args.
const runtimeEnv = window.__ENV__ ?? { SUPABASE_URL: "", SUPABASE_ANON_KEY: "" };

if (!runtimeEnv.SUPABASE_URL || !runtimeEnv.SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.error("window.__ENV__ is missing SUPABASE_URL/SUPABASE_ANON_KEY. Is /env.js loading before the app bundle?");
}

export const supabase = createClient(runtimeEnv.SUPABASE_URL, runtimeEnv.SUPABASE_ANON_KEY);
