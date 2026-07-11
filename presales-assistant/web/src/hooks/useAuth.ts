import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient.ts";

// Fix for finding #6: this replaces the Hercules OIDC + localStorage
// session-token combo. Conversations are now keyed by the real Supabase
// auth user id (see server/src/middleware/auth.ts), and every API call
// carries the user's Supabase access token as a Bearer header (see
// lib/api.ts), so the backend can actually verify identity per request.
export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Password sign-in never sends an email, so it isn't subject to
  // Supabase's built-in email-send rate limit the way magic links are.
  const signInWithPassword = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = () => supabase.auth.signOut();

  return {
    session,
    user: (session?.user as User | undefined) ?? null,
    loading,
    isAuthenticated: !!session,
    signInWithPassword,
    signOut,
  };
}
