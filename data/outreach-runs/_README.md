# Outreach runs: index and operating rules

## ⛔ ACTIVE PAUSE (set by Salil 2026-07-29, lifts Sun 2026-08-02 morning)

**No new message creation on any channel, and no sends, until Sunday 2026-08-02 morning.** Salil called
this after the zero-reply review. If a routine fires and you are reading this, check with him before
drafting anything.

- **Why:** `_REPLY_DIAGNOSIS_2026-07-29.md`. ~200 touches across 7 batches, 0 replies on either channel.
  The evidence points at cold email from dengage.com being quarantined (15 to 50 percent hard-bounce rate
  per batch, auto-reply cliff after week 1, ten-emails-in-two-minutes burst pattern, and every target bank
  sitting behind an enterprise gateway: Trend Micro, Proofpoint, Defender, Credit Agricole France). DNS auth
  is healthy and the copy scores 0.1 of 5.0 on SpamAssassin, so neither setup nor wording is the constraint.
- **Blocking check before email resumes:** Salil reads Google Postmaster Tools (dengage.com domain
  reputation + spam rate for July). Until he confirms, treat cold email as FROZEN and do not draft it.
- **Hard rule from now on, pause or no pause:** never email an unverified pattern address. Pattern guesses
  are LinkedIn-only, permanently. This makes CLAUDE.md Section 14 operational.
- **What moved:** batch-05 touch-3 went from Thu 07-30 to **Thu 2026-08-06** (freeze-check added to its
  prompt). Everything that was due Thu 07-30 on LinkedIn (7 Msg 4s, plus Ahmed Taqi and Said Msg 2) is
  carried to **Sun 2026-08-02**, owned by the batch-01 touch-4 run. Nothing else was rescheduled.
- **LinkedIn is not implicated** by the deliverability problem, so it can resume Sunday on Salil's go.
  Said Al Marhoobi still needs his NBO role confirmed before any further touch.
- The ranked fix plan (dedicated warmed domain, verified-only lists, give-first LinkedIn ladder, activating
  the ~33 enriched mobiles, September resume, GCC reference strategy) is Section D of the diagnosis.

Single source of truth for the manual Gulf+Egypt banking outreach. Read this first. Scheduled
reminders ("routines") point here instead of repeating the rules.

## LEAD VERIFICATION PROTOCOL (mandatory before drafting/sending any new batch)

Learned the hard way on batch-05 (2026-07-20): Apollo gave a stale/wrong contact (Anuj Madan had
left OAB), a wrong LinkedIn URL (BBK / Ahmed Taqi), and "no profile" for someone who clearly had one
(CBQ / Eiman Al-Naemi, findable in seconds). Apollo is ONE signal, never the source of truth. For
every lead in a new batch, before it is drafted or sent:

1. **Verify the LinkedIn profile independently.** Search LinkedIn directly by name + current company
   and open the profile. Do NOT accept an Apollo or single-research-pass URL blindly, and never
   record "no LinkedIn" without a genuine direct search. If a profile is not found after a real
   attempt, mark it `[LinkedIn unconfirmed]`, not "none", and flag for a manual look.
2. **Confirm the person still holds the role at the target bank (recency).** Check the profile's
   current title/employer. If they have moved on (as Anuj Madan had), they are NOT a valid lead:
   suppress the record and find the current buyer, or drop the account. Never send to a stale role.
3. **Treat any Apollo/research conflict as a red flag to resolve, not accept.** If Apollo shows a
   different employer, title, or LinkedIn than the research pass, stop and reconcile by hand before
   using. Apollo must never overwrite an independently verified LinkedIn or a confirmed current role.
4. **Cross-check name + company** on both the LinkedIn profile and the hook source, so the hook and
   the person actually belong to the same current employer.
5. Verified email (Apollo "verified") is safe; a corporate-pattern guess is `[pattern-unverified]`,
   flagged to Salil, and watched for bounces. Prefer LinkedIn-first for pattern-email leads.

Apply your own judgement, not just the tool output. If something is easily checkable, check it.

## STANDING RULE: always share the GitHub link after any commit

Every time work is committed and pushed, share the clickable GitHub file link(s) and the commit link
in the reply to Salil, without being asked. Never make him ask for it. Link format:
`https://github.com/salil-dengage/lead-gen/blob/main/<path>` for files,
`https://github.com/salil-dengage/lead-gen/commit/<hash>` for the commit.

## Salil's standing rules (locked 2026-07-23, do not make him repeat these)

1. **One file per batch per touch, self-contained.** Each touch file (`0M_<type>_<date>.md`) stands on its
   own so batches never blur together: a clear header (which batch, which touch, run date) and, for EVERY
   lead, the Zoho link and the LinkedIn link right there in the file (a "Contact links + send state" table).
2. **Reply-check gates the touch.** Before a touch is aligned or sent, confirm in Gmail that the lead has
   not replied. Anyone who replied stops their cadence. Record the per-lead reply-state in the file.
3. **LinkedIn snapshot is a HARD gate before ANY send.** Do not send or stage any automated message (email
   or LinkedIn) until Salil has shared his latest LinkedIn connection snapshot. On receiving it, sweep ALL
   previous batches (not just the batch in hand) for NEW acceptances, and hand Salil the LinkedIn message
   for each new connection first.
4. **v1.2 end to end, every message.** `prospecting_engine_v1.2_21July.md` is applied in full before any
   message is generated: freshness gate (dated trigger + current role), the five-movement voice, proof
   placement and the multi-touch ladder, and the pre-send self-check. Deepen the stack read (Section 3
   pipeline) before send where a named incumbent would sharpen it.

5. **No touch repeats a prior touch. Check Gmail for the exact sent copy.** Before drafting any touch,
   pull from Gmail the EXACT subject and body of every earlier touch already sent to that lead. The new
   touch must not reuse the subject, the hook, or the angle. Touch 3 onward is a fresh use-case (rulebook
   6.8), never a re-send of the launch hook. Learned 2026-07-26: a set of touch-3 drafts had reused the
   touch-1 subject verbatim and would have threaded in Gmail as a bump of the first email. Record each
   lead's prior-touch subjects in the touch file as a "do NOT repeat" table, and confirm distinctness
   before creating any draft.

## Folder / file naming (no ambiguity)

- **`batch-0N/`** = the Nth daily set of ~10 leads (one buyer per account). "Batch number" only.
  It has nothing to do with cadence day.
- Inside each batch, files are **`0M_<type>_<date>.md`** where `0M` is the touch number in the
  cadence:
  - `01_initial_<date>.md`  = touch 1 (first email + LinkedIn action), the day the batch was sent.
  - `02_followup_<date>.md` = touch 2, `03_followup_<date>.md` = touch 3, etc.
- So "batch-03 / touch 2" is unambiguous: the 3rd set of leads, their second contact. We never write
  "day3" again.

## Batch tracker

| Batch | Industry / region | Sent (touch 1) | Leads | Latest touch done | Next touch (due) |
|---|---|---|---|---|---|
| batch-01 | Gulf+Egypt banking | 2026-07-13 (Mon) | 10 | touch 2 (2026-07-16) | touch 3 → Sun 2026-07-26 (moved from 07-22) |
| batch-02 | Gulf+Egypt banking | 2026-07-14 (Tue) | 10 | touch 2 (2026-07-19, sent) | touch 3 → Thu 2026-07-23 |
| batch-03 | Gulf+Egypt banking | 2026-07-15 (Wed) | 10 | touch 2 (sent 2026-07-20) | touch 3 → Sun 2026-07-26 |
| batch-04 | Gulf+Egypt banking | 2026-07-16 (Thu) | 10 | touch 2 (v1.2 SENT + Zoho logged 2026-07-22; stale 07-21 v1.1 drafts deleted; LinkedIn Msg 2 generated for the 4 accepted) | touch 3 → Wed 2026-07-29 |
| batch-05 | Gulf+Egypt banking | 2026-07-20 (Mon) | 10 | touch 2 SENT 2026-07-27 (7 v1.2 reset use-case emails; BBK held, Ziad LI-only, Sharif dropped; Zoho logged) | touch 3 (metric) → Thu 2026-07-30 |

| batch-06 | Gulf+Egypt banking | 2026-07-22 (Wed, v1.2) | 10 | touch 1 SENT (9 emails 2026-07-22 + Abdulkarim/stc 2026-07-23 = 7 clean, 3 bounces LinkedIn-only; 10 note-less CRs sent; Zoho logged) | touch 2 → Tue 2026-07-28 |
| batch-07 | Gulf+Egypt banking | 2026-07-27 (Mon, v1.2) | 10 | touch 1 SENT 2026-07-27 (10 emails + 10 note-less CRs; all-fresh verified accounts, 3 buyer corrections + 1 swap; Zoho logged) | touch 2 → Mon 2026-08-03 |

60 leads total; batch-05 is 10 active (Anuj Madan/OAB suppressed after he left the bank, replaced by
Ziad Alshami, verified). batch-06: all 10 LinkedIn-confirmed, all 10 emails pattern-unverified
(enrich-gaps-only), so LinkedIn-first and watch bounces. Full per-lead detail (Zoho IDs, LinkedIn URLs, hooks, references, send logs) lives in
each batch's files.

## Cadence (the timing rule)

- Touch 1 = Day 0 (send day).
- Touch 2 = **3 Gulf working days** after touch 1.
- Then touch 3, 4, 5, 6 continue the sequence, roughly Day 7 / 12 / 18 / 25 mapped onto working days.
- **Gulf working week is Sunday to Thursday.** Never schedule or send on Friday or Saturday; roll to
  the next working day.
- **One follow-up batch per working day.** The four batches rotate (batch-1 → 2 → 3 → 4 → 1 ...), so
  at most one batch's follow-up is generated/sent on any given day.

## Message rules (every draft)

- One earned, current, DATED, verifiable hook per lead (research + freshness gate, see
  `prospecting_engine_v1.2_21July.md`; the old `PROSPECTING_ENGINE.md` is archived in OLD DOCS and must
  NOT be used). The v1.2 messaging voice (Section 6: proof-led intro, warm close, no connect note,
  multi-touch ladder) governs all message content.
- Persona-matched angle; soft single CTA.
- **Plain text only. No HTML signature. End at "Best, Salil"**. Salil adds his own signature in
  Gmail. (An embedded signature broke Gmail rendering once; see `_SEND_STYLE.md`.)
- **Proof reference tailored per prospect** from `knowledge-base/00_CUSTOMER_MASTER.md`:
  Islamic-bank peers (Meezan, the largest Islamic bank in Pakistan; Bank Islami, Pakistan) for
  Islamic banks; Turkey conventional banks (İşbank, Akbank) otherwise. Attach a verified metric only
  for Burgan Bank (~1M messages/day, Turkey), Fibabanka (4.45M customers, Turkey), or MCB Funds
  (Pakistan, 83% account-funding). All geography-annotated. No GCC customer implied (there is none).
- KSA leads cite GCP Dammam for PDPL. Deterministic identity only. No em/en dashes.
- Follow-up copy is generated fresh at follow-up time, never pre-stored.

## The daily follow-up loop (what each reminder does)

1. Reply/bounce sweep in Gmail for that batch's leads. Anyone who replied → mark Replied, stop their
   cadence, surface to Salil. Honour bounces/opt-outs.
2. Read Salil's latest LinkedIn screenshots for new acceptances (Salil shares them; I cannot see
   LinkedIn). Do not re-ask what he has already shared.
3. Generate the next touch per lead against real state (accepted / replied / silent), following the
   message rules above.
4. Email leg → create Gmail drafts for Salil to review and send. LinkedIn leg → read
   `_LINKEDIN_TRACKER.md` and sweep it for ANY lead whose next LinkedIn touch is due or overdue on
   the run date, **across ALL batches, not just the batch named in this reminder** (LinkedIn clocks
   are keyed to accept dates and do not align with batch email dates). Generate Message N for each,
   hand Salil pasteable text.
5. Update the batch folder; after Salil confirms sends, log to Zoho (a Completed Task + a Note per
   contact). Everything commits to `main` (no feature branches).
6. Re-arm the next reminder one working day forward in the rotation.

## Reminder ("routine") naming

Reminders are named **`Outreach · batch-0N · touch-0M · <weekday date>`** so both Salil and Claude
can read the schedule at a glance.

> NOTE (updated 2026-07-23): The five follow-up reminders are now LIVE. Claude created them 2026-07-23 as
> one-shot routines (run_once_at), self-bound to the current outreach session (persistent_session_id
> session_01BTogLWpKv6Hq1thx8TRErE, the post-context-limit continuation of the prior
> session_01QUz6uSs9Y6odZgX79RASFj the old routines used). Live trigger IDs:
>   - b1 t3: trig_01YR7jaBquU52jz75Exw1v1Y, fires 2026-07-26T04:00:00Z (08:00 Gulf)
>   - b3 t3: trig_01QLo8zC1tnUSrBWSVizvogm, fires 2026-07-26T05:30:00Z (09:30 Gulf)
>   - b5 t2: trig_01SKsbWnV94FLjzftA3jFxQr, fires 2026-07-27T04:00:00Z (08:00 Gulf)
>   - b6 t2: trig_014dLLSmt3nyYV3aNa7hiw58, fires 2026-07-28T04:00:00Z (08:00 Gulf)
>   - b4 t3: trig_01TZWcLTzQq7Ff3bKgvANLoz, fires 2026-07-29T04:00:00Z (08:00 Gulf)
> b3 is staggered 90 minutes after b1 so b1 runs the shared 07-26 LinkedIn sweep first (b3 is email-only).
> CAVEAT: created via the meta MCP tool, which warns the triggers store no MCP connectors, so a fired run
> may lack Gmail/Zoho/Apollo unless the resumed session supplies them. The prior routines were the same
> meta_mcp shape and did fire and work, so this likely resolves on resume; still, WATCH the first fire
> (b1, Sun 07-26) and if the connectors are missing, re-create from the claude.ai routines UI.
> Two OLD spent one-shots remain in the trigger list (b1 t3 "Wed 22 Jul" trig_01GFEP3zVyEsQ8vAc7fu3Qmt;
> b4 t2 "Tue 21 Jul" trig_01Nu9aZcSGQAgAhKwWWGaerJ), both ended_reason run_once_fired and bound to the old
> session, inert and safe to delete (left in place pending Salil's go). batch-02 · touch-3 was due Thu
> 07-23 (window passed), handled MANUALLY in-session, NOT scheduled. Each reminder runs BOTH legs: its
> batch's email touch AND the cross-batch LinkedIn sweep. On 07-26, run the LinkedIn cross-batch sweep only
> ONCE across the two same-day reminders (batch-01 first, then batch-03 email-only).

Authoritative schedule to re-create:

| Reminder | Fires |
|---|---|
| Outreach · batch-01 · touch-3 | Sun 2026-07-26 04:00Z (moved from Wed 07-22 per Salil; shares the day with batch-03 touch-3) · LIVE trig_01YR7jaBquU52jz75Exw1v1Y |
| Outreach · batch-02 · touch-3 | Thu 2026-07-23 (TODAY, handled manually in-session, not scheduled; morning window passed) |
| Outreach · batch-03 · touch-3 | Sun 2026-07-26 05:30Z · LIVE trig_01QLo8zC1tnUSrBWSVizvogm |
| Outreach · batch-05 · touch-2 | Mon 2026-07-27 04:00Z · LIVE trig_01SKsbWnV94FLjzftA3jFxQr |
| Outreach · batch-06 · touch-2 | Tue 2026-07-28 04:00Z · LIVE trig_014dLLSmt3nyYV3aNa7hiw58 |
| Outreach · batch-04 · touch-3 | Wed 2026-07-29 04:00Z · LIVE trig_01TZWcLTzQq7Ff3bKgvANLoz |

## Per-lead standing flags

- batch-01: Haifa Binahmed (Riyad Bank) email BOUNCED → LinkedIn only (stack angle: Segment + Oracle
  Analytics). George Yaryura (Mashreq, georgesy@mashreq.com) and Enrique Cuentas (CIB,
  enrique.cuentas@cibeg.com) each received ONLY Email 1 (2026-07-13); their Email 2 was held (George OOO
  to 07-17; Enrique wrongly parked "in conversation") and Gmail confirms it never went out (verified
  2026-07-23). So on the Sun 2026-07-26 batch-01 run, George and Enrique get Email 2 (touch-2), while the
  other 8 leads get Email 3 (touch-3). Enrique: no email reply in Gmail as of 07-23; continue his cadence
  unless Salil has seen a LinkedIn reply. Mohammed Alabdullah (Al Rajhi) LinkedIn:
  https://sa.linkedin.com/in/mohammed-alabdullah-383bb140
- batch-02: Sami Zadjali (BankDhofar) title [VERIFY] before any LinkedIn message.
- batch-04: Marian Kaisser (CA Egypt) title CONFIRMED 2026-07-21 = Head of Proximity Banking
  Development, Marketing & Customer Experience (The Org / RocketReach / ZoomInfo). [VERIFY] cleared.
  Mahmoud Okasha (AAIB) identity: RESOLVED 2026-07-22, Salil confirmed Okasha still works at AAIB.
  The earlier flag (connected LinkedIn headline read "Solutions Architect", not "Head of CRM &
  Automation") is cleared; he is a valid current AAIB contact.
- batch-05: Ziad Alshami (OAB) email ziad.alshami@oman-arabbank.com BOUNCED 2026-07-20 (Address not
  found) → suppress email, LinkedIn only. Sharif Rafei (NBF) sharif.rafei@nbf.ae BOUNCED 2026-07-20 →
  suppress email (was already LinkedIn-unlocatable, so parked). Re-confirmed unreachable 2026-07-23
  (Gmail bounce, no LinkedIn located) → DROP from the batch-05 cadence. Apply on batch-05's Mon 07-27 run.
- batch-06 (touch 1 sent 2026-07-22; Abdulkarim/stc 2026-07-23): email BOUNCED → suppress email,
  LinkedIn-only for Fida El Samad (CBI, fida.elsamad@cbi.ae), Samir Al-Yakoob (ABK, samir.alyakoob@eahli.com),
  Nasser Alawadhi (BisB, nasser.alawadhi@bisb.com). All three have a live LinkedIn CR; Message 1 on accept.
  Atul Choudrie (stc bank) SUPPRESSED: left stc bank Jan 2026 (now Zag / Remitjunction). REPLACED by
  Abdulkarim Giraud (Marketing & Comms Director, agiraud@stcbank.com.sa Apollo-verified + mobile enriched);
  his Email 1 + note-less CR SENT 2026-07-23, Zoho logged. The other 6 (Faizal, Nader, Mohammed, Ahmed
  Al-Waily, Ahmed Ali, Hanan) delivered clean 07-22; Abdulkarim delivered clean 07-23.

## LinkedIn follow-up lane, see `_LINKEDIN_TRACKER.md`

The LinkedIn channel has its own clock (Message 1 goes out the day a lead accepts, not the batch's
email date), so it is tracked separately in **`_LINKEDIN_TRACKER.md`**. Each batch reminder now runs
BOTH legs for its leads: email (via Gmail) and LinkedIn (via the tracker).

**11 leads have received LinkedIn Message 1** (Ashraf/NBE, Enrique/CIB, Mohamed Hamdy/Banque Misr,
Moayad/Bank Albilad, Bahaa/Adam/Amir b3, Sridhar, Wafa/Mahmoud/Navaid b4). No email replies yet
across the 40. Status as of 2026-07-20: Ashraf and Mohamed Hamdy have had **Message 2 sent** (logged);
Enrique's earlier "held" flag was a mistake (unverified) and his cadence is resumed. Bahaa/Adam/Amir/
Moayad/Sridhar are due **Message 2 on Tue 07-21**; Wafa/Mahmoud/Navaid on **Wed 07-22**. Full dates,
the cross-batch sweep rule, and the correction log live in the tracker.
