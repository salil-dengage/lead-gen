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
- Wholesale / B2B trading / distribution (a business that explicitly supplies other retailers, a
  "sole distributor," or a hybrid "we serve consumers and businesses" model — the B2B side alone
  disqualifies, even if a genuine B2C arm exists somewhere in the same company).
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
