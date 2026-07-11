import type { NextFunction, Request, Response } from "express";
import { supabase } from "../lib/supabase.js";
import { env } from "../lib/env.js";

// Fix for finding #6: the old app had Hercules OIDC fully wired on the
// frontend but zero auth checks in the Convex functions that actually do
// work (askQuestion, ingestAll, kb_search, conversations.*), and
// conversations were keyed by a client-generated localStorage token instead
// of the authenticated identity. Every route below requires a valid
// Supabase JWT, and req.userId is always the verified auth.users.id, never
// a client-supplied value.

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  if (!token) {
    res.status(401).json({ error: "Missing Authorization: Bearer <token>" });
    return;
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    res.status(401).json({ error: "Invalid or expired session" });
    return;
  }

  req.userId = data.user.id;
  req.userEmail = data.user.email ?? undefined;
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const email = req.userEmail?.toLowerCase();
  if (!email || !env.adminEmails().includes(email)) {
    res.status(403).json({ error: "Admin access required" });
    return;
  }
  next();
}
