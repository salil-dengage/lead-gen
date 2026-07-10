# lead-gen — Gulf Banking ICP (Claude + Apollo + Zoho)

Lead-generation working repo for the **Gulf + Egypt banking ICP** for d·engage, built by
orchestrating **Zoho CRM** (source of truth for accounts/leads/contacts) and **Apollo.io**
(prospecting + enrichment + sequencing).

## Scope
- **Geography:** GCC-6 (UAE, KSA, Kuwait, Qatar, Bahrain, Oman) + Egypt
- **Accounts:** authoritative licensed-bank universe (108 banks), reconciled against Zoho
- **Personas:** strict **business-buyer** set, capped at **10 per account**

## Strict persona definition
A person qualifies only if the title is a genuine decision-maker (Chief / Group Head / Head of /
Director / VP / GM and above) in one of these buyer families, and trips zero exclusion terms:

**Included (buyer families)**
- Marketing / Brand (CMO, Head of Marketing, Brand, Marketing & Corporate Communications)
- Digital / Digital Banking (CDO, Head of Digital, Digital Transformation, Digital Banking)
- Digital Marketing / Growth · MarTech / Campaign Management
- Digital Channels / Products (mobile & online banking, e-channels, digital wallet)
- Customer Experience (CCO, Chief Experience Officer, Head of CX)
- CRM · Loyalty / CVM / Retention · Personalization / Customer Engagement
- Cards / Payments (marketing side only)

**Excluded (never ICP)**
- Sales / business development / relationship management
- Customer service / care / contact-centre / complaints
- Affluent / wealth / private / priority / premium segments
- SME / corporate / wholesale / institutional / transaction banking, treasury, credit, lending
- All technology / IT / infrastructure / security / data-engineering / QA
- Audit, risk, compliance, HR, finance, procurement, operations, PMO
- Junior / assistant / analyst / specialist / coordinator roles

## Data files — `data/gulf-banking-icp/`
| File | What it is |
|------|------------|
| `Gulf_Egypt_Bank_Universe_Status.csv` | The complete 108-bank account universe (GCC+Egypt) with Zoho status: in-Zoho / created / flagged. Authoritative account layer. |
| `Gulf_Banks_ICP_Personas_Verified.csv` | The verified persona set: 346 personas across 99/108 banks, max 10 per account, 0 duplicates. Columns: Account, Country, Persona_Role, First_Name, Title, Has_Email, Seniority_Note. Last names are masked pre-enrichment. |
| `PERSONA_COVERAGE.md` | Coverage report: personas per country and per bank, role distribution, and the 9 banks with no persona (with evidence-based reasons). |

## Status
- ✅ Account layer complete — 108-bank universe reconciled; missing banks created in Zoho.
- ✅ Persona sourcing complete — 346 verified business-buyer personas across 99/108 banks (search only; masked).
- ⏸️ Enrichment **gated** — email/phone enrichment (Apollo lead credits) and Zoho/Apollo write-back
  run only after this persona file is approved.

## Conventions
- All generated deliverables live **only** in this repo (`data/…`) and in the Google Drive
  folder **"Claude + Apollo + Zoho"**.
- Zoho remains the system of record; Apollo mirrors accounts/contacts and runs sequencing.
