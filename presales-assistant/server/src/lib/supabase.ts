import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

// Service-role client: used server-side only, bypasses RLS. Per-request
// user identity is established separately in middleware/auth.ts by
// verifying the caller's JWT, then every query below is scoped with an
// explicit .eq("user_id", ...) filter rather than relying on RLS alone.
export const supabase = createClient(env.supabaseUrl(), env.supabaseServiceRoleKey(), {
  auth: { persistSession: false, autoRefreshToken: false },
});
