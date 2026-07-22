# prospecting_engine_v1.2_21July.md: Stack-Led, CxO-Grade Cold Outreach (Operating Instructions)

> STATUS: ACTIVE and MANDATORY as of 21 July 2026. This is the single source of truth for all lead
> outreach. It supersedes `PROSPECTING_ENGINE.md` (v1.1), `COLD_OPENER_TEARDOWN.md`, and
> `PROSPECTING_SESSION_HANDOFF.md`, all now archived in `OLD DOCS/` and NOT to be used.
>
> UPDATED 22 July 2026: Section 3 was rebuilt into the de-duplicated pre-draft intelligence pipeline
> (one tool per insight, keys held as repository secrets, see Section 3.0). Section 6 (the messaging
> voice) was then consolidated from session 01QUz6uSs9Y6odZgX79RASFj: proof now leads, the close warms,
> competitor naming is approved, and the multi-touch ladder is codified. Sections 0, 7, 9, and 11 were
> reconciled to match.
>
> COMPULSION: read this file in full and apply it before generating ANY outreach content of any kind:
> cold email, follow-up email, LinkedIn connection note, LinkedIn message, LinkedIn follow-up, a batch
> built from a Zoho or Apollo export, or a single ad-hoc message. No exceptions. If you are about to
> write a word of outreach and have not applied this file, stop and apply it first.
>
> `CLAUDE.md` still governs everything without exception: the Section 2 verified constants, the Section
> 3 content rules, the Section 5 tone, the Section 6 honesty posture, and the Section 9 differentiators.
> This file adds the method for turning a lead into outreach that reads like a sharp, senior human who
> did real, verifiable homework, not a vendor pitch. Where a proof point is needed, it comes from the
> verified knowledge base, never from a personalization gap.

---

## 0. What changed from v1.1, in one paragraph

v1.1 treated the martech stack as one of five research items and led openers with a public trigger
plus a generic value line, an assertive senior-architect voice, and a soft call ask. Senior bankers
pattern-matched that as an ad. v1.2 opens warm on their real, multi-source-verified move, leads with
client proof and a G2 accolade up top so we are never mistaken for a no-name tool, hedges the read of
their situation while staying confident about us, names the incumbent honestly as the wedge, and closes
warm without a sales tactic. The method is drawn from a 35-opener converting corpus (see Section 12)
adapted from its original CIS mid-level-manager context to our real target, the GCC and MENA bank CxO.
The locked messaging voice lives in Section 6 (consolidated 22 July 2026 from session
01QUz6uSs9Y6odZgX79RASFj); two deliberate reversals from the first draft, proof now leads and the close
warms, are recorded there.

---

## 1. The one non-negotiable principle

Every message is built on a single specific, verifiable, current observation about that company, and
that observation now leads with their real technology stack wherever we can source it. If research does
not surface a specific, checkable hook, do not fall back to generic copy. Flag the lead
`[NEEDS RESEARCH]` and stop. A missing hook is a research problem, not a writing problem.

---

## 2. The end-to-end process (run in this order, every time)

1. Parse the input (single lead, Zoho segment, or Apollo/Lusha CSV). Filter the target segment.
2. Confirm the contact still holds the role and owns CRM, marketing, digital, or the P&L (Section 8
   role check). If seniority is wrong, record the multi-thread target.
3. Run the multi-source stack research (Section 3). Corroborate any incumbent you intend to name.
4. Score and tier the lead (Section 4).
5. Select the persona angle (Section 5) and the verified reference to hold in reserve (Section 7).
6. Draft the assets in the v1.2 voice (Section 6).
7. Run the pre-send self-check (Section 9). Fix every violation before emitting.
8. Output in the requested mode (Section 10). Persist to a file or Zoho only when the human approves.

---

## 3. Research protocol: the pre-draft intelligence pipeline (the core of v1.2)

Personalization comes from researching the prospect. Proof comes from the verified knowledge base.
Never invent proof to fill a personalization gap. This section is the fixed sequence of tools to run
before ANY LinkedIn or email message is drafted.

### 3.0 The one-owner rule and the tool map (READ THIS FIRST)
Every insight below has exactly ONE owner tool. Do not run a second tool to get an insight another
tool already owns. The only sanctioned overlap is the deliberate corroboration pass before naming an
incumbent (3.9). Running two scanners for the same field is wasted budget, wasted time, and how
duplicated, contradictory notes end up in a lead file.

API keys live as GitHub repository secrets and are injected as environment variables in every
session, so the toolkit survives a fresh session with nothing lost. Read each key from the env var
named below, or from a scratchpad file OUTSIDE the repo. Never commit a key.

Run the pipeline top to bottom and STOP as soon as you have a hook of the depth the lead's tier
requires (Section 4). You rarely need every row.

| # | Insight you need | Owner tool | Key / access | Never use it for |
|---|---|---|---|---|
| 1 | Contact still in role, buyer fit, direct mobile | Apollo people (3.2) | Apollo MCP | naming the stack |
| 2 | Firmographics: size, revenue, HQ | Apollo org enrich (3.2) | Apollo MCP | re-pulling elsewhere |
| 3 | Group tree (sister brands) and look-alike accounts | ScrapingDog LinkedIn company (3.6) | `SCRAPINGDOG_API` | firmographics |
| 4 | Client-side martech that loads on the site | urlscan.io (3.3) | `URLSCAN_IO_API` | announced deals |
| 5 | Cookie and hostname corroboration | Lookyloo (3.4) | none | naming alone |
| 6 | Consent-gated martech (loads after the cookie banner) | Apify CSP header (3.5) | `APIFY_API`, `APIFY_USER_ID` | firmographics, products |
| 7 | Announced partnerships, incumbent corroboration, server-side vendors | ScrapingDog SERP or Serper (3.6) | `SCRAPINGDOG_API`, `SERPER_API` | jobs, firmographics |
| 8 | Recent trigger events and the executive's own quoted words | Firecrawl (3.7) | `FIRECRAWL_API` | products, segments, firmographics |
| 9 | Hiring and buying-center intent | JobsPipe (3.8) | `JOBS_PIPE_API` | tech detection |
| 10 | Backend ESP or sender (DNS level) | Apollo enrich plus DNS (3.2) | Apollo MCP | client-side tech |
| 11 | Free 10-second tech triage (optional) | WebReveal, POST `https://webreveal.io/api/scan` `{"url":...}` | none | naming anything, corroborate first |

REJECTED as duplicative, do NOT waste a session re-testing these: Microlink (its free tier is
Cloudflare-blocked on bank sites and its data overlaps Firecrawl and Apollo), the DuckDuckGo MCP
server (redundant with built-in web search and fragile), and ScrapingDog's LinkedIn Jobs endpoint
(a straight duplicate of JobsPipe, keep JobsPipe).

### 3.1 Tooling prerequisites (egress and honesty)
- Outbound access is governed by the environment network egress policy. It binds at container start,
  so a policy change needs a fresh session to take effect. Before any stack research, verify:
  `curl -sS "$HTTPS_PROXY/__agentproxy/status"` and a live test call to
  `https://urlscan.io/api/v1/search/?q=domain:qib.com.qa&size=2`.
- If it returns 403, tell the human the policy has not propagated. Do NOT route around it.
- Direct fetches of bank sites usually 403 (their WAF blocks datacenter IPs). Do not rely on fetching
  bank domains directly. Use the capture engines below, which scan from their own infrastructure.

### 3.2 Apollo, owner of the buyer and the firmographics
- People search or match: confirm the contact still holds the role and owns CRM, marketing, digital,
  or the P&L (Section 8), and pull the direct mobile. Per CLAUDE.md Section 14, mobile hits about 60
  percent on GCC and Egypt banking and corporate email is a dead end there, so invest in the mobile and
  do not burn credits chasing email.
- Org enrich(domain): size, revenue, HQ, and `technology_names` or `current_technologies`, which can
  surface BACKEND senders (for example MailJet, Mandrill) that never load as a page script. Verify a
  sender honestly via DNS, an SPF or MX record naming the ESP.
- PAID. Exactly 1 credit per company if found, 0 if not. MANDATORY: before any Apollo enrich call,
  state the exact total credit cost and get the human's explicit approval. Never proactively show the
  remaining credit balance. Do not call without approval.
- Once Apollo has returned a firmographic field, no other tool re-pulls it.

### 3.3 urlscan.io, owner of the client-side stack (primary)
- Submit FRESH scans of the live marketing site (`https://www.<domain>/`), visibility `unlisted` so
  recon is not broadcast. Public scans of bank domains are usually thin homepage stubs.
- Read `meta.processors.wappa` (Wappalyzer technologies with categories) and `lists.domains`
  (third-party hosts, which reveal martech: adobedtm/demdex/omtrdc, segment, tealium, useinsider,
  moengage, smartech, webengage, clevertap/wzrkt, braze/appboycdn, emarsys/scarab, exponea, lemnisk,
  mailjet, mandrillapp, salesforce/exacttarget, and so on).

### 3.4 Lookyloo, owner of cookie and hostname corroboration
- `https://lookyloo.circl.lu/`. Submit a capture: POST `/submit` with `{"url":..., "listing":0}`, poll
  `GET /json/<uuid>/status` until `status_code` is 1, then read `/json/<uuid>/hostnames` and
  `/json/<uuid>/cookies`.
- Cookies are the payoff. An `AMCV_` or `demdex` cookie is hard proof of Adobe. A first-party
  `shell#lang` plus a `SectionId` GUID is a Sitecore signature. Match hostnames and cookies against the
  same vendor list.

### 3.5 Apify CSP header, owner of consent-gated martech
- A bank often loads its real CDP or engagement vendor only AFTER the consent banner, so urlscan and
  Lookyloo can miss it. The site's Content-Security-Policy response header is a declared allow-list of
  every martech and adtech host, and it exposes those vendors anyway.
- Run: `POST https://api.apify.com/v2/acts/apify~website-content-crawler/run-sync-get-dataset-items?token=$APIFY_API`
  with `{"startUrls":[{"url":"https://www.<domain>"}],"maxCrawlPages":1,"proxyConfiguration":{"useApifyProxy":true}}`.
  Read the CSP in the item's `metadata.headers` and match hosts against the 3.3 vendor list. This is how
  Lemnisk and Adobe surfaced on Emirates NBD when a plain scan showed nothing.
- About 0.004 USD per page. Use it ONLY for the CSP martech allow-list. Do not re-extract firmographics
  or products here, Apollo owns firmographics and 3.7 owns page content.

### 3.6 ScrapingDog SERP (or Serper), owner of announced partnerships and corroboration
- This layer turns a single-source stack guess into a nameable fact, and it finds SERVER-SIDE vendors no
  scanner can see. On Emirates NBD it confirmed Lemnisk through press, confirmed Sitecore through
  Sitecore's own case study, and found SAS Marketing Automation, which never loads on the page.
- Targeted SERP: `GET https://api.scrapingdog.com/google?api_key=$SCRAPINGDOG_API&country=<cc>&query="<Company>" (Lemnisk OR Adobe OR CleverTap OR MoEngage OR Braze OR Insider OR "Salesforce Marketing" OR SAS OR "customer data platform" OR "marketing automation")`.
  Serper is the interchangeable alternative: `POST https://google.serper.dev/search`, header
  `X-API-KEY: $SERPER_API`. Use ONE of the two for a given query, never both.
- A vendor-side customer-list or careers page that names the bank is a soft, single source: flag it
  `[VERIFY]`, never name it as fact alone.
- Group tree and look-alikes: `GET https://api.scrapingdog.com/linkedin?api_key=$SCRAPINGDOG_API&type=company&linkId=<slug>`,
  read ONLY `affiliated_companies` (sister brands, for example the KSA entity for the GCP Dammam angle,
  or the digital sub-brand) and `similar_companies` (a ready-made look-alike prospect list). Do not use
  it for firmographics, Apollo owns those.

### 3.7 Firecrawl, owner of triggers and executive quotes
- Firecrawl owns the HOOK: the recent, dated, verifiable move plus the executive's own public words,
  which no contact database holds.
- Map the newsroom: `POST https://api.firecrawl.dev/v2/map` with `{"url":"https://www.<domain>","limit":300}`,
  keep URLs matching media, news, press, investor, or careers. Then `POST https://api.firecrawl.dev/v2/scrape`
  with a `json` format extraction schema (headline, published_date, one-line summary, executives_quoted
  with name, title and quote, notable_numbers) on the 3 to 5 most relevant releases. Use
  `POST https://api.firecrawl.dev/v2/search` for web-wide news. Auth is `Authorization: Bearer $FIRECRAWL_API`.
- ALWAYS read published_date and DISCARD anything stale. This is what caught a 2015 story being passed
  off as current on Emirates NBD. Do not use Firecrawl to re-pull products, segments, or firmographics,
  that is repetitive with Apollo and 3.5.

### 3.8 JobsPipe, owner of the hiring signal
- The only source of open-role intent. A prospect hiring a CRM, martech, CDP, personalization, or
  lifecycle lead is budget forming and a live multi-thread target, so lead the opener with it. General
  digital, data, or engineering hiring is a hedged supporting signal, not a hook on its own.
- Run: `POST https://api.jobspipe.dev/v1/jobs/search`, header `Authorization: Bearer $JOBS_PIPE_API`,
  body `{"company_name_partial_match_or":["<Company>"],"job_title_or":["CRM","martech","marketing automation","personalization","customer data","campaign","lifecycle","digital marketing"]}`.
- Coverage is partial, it indexes what job boards expose and a bank's own Workday or careers portal may
  hold more. If it is thin, Firecrawl-scrape the `/careers` page found in 3.7 rather than reaching for a
  second jobs tool. Report the coverage limit honestly, a thin result is an account reality, not proof
  that nobody is hiring.

### 3.9 The corroboration standard (this protects every named-incumbent claim)
- Name an incumbent as fact in an opener ONLY when two INDEPENDENT sources agree, drawn from: urlscan
  (Wappalyzer or third-party domains), Lookyloo (hostnames or cookies), the Apify CSP header, a SERP
  press or case-study hit (3.6), or Apollo enrich. Two sources from different infrastructure is the bar
  before you write a vendor's name to a senior banker.
- A single-source detection, or a vendor-side customer-list mention, is usable but must be flagged
  `[VERIFY]` and softened in the copy, or verified first. For email senders, the honest verification is
  DNS, an SPF or MX record naming the ESP.
- Corroboration is necessary but not sufficient. Naming any competitor at all, even neutrally, still
  needs the go-to-market carve-out sign-off (CLAUDE.md Section 5, and the Section 13 open item) before
  it ships.

### 3.10 The web-side-only caveat (never overclaim)
- Every engine here sees the PUBLIC WEB and public record. Even with the SERP layer recovering some
  server-side and contracted vendors, none of them see the mobile app push and in-app vendor, which for
  a bank is often where the real engagement runs.
- Therefore "no CDP or orchestration" is NEVER stated as a fact. It is always framed as a hedged
  observation from the outside (Section 6.2). Tools are good, not infallible. Say so in the copy.

---

## 4. Scoring and tiering (effort follows tier)

Score on ICP fit, buyer fit (is this the economic buyer), and trigger strength.
- Tier A: engagement is existential (app-led bank, recent launch, fast growth) and the contact is a
  real buyer. Richest personalization.
- Tier B: strong ICP with a clear stack gap. Standard depth.
- Tier C: qualify first. Thin public data, or wrong seniority. If seniority is wrong, multi-thread to
  the economic buyer (Head of Marketing, CRM, Digital, Growth) and keep the original as a champion.
- Tier D: off-ICP. Say so honestly and drop or re-angle.

---

## 5. Persona to angle (match the message to the buyer's job)

| Contact function | Lead angle | Dengage capability in plain business language |
|---|---|---|
| Marketing / Brand / CMO | Single customer view, always-on beats the next campaign | Unify fragmented data, message off one profile |
| Digital / Growth / CDO | Data activation, real-time journeys, decisioning-to-delivery | Turn captured data and decisions into cross-channel journeys |
| CRM / Lifecycle / Data | Orchestration, segment activation, deliverability | Owned channel infrastructure and journey orchestration |
| Retail / P&L | Retention and lifecycle past acquisition | Move customers from active to funded to expanded |
| C-suite (CEO Digital) | Revenue, retention, the layer on top of a strong app | Lifecycle that compounds a good app rather than plateauing it |

Describe the capability in business terms. Never print internal module codes (CLAUDE.md Section 8). If
the contact is the wrong seniority for a stack conversation (for example a Corporate Relations or
communications buyer), multi-thread to the digital, CRM, or retail head rather than forcing the angle.

---

## 6. The v1.2 voice (this is what makes it land)

This section was rebuilt on 22 July 2026 from the messaging work in session
01QUz6uSs9Y6odZgX79RASFj, with Salil and the team (Yan, Paul). Two deliberate reversals from the first
v1.2 draft, both tested against how a senior GCC banker actually reads a cold note: PROOF NOW LEADS, it
does not wait until asked, and the CLOSE WARMS, the phrase "I'll be straight" is retired. The homework
in the body is still the thing that earns the reply; the proof up top is what stops a stranger reading
us as a no-name tool before they get to the homework.

### 6.0 The locked structure (five movements, in this order)
1. Warm opener: name their verifiable recent move AND add genuine kudos (6.1).
2. Who we are, up top: the one-line intro that leads with client brands and a G2 accolade (6.3).
3. What I can and can't see: the hedged, sourced stack read, naming the incumbent as the wedge when it
   is corroborated (6.2, 6.4).
4. What we do: a couple of concrete deliverables, never a feature parade (6.5).
5. Warm close (6.6).

### 6.1 Open warm, trigger plus kudos
Sentence one names the verifiable recent move (a launch, award, campaign, new segment, licence, or
product milestone) AND is genuinely warm about it. Do not just state what they did, they know what they
did. Add real praise: "well done", "that must have been a serious thing to be part of", "nicely done".
Impressed-and-specific is the tone. Then move to what you can and can't see.

### 6.2 Assertive about us, tentative about them
Never hedge our own capability. State what Dengage does as fact. Be deliberately tentative about the
prospect's situation, which we are reading from the outside with imperfect tools. Use honest hedges:
"I only have the outside view, so I could be reading it wrong", "as best I can tell from the public
web", "what runs inside the app I can't see, and that is usually where this lives". This is honesty and
it is also the single most repeated winning move in the corpus. It is not weakness, it is accuracy.

### 6.3 Proof leads, it does not wait (the reversal)
The one-line intro is movement 2 and carries our credibility up front, so a senior banker knows in three
seconds we are a real, rated platform, not two people in a garage. Template:
"I'm Salil from Dengage, the Composable AI Marketing Platform behind <3+ client brands, geography>, and
G2's <one accolade> this year."
- Descriptor: "Composable AI Marketing Platform" (from the verified G2 asset, "the only native
  multi-channel marketing automation platform with a Composable CDP"). This is the standard descriptor,
  not "CDP".
- Brands: name THREE OR MORE verified customers, matched to segment and geography-annotated
  collectively. Islamic banks lead with Meezan or Bank Islami (Pakistan); conventional with Isbank,
  Akbank, or Fibabanka (Turkey); UBL and Allied Bank (Pakistan) widen the pool. NEVER imply a GCC logo,
  we have none (CLAUDE.md Section 4). Our named-reference pool is Pakistan and Turkey, so names WILL
  recycle across a large batch; keep each email distinct by rotating the accolade and the pairing.
- Accolade: exactly ONE per email, ROTATED so no two leads in a batch get the same client-plus-accolade
  pairing. Use the "#1" numeral where it is a number-one claim, it stands out. The pool, all from the
  verified G2 asset: #1 Personalization Engine, #1 for time to value, #1 for return on investment, a
  top-5 CDP, a G2 Momentum Leader, rated 4.6 out of 5. A G2 ranking or rating is an ACCOLADE and leads;
  a customer OUTCOME number is a metric and is held to touch 2 (6.8).
- Dengage is still named once (this intro line carries it). Later references are "we" or "the part we
  do", never a second "at Dengage".
- Sender writes as Salil, honestly ("I'm Salil from Dengage"). NEVER the founder frame ("I'm growing
  Dengage"), Salil is not a founder (the founders are Aman Dotani and Osman Tufanogullari).

### 6.4 The incumbent wedge (naming is approved, name it the right way)
The go-to-market carve-out is SIGNED (Salil, session 01QUz6uSs9Y6odZgX79RASFj). You MAY name a
competitor, and only under these rules:
- Name it ONLY when corroborated to fact per Section 3.9 (two independent sources). A single-source or
  vendor-side mention is `[VERIFY]` and softened, or verified first.
- Frame it as COEXISTENCE or a fair comparison, never an attack. Proven framings: "Oracle holds the
  record, we act on it"; "Adobe on the acquisition half, us on the retention half"; "it sits on top of
  the CRM you already have rather than replacing it"; "if it is worth putting us side by side, I'd
  welcome the comparison".
- State only what WE do. NEVER assert what their incumbent cannot do, and never an unverifiable
  negative as fact. Never disparage by name.
- Competitors and incumbents surfaced in research to differentiate against, never negatively: Adobe,
  Salesforce Marketing Cloud, Sitecore, Braze, CleverTap, MoEngage, Insider, Bloomreach, Emarsys,
  Netcore, WebEngage, Dataroid, Avanza, plus legacy CRM, DMP, and campaign stacks (Oracle, SAS, Unica,
  Infosys Finacle CRM) named as the system of record we activate on top of.

### 6.5 What we do: concrete, no vendor-speak
- Say what we do in plain, specific terms and STOP. BANNED phrases: "we give banks the layer that
  turns...", "the activation layer we run for banks", "off one profile across every channel", and any
  channel list used as a feature parade.
- Use a COUPLE of concrete deliverables, not a list: unify each customer into one live profile, trigger
  the next best action in real time, run event-driven journeys without leaning on developers. Two is
  the ceiling for touch 1; a third clause tips into a feature parade.

### 6.6 The close (warm, straight, no tactics)
Retire "I'll be straight", it reads salesy and undoes the peer register. The close is warm,
conversational, and varied per lead so it never becomes a template.

HARD BANS in the close:
- No naive diagnostic question that asks them to explain their own stack ("how is it set up?", "where
  does that sit?"). At CxO level this asks a stranger to hand over internal architecture.
- No salesy meeting ask ("would a short call be worth your time?").
- No sales tactics or fake reassurance ("no meeting, just the thinking", "no commitment").
- No delegation fishing ("or whoever owns that on your side").

ACCEPTABLE warm forms (choose one, vary the wording per lead):
- Owner-direct: "Since it's your area, if it's worth a conversation, I'd welcome it."
- Bake-off (when an incumbent is named): "If it's worth putting us side by side as you build, I'd
  welcome the comparison."
- Plain offer: "If it's useful, I can share how we'd approach it."

### 6.7 Anti-AI-tell hard bans (this is what keeps it human)
- No em dashes or en dashes anywhere. Commas, colons, periods, or rephrase.
- No rule-of-three lists used for rhetorical effect.
- No "it's not X, it's Y" antithesis.
- No colon-led enumerations in the body.
- No corporate filler: leverage, elevate, unlock, seamless, in today's fast-paced landscape.
- Vary sentence openings across the message and across the batch. Contractions are fine.

### 6.8 The multi-touch ladder (each touch changes the angle AND the proof type)
Touches are +3 Gulf working days apart (Sun to Thu). The proof rotates by TYPE down the ladder so no
touch reads like the last one resent.
- Touch 1: the five-movement structure above. Proof type: client logos plus a G2 accolade (6.3).
- Touch 2: one VERIFIED CUSTOMER METRIC tied to their situation, plus a soft offer. No logo repeat, no
  re-pitch. The only metrics are Fibabanka 4.45M customers (Turkey), Burgan roughly a million messages
  a day (Turkey and MENA), MCB 83% account-funding (Pakistan), all geography-annotated. Only three
  exist, so match the metric to each prospect's angle (scale, throughput, funding) rather than repeating
  a framing.
- Touch 3: one concrete use-case, "the first journey I'd build for you". Value, not an escalated ask.
- Touch 4: an honest permission close ("if now isn't the moment I'll leave it, just say the word").
  Short. This is the highest reply-or-close touch.
- A lead who received an OLD v1.1 first email gets the new voice as a soft RESET; that weak touch does
  not count, give them the full ladder from here.

### 6.9 Length and channel
- Email: about 110 to 140 words, one idea per PARAGRAPH with line-by-line spacing (Yan and Paul: easier
  to read in an overloaded inbox), a specific subject tied to their move, sign-off "Best, Salil", no
  signature block (Salil adds his own).
- LinkedIn: NO connection-request note, the request goes out note-less (Salil's standing instruction).
  Message 1 goes on ACCEPT, about 50 to 80 words, the same five movements tightened, usually two client
  names not three, no subject line. LinkedIn keeps its own clock (Message 1 on accept, then +3 working
  days) and never carries the same content as the email on the same day.

---

## 7. Verified-proof-swap gate (bake into every run)

Before any opener ships, every logo, award, geography, and customer count is checked against the
CLAUDE.md Section 2 and Section 4 verified constants. Fibabanka is 4.45M+, not 2M. Burgan is Turkey and
MENA, roughly a million messages a day. Uptime is 99.9% only. No Wizz Air. No Sao Paulo office.
Deterministic identity only. KSA equals GCP Dammam for residency. Route any commercial figure to Salil
Gupta and any security item to Koksal for sign-off.

Two kinds of proof, two different placements (see Section 6.3 and 6.8):
- Client LOGOS and G2 ACCOLADES LEAD at touch 1, up top. Vertical-matched, geography-annotated: Islamic
  banks to Meezan or Bank Islami (Pakistan), conventional to Isbank, Akbank, or Fibabanka (Turkey),
  widened by UBL and Allied Bank (Pakistan). Three or more names, a rotated accolade, never a GCC logo.
- Verified customer METRICS (Fibabanka 4.45M, Burgan ~1M a day, MCB 83% account-funding) are HELD to
  touch 2, never used in the touch-1 opener. They are matched to the prospect's angle, geography
  annotated every time.

---

## 8. Channel specifics and compliance

- LinkedIn: manual send only, one to one. Never propose automation or credential sharing. The machine
  prepares and reminds, the human sends.
- Email: one to one and personal, never a bulk blast. Warmed domain, SPF, DKIM, DMARC, low daily volume.
- WhatsApp: not for cold outreach. Opt-in only, post-conversion, client owns the WABA.
- KSA PDPL: capture opt-in consent before any lead enters a Dengage marketing journey.
- Universal role check: confirm the contact still holds the role and owns CRM, marketing, digital, or
  the P&L before sending. Suppress and refill if they have moved on.
- Language: English by default for these markets. Match the prospect's language when clearly Turkish or
  other (CLAUDE.md Section 1).

---

## 9. Pre-send self-check (run before emitting every message)

- [ ] Opens warm: names their specific current move AND is genuinely kudos, not a flat restatement.
- [ ] The five movements are in order (6.0): warm hook, brands-and-accolade intro, hedged stack read,
      a couple of concrete deliverables, warm close.
- [ ] Intro leads with the "Composable AI Marketing Platform" descriptor, THREE+ verified client names
      (segment-matched, geography-annotated), and exactly ONE rotated G2 accolade ("#1" numeral where
      it is a number-one). No client-plus-accolade pairing repeated within the batch.
- [ ] The stack read is HEDGED, not stated as fact. The web-side-only limit is acknowledged.
- [ ] Any named incumbent is corroborated by two independent sources (Section 3.9), or flagged
      `[VERIFY]` and softened. It is framed as coexistence or a fair comparison, never an attack, and
      makes no claim about what the incumbent cannot do.
- [ ] The close is warm, not "I'll be straight": no naive stack question, no call ask, no "no meeting"
      tactic, no "whoever owns it" delegation. Varied, not templated.
- [ ] Dengage is named once. No banned vendor-speak. "What we do" is two concrete deliverables, not a
      feature parade. Written as Salil, never the founder frame.
- [ ] No verified customer METRIC at touch 1 (metrics are touch 2). Any metric used later is verified
      and geography-annotated.
- [ ] No em or en dashes. No rule of three. No "not X but Y". No colon enumerations. No filler.
- [ ] No GCC customer logo implied. Deterministic identity only if identity is mentioned. Uptime 99.9%
      only if mentioned. KSA cites GCP Dammam. No internal module codes.
- [ ] Role and seniority verified. Multi-thread target recorded if the buyer is wrong.
- [ ] Within the word limits (email 110 to 140, LinkedIn 50 to 80). LinkedIn has no connect note.
- [ ] Every uncertainty surfaced as a flag, not hidden.

If any box fails, revise before output.

---

## 10. Output format

Two modes, same as v1.1.
- Interactive (human review): markdown per lead with Lead, Tier, Hook, Stack (sourced and corroboration
  status), Angle, the assets, and Flags.
- Automation (API and orchestrator): strict JSON with contact, account, tier, hook, stack_findings,
  angle, brands_used and accolade_used (present at touch 1), metric_used (null until touch 2), the asset
  fields, and flags. For a batch, also produce a tracker and a message library ready to drop into
  sequencing.

Show drafts inline in chat by default. Persist to a file or Zoho only when the human approves.

---

## 11. Worked examples (final v1.2 voice anchors, from the batch-06 banks)

These three show the five-movement structure (6.0): warm kudos, brands-and-accolade intro up top,
hedged sourced stack read, a couple of concrete deliverables, warm close. The first has a sourced stack
but no nameable competitor; the second and third name a corroborated incumbent as coexistence.

### BisB, Nasser Alawadhi (Head of Digital Banking): sourced stack, no competitor named
> Subject: Best Islamic Digital Bank, and what acts on it
> Hi Nasser,
> Congrats on Best Islamic Digital Bank, and on the Tarabut and instant in-app financing launches.
> I'm Salil from Dengage, the Composable AI Marketing Platform behind Meezan, Fibabanka and Akbank
> across Pakistan and Turkey, and G2's #1 personalization engine this year.
> From the outside it looks like you already watch behaviour with Contentsquare and run a Kore.ai
> assistant up front, so the front door is well covered. What I can't tell from here is whether anything
> acts on that in real time, turning a signal into a timely, personal next step per customer. What runs
> in the app is invisible to me anyway.
> That is the part we do, unifying your data into one live profile and triggering the next best action
> for each customer in real time.
> Since digital banking is your area, if it's worth a conversation, I'd welcome it.
> Best, Salil

Why it works: warm kudos, proof up top (three logos plus a #1 accolade), the sourced stack read
(Contentsquare and Kore.ai, both corroborated) is hedged, two concrete deliverables, warm close with no
"I'll be straight".

### SAIB, Nader Al Khawaja (Chief Transformation Officer): Oracle named as coexistence
> Subject: Strategy 2027, and the layer on top of Oracle
> Hi Nader,
> Strategy 2027 putting digital and customer experience at the centre is a clear line in the sand for
> SAIB, well done on setting it.
> I'm Salil from Dengage, the Composable AI Marketing Platform behind Isbank, Akbank and Fibabanka in
> Turkey, and G2's #1 for time to value this year.
> From the outside it looks like you have unified your CRM on Oracle Fusion, a solid system of record.
> Where we tend to sit is the layer on top of it, turning what Oracle knows about a customer into a
> real-time, personal next step rather than a batch campaign. Oracle holds the record, we act on it.
> What runs in your app I can't see.
> For a Saudi build we keep data in-country on GCP Dammam. If it's worth a conversation, I'd welcome it.
> Best, Salil

Why it works: the incumbent (Oracle Fusion, corroborated by a case study and LinkedIn) is named as the
system of record we coexist with, "Oracle holds the record, we act on it", with no claim about what
Oracle cannot do. KSA carries the GCP Dammam line.

### Bank Nizwa, Ahmed Al-Waily (Head of Marketing): a research correction, Avanza as coexistence
> Subject: Apple Pay live, and the layer on top of your CRM
> Hi Ahmed,
> Getting Apple Pay and the Tranna app out shows Bank Nizwa moving fast on the things customers actually
> feel. That is great to see, well done.
> I'm Salil from Dengage, the Composable AI Marketing Platform behind Meezan, Bank Islami and UBL across
> Pakistan, and a top-5 CDP on G2 this year.
> From the outside it looks like you already run a CRM/CEM platform, so the foundation is there. What I
> can't tell from here is whether it acts in real time, turning an Apple Pay first use or an app signal
> into a timely, personal nudge that builds a habit, rather than a scheduled campaign.
> That real-time layer is the part we do, and it sits on top of the CRM you already have rather than
> replacing it, unifying each customer into one live profile and triggering the next best step.
> Since marketing is your area, if it's worth a conversation, I'd welcome it.
> Best, Salil

Why it works: the SERP layer (3.6) found Bank Nizwa runs Avanza Unison ACE CRM/CEM, which CORRECTED an
earlier "retention thin" read that would have insulted him. The opener coexists ("on top of the CRM you
already have"), and keeps Avanza unnamed here only as a length choice; naming it is allowed (6.4).

---

## 12. Evidence base and how much weight it carries

The voice is calibrated on 35 verified converting cold openers (one CBDO, Telegram outbound, Russia,
CIS, Kazakhstan, Uzbekistan, June 2025 to July 2026), filtered from 525 reply threads to those that
drew three or more substantive replies. Read it honestly: one rep, one region, one channel, and a reply
is a conversation started, not a deal closed. What ports to us is the METHOD (trigger-first, tentative
about them, honest incumbent wedge, question or offer over a demo ask). What does NOT port is the market
(their incumbent was Mindbox, logos were CIS brands) or the CxO dynamic (their targets were mid-level
managers who talk shop; ours are bank CxOs who will not explain their architecture to a stranger, which
is exactly why the naive diagnostic-question close is banned in Section 6.5). Validate against our own
reply data in `data/outreach-runs/` before treating any of this as settled.

---

## 13. Open items being finalized (do not treat as closed)

- CLOSED 22 July 2026, Close register: locked in Section 6.6. "I'll be straight" is retired; the close
  is warm (owner-direct, bake-off, or plain offer).
- CLOSED 22 July 2026, Incumbent-naming carve-out: SIGNED by Salil (session 01QUz6uSs9Y6odZgX79RASFj).
  Competitors may be named under the Section 6.4 rules (corroborated, coexistence, no unverifiable
  negative, never disparaging).
- CLOSED 22 July 2026, Messaging framework: consolidated into Section 6 (the five-movement structure,
  proof-leads reversal, warm close, incumbent-naming method, and the multi-touch ladder). No rule from
  session 01QUz6uSs9Y6odZgX79RASFj is now held only in chat.
- Batch-05 specifics still open: QIB MailJet/Mandrill pending a DNS SPF/MX check; SNB multi-thread past
  the Corporate Relations buyer; whether SNB's first touch carries the GCP Dammam residency line.

---

## 14. File and tool index

- `CLAUDE.md`: constitution, verified constants, guardrails. Always applies.
- `prospecting_engine_v1.2_21July.md`: THIS file, the active outreach rulebook.
- `OLD DOCS/`: archived and NOT to be used. Holds the superseded `PROSPECTING_ENGINE.md`,
  `COLD_OPENER_TEARDOWN.md`, and `PROSPECTING_SESSION_HANDOFF.md`. Their live conclusions are folded in
  here.
- `knowledge-base/` and `infosec/`: authoritative product, case-study, and security sources. Still the
  only place claims and proof come from.
- `data/outreach-runs/`: batch records, trackers, send-style, and stats.
- `data/gulf-banking-icp/`: the target universe and persona coverage.
- Research tools (Section 3, one owner per insight, keys as repository secrets): Apollo (buyer,
  firmographics, backend senders), urlscan `URLSCAN_IO_API` and Lookyloo (client-side stack and cookie
  corroboration), Apify `APIFY_API` (consent-gated martech via the CSP header), ScrapingDog
  `SCRAPINGDOG_API` and Serper `SERPER_API` (announced partnerships, incumbent corroboration,
  server-side vendors, group tree, look-alikes), Firecrawl `FIRECRAWL_API` (triggers and executive
  quotes), JobsPipe `JOBS_PIPE_API` (hiring intent), WebReveal (free tech triage), DNS for ESP
  verification. Rejected as duplicative: Microlink, DuckDuckGo MCP, ScrapingDog LinkedIn Jobs.
