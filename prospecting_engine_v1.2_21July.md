# prospecting_engine_v1.2_21July.md: Stack-Led, CxO-Grade Cold Outreach (Operating Instructions)

> STATUS: ACTIVE and MANDATORY as of 21 July 2026. This is the single source of truth for all lead
> outreach. It supersedes `PROSPECTING_ENGINE.md` (v1.1), `COLD_OPENER_TEARDOWN.md`, and
> `PROSPECTING_SESSION_HANDOFF.md`, all now archived in `OLD DOCS/` and NOT to be used.
>
> UPDATED 22 July 2026: Section 3 was rebuilt into the de-duplicated pre-draft intelligence pipeline
> (one tool per insight, keys held as repository secrets, see Section 3.0). The messaging framework is
> unchanged here; its cross-session consolidation is tracked as an open item in Section 13.
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
plus a generic value line, an assertive senior-architect voice, a proof logo at first touch, and a
soft call ask. Senior bankers pattern-matched that as an ad. v1.2 leads with the prospect's real,
multi-source-verified stack, hedges the read of their situation while staying confident about us,
names the incumbent honestly as the wedge, holds proof until asked, and closes straight without a
sales tactic. The method is drawn from a 35-opener converting corpus (see Section 12) adapted from its
original CIS mid-level-manager context to our real target, the GCC and MENA bank CxO.

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

### 6.1 Trigger first
Sentence one names the verifiable recent move: a launch, an award, a campaign, a new segment, a
regulatory or product milestone. Be confident about their achievement.

### 6.2 Assertive about us, tentative about them
Never hedge our own capability. State what Dengage does as fact. Be deliberately tentative about the
prospect's situation, which we are reading from the outside with imperfect tools. Use honest hedges:
"I only have the outside view, so I could be reading it wrong", "as best I can tell from the public
web", "what runs inside the app I can't see, and that is usually where this lives". This is honesty and
it is also the single most repeated winning move in the corpus. It is not weakness, it is accuracy.

### 6.3 The honest incumbent wedge
Name the incumbent stack only when we actually observe it and it is corroborated (Section 3.9). Name it
to frame the gap and ask nothing accusatory. Never assert an unverifiable negative about a competitor
as fact. Never disparage by name. Competitors to differentiate against without naming negatively:
Adobe, Salesforce Marketing Cloud, Sitecore, Braze, CleverTap, MoEngage, Insider, Bloomreach, Emarsys,
Netcore, WebEngage. NOTE: naming a competitor at all, even neutrally, needs the go-to-market carve-out
to CLAUDE.md Section 5 signed off before it ships (Section 13, open item).

### 6.4 Peer register, Dengage named once, no vendor-speak, no proof at first touch
- Write as one senior operator comparing notes with another, not as a pre-sales architect pitching.
- Name Dengage exactly once, humbly. BANNED phrases: "we give banks the layer that turns...", "the
  activation layer we run for banks", "off one profile across every channel", and any channel list
  used as a feature parade.
- No proof logo or metric at first touch. Hold Meezan, Bank Islami, Isbank, Akbank, Fibabanka, Burgan,
  and MCB for when they ask who we work with. When used later, annotate geography every time and never
  imply a GCC customer logo (we have none: CLAUDE.md Section 4).
- The rep writes as the rep (Salil). Never impersonate a founder to borrow the frame.

### 6.5 The close (straight, senior, no tactics)
The close must be honest and straight, matching the honesty of the body. It owns that the message is
cold (CLAUDE.md Section 10) and states plainly what we want. It is varied per lead so it never becomes
a template.

HARD BANS in the close:
- No naive diagnostic question that asks them to explain their own stack ("how is it set up?", "where
  does that sit?"). At CxO level this asks a stranger to hand over internal architecture, and for a
  bank it can read as reconnaissance.
- No salesy meeting ask ("would a short call be worth your time?").
- No sales tactics or fake reassurance ("no meeting, just the thinking", "no commitment").
- No lame delegation fishing ("or whoever owns that on your side").

ACCEPTABLE straight forms (choose one, vary the wording per lead):
- Own the cold approach plus a plain statement of intent: "A cold email is a cold email, so I'll be
  straight: if that gap is worth a conversation, I'd like to have it."
- A plain, specific offer with no tactic attached: "If it's useful, I can share how we'd approach it."
- Where the contact clearly owns the area, address that directly and confidently: "Since it's your
  area, I'll be straight: if it's worth a conversation, I'd welcome it."

### 6.6 Anti-AI-tell hard bans (this is what keeps it human)
- No em dashes or en dashes anywhere. Commas, colons, periods, or rephrase.
- No rule-of-three lists used for rhetorical effect.
- No "it's not X, it's Y" antithesis.
- No colon-led enumerations in the body.
- No corporate filler: leverage, elevate, unlock, seamless, in today's fast-paced landscape.
- Vary sentence openings across the message and across the batch. Contractions are fine.

### 6.7 Length
As short as it can be. LinkedIn connection note under 300 characters. Email and LinkedIn message body
in the 60 to 140 word range, and every clause you add must be about them, not us. Aim for about 90.

---

## 7. Verified-proof-swap gate (bake into every run)

Before any opener ships, every logo, award, geography, and customer count is checked against the
CLAUDE.md Section 2 and Section 4 verified constants. Fibabanka is 4.45M+, not 2M. Burgan is Turkey and
MENA, roughly a million messages a day. Uptime is 99.9% only. No Wizz Air. No Sao Paulo office.
Deterministic identity only. KSA equals GCP Dammam for residency. Vertical-matched verified proof, held
until asked: banking to Burgan, Fibabanka, MCB, or UBL (all geography-annotated); Islamic banks to
Meezan or Bank Islami; conventional to Isbank or Akbank. Route any commercial figure to Salil Gupta and
any security item to Koksal for sign-off.

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

- [ ] The hook is specific, current, and verifiable, and leads with the real stack where sourced.
- [ ] The stack read is HEDGED, not stated as fact. The web-side-only limit is acknowledged.
- [ ] Any named incumbent is corroborated by two independent sources (Section 3.9), or flagged
      `[VERIFY]` and softened.
- [ ] The close is straight: owns the cold approach, no naive stack question, no call ask, no "no
      meeting" tactic, no "whoever owns it" delegation. Varied, not templated.
- [ ] Dengage is named once, humbly. No banned vendor-speak.
- [ ] No proof logo or metric at first touch. Any later proof is verified and geography-annotated.
- [ ] No em or en dashes. No rule of three. No "not X but Y". No colon enumerations. No filler.
- [ ] No GCC customer logo implied. Deterministic identity only if identity is mentioned. Uptime 99.9%
      only if mentioned. KSA cites GCP Dammam. No internal module codes.
- [ ] Role and seniority verified. Multi-thread target recorded if the buyer is wrong.
- [ ] Within the word and character limits.
- [ ] Every uncertainty surfaced as a flag, not hidden.

If any box fails, revise before output.

---

## 10. Output format

Two modes, same as v1.1.
- Interactive (human review): markdown per lead with Lead, Tier, Hook, Stack (sourced and corroboration
  status), Angle, the assets, and Flags.
- Automation (API and orchestrator): strict JSON with contact, account, tier, hook, stack_findings,
  angle, reference_used (null at first touch), the asset fields, and flags. For a batch, also produce a
  tracker and a message library ready to drop into sequencing.

Show drafts inline in chat by default. Persist to a file or Zoho only when the human approves.

---

## 11. Worked examples (v1.2 voice anchors, calibrated to the batch-05 banks)

### QIB, Dinos Constantinides (Chief Strategy and Chief Digital Officer)
> Subject: your NBO engine, and where it gets delivered
> Hi Dinos,
> Your Next Best Offer engine taking the Global Finance AI award is the kind of thing most banks are
> still slideware on. I only have the outside view, so I could be reading it wrong, but from the public
> web it looks like measurement sitting on the site and not much stitching the NBO decisions across
> app, email and web into one journey per customer. What runs inside the app I can't see, and that is
> usually where this lives. Closing the gap between the decisioning and the delivery is what we do at
> Dengage. A cold email is a cold email, so I'll be straight: if that gap is worth a conversation, I'd
> like to have it.
> Best, Salil

Why it works: trigger first, stack read hedged, no proof logo, Dengage named once, straight close that
owns the cold approach.

### Emirates Islamic, Hassaan Munir (Head of Products, Digital and Personal Banking)
> Subject: the Amazon card, and the Adobe stack behind it
> Hi Hassaan,
> Saw your post on the Amazon co-branded card, genuinely sharp Shariah-first play. From the outside it
> looks like you already run a heavy stack, Adobe Experience Cloud with Sitecore on the web, so tooling
> is not the issue. What I'd want to know in your seat is whether Adobe carries the post-activation card
> journeys in real time, first spend then habit, or whether that still goes out as batch. That
> real-time, per-customer piece is where enterprise stacks quietly fall back to batch. Running that
> layer alongside Adobe is what we do at Dengage. If it's useful, I can share how banks have done it.
> Best, Salil

Why it works: the named incumbent (Adobe) is corroborated by two independent sources, the wedge is coexistence not
displacement, and the close is a plain offer with no tactic.

### OAB, Ziad Alshami (Head of CRM and Data Analytics, Retail)
> Subject: Elite Exclusive, and where it gets activated
> Hi Ziad,
> Instant issuance and the Elite Exclusive segment are the kind of thing that pays off in the CRM and
> data layer you own. As best I can tell from the outside, and I only see the public web, it looks like
> WordPress and Google tags, with nothing there turning a segment like Elite Exclusive into a timely,
> personal action per customer. What sits behind it, in the app or your CRM, I can't see. Turning a
> segment like that into revenue off one live profile is what we do at Dengage. Since it's your area,
> I'll be straight: if it's worth a conversation, I'd welcome it.
> Best, Salil

Why it works: best persona fit, the stack read is humble, and the close addresses the owner directly
without delegation fishing.

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

- Close register: both acceptable forms in Section 6.5 are approved in principle. The default register
  is still being locked with Salil.
- Incumbent-naming carve-out: naming a competitor even neutrally needs the go-to-market sign-off on the
  CLAUDE.md Section 5 carve-out before it ships.
- Batch-05 specifics still open: QIB MailJet/Mandrill pending a DNS SPF/MX check; SNB multi-thread past
  the Corporate Relations buyer; whether SNB's first touch carries the GCP Dammam residency line.
- Messaging framework: the cross-session messaging-framework discussion (external session
  01QUz6uSs9Y6odZgX79RASFj) is to be consolidated into Sections 5 and 6 so no rule is lost across
  sessions. PENDING the human supplying that content; it cannot be read from another session and must
  not be reconstructed from memory.

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
