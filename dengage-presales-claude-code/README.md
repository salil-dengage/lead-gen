# D·engage Pre-Sales AI Assistant: Claude Code Repository

This repository gives Claude Code the same operating context as the D·engage pre-sales assistant in
Claude chat: the role, the tone rules, the verified constants, the case-study metrics, and the full
knowledge base. Point Claude Code at this repo and it will produce RFP responses, decks, security
answers, proposals, and prospecting content in the same voice, grounded in the same sources.

## How Claude Code uses this repo

Claude Code reads `CLAUDE.md` automatically at session start. That file is the brain: role, tone,
non-negotiable facts, output types, and a search-first workflow. Everything else in the repo is the
source material `CLAUDE.md` tells Claude to search before answering.

Start a session from the repo root:

```
cd dengage-presales-claude-code
claude
```

Then ask, for example:
- "Draft an RFP response to the attached banking questionnaire."
- "Write a GCC retail cold outreach email under 100 words."
- "Build a security questionnaire answer on encryption and access control."

Claude Code will grep the knowledge base and infosec folders, then answer in the D·engage voice.

## Contents

```
CLAUDE.md                 Master operating instructions (read first)
README.md                 This file
knowledge-base/           14 core knowledge files (product, RFP, case studies, security, infra, use cases, templates)
infosec/                  29 ISMS policies and procedures (source for all security answers)
templates/                Place brand PPTX and DOCX templates here (not included, see below)
```

## What you must add before deck and Word generation works

The brand templates are binary files and are not bundled here. Add them to `templates/`:
- `templates/Dengage_Slides_Theme.pptx` (source PPTX theme)
- `templates/Dengage_Doc_Template.docx` (source DOCX template)
- D·engage logo files

The layout specs describing these templates are already in
`knowledge-base/09_PRESENTATION_TEMPLATE_REFERENCE.md` and
`knowledge-base/10_DOCX_TEMPLATE_REFERENCE.md`, so Claude Code knows the structure even before the
binaries are added. The unpack, modify, repack workflow needs the actual binaries.

## Important: what was corrected and what was left out

**Corrected.** The Claude-chat project ran a set of verified constants that override older, incorrect
text found in some knowledge files and in the original custom-instruction block. These corrections
are baked into Section 2 of `CLAUDE.md` and must not be reverted:
- Uptime is 99.9%, never 99.999%.
- Wizz Air is not a customer and must never be cited as a reference.
- No São Paulo or Brazil office.
- 353% uplift stays attributed to an unnamed enterprise client.
- Data centers are Ohio, Frankfurt, Istanbul, Moscow, and GCP Dammam.
- Identity resolution is deterministic only.

**Left out on purpose.** The chat project also carried transient operational state that does not help
generate prospecting content and should not sit in a git repo: outreach campaign IDs, CRM record
counts, RAG deployment configuration, and API-key setup steps. These were excluded. If you want any
of that captured for a different tool, keep it in a separate private location, not in this
customer-facing knowledge repo.

## Maintenance

When a fact changes, update `CLAUDE.md` Section 2 (verified constants) or Section 4 (case-study
metrics) first, since those override the knowledge files. Then update the underlying knowledge file
if needed. Keep the two in sync.

## Standing rule reminder

All generated deliverables use no em dashes or en dashes, uptime 99.9% only, and honest gap flags.
See `CLAUDE.md` Sections 3 and 6.
