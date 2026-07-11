import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "./lib/env.js";
import { kbRouter } from "./routes/kb.js";
import { ingestRouter } from "./routes/ingest.js";
import { chatRouter } from "./routes/chat.js";
import { conversationsRouter } from "./routes/conversations.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/api/kb", kbRouter);
app.use("/api/ingest", ingestRouter);
app.use("/api/chat", chatRouter);
app.use("/api/conversations", conversationsRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Fix for Fly.io's GitHub-launch flow (and any deploy path that doesn't
// support passing --build-arg): the frontend previously needed
// VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY baked in at Docker build time,
// which that UI has no field for. Instead, serve them as a small runtime
// script the index.html loads before the app bundle, read from ordinary
// runtime env vars, same as every other secret in this app. The anon key
// is safe to expose to the browser by design (Supabase RLS is the actual
// gate), this is standard practice, not a leak.
app.get("/env.js", (_req, res) => {
  res.type("application/javascript").send(
    `window.__ENV__ = ${JSON.stringify({
      SUPABASE_URL: env.supabaseUrl(),
      SUPABASE_ANON_KEY: env.supabaseAnonKey(),
    })};`,
  );
});

// Serve the built frontend (see Dockerfile: web/dist is copied to
// STATIC_DIR) so the whole app is a single Fly.io service.
const staticDir = process.env.STATIC_DIR ?? path.join(__dirname, "../../web/dist");
app.use(express.static(staticDir));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    next();
    return;
  }
  res.sendFile(path.join(staticDir, "index.html"));
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err instanceof Error ? err.message : "Internal error" });
});

const port = env.port();
app.listen(port, () => {
  console.log(`d.engage pre-sales assistant listening on :${port}`);
});
