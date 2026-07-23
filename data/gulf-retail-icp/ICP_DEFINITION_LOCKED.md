# Gulf Retail/eCommerce ICP — LOCKED (2026-07-23)

This supersedes the working definition used for the initial account build. Any account already
in Zoho must be re-audited against this version, not grandfathered in.

## Hard filters (ALL must pass — any failure disqualifies)

1. **Geography — HQ, not just presence.** Global headquarters in Saudi Arabia, Kuwait, or Qatar.
   HQ anywhere else, including UAE or elsewhere in the Gulf, disqualifies — regardless of
   in-country operations, franchise stores, or local registered entities. (Consistent with the
   Carrefour-Qatar/Nesto/Spinneys/LuLu precedent already applied.)
2. **Business model — B2C end-to-end, no exceptions.** Any B2B component anywhere in the chain
   disqualifies the account, even if the same company also runs genuine B2C retail. A hybrid
   distributor-plus-retailer (e.g. "serves both consumers and businesses") is OUT, not borderline.
3. **Online presence — a real, live, currently-operating e-commerce website.** No online
   presence disqualifies outright. "The site loads" is not sufficient proof — requires evidence
   of current activity (recent products/dates/reviews), not just a static live homepage.
4. **Traffic floor — 50k+ monthly visits, verified.** Estimated monthly visits/sessions is the
   accepted operational proxy for MAU (no tool, free or paid, gives true de-duplicated unique
   users for arbitrary domains). 50k+ clears the bar; below it, the account is irrelevant
   regardless of every other fit signal. Verification method: free-tool proxy (Cloudflare Radar
   rank + Chrome UX Report presence/tier) as the starting method — no hard paid-API number
   required to start.
5. **Not a large marketplace/aggregator.** Amazon, Noon, Delivery Hero, Talabat, Swiggy, and
   the same class of business model generally (all delivery/q-commerce aggregators, regardless
   of size) are excluded — they run their own infrastructure and are not addressable. The named
   companies are illustrative examples of the rule, not an exhaustive whitelist-by-exclusion.

## Soft signals (do not gate inclusion, but affect tiering/prioritization)

- **Mobile app**: optional. Presence is a plus signal; absence is not a disqualifier. A company
  with ONLY an app and no real e-commerce website does not qualify (website is the hard
  requirement; app is bonus, not an alternate path).
- **Omnichannel (physical retail + e-commerce)**: the ideal-fit profile, not a requirement.
  Physical presence should be in the same locked-geography country, consistent with the HQ rule.
- **Already-solved accounts** (existing CDP/martech: Insider, CleverTap, Braze, Klaviyo, Emarsys,
  WebEngage, Salesforce Marketing Cloud, etc.): deprioritize, do not exclude. An otherwise-qualified
  account keeps its verdict but gets flagged/tiered lower — competitor displacement is a valid
  sale, just a harder one. Zoho already carries tags for this signal from a prior effort
  (`Insider`, `CleverTap`, `Braze`, `Klaviyo`, `Emarsys`, `webengage`, `Salesforce Marketing Cl...`,
  plus a `Builtwith_ExportKlaviyo` import batch) — check these before assuming "unsolved."
- **Local-currency transacting** (SAR/KWD/QAR shown at checkout): a cheap, automatable proxy for
  genuine local operations, worth capturing alongside the live-site check.

## Verification method (what actually gets checked, and how)

Per the quality failure found 2026-07-23 (POWR — an esports org, misclassified as fashion retail
via a spurious Apollo NAICS code; Primary Care Medical Co — a medical clinic, misclassified as
pharmacy retail): **no account may be marked IN on the basis of Apollo NAICS/category/name alone.**
Every account requires:
1. A live HTTP check of the actual website (not assumed from a domain name).
2. Semantic confirmation of what the business actually is and sells — via AI-read page content
   (WebFetch/WebSearch), since keyword/regex matching on raw HTML has been proven unreliable
   (WordPress/plugin boilerplate produces false-positive retail-keyword hits on non-retail sites).
3. A traffic-floor check via the free-tool proxy method above.
4. B2B/B2C model confirmation from the page content itself, not inferred from NAICS code.

## Known consequence of tightening

This definition is stricter than the one used for the initial build (254 created + 101 enriched,
then 9 created + 10 enriched from HELD/gap resolution — 387 IN total as of the last commit).
Expected attrition on re-audit: any hybrid B2B/B2C account (e.g. Wahag Medical Co, Shaker Group —
both already written) and any account that fails the 50k+ traffic floor once checked. The
already-written set must be re-audited against this definition before any further net-new
discovery continues, since those accounts are live in production Zoho now.
