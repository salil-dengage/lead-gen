# d.engage Pre-Sales Assistant

Standalone replacement for the Hercules/Convex prototype (`hercules/` on
`main`). Same purpose (RAG chat over the d.engage knowledge base for the
sales/pre-sales team), independent stack: **Fly.io** (hosting, single
Express app serving both the API and the built React frontend) + **Supabase**
(Postgres + Auth). No dependency on the Hercules platform.

This rebuild also implements the fixes from the Hercules app review (see
`findings-to-fix.md` for the full list). In short:

- `infosec/` is now ingested (dynamically listed from GitHub, not a hardcoded filename array), not just `knowledge-base/`.
- A verified-constants block (CLAUDE.md Section 2) is injected into every system prompt and explicitly outranks the KB.
- Markdown tables get dedicated chunking so a connector/certification list can't be split mid-row and filled in by the model.
- Retrieval has a relevance floor and industry/geography boosting.
- Only sources the model actually cited (via `[S#]` markers) are shown, not every retrieved chunk.
- Inline `[VERIFY]` / `[REVIEW NEEDED]` / `[ROADMAP]` / `[NOT SUPPORTED]` markers render as visible badges.
- Commercial and security topics get a structured `routed_to` flag on the message.
- Conversations are keyed by the authenticated Supabase user, not a client-generated token, and every route requires a verified JWT.
- The web-search query is fixed (the old one wasn't actually site-restricted).
- RFP mode uses Sonnet; chat mode uses Haiku.
- A minimal admin feedback view surfaces down-voted answers instead of leaving them a write-only log.

## Architecture

```
presales-assistant/
  server/           Express API (TypeScript), talks to Supabase + Anthropic + GitHub + Serper
  web/               React 18 + Vite + Tailwind frontend
  supabase/migrations/0001_init.sql   Full schema + search RPC
  Dockerfile         Builds web, builds server, serves both from one Fly app
  fly.toml
```

The server serves `/api/*` and also serves the built frontend as static
files, so it's one Fly.io service, not two.

## 1. Set up Supabase

1. Create a project at https://supabase.com.
2. In the SQL editor, run `supabase/migrations/0001_init.sql`.
3. Settings > API: copy the **Project URL**, the **anon public key**, and the **service_role key**.
4. Authentication > Providers: Email is enabled by default (magic link). Configure the site URL / redirect URLs to match your Fly.io app's domain once deployed.

## 2. Set up GitHub access

Create a fine-grained personal access token with **Contents: Read-only** on
`salil-dengage/lead-gen`. Used only for KB ingestion.

## 3. Local development

```bash
# server
cd server
cp .env.example .env   # fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
                        # ANTHROPIC_API_KEY, GITHUB_TOKEN, ADMIN_EMAILS
npm install
npm run dev             # listens on :8080

# web (separate terminal)
cd web
echo "VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co" > .env
echo "VITE_SUPABASE_ANON_KEY=your-anon-key" >> .env
npm install
npm run dev              # Vite dev server, proxies /api to :8080
```

Sign in with a d.engage email (magic link), then click **Index KB** in the
header (requires your email to be in `ADMIN_EMAILS`). Ingestion pulls both
`knowledge-base/` and `infosec/` from GitHub, this takes a minute the first
time since it's ~40 files.

## 4. Deploy to Fly.io

```bash
fly launch --no-deploy --copy-config --name dengage-presales-assistant
fly secrets set \
  SUPABASE_URL=https://YOUR_PROJECT.supabase.co \
  SUPABASE_SERVICE_ROLE_KEY=... \
  ANTHROPIC_API_KEY=sk-ant-... \
  GITHUB_TOKEN=ghp_... \
  ADMIN_EMAILS=rfp@dengage.com,salil@dengage.com \
  SERPER_API_KEY=...   # optional

fly deploy \
  --build-arg VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co \
  --build-arg VITE_SUPABASE_ANON_KEY=your-anon-key
```

`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are build-time (baked into the
frontend bundle at build), everything else is a runtime secret. After the
first deploy, sign in and click **Index KB** once to populate the knowledge
base (there's no cron/webhook yet, see below).

## Known gaps to close next

These didn't make this pass and are worth doing before this is the
system of record for RFP answers:

- **No scheduled re-ingestion.** Indexing is still a manual button click. Add a GitHub webhook (on push to `knowledge-base/**` or `infosec/**`) hitting a signed `/api/ingest` endpoint, or a Fly.io scheduled machine.
- **No semantic search.** `search_kb_chunks` is Postgres full-text search (BM25-ish), not embeddings. Fine for exact terminology matches, weaker for paraphrased questions. Consider adding `pgvector` + an embeddings column if recall becomes an issue.
- **Admin gating is email-allowlist only.** Fine for a small team, but there's no proper roles table if this grows.
- **`[S#]` citation compliance depends on the model following the prompt.** It's a strong instruction (and Sonnet for RFP mode helps), but nothing enforces a minimum citation density. Worth spot-checking real answers periodically against the admin feedback view.
