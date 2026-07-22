# Gulf Retail / eCommerce ICP (KSA + Kuwait + Qatar)

Account-universe build for the **eCommerce and Retail ICP** in **Saudi Arabia, Kuwait, and Qatar only**,
built by orchestrating **Apollo.io** (discovery + firmographics) and **Google** (gap-hunt + verification),
reconciled against **Zoho CRM** (system of record). Mirrors the method used for the Gulf banking ICP.

## Locked ICP definition
A company qualifies only if ALL hold:
- **Geography (hard):** headquarters is **in the specific country** (KSA, Kuwait, or Qatar). HQ anywhere
  else in the Gulf disqualifies it. A UAE-HQ'd group operating in-country does NOT qualify (e.g. Majid Al
  Futtaim, Landmark, Chalhoub, Apparel Group). Genuinely separate in-country subsidiary entities are HELD
  for review, not auto-included.
- **Category:** consumer retail across fashion/apparel/footwear/luxury/department stores; beauty/cosmetics/
  personal care/pharmacy/health; grocery/hypermarket/convenience/F&B/QSR; electronics/appliances/home/
  furniture/general merchandise (incl. jewelry, sporting goods, toys).
- **Digital bar:** a live direct-to-consumer digital channel (online store or mobile app). Verified, not assumed.
- **Size:** ~100+ employees. Tiered **A = 500+**, **B = 100-499**.
- **Exclusions:** every mega ($1B+) marketplace AND every grocery / q-commerce / delivery aggregator,
  regardless of size (noon, Amazon.sa, Talabat, HungerStation, Jahez, Mrsool, Careem, ToYou, Nana, Snoonu, etc.).

## Method + sources
- **Apollo discovery:** Organization Search filtered by HQ location (per country), NAICS retail-trade
  (`44`/`45`), and employee bands covering 100+. Full firmographics per hit; already-synced accounts carry
  their Zoho Account ID (`hubspot_id` -> `crm_record_url`), giving a built-in dedup hint.
- **Google:** gap-hunt for in-country retailers Apollo misses, and HQ/DTC verification (Apollo's "location"
  reflects an office, not strictly global HQ, so HQ is web-verified per candidate).
- **Zoho:** country axis is `CRM_Country`; enrichment lands in `Company_main_industry` (`Retail/Ecommerce`),
  `Company_sub_industry`, `Company_number_of_employees`, `Company_website`, `Company_Linkedin_URL`, `Phone`,
  `Company_city`, plus `Account_Notes`. Proposed tag: `Apollo_Retail_Gulf` (+ tier tag), mirroring `Apollo_Gulf_Banking`.

## Apollo credit ledger (account phase)
Approved budget: up to ~120 credits. Spent so far: **~13** (1 calibration + 3 sizing probes + 9 NAICS pages).

## Current numbers
- **Candidate master:** 725 unique companies (Saudi Arabia 458, Kuwait 141, Qatar 126).
- Already in Apollo workspace: 192; carrying a live Zoho Account ID: 99.
- Existing Zoho accounts in the 3 countries (all industries, dedup surface): 200+ sampled so far; firmographics mostly empty, and internal duplicates already present (e.g. two "Panda" records).

### Pre-classification funnel (deterministic, NAICS/SIC + exclusion domains)
| Disposition | Count |
|---|---|
| LIKELY_IN | 446 |
| AMBIGUOUS | 94 |
| LIKELY_OUT (auto/wholesale/mfg/fuel/logistics) | 181 |
| EXCLUDED (marketplace/delivery) | 4 |

## Files
| File | What it is |
|---|---|
| `candidates_master.tsv` | 725 unique Apollo candidates, deduped (domain then name), Zoho ID where known. |
| `candidates_classified.tsv` | master + `prelim_category` + `prelim_disposition`. |
| `classify.awk` | the deterministic pre-classifier (reproducible). |
| `raw/candidates_naics_all.tsv` | pre-dedupe extract from the 9 Apollo NAICS pages. |

Raw Apollo JSON dumps are transient (session tool-results), not committed; the parsed TSVs capture the fields.

## Status
- [x] ICP locked; account-universe discovery (Apollo NAICS) complete for all 3 countries.
- [x] Deterministic pre-classification + exclusion pass.
- [ ] **Multi-agent web verification** (HQ-in-country, DTC store/app, category, exclusions, size) -> IN / OUT / HELD.
- [ ] Google gap-discovery for retailers Apollo missed.
- [ ] Enrichment of survivors for exact employees/revenue -> Tier A/B.
- [ ] Zoho reconciliation (dedupe, enrich-or-create plan).
- [ ] **GATED:** write to Zoho (enrich existing / create new) only after the finalized list is approved.
