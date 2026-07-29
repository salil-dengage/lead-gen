# Zero-reply diagnosis, 2026-07-29

Requested by Salil after ~2.5 weeks, 7 batches, ~70 accounts, ~200 touches, 0 replies on email AND
0 replies on LinkedIn. This is a forensic read of everything actually sent (v1.1 and v1.2), the Gmail
evidence, the stats file, and live DNS checks. Verdict first, evidence second, fixes third.

## The verdict in three sentences

The v1.1 to v1.2 rewrite was a copy fix applied to what the evidence says is mostly a plumbing and
strategy problem. Email is very likely not reaching inboxes any more (reputation damage from a
15 to 50 percent hard-bounce rate plus bulk-pattern sending), which no voice rework can fix. LinkedIn,
which has no deliverability layer, is silent for different reasons: every touch asks and never gives,
there is no GCC proof, and it is peak Gulf summer.

## A. The smoking guns (things found in our own data)

### A1. The auto-reply cliff (strongest single signal)
- Week 1 (07-13 to 07-15, 30 sends): 1 bounce (Haifa) AND 1 real OOO auto-reply (George Yaryura,
  Mashreq, with delegate contact). Mail was reaching inboxes; OOO proves human-mailbox delivery.
- Weeks 2 and 3 (~140+ further email touches, including 40+ new touch-1s): ZERO OOO auto-replies
  recorded anywhere. This is peak Gulf vacation season; a healthy sender hitting 70 senior GCC
  mailboxes in late July should collect several OOOs by accident.
- Bounces kept arriving (they are generated at SMTP time regardless of folder placement), but
  human-side automatic responses stopped. That pattern is the classic signature of gateway
  quarantine / spam-foldering, not of people reading and ignoring us.
- [VERIFY]: Google Postmaster Tools (domain reputation + user-reported spam rate for dengage.com)
  will confirm or refute this in 10 minutes. Salil action, highest priority.

### A2. The bounce ledger (the likely cause of A1)
- batch-01: 1/10 hard bounce. batch-05: 2/10. batch-06: 3/10. batch-07: 5/10 (fifty percent).
- Cumulative: roughly 11+ hard bounces across ~70 cold addresses, 15 to 20 percent, with the trend
  getting WORSE per batch (we kept sending to pattern-guessed addresses as verified sources ran out).
- Mailbox providers and gateways treat sustained hard-bounce rates above ~2 percent as a spammer
  signal. We ran 8 to 25 times that for two weeks from the primary corporate mailbox.
- CLAUDE.md Section 14 (logged 2026-07-21) already told us: email enrichment for this segment is a
  dead end (~6 percent usable), reach these people by mobile or LinkedIn. We recorded that learning
  and then sent two more all-pattern email batches anyway (batch-06: 10/10 pattern; batch-07 mostly
  pattern). The system knew; the process did not obey the system.

### A3. The burst-send fingerprint
- Gmail timestamps show batch-07's touch-1 emails leaving at 11:23:50, 11:24:52, 11:25:15, 11:25:29,
  11:25:34 on 07-27: ten "hand-written, personal" emails in about two minutes. batch-06 (07-22) shows
  the same burst (11:22:50, 11:23:34, 11:23:43).
- Ten near-same-length, same-structure, same-sender messages in one burst is exactly what bulk
  classifiers are built to catch. Whatever the words say, the metadata says "campaign blast."

### A4. Template DNA across 70 "personalized" messages
- Recurring strings across most of the corpus: "off one live profile", "timed to the person",
  "the part we do", "I'm Salil from Dengage, the Composable AI Marketing Platform behind...",
  and the close "if it's worth a conversation, I'd welcome it" (or a near variant) on almost every
  message, email and LinkedIn alike.
- To a filter this clusters as one campaign. To any recipient who receives two touches, it reads as
  a template with the nouns swapped, which quietly undoes the research-earned personalization.

### A5. Authentication and DNS: NOT the problem (checked live today)
- SPF valid, 4 DNS lookups (under the 10 limit), strict -all. DKIM key present (google selector).
  DMARC present at p=quarantine. MX on Google Workspace. So mail is properly authenticated.
- Two hygiene notes only: (1) the DMARC record reads "p= quarantine" with a stray space; most
  parsers tolerate it, a strict one could treat the record as malformed, normalize it to
  "p=quarantine". (2) dengage.com's SPF authorizes the PRODUCT's entire sending fleet
  (engines.dengage.net ~30 IPs, Zoho campaigns, transmail/ZeptoMail). The corporate domain's
  reputation is shared with bulk product/marketing traffic we do not control from this seat.

### A6. The one warm signal we ever got was dropped
- George Yaryura's OOO (07-13) named a delegate, Surbhir Sainani (SurbhirS@mashreq.com). Nobody ever
  contacted the delegate. The only human-adjacent response in the entire program was not worked.
  Symptom of a process optimized for sending, not for responses.

## B. Why LinkedIn is also at zero (deliverability cannot be blamed there)

- 56 note-less CRs, ~16 accepts (roughly 25 percent): normal-to-decent for cold CxO. People are
  willing to connect. Then 30+ messages produced zero replies. So the failure on LinkedIn is the
  message economics, not reach:
1. **All ask, no give.** Msg 1 intro, Msg 2 metric, Msg 3 use-case, Msg 4 permission close: four
   messages in two weeks, each ultimately asking for a conversation with a vendor. Nothing a busy
   CxO can say yes to except a meeting. There is no artifact, no teardown, no one-pager, no event,
   nothing ownable offered at any rung of the ladder.
2. **No GCC logo.** CLAUDE.md Section 4 states this is the PRIMARY constraint on GCC reply rates,
   "ahead of copy or configuration." The program has iterated copy twice while the stated primary
   constraint went unaddressed. Turkey and Pakistan proof reads as "not here yet" to a GCC banker.
3. **Wrong-instrument dynamics.** The v1.2 evidence base (rulebook Section 12) is 35 converting
   openers from Telegram outbound to CIS mid-level managers. The rulebook itself flags that the CxO
   dynamic does not port. GCC bank C-levels overwhelmingly enter vendor conversations through
   referrals, existing vendors, analysts, RFPs, and events, not through DMs, however well written.
4. **Season.** Mid-July through August is the Gulf decision-maker exodus. We launched the heaviest
   cadence of the program into the emptiest weeks of the year.
5. **Cadence heat.** 3-working-day cycles on email PLUS a parallel 3-day LinkedIn clock produced up
   to 7 to 8 touches per lead in under three weeks, including same-day email+LinkedIn double-touches
   (caught twice this week only by luck). At CxO level this reads as pressure, and pressure at zero
   trust converts to spam-reports, which feeds back into A2.

## C. What is NOT wrong (do not fix these again)

- Research quality: hooks are genuinely current, dated, verified; the freshness gate works (caught
  stale triggers, moved leads, wrong buyers repeatedly).
- Honesty and compliance rules, CRM hygiene, batch bookkeeping: excellent throughout.
- The v1.2 voice itself is better writing than v1.1 by any standard. A third rewrite of the voice is
  the one move guaranteed to change nothing, because the words are not the binding constraint.
- Statistical note for fairness: at a healthy 3 percent reply rate, zero from 60 email leads happens
  ~16 percent of the time by luck alone. Zero across BOTH channels plus the OOO cliff is what makes
  this systemic rather than unlucky.

## D. Fix plan (ranked; plumbing first, strategy second, copy last)

### This week (stop the damage)
1. **Freeze cold email from dengage.com** until reputation is read. Salil: open Google Postmaster
   Tools, check domain reputation and spam-rate graphs for July. 10 minutes, settles A1 empirically.
2. **Hard rule, effective now: no unverified address ever gets sent again.** Every future address
   passes a real verifier (ZeroBounce / NeverBounce / Apollo verified-only) before any send. A
   pattern guess is LinkedIn-only, permanently. This codifies CLAUDE.md Section 14 into practice.
3. **Normalize the DMARC record** ("p=quarantine", no space) while in there.
4. **Work the Mashreq delegate** (Surbhir Sainani) as a warm-adjacent thread.

### Next 2 to 4 weeks (rebuild the channel properly)
5. **Dedicated outbound domain** (e.g. a .io or -mena variant), own SPF/DKIM/DMARC, 2 to 3 week
   warmup, then cap ~15 to 20 sends/day/mailbox, sends spaced minutes apart at humane local times,
   never in bursts. Keep dengage.com for replies and live threads only. Seed-test inbox placement
   (Gmail + M365 seeds, or GlockApps) before the first real batch and per batch thereafter.
6. **Make LinkedIn the primary channel and flip the economics: one GIVE before any second ask.**
   Build 2 or 3 ownable artifacts and offer (not attach) them: a 1-page journey map personalized to
   the bank's own launch ("the 5 journeys I would run on WAGE / GO Platinum / eKey 2.0"), a KSA PDPL
   + GCP Dammam residency brief, a GCC bank engagement teardown. The ladder becomes: intro, give,
   light ask, close.
7. **Activate the mobiles.** We hold ~33 enriched, high-confidence direct dials (Section 14: mobile
   hits ~60 percent; it is the channel our own data endorsed). 5 calls/day referencing the note
   ("wanted to put a voice to it"). Calls cannot be spam-filtered.
8. **August = build, September = send.** Pause cadence escalation through August (season). Use it
   for domain warmup, list verification, artifact building, and light LinkedIn nurture. Resume full
   ladders the first week of September against verified addresses from the warmed domain.

### Structural (the real ceiling on reply rate)
9. **The GCC logo gap is a strategy problem, not an outreach problem.** Until one GCC name is
   referenceable, cold outbound's job is awareness, not meetings. Push the nearest-geography proof
   (Bank Al Baraka, Banque Centrale Populaire) where citable, and manufacture warm paths: a GCC
   banking roundtable/webinar with a Turkey or Pakistan customer speaking, GCP partner intros via
   the Dammam relationship, targeted event presence. Consider explicit lighthouse terms for one
   named GCC bank. Route commercial framing to Salil per CLAUDE.md.
10. **Cadence redesign** (post-freeze): email t1, t2 at +5 to 7 working days, t3 at +10, permission
    close at ~6 weeks. LinkedIn keeps its own clock but NEVER same-day with email to a silent lead.
    Hard cap ~6 touches per lead per 6 weeks. In-thread bump once, maximum.
11. **Measure delivery, not just activity.** Extend _STATS per batch: verified-rate, delivered,
    bounced, OOO count (a healthy batch in summer SHOULD produce OOOs), seed placement result,
    accepts, replies by channel, Postmaster reputation. Kill-switch: any batch over 2 percent hard
    bounce stops sending and re-verifies the list.
12. **Copy, last and least:** keep the v1.2 voice but (a) cut to 80 to 110 words, (b) one idea per
    email, (c) retire the shared phrase DNA (A4 list) so no two leads in a batch share a phrase,
    (d) break the comma-chain run-ons (the no-dash rule has been producing 40+ word sentences;
    short sentences are allowed), (e) stop repeating the "X, made personal" subject formula.

## E. Expectation reset (honest numbers)

With a warmed dedicated domain, verified-only lists, the give-first LinkedIn ladder, live calls, and
September timing, realistic targets for THIS ICP without a GCC logo: 2 to 5 percent email reply,
5 to 10 percent LinkedIn reply post-accept, and most actual meetings sourced from calls and warm
paths. Zero-to-date does not mean the market is dead; it means the current pipe was.
