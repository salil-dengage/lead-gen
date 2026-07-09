# lead-gen — Gulf Banking ICP (Claude + Apollo + Zoho)

Lead-generation working repo for the **Gulf + Egypt banking ICP** for d·engage, built by
orchestrating **Zoho CRM** (source of truth for accounts/leads/contacts) and **Apollo.io**
(prospecting + enrichment + sequencing).

## Scope
- **Geography:** GCC-6 (UAE, KSA, Kuwait, Qatar, Bahrain, Oman) + Egypt
- **Accounts:** authoritative licensed-bank universe (108 banks), reconciled against Zoho
- **Personas (tiered ICP):**
  - **Tier 1 — Economic buyers:** CMO / Head of Marketing · CDO / Head of Digital & Digital Banking · Chief Customer Officer / Head of CX · Head of CRM / CVM / Loyalty / Retention · Head of Retail/Consumer Banking · Head of Segments · Head of Cards
  - **Tier 2 — Champions:** Digital/Performance Marketing · MarTech / Marketing Automation / Campaign Mgmt · Customer Analytics / Data / BI · Personalization / Engagement / Journeys · Digital Channels / Mobile & Online Banking · Contact Center / Customer Care
  - **Tier 3 — Integration influencers:** CIO / CTO / Head of IT / Enterprise Architecture / Digital Platforms / Data Engineering
  - **Excluded (never ICP):** Wholesale/Corporate-only, Audit, Risk, Credit, Compliance, HR, Legal, Treasury, Procurement, Branch ops, Tellers

## Data files — `data/gulf-banking-icp/`
| File | What it is |
|------|------------|
| `Gulf_Egypt_Bank_Universe_Status.csv` | The complete 108-bank account universe (GCC+Egypt) with Zoho status: in-Zoho / created / flagged. Authoritative account layer. |
| `Gulf_Banks_138_Zoho_Match.csv` | Reconciliation of the original Apollo "Gulf - Retail Banks" list (138 rows → 116 unique orgs) against Zoho: already-present / created / skipped (regulators, defunct, non-bank). |
| `Gulf_Banks_Engagement_DMs_649.csv` | Candidate decision-maker set (pre-enrichment) with persona bucket, first name, title, bank, and has-email flag. Superseded by the tiered-ICP re-sweep in progress. |

## Status
- ✅ Account layer complete — 108-bank universe reconciled; missing banks created in Zoho.
- ▶️ Persona sourcing to the tiered ICP (search only; enrichment gated on approval).

## Conventions
- All generated deliverables live **only** in this repo (`data/…`) and in the Google Drive
  folder **"Claude + Apollo + Zoho"**.
- Zoho remains the system of record; Apollo mirrors accounts/contacts and runs sequencing.
