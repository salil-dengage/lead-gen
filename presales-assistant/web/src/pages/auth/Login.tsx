import { useState } from "react";
import { useAuth } from "@/hooks/useAuth.ts";

export default function Login() {
  const { signInWithOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithOtp(email.trim());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send magic link");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">d.</div>
          <div>
            <h1 className="text-sm font-semibold">d.engage AI Assistant</h1>
            <p className="text-xs text-[var(--muted-foreground)]">Sales &amp; Pre-Sales Knowledge Base</p>
          </div>
        </div>

        {sent ? (
          <p className="text-sm text-[var(--muted-foreground)]">
            Check <span className="font-medium text-[var(--foreground)]">{email}</span> for a sign-in link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="you@dengage.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting || !email.trim()}
              className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
