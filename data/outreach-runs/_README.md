# Outreach runs — index and operating rules

Single source of truth for the manual Gulf+Egypt banking outreach. Read this first. Scheduled
reminders ("routines") point here instead of repeating the rules.

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
| batch-01 | Gulf+Egypt banking | 2026-07-13 (Mon) | 10 | touch 2 (2026-07-16) | touch 3 → Wed 2026-07-22 |
| batch-02 | Gulf+Egypt banking | 2026-07-14 (Tue) | 10 | touch 2 (2026-07-19, sent) | touch 3 → Thu 2026-07-23 |
| batch-03 | Gulf+Egypt banking | 2026-07-15 (Wed) | 10 | touch 2 (sent 2026-07-20) | touch 3 → Sun 2026-07-26 |
| batch-04 | Gulf+Egypt banking | 2026-07-16 (Thu) | 10 | touch 1 | touch 2 → Tue 2026-07-21 |
| batch-05 | Gulf+Egypt banking | 2026-07-20 (Mon) | 10 | touch 1 (drafted) | touch 2 → Mon 2026-07-27 |

50 leads total. Full per-lead detail (Zoho IDs, LinkedIn URLs, hooks, references, send logs) lives in
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

- One earned, current, verifiable hook per lead (research, see PROSPECTING_ENGINE.md).
- Persona-matched angle; soft single CTA.
- **Plain text only. No HTML signature. End at "Best, Salil"** — Salil adds his own signature in
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
can read the schedule at a glance. Current live schedule:

| Reminder | Fires |
|---|---|
| Outreach · batch-03 · touch-2 send | Mon 2026-07-20 |
| Outreach · batch-04 · touch-2 | Tue 2026-07-21 |
| Outreach · batch-01 · touch-3 | Wed 2026-07-22 |
| Outreach · batch-02 · touch-3 | Thu 2026-07-23 |
| Outreach · batch-03 · touch-3 | Sun 2026-07-26 |

## Per-lead standing flags

- batch-01: Haifa Binahmed (Riyad Bank) email BOUNCED → LinkedIn only (stack angle: Segment + Oracle
  Analytics). George Yaryura (Mashreq) was OOO to 2026-07-17. Enrique Cuentas (CIB) accepted, in
  conversation. Mohammed Alabdullah (Al Rajhi) LinkedIn: https://sa.linkedin.com/in/mohammed-alabdullah-383bb140
- batch-02: Sami Zadjali (BankDhofar) title [VERIFY] before any LinkedIn message.
- batch-04: Marian Kaisser (CA Egypt) title [VERIFY] before her LinkedIn message.

## LinkedIn follow-up lane — see `_LINKEDIN_TRACKER.md`

The LinkedIn channel has its own clock (Message 1 goes out the day a lead accepts, not the batch's
email date), so it is tracked separately in **`_LINKEDIN_TRACKER.md`**. Each batch reminder now runs
BOTH legs for its leads: email (via Gmail) and LinkedIn (via the tracker).

**11 leads have received LinkedIn Message 1** (Ashraf/NBE, Enrique/CIB, Mohamed Hamdy/Banque Misr,
Moayad/Bank Albilad, Bahaa/Adam/Amir b3, Sridhar, Wafa/Mahmoud/Navaid b4). No email replies yet
across the 40. Status as of 2026-07-20: Ashraf and Mohamed Hamdy have had **Message 2 sent** (logged);
Enrique's earlier "held" flag was a mistake (unverified) and his cadence is resumed. Bahaa/Adam/Amir/
Moayad/Sridhar are due **Message 2 on Tue 07-21**; Wafa/Mahmoud/Navaid on **Wed 07-22**. Full dates,
the cross-batch sweep rule, and the correction log live in the tracker.
