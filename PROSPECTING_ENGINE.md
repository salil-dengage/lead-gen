# PROSPECTING_ENGINE.md: Hyper-Personalized Outreach (Operating Instructions)

> Companion to CLAUDE.md. Read this in full before generating any lead outreach: LinkedIn
> messages, cold email, connection notes, or a batch built from a Zoho or Apollo export.
>
> Everything in CLAUDE.md still applies here without exception: Section 2 verified constants,
> Section 3 content rules, Section 5 tone, Section 6 honesty posture, and Section 9
> differentiators. This file adds only one thing: the method for turning a single lead into
> outreach that reads like a sharp human SDR who did real homework.
>
> Division of labour to keep straight: personalization comes from researching the prospect.
> Proof comes from the verified knowledge base. Never invent proof to fill a personalization gap.

---

## 0. When this file applies

Trigger this workflow for any task that takes a lead or a list and produces outreach:

- A single contact (name, title, company, or a LinkedIn profile the user pastes).
- A Zoho CRM segment or an Apollo / Lusha CSV export.
- A request like "write outreach for X", "sequence these leads", "personalize for this account".

The measure of success is one real, research-earned hook per lead. Volume is never the goal.
A generic message sent to ten people is a failure even if all ten are technically personalized fields.

---

## 1. The one non-negotiable principle: one earned hook per lead

Every message is built on a single specific, verifiable, current observation about that company.

- Good hook (specific, checkable, current): "you run Salla for commerce and SendGrid for email",
  "600k customers and a 2-minute onboarding since your December 2024 launch", "your data sits in
  Snowflake but campaigns still look broad".
- Bad hook (generic, could be sent to anyone): "I help brands improve engagement", "personalization
  is key in retail", "I wanted to introduce our platform".

If research does not surface a specific hook, do not fall back to generic copy. Flag the lead
`[NEEDS RESEARCH]` and stop. A missing hook is a research problem, not a writing problem.

---

## 2. Research protocol (run for every lead before writing a word)

Use web search and web fetch. Read the enrichment already in Zoho / Apollo / Lusha first, then fill
gaps from the open web. Gather five things:

1. **Company:** what they actually sell, their brands, size, and markets.
2. **Digital footprint:** website, mobile app presence (App Store and Play Store), and recent app
   reviews. Negative reviews about delays, onboarding, or notifications are engagement pain signals
   and make strong hooks.
3. **Martech, CDP, and messaging stack:** pull from enrichment fields, verify against the site if
   needed. Read the stack for signals:
   - Amazon SES or SendGrid: send-only infrastructure, no orchestration. Upgrade signal.
   - Segment, Snowflake, Databricks, Mixpanel: data is captured but activation is likely manual.
   - Salla, Shopify, BigCommerce: commerce platform in place, engagement layer usually missing.
4. **Trigger and recency:** funding, launch, new executive, market expansion, a campaign, or a job
   posting for a martech / CRM role. A company hiring to build in-house is a displacement window.
5. **Channel gap:** what they are clearly not yet doing (owned lifecycle, cross-brand unification,
   consent and PDPL handling, real-time journeys).

Record the single strongest hook. Everything else in the message supports it.

---

## 3. Scoring and tiering (effort follows tier, never equal effort for all)

Score each lead on three axes: ICP fit, buyer fit (is this the economic buyer), and trigger
strength. Assign a tier:

- **Tier A:** engagement is existential for the business (app-led fintech or bank, recent launch,
  fast growth) and the contact is a real buyer. Highest priority, richest personalization.
- **Tier B:** strong ICP (retail, fashion, luxury, telecom) with a clear stack gap. Standard depth.
- **Tier C:** qualify before investing. Either public data is thin (confirm what they sell before
  writing), or the contact is the wrong seniority. If seniority is wrong, multi-thread: find the
  economic buyer (Head of Marketing, CRM, Growth) and keep the original contact as a champion.
- **Tier D:** off-ICP. Example: a mature B2B SaaS already running Segment, Mixpanel, and Salesforce.
  Either switch to a different angle (their own user engagement) or drop the lead. Say so honestly.

---

## 4. Persona to angle (match the message to the buyer's job)

| Contact function | Lead angle | Dengage capability, in plain business language |
|---|---|---|
| Marketing / Brand | Single customer view, campaign efficiency | Unify fragmented data, then message off one profile |
| Digital / Growth | Data activation, real-time journeys | Turn captured data into automated cross-channel journeys |
| UX / Product | Onboarding, in-app engagement | Drive activation and retention across push and in-app |
| C-suite (CCO / CMO) | Revenue, retention, expansion | Lifecycle that moves users from active to expanded |
| CRM / Lifecycle | Orchestration, deliverability | Owned channel infrastructure and journey orchestration |

Describe the capability in business terms. Never print internal module codes (see CLAUDE.md Section 8).

---

## 5. Dengage angle library (verified positioning only)

Map the prospect's situation to a real differentiator from CLAUDE.md Section 9, and attach the
closest verified reference from CLAUDE.md Section 4 with its geography annotation. Use only what the
knowledge base documents.

- **Multi-brand retail, fragmented customer data:** deterministic identity resolution and Contact
  Unification, native CDP rather than a bolt-on. References: Şok Market, 15.1M profiles (Turkey,
  FMCG); anonymous fashion, 7x revenue growth.
- **Send-only email infrastructure (SES, SendGrid):** owned email and WhatsApp infrastructure with
  no third-party ESP dependency, journeys plus Zeki AI send-time optimization.
- **KSA bank or fintech:** GCP Dammam in-country data residency for PDPL, deterministic identity,
  and owned WhatsApp (Dengage is a Meta Tech Provider, the client owns the WABA). References:
  Burgan Bank, ~1M messages per day (Turkey, banking); Fibabanka, 4.45M customers on-premise
  (Turkey, banking); MCB Funds (Pakistan, regulated). Annotate geography every time. Do not imply a
  GCC customer logo: there is no confirmed GCC reference client (CLAUDE.md Section 4).
- **Data in a warehouse (Snowflake, Databricks) but broad campaigns:** Zero Data Copy via Remote
  Source querying, plus the activation and journey layer on top.
- **App-led lifecycle:** predictive scores (Likelihood to Churn, Likelihood to Buy, Best Time) with
  push and in-app messaging.

Cite only verified metrics. Annotate geography. Flag anything you cannot source `[VERIFY]`. Route
commercial figures to Salil Gupta and security items to Köksal (CLAUDE.md Section 6).

---

## 6. Message construction rules

Inherit CLAUDE.md Section 3 and Section 10. Specifics for each asset:

- **LinkedIn connection note:** under 300 characters. One hook, no pitch.
- **LinkedIn message 1:** three to four sentences. Structure: observation (the hook), the implied
  problem, one line of value, a soft ask ("worth a quick chat?"). Under 100 words.
- **LinkedIn follow-up:** shorter than message 1. Add one new angle or one proof point. No guilt,
  no "just bumping this".
- **Email 1:** a specific, non-salesy subject line plus a four to five sentence body. One verified,
  geography-annotated reference is optional. Soft CTA. Sign off with the sending rep, or `[Your name]`
  as a placeholder.
- **Email 2:** two to three sentences, one concrete win, soft close.

Language: English by default for these markets' outreach. Match the prospect's language when the
context is clearly Turkish or another language (CLAUDE.md Section 1).

**Anti-AI-tell hard bans (this is what keeps it human):**
- No em dashes or en dashes anywhere. Commas, colons, periods, or rephrase.
- No rule-of-three lists.
- No "it's not X, it's Y" constructions.
- No neat antithesis or colon-led enumerations in the body.
- No corporate filler: leverage, elevate, unlock, seamless, in today's fast-paced landscape.
- Vary sentence openings. Contractions are fine. Write like one person who did their homework.

---

## 7. Compliance guardrails (bake into every run)

- **LinkedIn:** manual send only. Never propose bot automation or credential sharing. Automation
  breaks LinkedIn's User Agreement and risks the account. The model is: the machine prepares and
  reminds, the human sends.
- **Email:** one-to-one and personal, never a bulk blast. Warmed sending domain, SPF, DKIM, DMARC,
  low daily volume.
- **WhatsApp:** not for cold outreach. Opt-in only, delivered post-conversion through Dengage, where
  the client owns the WABA.
- **KSA PDPL:** capture opt-in consent before any lead enters a Dengage marketing journey. This is
  operational guidance, not legal advice; the DPO confirms specifics.

---

## 8. Output format

Two modes. Ask which is wanted if unclear; default to interactive for a single lead, automation
schema for a batch destined for the orchestrator.

**(a) Interactive (human review):** markdown per lead.
```
Lead: <name>, <title>, <account>   |   Tier: <A/B/C/D>
Hook: <one line, the specific observation>
Angle: <persona angle> + <verified reference used, geography-annotated>
LinkedIn connect note: ...
LinkedIn message 1: ...
LinkedIn follow-up: ...
Email 1 - Subject: ...
Email 1 - Body: ...
Email 2 - Subject: ...
Email 2 - Body: ...
Flags: [VERIFY] / [NEEDS RESEARCH] / none
```

**(b) Automation (API and orchestrator):** return strict JSON matching this schema. This is the same
contract the `/v1/messages` structured-output call returns and writes back to Zoho fields.
```json
{
  "contact": "string",
  "account": "string",
  "tier": "A|B|C|D",
  "hook": "string",
  "angle": "string",
  "reference_used": "string | null",
  "li_connect_note": "string (<=300 chars)",
  "li_message_1": "string",
  "li_follow_up": "string",
  "email_1_subject": "string",
  "email_1_body": "string",
  "email_2_subject": "string",
  "email_2_body": "string",
  "flags": ["string"]
}
```

For a batch, also produce a tracker (one row per lead with status columns) plus a message library,
so the output is ready to drop into a sequencing tool.

---

## 9. Execution workflow for Claude Code

Given a lead or a list file:

1. Parse the input. If it is a CSV or Zoho export, read it and filter the target segment.
2. For each lead, run the research protocol (Section 2) using web search and web fetch.
3. Assign a tier (Section 3). If Tier C on seniority, record the multi-thread target.
4. Select the persona angle (Section 4) and the verified reference (Section 5).
5. Generate the five assets (Section 6).
6. Run the pre-send self-check (Section 10) and fix every violation before emitting.
7. Output in the requested mode (Section 8). Persist the messages: write them to a file or back to
   Zoho fields so they are reusable, not stranded in chat.

---

## 10. Pre-send self-check (run before emitting every message)

- [ ] The hook is specific and verifiable, not generic.
- [ ] No em dashes or en dashes.
- [ ] No AI-tell patterns (rule of three, "not X but Y", colon enumerations, filler words).
- [ ] Every metric is verified and geography-annotated.
- [ ] No GCC customer logo implied.
- [ ] No internal module codes in the copy.
- [ ] Uptime stated as 99.9% only, if mentioned.
- [ ] Deterministic identity only, if identity is mentioned.
- [ ] KSA context cites GCP Dammam for residency.
- [ ] CTA is soft and single.
- [ ] Within the word and character limits.
- [ ] All uncertainties surfaced as flags, not hidden.

If any box fails, revise before output. Do not emit a message that fails the check.

---

## 11. Worked examples (voice anchors)

These are calibrated to the rules above. Study the "why it works" note, not just the copy.

### Example A. Tier A, KSA digital bank, UX buyer
Hook: 600k customers and a 2-minute onboarding since a December 2024 launch.
> Hi Anthony, what D360 has pulled off since launch is hard to ignore, 600k customers on a 2-minute
> onboarding. The next battle is in-app: moving people from account-open to first transaction to
> active, and keeping the travel and FX use cases front of mind. Regulated banks run exactly that
> engagement layer on Dengage. Burgan Bank pushes around a million messages a day through it (Turkey),
> and for a KSA bank we hold data in-country on GCP Dammam for PDPL. Worth comparing notes?

Why it works: the hook is specific and current; the angle matches a UX buyer (in-app activation); the
proof is a verified, geography-annotated banking reference; the KSA residency point is real and
differentiating; no GCC customer is implied; no em dashes, no filler.

### Example B. Tier B, luxury retail, brand buyer, send-only stack
Hook: Salla for commerce and SendGrid for email.
> Hi May, Abdul Samad Al Qurashi has exactly the kind of high-value, repeat customer that rewards
> real personalization. Right now the setup looks like Salla for commerce and SendGrid for email,
> which sends fine but does not segment or run journeys. Dengage adds the segmentation, owned email
> infrastructure, and send-time optimization on top, so reorder timing and VIP tiers actually drive
> revenue. Worth a short conversation?

Why it works: the hook names their real stack; the gap (send-only) is read correctly; the value ties
to luxury economics (reorder, VIP); the differentiators are verified (owned infrastructure, Zeki AI
send-time); soft CTA.

### Example C. Tier B, multi-brand retail conglomerate, marketing buyer
Hook: many brands under one holding, so the customer is fragmented across systems.
> Hi Hany, I've been following how many brands Ajlan & Bros now spans, from the heritage textile
> lines through to tiqmo. At that scale the same customer usually exists as a separate record in
> every brand. Dengage unifies that into one deterministic profile, then messages off it. Şok Market
> runs 15.1M unified profiles this way (Turkey, FMCG). Open to a quick chat about the direct-selling
> brands first?

Why it works: the hook is drawn from their real structure; the angle is a single customer view for a
marketing buyer; identity is described as deterministic (correct); the reference is verified and
geography-annotated; the CTA narrows to a sensible starting point.
