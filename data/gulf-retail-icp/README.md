# Gulf Retail / eCommerce ICP (KSA + Kuwait + Qatar)

Verified account universe for the **eCommerce and Retail ICP** in **Saudi Arabia, Kuwait, and Qatar
only**, built by orchestrating **Apollo.io** (discovery + firmographics), **Google/Serper** (gap-hunt,
verification, and social/marketing-function checks), and **Apify** (LinkedIn/Instagram scale
verification), reconciled against **Zoho CRM** (system of record). Mirrors the method used for the
Gulf banking ICP.

## Current numbers (2026-07-24)

| Tag | Count |
|---|---|
| **Yes** (qualified) | **297** |
| No (excluded) | 863 |
| Held (needs manual review) | 105 |
| **Total universe** | **1,265** |

The full, current, per-account list — name, country, domain, category, tag, reason, Zoho match info —
is in **`Gulf_Retail_ICP_Final_Yes_No_Held.csv`**, sorted Yes → Held → No. That CSV is the deliverable;
everything else in this folder is either the live master database it's generated from or historical
working material.

## Locked ICP definition

The full rulebook — 8 gates applied in order, worked examples, and a complete changelog documenting
every correction made and why — lives in **`ICP_DEFINITION_LOCKED.md`**. Read that file before adding,
re-verifying, or re-classifying any account; it is the single source of truth for what qualifies.

In brief, a company qualifies only if ALL hold:
- **Geography (hard):** HQ is in the specific country (KSA, Kuwait, or Qatar). HQ anywhere else in the
  Gulf disqualifies it.
- **Category:** consumer retail across fashion/beauty/grocery/electronics/home/general merchandise etc.
  B2B-only distribution/wholesale/manufacturing is excluded unless it also runs a substantial, dedicated
  consumer retail arm of its own.
- **Digital bar:** a live, verified, transactional D2C channel (online store or app).
- **Size:** ~100+ employees (Tiered A = 500+, B = 100-499), or a confirmed 50,000+ download app.
- **Duplicate-consolidation:** conglomerates get one consolidated account, not one per brand; a mixed
  conglomerate's non-retail divisions don't disqualify a genuinely substantial retail subsidiary.
- **CRM/Marketing-function + digital-scale filter (Gate 8):** must show real evidence of a CRM/Digital/
  Marketing function AND a domain-verified LinkedIn page with 50+ employees or an Instagram page with
  50,000+ followers.

## Method + sources

- **Apollo discovery:** Organization Search filtered by HQ location (per country), NAICS retail-trade,
  and employee bands. Already-synced accounts carry their Zoho Account ID.
- **Google/Serper:** gap-hunt for in-country retailers Apollo missed; HQ/DTC/category verification via
  live site fetch; marketing-function and social-handle discovery for Gate 8.
- **Apify:** LinkedIn company data (employee counts) and Instagram profile data (follower counts) for
  Gate 8, always domain-verified against the account's own website before trusting a match.
- **Zoho:** system of record for existing accounts; country axis is `CRM_Country`, dedup surface is
  domain + fuzzy name match.

## Files

| Path | What it is |
|---|---|
| `Gulf_Retail_ICP_Final_Yes_No_Held.csv` | **The final deliverable.** Every account, Yes/No/Held, with reason and Zoho match info. |
| `ICP_DEFINITION_LOCKED.md` | The rulebook (8 gates) and full changelog of every correction made this project. |
| `rollout/master_final_rows.json` | The live master database the CSV is generated from. Edit this, then rebuild the CSV — never edit the CSV directly. |
| `rollout/yes_duplicate_merge_log.json` | Log of duplicate accounts merged out of the Yes list. |
| `rollout/adversarial_consolidation_report.json` | Log of the adversarial re-check of never-cross-verified Yes flips. |
| `rollout/crm_scale_filter_evidence_log.json` | Per-account LinkedIn/Instagram/marketing-function evidence behind every Gate 8 call. |
| `rollout/no_held_pool_check_log.json` | Log of the No/Held pool duplicate-detection and NAICS-only-stub reverification pass. |
| `old/` | Historical research and intermediate working data (discovery batches, raw scrapes, audit batch files, one-off scripts). Not needed to understand or extend the current list, kept for traceability. |

## Status

- [x] ICP locked (8 gates, including the CRM/Marketing-function + digital-scale filter).
- [x] Account-universe discovery (Apollo NAICS + Google gap-hunt) complete for all 3 countries.
- [x] Full multi-pass web verification of the Yes list (HQ-in-country, DTC store/app, category,
      exclusions, size, duplicates, adversarial re-check, Gate 8 scale filter).
- [x] Full audit of the excluded (No/Held) pool, including a dedicated NAICS-only-stub reverification
      pass and duplicate-detection pass mirroring the Yes-list dedup.
- [x] Zoho reconciliation groundwork (existing-account matching by domain/fuzzy-name).
- [ ] **GATED:** write to Zoho (enrich existing / create new / tag disqualified) — pending approval.
