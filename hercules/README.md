# d.engage Sales & Pre-Sales AI Assistant (Hercules)

This folder contains the full source code for the d.engage AI Assistant built on [Hercules](https://hercules.app).

## Stack
- **Frontend**: React 19 + Vite + Tailwind CSS 4 + shadcn/ui
- **Backend**: Convex (database + serverless functions)
- **AI**: Claude Haiku 4.5 via Anthropic SDK
- **Auth**: Hercules Auth (OIDC)

## Architecture
- `convex/schema.ts` — Database tables: `users`, `kb_chunks`, `kb_ingestion`, `conversations`, `messages`
- `convex/kb_ingest.ts` — Fetches KB markdown files from GitHub (private repo), chunks them with sentence-aware splitting, stores in Convex
- `convex/kb_search.ts` — Full-text search over KB chunks using Convex search index
- `convex/chat.ts` — RAG pipeline: retrieves chunks, builds prompt, calls Claude Haiku
- `convex/web_search.ts` — Optional Serper.dev web search for external proof points
- `convex/conversations.ts` — Conversation and message CRUD
- `src/pages/chat/` — Main chat UI

## Required Secrets (set in Hercules > Advanced > Secrets)
| Key | Description |
|-----|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude Haiku |
| `GITHUB_TOKEN` | GitHub fine-grained PAT with Contents:read on `salil-dengage/lead-gen` |
| `SERPER_API_KEY` | (Optional) Serper.dev key for web search proof points |

## KB Files Indexed
Located in `dengage-presales-claude-code/knowledge-base/` in the `salil-dengage/lead-gen` repo:
- `01_PRODUCT_SPECS.md`
- `02_RFP_KNOWLEDGE_BASE.md`
- `03_CASE_STUDIES.md`
- `04_SECURITY_COMPLIANCE.md`
- `05_TECHNICAL_INFRA.md`
- `06_INDUSTRY_COMMERCIAL.md`
- `07_USE_CASES.md`
- `08_FULL_RFP_RESPONSES.md`
- `09_PRESENTATION_TEMPLATE_REFERENCE.md`
- `10_DOCX_TEMPLATE_REFERENCE.md`
- `D_engage_Onprem_CDMP_Onboarding.md`
- `D_engage_Opsiyonel_Profesyonel_Hizmetler_2023.md`
