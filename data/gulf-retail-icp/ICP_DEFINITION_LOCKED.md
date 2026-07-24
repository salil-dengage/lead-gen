# Gulf Retail/eCommerce ICP — CURRENT (superseding the 2026-07-23 morning version)

Scope: eCommerce/Retail accounts whose operating entity is genuinely headquartered in **Saudi
Arabia, Kuwait, or Qatar only**. This is the version actually applied to produce the 1,017-account
verdict set in `rollout_baseline_final_gates.tsv` (328 IN / 678 OUT). It replaces the same-day
morning version below in two places (traffic floor, app path) where live verification proved the
original rule unworkable or the user explicitly overrode it — see Changelog at the bottom.

## The 7 gates (apply in order; first failure disqualifies)

### Gate 1 — Geography (hard)
The **global HQ of the actual operating entity** running the storefront — not just the brand, not
just an office — must be in the specific country being evaluated. HQ anywhere else, including
elsewhere in the Gulf (UAE especially), fails, even with real local operations, real local stores,
or local ownership of a foreign-HQ'd operator.
- **Passes**: a local franchise/conglomerate operator that is itself genuinely HQ'd in-country
  (e.g. Cenomi Retail, Jarir Group/Imtiaz Al Arabia, Starco Holding — all Saudi/Kuwait-HQ'd
  companies that happen to run international franchise brands).
- **Fails**: the same brand run directly by its foreign parent with just a local ccTLD storefront
  (desertcart.com.sa — Dubai HQ; fnp.sa/Ferns N Petals — Delhi HQ; Nesto — Sharjah/UAE HQ;
  Spinneys — Dubai HQ; ABYAT, Alghanim-affiliated brands evaluated under the Saudi row — Kuwait HQ).
- Apollo's "location" field reflects an office, not necessarily global HQ — never trust it alone;
  confirm HQ from the company's own materials or a web search when it's not obvious.
- Zoho's `CRM_Country` field has also been found wrong on individual records (e.g. an Egyptian
  marketplace mistagged Saudi Arabia) — treat it as a starting hint, not proof, when country is
  load-bearing for a verdict.

### Gate 2 — Category
**Approved**: fashion / apparel / footwear / luxury / department stores; beauty / cosmetics /
personal-care / pharmacy / health retail (including opticians and hearing-care retail); grocery /
hypermarket / convenience / F&B / QSR; electronics / appliances / home / furniture / general
merchandise (incl. toys, books/stationery, pet supplies).

**Hard-excluded regardless of how real or well-built the operation is**:
- Wholesale / B2B trading / distribution **as the primary or only consumer-facing identity** — a
  business whose own storefront/domain is genuinely B2B (trade pricing, corporate-account language,
  "no product catalog, pricing or cart" for individuals) with no substantial retail arm of its own.
  **This does NOT mean any company that also happens to hold distribution/wholesale/manufacturing
  rights automatically fails.** Being "the sole distributor of X" or "a manufacturer" is a fact
  about one line of the business, not a verdict by itself — check whether the company **also** runs
  a genuinely substantial, dedicated consumer retail operation (its own stores and/or its own
  branded e-commerce, evaluated the same way any other retailer would be: Gates 3-5) alongside the
  B2B/manufacturing line. If it does, the account passes on the retail arm's own merits — the
  B2B/manufacturing side is simply a separate fact about the company, exactly like Gate 6 already
  treats a mixed conglomerate's non-retail divisions as not disqualifying the retail-qualifying
  subsidiary.
  - **Confirmed PASS on this exact pattern** (large retail footprint that happens to coexist with
    wholesale/manufacturing/distribution): Lazurde (world's 4th-largest gold manufacturer, ~80% of
    revenue wholesale, but ALSO 70 retail stores + 4 branded consumer e-commerce lines); Union
    Trading Co. (distributes 100+ brands, but ALSO Kuwait's own 17-outlet department-store chain
    since 1949); Al Andalus Trading Establishment (sole Samsung/Hisense distributor in Kuwait, but
    ALSO 7 showrooms including its flagship "Centro" super-store plus live e-commerce); Petzone
    (runs a ~1,000-account wholesale network, but ALSO 14 stores + 30 outlets, the largest pet chain
    in the Middle East); Aljazierah Home Appliances (9 factories, but ALSO 31 showrooms across the
    Kingdom plus a dedicated 64-person e-commerce team); Seventh Dimension/ASTORE (distribution plus
    business-solutions arm, but ALSO 9 dedicated ASTORE retail locations); Fakeeh Vision ("largest
    wholesaler and retailer chain in KSA" — opticians is an approved category and the retail chain
    itself is real and multi-location); Go Fresh (self-describes serving "retail, B2B, and
    e-commerce," but its D2C grocery-delivery app/site is itself a real, substantial consumer
    business, not a token add-on); Algarawi Group (exclusive brand-agent/distribution model for
    Tommy Hilfiger etc., but ALSO four decades of dominant, well-documented retail identity
    including its own flagship "Algarawi Gallery" retail destination).
  - **Confirmed FAIL, correctly excluded even under this corrected reading**: Alireza Holding
    (explicitly a brand-agency/import business — "no product catalog, pricing or cart," no retail
    arm of its own to evaluate); Saudi Radwa Food Company (an industrial-scale poultry producer,
    ~85% of Saudi market reached via *other* retailers' shelves plus food-service, with only a minor
    D2C home-delivery add-on — no dedicated Radwa-branded store network of its own); any case where
    the B2B and B2C activity are so intertwined on the *same* storefront/brand that a genuinely
    separate, dedicated retail operation can't be identified (evaluate case-by-case; default
    conservative per Gate 7 if genuinely unclear).
  - **The test, in one line**: does this company run its OWN dedicated, substantial consumer retail
    operation (stores and/or branded e-commerce) that you could evaluate as a standalone retailer if
    the B2B/manufacturing side didn't exist? If yes, pass on that basis. If the only "retail" is a
    thin storefront bolted onto an otherwise B2B/industrial business, fail.
- Manufacturing / industrial / factories.
- Construction materials / hardware / contracting (sanitary ware, ceramics, tiles, cement, timber,
  electrical fittings **for construction**, kitchen/cabinetry sold via project/installation model).
- Automotive (dealers, distributors, parts, tires, batteries, leasing/rental) and marine/watercraft
  dealerships (boats, jetskis — same big-ticket dealership pattern).
- Healthcare / clinics / hospitals / telemedicine platforms (retail **pharmacy chains** are the one
  explicit exception and pass).
- Real estate / malls / landlords / facility management.
- B2B services: agencies (marketing/web/tech), interior-design/fit-out firms, legal services,
  logistics/freight/3PL, financial/capital services, corporate wellness/EAP SaaS platforms.
- Hospitality / travel / car rental.
- Fuel stations.
- Salon/spa **services** businesses (nails, hair, facials) even when a small aftercare-product
  shop is attached — the core business is a service, not product retail.
- Marketplace/aggregator platforms as a general rule (see Gate 5b for the one carve-out).

### Gate 3 — Narrow-category / low-repeat-purchase
Even inside an approved category, a business selling **one narrow product line with inherently low
repeat-purchase frequency** fails — it can't sustain the ongoing engagement a CDP needs.
- **Confirmed fails**: lighting/electrical fixtures only, flooring/carpet only, tires/batteries
  only, mattresses only (long replacement cycle regardless of operating history/e-commerce quality).
- **Passes**: fashion (multi-item, seasonal), beauty/perfume (consumable, repeat), grocery/F&B
  (highest frequency), broad electronics/appliances, footwear (explicitly approved on its own),
  jewelry (broad enough — rings/earrings/necklaces/bracelets), fabric/textile retail for
  garment-making (a genuine, high-frequency consumer practice in this region), bags/luggage/travel
  accessories (broad sub-category spread).

### Gate 4 — Real digital channel
Requires a genuinely live, currently-operating transactional online store (confirmed cart/checkout)
**or** a real consumer mobile app (see Gate 5b).
- **Fails**: brochure/catalog sites with no cart, "coming soon"/under-construction placeholders,
  a live platform populated only with demo/placeholder data, corporate holding-company pages with
  no storefront of their own, sites showing leftover template text or fake contact info
  ("info@yourwebsite.com", "000-000-0000") signaling an unfinished/abandoned build.
- **Dead or blocked ≠ automatic fail.** If a fetch returns 403/blocked/dead/hijacked, do ONE
  targeted web search before failing the gate: has the business moved to a new domain (confirmed
  cases this session: Wawan Protein, Manuel Market), or is the domain simply hijacked/repurposed
  spam (confirmed cases: ADECO Group, mannaiautos.com, magaza.me, primemarkets.com.sa,
  utradeksa.com — all now show unrelated gambling/VPN/resort content)? If a live current site is
  found, re-gate against that. If genuinely no live site is findable anywhere, then fail the gate.

### Gate 5 — Scale
Passes via **either** path:
- **(a) Substantiality**: the live site shows a real, non-trivial catalog (**~50+ SKUs as a rough
  floor**) with evidence of real ongoing operation (real pricing, real checkout, shipping/returns
  policy). **No hard traffic/visitor number is required or checked** — Cloudflare Radar and similar
  free-tier tools were tested and confirmed to have zero ranking resolution below roughly the
  top-200,000 global domains, which is well above where this segment's real, legitimate mid-size
  retailers sit, so a traffic floor was dropped as unworkable rather than kept as an unenforceable
  rule.
- **(b) App-download rescue**: if evidence points to a popular consumer mobile app (marketplace,
  delivery, voucher, or similar digital-service business), confirm via web search/app-store
  listing. **50,000+ downloads/installs confirmed → the account qualifies outright**, overriding
  category and narrow-repeat-purchase gates entirely (this is a genuine alternate qualifying path,
  not just a bonus signal — confirmed cases: Rasseed, ToYou, Abar). Below 50k does not rescue an
  otherwise-failing account (confirmed case: Al Sadhan's branded app has only ~10K downloads, not
  enough to rescue its dead website).
  - **This explicitly includes marketplace/delivery aggregators, overriding the Exclusions clause
    below for confirmed 50k+ cases (user-directed 2026-07-24).** The Exclusions clause's "regardless
    of size" language and this override appear to conflict on paper; when both apply to the same
    account, Gate 5b wins. Confirmed cases actually holding Yes on this basis: **ToYou/ToYouKSA**
    (60+ cities, 27,000+ merchant partners), **HungerStation** (20M+ downloads, largest Saudi
    delivery app), **Snoonu** (Qatar's flagship super-app, 1M+ installs), and **Nana** (a distinct,
    stronger case — vertically-integrated quick-commerce grocery retailer running its own dark-store
    inventory, not merely a third-party marketplace, so it does not need the override to qualify).
    Do not re-flag these as an exclusion violation in a future audit; this is resolved, not an
    oversight.

### Gate 6 — Duplicate-consolidation
Conglomerates operating many franchise storefronts get **one consolidated account**, not one per
brand (e.g., Cenomi Retail, not 30 separate brand-name domains). Rule of thumb applied throughout:
- A multi-brand conglomerate where **every division is itself retail-qualifying** passes at the
  parent level with real scale evidence (Jarir Group/Imtiaz, Starco Holding, United Retail Trading,
  Almadina Holding — the last one's only non-retail line, a small creative agency, doesn't change
  the call).
- A conglomerate that **mixes** retail divisions with hard-excluded ones (construction, real
  estate, automotive, logistics) has its **parent excluded**; a specific retail-qualifying
  subsidiary brand would need its own separate account/row to be evaluated on its own merits
  (confirmed pattern: Saleh Al Hamad Al Mana Co./Shalmana — its Harvey Nichols and Centra
  Supermarkets brands are not evaluated via the automotive-led parent; same logic applied to
  Transind Holding, Wathnan Holding, Simex Group, Grand Mart Group).
- Global-brand storefronts (Nike, Gap, DKNY, Bloomingdale's, Under Armour, Kate Spade, Steve
  Madden, Allbirds, Menbur, etc.) are not separate accounts — they're franchise-operated by an
  already-covered local group (typically Cenomi or Alshaya) and get folded in there.

### Gate 7 — Verification protocol
- Live curl fetch with a real browser User-Agent, `--compressed`, following redirects; read the
  **full** page, not a truncated prefix (some real content sits 200KB+ into a bloated CMS page).
- **Never classify on Apollo NAICS/category/name alone** — this produced two confirmed
  misclassifications early on (POWR: an account misread via a contradictory NAICS code;
  Primary Care Medical Co: a medical clinic misread as pharmacy retail from a bad code). Every
  account needs a semantic read of what it actually is and sells.
- Keyword-counting alone is not a verdict — real pages can score high on retail keywords purely
  from leftover CMS/plugin boilerplate (proven false-positive on an actual medical clinic).
  Read and understand the content.
- Where genuinely unconfirmable (blocked with zero real content, no independent corroboration
  findable, no domain on file and search turns up nothing solid), **default to OUT** rather than
  guess IN — consistent with the standing "no crap data" instruction. This is why several
  no-domain/near-empty accounts ended up OUT despite a plausible-sounding name or category.
- Prefer cheap deterministic methods (HTTP status, keyword-signal scoring) to auto-resolve
  unambiguous cases first; reserve manual reading and web search for genuine ambiguity — this is
  what made processing the full 1,017-account universe practical within budget.

### Gate 8 — CRM/Marketing function + digital scale (LinkedIn/Instagram), user-directed
Added 2026-07-24 in response to a direct user instruction to add two filters applied **together**
with judgement, not as a rigid checklist. Both signals are evaluated per account:
- **(a) CRM/Digital/Marketing function**: search for evidence of a real marketing, digital, CRM,
  e-commerce, or customer-experience function at the company (e.g. a LinkedIn people-search for
  relevant job titles tied to the company name). A company with **zero** such evidence, checked via
  both a targeted and a broadened search pass, fails this leg.
- **(b) Digital scale**: verify via a free API/search-based lookup (not Apollo credits — explicit
  user instruction) whether the company has an active **LinkedIn company page with 50+ employees**
  or an active **Instagram page with 50,000+ followers**. Only **one** of the two needs to clear its
  bar — this is an OR, not an AND, between LinkedIn and Instagram.
- **Combined rule**: an account must pass **both (a) and (b)** to qualify; failing either is
  disqualifying, consistent with the user's framing ("if the account doesn't have any CRM/Digital/
  Marketing functions... they will be irrelevant" AND "if the account doesn't have an active
  LinkedIn page... and active Instagram page... they are irrelevant").
- **Verification method matters — fuzzy name-search is not reliable enough to trust on its own.**
  Apify's `harvestapi/linkedin-company` actor supports two modes: a fuzzy `searches` (text query)
  mode that the actor's own schema documents as "can be inaccurate," and a precise `companies` mode
  that looks up an exact LinkedIn URL directly. The fuzzy mode **missed large, unmistakable, publicly
  known companies** (Panda Retail Company/Savola Group — 6,035 employees; The Sultan Center — 2,275
  employees; Ubuy Inc — 138 employees; Union Trading Co. — 212 employees) because a bulk text search
  over LinkedIn's own search page simply failed to surface the right result, not because the
  companies are small. The corrected method: (1) find the exact LinkedIn company URL via a targeted
  Google/Serper search (`site:linkedin.com/company "{name}"`), (2) look that exact URL up via the
  actor's precise `companies` mode, (3) **still require the returned record's own `website` field to
  domain-match the account's known domain** before trusting the employee count — the precise-URL
  search itself produced at least one clean false match (a company-name collision matched to an
  unrelated business) that the domain cross-check correctly caught and rejected. The same
  domain-verification discipline applies to Instagram: trust a handle pulled directly from the
  company's own site HTML automatically; for a handle found via search instead, only trust its
  follower count if the profile's own bio or external link corroborates the same domain/brand.
  Absence of a domain-verified match is treated as **unresolved**, not as proof of small size —
  routed to Held for manual review rather than silently downgraded to No.
- **The marketing-function search (leg a) has the same false-negative risk** — an overly narrow
  query (exact-phrase site-restricted search combined with a job-title OR-list in one clause) missed
  real, named marketing/creative staff at real companies (Matjar Panda, a furniture retailer) that a
  broadened two-query pass (drop the site: restriction; separate the company-name match from the
  role-keyword match) found immediately. Zero hits on a narrow query is not sufficient evidence of
  "no marketing function" without a second, broader pass.
- Net effect on the Yes list: of 408 accounts screened, **292 passed both legs, 104 confirmed-failed
  (moved to No), and 12 remain genuinely unresolved** on one leg despite two rounds of
  precision re-verification (moved to Held for manual review, not auto-excluded). See the
  2026-07-24 changelog entry below for the full breakdown and root-cause detail.

## Soft signals (do not gate inclusion/exclusion, but should affect tiering/prioritization — not
consistently re-applied during the recent re-verification pass, still valid as standing guidance)

- **Already-solved accounts** (existing CDP/martech: Insider, CleverTap, Braze, Klaviyo, Emarsys,
  WebEngage, Salesforce Marketing Cloud, etc.): deprioritize, don't exclude. Zoho carries tags for
  this from a prior effort (`Insider`, `CleverTap`, `Braze`, `Klaviyo`, `Emarsys`, `webengage`,
  `Salesforce Marketing Cl...`, plus a `Builtwith_ExportKlaviyo` import batch).
- **Omnichannel** (physical retail + e-commerce, same-country): ideal-fit profile, not a
  requirement.
- **Local-currency transacting** (SAR/KWD/QAR shown at checkout): a cheap proxy for genuine local
  operations, worth noting alongside the live-site check.

## Changelog vs. the 2026-07-23 morning "locked" version

- **2026-07-24, fourth round: 405 Leads tagged for manual mass-conversion; Zoho has no API-level
  Convert-Lead action.** This MCP server's Zoho toolset has no equivalent of Zoho's native "Convert
  Lead" button — only generic CRUD, which cannot atomically create a Contact + link an Account +
  close a Lead the way Zoho's own conversion flow does. Rather than hand-roll a create-Contact-then-
  delete-Lead approximation, the user asked for a tag-and-manual-mass-convert workflow instead:
  identify the correct leads, tag them, make the correct target Account visible on each one, and let
  the user mass-convert via Zoho's own UI. Built from the two prior scoping agents' confirmed-match
  output (446 + 7 = 453 leads with a `matched_account_id` pointing at a Yes account), minus 1 lead
  for Al-Dawaa (untouched per standing instruction) and minus 47 for ALshaya Group (pending user
  decision, see below) = 405 eligible. For the 58 leads matched to one of the 13 just-consolidated
  duplicate accounts, `matched_account_id`/`matched_account_name` were remapped to the canonical
  record before writing. Created a new tag `Gulf_Retail_ICP_Convert` (Leads module). **First write
  attempt used a `Lead_Notes` field that does not exist on this Zoho org's Leads module** — Zoho's
  API silently drops unrecognized keys rather than erroring, so all 405 calls returned `SUCCESS` with
  the tag correctly applied but the intended note text nowhere on the record. Caught by direct
  re-query (not trusting the SUCCESS response), root-caused via `getFields`, corrected to the real
  field (`Description`, which also has the useful property of auto-carrying into the Contact's own
  Description field on conversion), and re-sent. Independently verified by re-querying all 405 lead
  IDs directly (not sampled) after the fix: 405/405 confirmed with the correct tag and Description
  text. **Lesson**: never assume a custom-sounding field name exists on a standard Zoho module without
  checking `getFields` first — an unrecognized field key is silently accepted and dropped, not
  rejected, so the write response gives no signal that anything was wrong.
- **2026-07-24, third round: Leads/Contacts cleanup for Yes accounts surfaced 16 duplicate-Zoho-
  account cases; 13 resolved by consolidation, not merge.** Scoping every Yes account's Leads and
  Contacts (targeted per-domain/per-name COQL queries, not brute-force pagination) to convert
  eligible leads and re-link stray contacts turned up 16 Yes accounts split across two Zoho Account
  records each: a newer record (created/matched during this session's Yes rollout, holding the
  Qualify-Qualified status) and an older, separate record for the same real company (holding the
  actual historical Contacts, sometimes years of them) that the rollout never matched due to a name
  variant. The user explicitly rejected using Zoho's native account-merge tool and asked for "any
  other way" — resolved instead with the same non-destructive pattern already used for the 7
  Account-level dupes in Task #25: move the qualification data (Account_Progress, Account_Notes,
  and any enrichment field empty on the old record) onto the **old** record since it holds the real
  contact history, and leave a `[DUPLICATE ...]` pointer note on the **new** record instead of
  deleting or merging it. Applied to 13 of the 16: Panda Retail Company, eXtra, Zohoor, NICE ONE,
  Ahmed Abdulwahed Co., Al Majed Oud.co, Alyasra Fashion, L'azurde, ToYou, Nahdi Medical Co.,
  Hussein Bakry Gazzaz & Co, Imtiaz Al Arabia, Kenz. All 26 writes (13 old + 13 new) independently
  re-verified by direct re-query, not trusted from the write response alone (per the standing lesson
  below). `master_final_rows.json`'s `zoho_account_id` for these 13 companies was repointed from the
  now-redundant new record to the canonical old record. The other 3 of the 16 did NOT fit this
  pattern and were deliberately excluded: **Al Meera Group / ALMEERA CONSUMER GOODS COMPANY QSC**
  needed the *opposite* fix — the existing duplicate-flag note (written earlier in Task #25) already
  named the *new* record as canonical, the reverse of the general rule here; only the one orphaned
  contact (Raafat Abbas) was re-linked to the new record, no account-side note changed. **Al-Dawaa
  Medical Services Co.** is under a standing user instruction to not be touched at all, in any way,
  for the remainder of this cleanup. **ALshaya Group** is a genuine 5-way split (Shaya Turkey,
  M. H. Alshaya, Al Shaya Group, Victoria's Secret, The Keeper — 47 matching leads total) with no
  obvious single canonical record and is pending explicit user direction before any of its accounts,
  contacts, or leads are touched.
- **2026-07-24, second round: field-mapping bug + widespread No/Held write failures found and
  fixed via full independent audit.** After the first round of fixes above, the user asked a
  direct, skeptical question: are all No accounts really Disqualified, are Held accounts really
  tagged right, are Yes accounts really fully enriched? Rather than re-assert the earlier report,
  ran three independent full audits (every record checked, not sampled) against live Zoho, cross-
  referenced against the local `master_final_rows.json` ground truth. Result: **Yes pool was
  genuinely clean (297/297)**, but **No and Held were not**:
  (1) **Field-mapping bug, found first via a user screenshot**: all website enrichment had been
  written to a custom `Company_website` field, but the CRM's actual working list views display the
  standard `Website` field, which was never populated (some records also carried stale `"google.com"`
  junk from an old import). Confirmed by checking the banking project, which correctly used
  `Website`. Fixed by migrating all 826 accounts with a populated `Company_website` into `Website`,
  unconditionally overwriting whatever was there before. Verified: 826/826, zero failures.
  (2) **313 of 824 No accounts (38%) had never actually been written** despite being reported
  complete: `Account_Progress`/`Account_Notes` were left at whatever pre-existing CRM state the
  record had (old `Engage - *` stages, stray numeric junk in notes, or simply null) instead of
  `Qualify - Disqualified` + the ICP reasoning. The defect rate was not random — 70% of the 446
  oldest (pre-existing) record IDs were affected vs. 0% of the 378 newest (freshly-created) IDs,
  pointing to the *update*-batch write silently failing for pre-existing records while the
  *create*-batch write succeeded fully for new ones. 4 of these "defects" were actually the already-
  documented Yes/No shared-account conflicts above (correctly excluded, not re-broken). Fixed the
  remaining 309 by rebuilding the correct payload from `master_final_rows.json` and rewriting;
  verified twice (once by the fix agent, once independently by re-querying all 820 expected-
  Disqualified IDs directly) — 820/820 confirmed correct, zero exceptions.
  (3) **32 of 104 Held accounts had the same failure mode**: the `Apollo_Gulf_Retail_Held` tag was
  applied correctly to all 104 (that part of the original write worked), but `Account_Progress`/
  `Account_Notes` were never written for 32 of them. Fixed and re-verified: 32/32 corrected, 104/104
  tags confirmed still intact.
  **Lesson for any future bulk Zoho write in this project**: report success only after an
  independent full re-query against the live CRM, not from the write call's own "SUCCESS" response
  or a subagent's self-report — both of those confirmed the write was *accepted*, not that the
  *update* half of an update-or-create batch actually landed. A full post-write audit (every record,
  not a sample) is now the standard for this kind of operation, not an optional extra step.
- **2026-07-24, Zoho write-phase bugs found and fixed post-rollout.** After the full Zoho CRM push
  (297 Yes / 864 No / 105 Held all written, tagged, and Apollo-listed), the user asked why the Yes
  accounts weren't fully enriched, which surfaced two distinct write-phase bugs, both now fixed:
  (1) **56 Yes accounts were caught as `DUPLICATE_DATA` when a create-batch tried to add them**
  (they already existed in Zoho under that name); only their existing record ID was captured, and
  the actual qualification write (Account_Progress, Account_Notes, Apollo enrichment fields) never
  happened for 52 of them (4 had already been caught and fixed earlier). All 52 now written with
  full data. (2) **4 companies have two source rows in this dataset that both resolve to the same
  Zoho account** (Al Majed Oud.co/Al Majed for Oud, Modern Electronics MEC/Modern Electronics
  Company, Abdul Latif Jameel Electronics/Abdul Latif Jameel Enterprises, Nahdi/صيدلية النهدي) — one
  row tagged Yes, the other tagged No as a duplicate-consolidation marker. Because both rows got
  written to the same physical Zoho record, whichever batch ran last won; 3 of the 4 ended up
  showing Disqualified in Zoho despite the correct verdict being Yes (Nahdi's write order happened
  to land correctly by chance). Fixed by writing the correct Yes progress/notes to all 3 live
  records. Root cause for future reference: the No/Held write payload builder never cross-checked
  whether a row's `zoho_account_id` was already claimed by a Yes row before writing — a systematic
  scan of the full dataset for zoho_account_id collisions across different tags is the right check
  to run before any future bulk write, not just spot-checking known-duplicate names.
- **2026-07-24, later same day — No/Held pool quality check completed: 292 Yes → 297 Yes.** With
  the Yes list finalized via Gate 8, turned to the No (868) and Held (105) pools per the user's own
  earlier sequencing instruction ("once we finalize what's breaking, then only we go to NO and
  HELD"). Two passes: (1) duplicate-detection mirroring the Yes-list dedup (domain-root clustering +
  document-frequency-filtered fuzzy name matching across all 1,265 rows, plus a systematic sweep of
  every row that makes a claim about another row's tag) — found 5 stale duplicate-merge records where
  the "kept" row had since been downgraded by the adversarial-recheck or CRM/scale-filter rounds but
  the dropped twin's text still claimed it "remains tagged Yes" (3 were real inconsistencies, synced
  to match), one genuine contradiction (Ahmad A. Abed Holding / Ahmad A. Abed shared one Zoho ID with
  opposite verdicts from two different verification passes — synced to the better-evidenced one), one
  Held account (Aldawaa pharmacies) that turned out to be the same 900+-branch chain already captured
  cleanly as Yes under a different name, and one genuine duplicate pair merged (Naqi water / NAQI).
  (2) A larger, more consequential finding: **57 No-tagged accounts had been auto-excluded solely on
  a bare Apollo NAICS code with zero semantic verification** — literally just "non-retail NAICS only
  (codes)" as the reason, never swept into the earlier 33-batch full audit. This is exactly the
  anti-pattern Gate 7 forbids. Verified all 57 with 4 parallel agents applying the full gate ruleset
  (live-fetch, web-search corroboration where blocked, Gate 8 CRM/scale check) rather than trusting
  the stub. Result: **5 flipped to Yes**, every one a real hybrid-B2B miss where a substantial,
  live-transacting D2C retail subsidiary was overlooked because the parent's B2B/wholesale identity
  triggered the auto-exclude — Kadoon Company (via its K.Cosmetics beauty e-commerce arm), Alyasra
  Foods (via its Makani Foods grocery e-commerce arm, KWD 55K+ LinkedIn followers), Abu Khalifa
  Trading (via its Keakado.com grocery e-commerce arm), شركة صقر الجزيرة/Saqr Al Jazira (via its
  jzfstore.com home-appliance e-commerce arm), and WISTER (a real 14-branch Jeddah fast-casual QSR
  chain with 465,000 Instagram followers, missed entirely because the domain on file, wister-sa.com,
  was a typo returning a bot-block — the real site is wister.sa). The other 52 are confirmed No, now
  carrying real evidence-based reasons instead of the bare stub (real-estate developers, B2B/wholesale
  distributors and manufacturers, a testing/certification lab, a car-rental company, a job-listings
  portal, a media outlet, and one wrong-geography record among them). Final: **297 Yes** (was 292),
  863 No, 105 Held. See `rollout/no_held_pool_check_log.json` for the full fix log.
- **2026-07-24 — CRM/Marketing-function + LinkedIn/Instagram scale filter applied (Gate 8,
  user-directed): 408 Yes → 292 Yes, 104 No, 12 Held.** The user judged 408 "still too many YES"
  and, after four hypotheses were offered, specified the exact fix: add two filters applied together
  with judgement (CRM/Digital/Marketing function evidence, AND a 50+ employee LinkedIn page OR
  50,000+ follower Instagram page), explicitly ruling out spending Apollo credits and directing the
  use of free APIs (ScrapingDog/Apify) plus Google search instead. Built a from-scratch verification
  pipeline: Apify `harvestapi/linkedin-company` (bulk fuzzy search) + `apify/instagram-profile-scraper`
  for the initial pass, Serper (Google SERP API) for marketing-function evidence and Instagram handle
  discovery. First pass: 261 KEEP / 80 No / 55 Held / 12 Held(reverse). Before trusting that result,
  manually sampled the downgrades and caught a real data-quality bug: unvalidated name-only fuzzy
  matching produced false company matches (e.g. "CRYSTALS" matched to an unrelated academic journal
  "Crystals MDPI"; "Petite Store" — already adversarially CONFIRMED with real evidence in the prior
  round — matched to a French carpentry company; "goldentech" matched to an unrelated US company).
  Fixed by requiring the matched LinkedIn/Instagram record's own website/bio to domain-verify against
  the account's known domain before trusting any employee/follower count. Re-running with the fix
  corrected those specific false positives, but then manual review of the resulting Held bucket
  surfaced a second, larger problem: Apify's bulk fuzzy `searches` mode (its own schema warns this
  "can be inaccurate") was **missing large, unmistakable, publicly known Gulf retailers** — Panda
  Retail Company/Savola Group (6,035 employees), The Sultan Center (2,275 employees), Ubuy Inc (138
  employees), Union Trading Co. (212 employees) — not because they're small, but because the bulk
  text search simply failed to find the right LinkedIn page. Built a second, precision pass: find the
  exact LinkedIn company URL via targeted Google search (`site:linkedin.com/company "{name}"`), look
  that exact URL up via Apify's precise `companies` mode, then still domain-verify the result before
  trusting it (this precision pass produced its own false match — "Tasweeq - Toys R Us KSA" initially
  matched an unrelated Dubai marketing agency — caught and rejected by the same domain check, then
  resolved correctly with a cleaner query to 499 employees, domain-verified). This precision pass
  alone moved 45 accounts (25 Held→Yes with real domain-verified scale, e.g. Panda/Sultan
  Center/Ubuy/Union Trading/Laverne Group at 2,183 employees; 18 Held→No now confirmed genuinely
  small rather than merely unknown; 2 No→Held on newly-found real scale data). A third pass applied
  the same precision-URL technique to Instagram for the remaining Held accounts (recovering Manuel
  Market at 124,259 followers, ToYouKSA at 54,616, Alif Stores at 51,452) and a broadened
  marketing-function search for the remaining zero-evidence accounts (recovering Matjar Panda and a
  furniture retailer, both already confirmed large on Instagram, once real named marketing/creative
  staff were found via a less-restrictive query). Also caught and fixed a genuine classification-logic
  bug along the way: the case "no marketing evidence + confirmed-small real data on the other leg"
  was falling through to the Held bucket instead of a confirmed No (affected 7 accounts, e.g. an
  Instagram account with a confirmed 307 followers had been sitting in Held instead of No). Final
  result after three verification passes: **292 Yes** (was 408), **104 No** (confirmed via real
  data, not absence of data), **12 Held** (7 with real marketing evidence but genuinely unconfirmable
  scale after two precision passes; 5 with confirmed large scale but no findable marketing function —
  both are genuine ambiguity, not a data-pipeline gap, and are left for manual review rather than
  forced either way). See `Gate 8` above for the full method writeup, and the scratchpad's
  `stage_final_classified.json` for the complete per-account evidence trail (LinkedIn/Instagram match
  status, employee/follower counts, marketing-function hits) behind every Yes/No/Held call in this
  round.
- **2026-07-23, later same day — adversarial second-look found 25 more of the 110 never-cross-checked
  Yes flips did not hold up (user-caught error).** After the duplicate merge brought the count to 433,
  the user still judged it implausible and pushed back a third time. Investigation found the real
  mechanism: 110 of the 433 Yes accounts (the 93 full-audit FLIP_YES calls plus 17 sample-audit
  flips) had each been approved by exactly ONE agent, in a task explicitly framed as "find misses,
  don't rubber-stamp" — a one-directional incentive with no adversarial second look, unlike the
  original 323 accounts which went through a dedicated 14-batch cross-verify pass earlier in the
  project. Ran 8 batches of skeptical re-verification on those 110, this time with agents explicitly
  briefed to try to DISQUALIFY each account (re-checking SKU counts, geography, and app-download
  claims from scratch rather than trusting the prior note, defaulting to downgrade on any doubt).
  Result: 85 CONFIRM, 8 DOWNGRADE_NO, 17 DOWNGRADE_HELD — a 22.7% failure rate under skeptical
  re-check, confirming the one-directional-incentive hypothesis. Common failure patterns: inflated
  SKU counts (aamaad claimed "167 product-card elements," independently recounted at 19, all one
  product line), frozen/password-gated storefronts mistaken for live ones (rebound.net returns
  HTTP 402, tomorna.com is password-gated), unconfirmed app-download figures accepted at face value
  (Sahseh's Gate 5b rescue rested on stale/unverifiable numbers with real UAE-vs-Saudi geography
  doubt), thin B2C storefronts on fundamentally B2B businesses (Arabian Furniture & Design is a
  Herman Miller office-fit-out dealer, not a consumer retailer), and marketplace/aggregator models
  missed on first pass (Yuehlia's own about-page describes a multi-vendor marketplace). Final
  corrected count: **408 Yes** (was 433, was 453 before the duplicate merge). See
  `rollout/adversarial_consolidation_report.json` for the full verdict log.
- **2026-07-23, later same day — 20 duplicate accounts found and merged out of the Yes list
  (user-caught error).** After the full-audit consolidation reported 453 Yes accounts, the user
  directly challenged the count as implausible. Investigation confirmed the concern: because the
  full audit ran as 33 independent parallel batches, each verifier only ever saw its own ~24
  accounts and never the other ~429 Yes rows, so the same real-world company could be (and was)
  flipped to Yes twice under different CRM name/domain variants, or as both a parent holding
  company and its own named retail subsidiary. A full entity-resolution pass across all 453 Yes
  rows at once (the structural fix — one pass that can actually see the whole list) found 20
  confirmed duplicate pairs, including plain name/transliteration variants (Nahdi /
  صيدلية النهدي, Toyland / TOYLAND KSA, ALMAKTABA / Maktab), domain-TLD variants of the same
  brand (ALMAHA OPTICAL .com / .com.sa), and parent-holding-company-plus-named-subsidiary pairs
  where the parent's own qualifying reason named the subsidiary that was *also* already its own
  row (MAZ HOLDING / Bed Quarter Company, The Blue Group - Qatar / Blue Salon, RCIT Holding Co. /
  rubaiyat, UniPharma / Adam Medical Company, and others). Each pair was merged by keeping the row
  with an existing Zoho account match where available, otherwise the specific operating retail
  brand over its holding/parent entity; the dropped row's tag was set to No with a
  `duplicate_consolidation` reason pointing to the kept row. Final corrected count: **433 Yes**
  (was 453). One additional pair (A Market ماركت / Abdullah Al-Othaim Markets) was investigated
  but left unmerged pending a direct Zoho lookup: both already have existing but *different* Zoho
  account IDs and the names suggest possibly-distinct Al-Othaim family branches, so collapsing
  them without checking the actual Zoho records risked destroying legitimate distinct data.
  Separately, 7 of the 20 merged pairs revealed that Zoho itself already carries both sides as
  separate existing account records (different account IDs for the same real company) — a
  pre-existing CRM data-quality issue, not one this project introduced, worth flagging for the
  CRM dedup step. See `rollout/yes_duplicate_merge_log.json` for the full merge log.
- **2026-07-23, later same day — full re-audit of the entire excluded (No/Held) pool completed.**
  Triggered by the Gate 2 fix below plus a direct user challenge ("are you sure there are only 9
  mistakes?"). A 144-account stratified random sample of the 935-account excluded pool was audited
  first and found a 15.3% error rate (22/144), giving a 92-193 estimated-mistake range at 95%
  confidence. The user chose to run the full audit rather than rely on the estimate: all 791
  remaining excluded accounts were independently re-verified across 33 parallel batches (live-site
  refetch, HQ/geography checks, category re-classification, no reliance on stored reason text).
  Result: 103 accounts flipped to Yes and 55 flipped to Held, a 158/791 = 20.0% error rate,
  consistent with the sample's confidence interval. Combined with the sample's 22 corrections, the
  full 935-account excluded pool yielded 180 total corrections (~19.3%). Dominant error patterns:
  (1) the same Gate 2 hybrid-B2B misreading below, caught systematically rather than by spot-check;
  (2) "dead site" false negatives from bot/anti-bot blocking, expired-but-relocated domains, or a
  transient error mistaken for a permanently dead business; (3) `gap1_apollo_keyword`
  auto-exclusions on a bare NAICS code or name-pattern match, which Gate 7 already forbade as a
  sole basis but which the discovery-stage sweep had applied anyway. Final tag distribution:
  453 Yes / 739 No / 73 Held (was 350/861/54 immediately before this audit).
- **2026-07-23, later same day — Gate 2 hybrid-B2B/B2C clause corrected (user-caught error).**
  The clause was being applied too bluntly: "the B2B side alone disqualifies" was read as "any
  wholesale/distribution/manufacturing revenue anywhere in the company is disqualifying," which
  wrongly excluded large, genuinely substantial retailers that happen to also hold distribution or
  manufacturing lines (caught via Lazurde: a huge, real, 70-store/4-brand consumer jewelry retailer
  wrongly failed because it is *also* the world's 4th-largest gold manufacturer). Corrected to: only
  exclude when the company has no substantial dedicated retail arm of its own (a thin storefront
  bolted onto an otherwise-B2B business); a company that runs a genuinely large retail operation
  passes on that operation's own merits regardless of a coexisting B2B/manufacturing line, exactly
  as Gate 6 already treats a mixed conglomerate's non-retail divisions. Re-swept every account
  excluded on hybrid-B2B/distributor grounds during the same day's cross-verification pass (18
  candidates) and flipped 9 confirmed misses: Lazurde, Union Trading Co., Petzone, Go Fresh, Al
  Andalus Trading Establishment, Aljazierah Home Appliances, Seventh Dimension Company, Fakeeh
  Vision, Algarawi Group. See Section 2 (Gate 2) for the corrected clause and worked examples.
- **Traffic floor (was hard filter #4, "50k+ monthly visits via Cloudflare Radar/CrUX"): dropped.**
  Empirically tested and confirmed unusable — Cloudflare Radar returns no ranking signal at all
  below roughly the top-200,000 global domains, which doesn't distinguish real qualifying
  businesses from noise at this segment's scale. Replaced by the substantiality check (Gate 5a):
  real catalog size + real commerce infrastructure, no traffic number.
- **Mobile app (was "optional, not an alternate path to online presence"): upgraded to a genuine
  alternate qualifying path (Gate 5b), user-directed.** Explicit instruction: "100k+ downloads in
  app store automatically make it qualified," later loosened to "even 50k+ downloads are good to
  proceed." A confirmed 50k+ download app now overrides category and narrow-purchase-frequency
  gates entirely, not just a bonus signal.
- Gates 2, 3, 6, and 7 are refinements/elaborations of the same-day version's category and
  verification rules, made concrete through several hundred account-level judgment calls this
  session (specific exclusion patterns for salon-services, B2B distribution language, marketplace
  models, etc., and specific narrow-category precedents for lighting/flooring/tires/mattresses).
- Geography (Gate 1) and the no-NAICS-only-classification rule (Gate 7) are unchanged from the
  same-day version and remain fully in force.
