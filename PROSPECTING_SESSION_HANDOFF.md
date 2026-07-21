# Prospecting Session Handoff (read this first)

> Purpose: carry the full context of the cold-outreach personalization work into a fresh Claude Code
> session, because a new session is needed for the updated network egress policy to take effect. Read
> this file completely, then read `CLAUDE.md`, `PROSPECTING_ENGINE.md`, and `COLD_OPENER_TEARDOWN.md`.
> Branch: `claude/prospecting-engine-background-f4xs5c`. Sender is Salil Gupta (Sr. Director, Middle
> East), salil@dengage.com, sign-off "Best, Salil".

## 1. Where we are, in one paragraph

We studied 35 converting cold openers (a Telegram/Russia-CIS SDR set) and wrote `COLD_OPENER_TEARDOWN.md`.
We then rebuilt batch-05's 10 Gulf/Egypt banking openers under that guidance. Salil's verdict: still
too salesy, and we were not doing real tech-stack research. Two things came out of that: (a) a sharper
non-salesy voice (Section 3 below), and (b) a working way to pull each prospect's actual martech stack
and lead the opener with it. The stack research is the unlocked piece. This session must get the egress
policy live, pull the real stacks for all 10, rebuild the openers on them, and only then agree the
final personalization direction with Salil.

## 2. The mission (unchanged)

Turn each lead into an opener that reads like a sharp human who did real homework, not a vendor pitch.
One earned, verifiable hook per lead. All `CLAUDE.md` guardrails apply. `COLD_OPENER_TEARDOWN.md`
holds the four-question analysis and the revised approach (trigger-first, hedged about their situation
but assertive about us, question-as-CTA, honest incumbent wedge, verified-proof-swap gate).

## 3. The non-salesy voice (the refinement beyond the teardown doc)

Salil rejected even the "new approach" copy as salesy. The tell is the shape: compliment the launch,
then "We give banks the layer that turns...", then a proof logo, then "Would a call be worth your
time?" Senior bankers pattern-match that as an ad in one glance. Vendor-speak ("the activation layer
we run for banks", "off one profile across every channel") and the logo-drop are the smell.

Reusable pattern that reads as human:
1. Subject: plain and specific, or genuinely curious. Never a value proposition.
2. Line 1: one verifiable fact about their stack or a recent move. No compliment padding.
3. Line 2: a real question about where their engagement or decisioning layer sits. This surfaces the
   incumbent and earns the reply.
4. One short line naming Dengage once, humbly. No "we give banks the layer".
5. No proof logo at first touch. Save Meezan/İşbank/Fibabanka for when they ask who we work with.
6. Close on the question, not a call. Under about 90 words.
Voice = Salil's real senior register, curious and comparing notes. Never impersonate a founder.

## 4. Tooling and research method (the unlocked part)

### Network egress
- Salil enabled all domains in the environment network policy. It binds at container start, so it was
  NOT live in the previous session (urlscan.io kept returning 403). THIS new session should have it
  live. Verify first: `curl -sS "$HTTPS_PROXY/__agentproxy/status"` and a test call to
  `https://urlscan.io/api/v1/search/?q=domain:qib.com.qa&size=3`. If it still 403s, tell Salil the
  policy has not propagated and do not route around it.
- Direct reads of the bank sites 403 (their WAF blocks datacenter IPs). Do NOT rely on fetching bank
  domains directly. Use urlscan (scans from its own infra) or Apollo.

### urlscan.io (script-level stack, once egress is live)
- Search existing public scans: `GET https://urlscan.io/api/v1/search/?q=domain:DOMAIN&size=5`
- Fetch a result: `GET https://urlscan.io/api/v1/result/{uuid}/` then read `meta.processors.wappa`
  (Wappalyzer technologies) and `lists.domains` (all contacted hosts, which reveal martech via
  third-party requests: segment, tealium, adobedtm/demdex/omtrdc, useinsider, moengage, smartech,
  webengage, clevertap/wzrkt, braze/appboycdn, emarsys/scarab, exponea, klaviyo, onesignal,
  urbanairship, lemnisk, etc). urlscan adds app-adjacent and push signals Apollo can miss.

### Apollo org-enrichment (already proven to return the stack, works via MCP regardless of egress)
- `apollo_organizations_enrich(domain)` returns `technology_names` and `current_technologies`
  (each with a category). 1 credit per found company. This is the fastest stack source and it worked
  in the prior session. Caveat: it reflects the public web properties; the mobile-app push/in-app
  vendor may differ and not appear. Phrase openers as "on the web side" to stay honest.
- Apollo MANDATORY confirmation: before any paid Apollo call, state the exact credit cost and get
  Salil's approval. Enrich is 1 credit per company; job postings 1 credit per org; searches 1 credit.
- Job postings (`apollo_organizations_job_postings(id)`) were pulled for 5 orgs and found NO
  CRM/martech hire (thin). Do not rely on them for these banks; the stack data is the signal.

## 5. Batch-05 roster (the 10 leads) and known org IDs

Full copy of the shipped openers and the (rejected-as-salesy) rewrites is in
`data/outreach-runs/batch-05/01_initial_2026-07-20_approach-comparison.md`. Touch 1 already SENT
2026-07-20; this is an evaluation, not a re-send. Apply any approved new approach from batch-06 and
batch-05 touch 2.

| # | Lead | Title | Bank | Country | Domain | Apollo org ID | Persona note |
|---|---|---|---|---|---|---|---|
| 1 | Hassan Al-Omran | Head of Corporate Relations | SNB | KSA | alahli.com | 606e9acf53d20100fe309fca | Weak buyer (comms/PR); KSA = GCP Dammam |
| 2 | Hassaan Munir | Head of Products, Digital & Personal Banking | Emirates Islamic | UAE | emiratesislamic.ae | 54a1186469702d5c360d0300 | Islamic; owned by Emirates NBD |
| 3 | Luciano Di Pietro | Head of Digital Banking (tam) | KFH | Kuwait | kfh.com | 5f49863e0451680001782802 | Islamic |
| 4 | Abdullah Al-Tuwaijri | CEO Private, Consumer & Digital | Boubyan | Kuwait | bankboubyan.com | (not yet captured) | Islamic; C-suite |
| 5 | Constantinos "Dinos" Constantinides | Chief Strategy & Chief Digital Officer | QIB | Qatar | qib.com.qa | 54a134ea69702d2f9fe9bd00 | Islamic; CDO |
| 6 | Eiman Al-Naemi | EGM, Chief Comms & Marketing Officer | CBQ | Qatar | cbq.com.qa (site cbq.qa) | (not yet captured) | CMO; LinkedIn since confirmed |
| 7 | Ahmed Taqi | GM Retail Banking | BBK | Bahrain | bbkonline.com | (not yet captured) | Retail |
| 8 | Ziad Alshami | Head of CRM & Data Analytics, Retail | OAB | Oman | oman-arabbank.com | (not yet captured) | BEST persona fit (owns CRM+data) |
| 9 | Sharif Rafei | Head of Retail Banking | NBF | UAE | nbf.ae | 5e284c1620806f008c929ea4 | Email-only (no LinkedIn found) |
| 10 | Karim Morcos | Head of Innovation & Digital Banking | Banque du Caire | Egypt | bdc.com.eg | 54a2428f74686938253bd01a | Ref: Fibabanka (4.45M, Turkey) |

Verified reference to attach by segment (only when asked who we work with): Islamic banks to Meezan
(Pakistan) or Bank Islami; conventional to İşbank/Akbank (Turkey); metrics only for Burgan (~1M
messages/day, Turkey) and Fibabanka (4.45M customers, Turkey). Never imply a GCC customer logo.

## 6. Real stack findings so far (from Apollo enrich, prior session)

**Emirates Islamic (emiratesislamic.ae):** Adobe Experience Cloud (marketing automation) + Adobe Tag
Management + Salesforce (CRM) + Sitecore (CMS) + Google Tag Manager + AWS + Cloudflare + OpenAI.
99.9% owned by Emirates NBD, whose group publicly runs Lemnisk CDP for web personalization. Heavy
enterprise stack. Note `CLAUDE.md` Section 7.7 Sitecore coexistence line ("Sitecore decides, D-engage
acts").

**QIB (qib.com.qa):** MailJet + Mailchimp Mandrill (both email-delivery only) + WordPress + Google
Tag Manager + basic analytics. No CDP, no marketing automation, no orchestration detected on the web
side. Strongest wedge in the batch: an AI/NBO-award-winning bank running send-only mail pipes.

The other 8 banks are NOT yet stack-profiled. Do that first thing (urlscan and/or Apollo enrich).

## 7. The two openers already rebuilt on real stacks (voice reference)

QIB, Dinos Constantinides (CSO/CDO):
> Subject: your NBO engine vs the email stack
> Hi Dinos,
> Your Next Best Offer engine winning at the Global Finance AI awards is the kind of thing most banks
> are still slideware on.
> Which is why one thing caught my eye: on the web side QIB is on MailJet and Mandrill, which are send
> pipes, no orchestration on top. So I am curious where the NBO decisions actually get delivered. All
> inside the app, or is something stitching app, email and web into one journey per customer?
> That stitching layer is what we do at Dengage. Mostly I am trying to understand how you have split
> the intelligence from the delivery.
> How is it set up?
> Best, Salil

Emirates Islamic, Hassaan Munir (Head of Products, Digital & Personal Banking):
> Subject: the Amazon card, and the Adobe stack behind it
> Hi Hassaan,
> Saw your post on the Amazon co-branded card. Genuinely sharp Shariah-first play.
> You have a heavy stack already, Adobe Experience Cloud and Salesforce, with Sitecore on the web. My
> honest question: is Adobe carrying the post-activation card journeys in real time, first spend then
> habit, or does that still go out as batch campaigns? Curious where the real-time, per-customer piece
> actually lives.
> That layer is what we do at Dengage. Mostly trying to understand how you have it wired against Adobe.
> How are you running it now?
> Best, Salil

## 8. Guardrails that must hold (from CLAUDE.md)

- Honest incumbent wedge: name only the stack we actually observe (urlscan/Apollo/their site/a job
  post). Ask about its fit. Never assert unverifiable negatives about a competitor. Never disparage by
  name. Competitors to differentiate against without naming negatively: Adobe, Salesforce Marketing
  Cloud, Sitecore, Braze, CleverTap, MoEngage, Insider, Bloomreach.
- No em/en dashes. Uptime 99.9% only. Deterministic identity only. KSA = GCP Dammam. No GCC logo.
- Verified-proof-swap: any metric or logo must match CLAUDE.md Section 2/4 (Fibabanka 4.45M not 2M,
  Burgan ~1M/day, no Wizz Air). Route commercial figures to Salil, security to Köksal.

## 9. Next actions for this new session (in order)

1. Verify egress is live (urlscan reachable). Report to Salil. Do not proceed to direction until this
   works, per Salil's instruction that the egress policy must be in play first.
2. Pull the real stack for all 10 domains: urlscan for script-level depth, and/or Apollo enrich (1
   credit each, confirm cost first) for the 8 not yet profiled. Reuse the 2 findings in Section 6.
3. Summarize each bank's stack and the honest wedge it enables (send-only vs enterprise vs unknown).
4. Rebuild all 10 openers on the real stacks in the non-salesy voice (Section 3), shown INLINE in
   chat (Salil wants these in the conversation, not written to a new file unless he asks).
5. THEN agree the final personalization direction with Salil before any file changes or sends.

## 10. Key files

- `CLAUDE.md`, `PROSPECTING_ENGINE.md` - operating instructions and guardrails.
- `COLD_OPENER_TEARDOWN.md` - the 35-sample analysis and revised approach.
- `data/outreach-runs/batch-05/01_initial_2026-07-20_approach-comparison.md` - shipped vs rewritten copy.
- `data/outreach-runs/_SEND_STYLE.md`, `_README.md`, `_STATS.md`, `_LINKEDIN_TRACKER.md` - send norms.
- `data/gulf-banking-icp/` - the target universe and persona coverage.
