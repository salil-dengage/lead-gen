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
