# OUTSTANDING REGISTER, frozen 2026-08-02

Salil halted the campaign on 2026-08-02 and asked for a careful record of everything not done.
**This file is the resume-here document.** Read it first, before any batch file, when work restarts.

Nothing is scheduled. Nothing will fire. Every routine is paused, not deleted, so all of it can be
re-armed exactly as it was.

---

## 1. Routine state: ALL PAUSED (0 armed)

Five routines were live when the halt came. All five are now disabled and stay stored with their
prompts and run history intact. Re-enable with `update_trigger(trigger_id, enabled: true)`.

| Routine | Was due | Trigger ID | State |
|---|---|---|---|
| Outreach · batch-07 · touch-2 | Mon 2026-08-03 04:00Z | `trig_014W8VhDVVdQEFKW3KPSPEvJ` | PAUSED |
| Outreach · batch-06 · touch-3 | Tue 2026-08-04 04:00Z | `trig_01Rnq6rEPbfPrgiiKdNC6o5Z` | PAUSED |
| Outreach · batch-04 · touch-4 | Wed 2026-08-05 04:00Z | `trig_01AHjiRS8tJAnEXHvRtTdU3o` | PAUSED |
| Outreach · batch-05 · touch-3 | Thu 2026-08-06 04:00Z | `trig_01NvoajRdwM9P18zKV7YgNRs` | PAUSED |
| Ahmed Ali (QNB Egypt) · LinkedIn Msg 2 resume | Wed 2026-08-12 04:00Z | `trig_012XYQSJzbjk977T8hoyKBU1` | PAUSED |

batch-07 touch-2 was **less than 23 hours from firing** when it was paused.

Ten older routines remain in the list with `ended_reason: run_once_fired`. They are spent one-shots,
inert, and safe to ignore or delete.

---

## 2. FIRED BUT NEVER RUN: batch-03 touch-4

**`trig_011EStEFt9NSLB31MVmbCsqc` fired on 2026-08-02 at 05:30:31Z and its work was never done.**

It landed in this session 90 minutes after the batch-01 run, while that run was being delivered, and
was overtaken by the halt. It is now spent (`run_once_fired`), so it will not fire again and cannot be
re-enabled. **batch-03 touch-4 must be re-created from scratch when work resumes.**

Nothing at all was done for batch-03 on 08-02: no reply sweep, no do-NOT-repeat table, no permission
closes drafted, nothing. Its touch-3 auto-sent 2026-07-27, so its touch-4 is genuinely outstanding.
Adam Jabry (Alizz) stays held inside it.

---

## 3. batch-01 touch-4: PREPARED, NOT SENT

Full detail in `batch-01/04_permission_close_2026-08-02.md`. Summary of state:

| Step | State |
|---|---|
| Gmail reply/bounce sweep | **NOT RUN.** Connector unauthorized. |
| Exact prior-touch pull from Gmail | **NOT RUN.** Table reconstructed from repo records instead. |
| 9 email permission closes | **DRAFTED**, verified non-repeating. Not staged in Gmail, not sent. |
| Gmail drafts created | **NO.** Connector unauthorized. |
| Zoho logging | **N/A.** Nothing sent, so nothing to log. |
| Close-vs-continue decision | **RECOMMENDED** (close the email lane, keep the accounts). No decision taken. |

**The reply-sweep gap is the important one.** The last verified Gmail sweep across batch-01 was
**2026-07-23**. Nine touch-3 emails auto-sent **2026-07-27**. Nobody has checked the mailbox since.
Any reply, bounce, or out-of-office from those nine is currently unseen. The same gap applies to every
other batch that sent after 07-23.

---

## 4. LinkedIn: 9 messages drafted and unsent, plus 2 more now overdue

The 08-02 cross-batch sweep produced copy for all 9 due leads. **None was sent**, because no snapshot
arrived and standing rule 3 makes the snapshot a hard gate. The **new-acceptance sweep never ran**, so
any lead who accepted a connection request since 2026-07-29 is sitting unworked with no Message 1.

Drafted and waiting (copy is in the batch-01 touch-4 file):

| Lead | Bank / geo | Due | State |
|---|---|---|---|
| Moayad Aldawood | Bank Albilad, KSA | Msg 4 | drafted, unsent |
| Bahaa Farouk | Suez Canal Bank, Egypt | Msg 4 | drafted, unsent |
| Amir Alsalous | Bank of Sharjah, UAE | Msg 4 | drafted, unsent |
| Sridhar Iyer | GIB / meem, KSA and Bahrain | Msg 4 | drafted, unsent |
| Wafa Al Harbi | Sharjah Islamic, UAE | Msg 4 | drafted, unsent |
| Mahmoud Okasha | AAIB, Egypt | Msg 4 | drafted, unsent |
| Navaid Ahmed | Sohar International, Oman | Msg 4 | drafted, unsent |
| Dr. Ahmed Taqi | BBK, Bahrain | Msg 2 | drafted, unsent. Role confirmed, otherwise ready |
| Said Al Marhoobi | NBO, Oman | Msg 2 | drafted, **BLOCKED** on role confirm |

**Now overdue and never drafted**, because their day (Mon 2026-08-03) was paused:
- **Nasser Alawadhi** (BisB, Bahrain): Msg 3 was due 08-03. He is email-bounced, so LinkedIn is the
  only channel that reaches him.
- **Luciano Di Pietro** (tam / KFH, Kuwait): Msg 3 was due 08-03.

---

## 5. Decisions waiting on Salil (nothing moves until these clear)

1. **Google Postmaster Tools read for dengage.com** (domain reputation, spam rate, July). Set as the
   release condition for the email freeze on 2026-07-29. Still not done. ~10 minutes, and it is the
   single most decisive check in the whole diagnosis.
2. **LinkedIn snapshot.** Not received for 08-02. Blocks every LinkedIn send and the acceptance sweep.
3. **Gmail connector re-authorization** (claude.ai connector settings). Blocks all mailbox work:
   reply sweeps, bounce checks, prior-copy verification, draft creation.
4. **Shoaib Rizvi (Emirates NBD), pattern-unverified email.** The 07-29 hard rule ("a pattern guess is
   LinkedIn-only, permanently") would suppress him, but his address took three sends with no bounce.
   Recommendation on file: keep him, treat three clean deliveries as verification. Undecided.
5. **Said Al Marhoobi (NBO), role confirmation.** Open since 07-29. One profile click. Blocked on both
   channels until then. If he has moved to coaching full time, suppress and refill NBO.
6. **batch-01 close-vs-continue.** Recommendation on file: close the email lane at touch 4, keep the
   8 pending connection requests open, re-enter the accounts in September. Undecided.

---

## 6. Diagnosis fix plan: what was never actioned

From `_REPLY_DIAGNOSIS_2026-07-29.md` Section D. Of twelve ranked items, **one is done**.

| # | Item | State |
|---|---|---|
| D.1 | Freeze cold email until reputation is read | DONE (freeze holds; the read has not happened) |
| D.2 | Verified-only address rule | Written into `_README.md`, **never applied to a list** |
| D.3 | Normalize the DMARC record (`p= quarantine` to `p=quarantine`) | NOT DONE |
| D.4 | **Work the Mashreq delegate, Surbhir Sainani (SurbhirS@mashreq.com)** | NOT DONE, open since 2026-07-13 |
| D.5 | Dedicated outbound domain, own auth, 2 to 3 week warmup, seed tests | NOT STARTED |
| D.6 | Give-first LinkedIn ladder plus 2 or 3 ownable artifacts | NOT STARTED. No artifact exists |
| D.7 | Activate the ~33 enriched direct mobiles, 5 calls a day | NOT STARTED |
| D.8 | August build, September send | Was being actively contradicted by the live routines until today |
| D.9 | GCC logo gap and warm-path strategy | NOT STARTED |
| D.10 | Cadence redesign (t2 at +5 to 7 days, cap 6 touches per 6 weeks) | NOT APPLIED |
| D.11 | Extend `_STATS` with delivery metrics and a 2 percent bounce kill-switch | NOT DONE |
| D.12 | Copy corrections | Applied to the 08-02 drafts only, not to the rulebook |

Also open from Section E:
- **E2.1** URIBL listing for dengage.com: confirm manually at mxtoolbox.com. NOT DONE.
- **E2.4** Full NDR text of the Bank NXT `550 5.7.1` policy rejection (the program's first direct
  evidence of a gateway refusing us by policy). Needs Gmail. NOT DONE.
- **E3.2** DMARC aggregate (rua) reports at dengage@dmarc-reports.dengage.com. NOT READ.
- **E3.3** Raw headers of one actually-sent cold email, to verify DKIM alignment on the real path. NOT OBTAINED.
- **E3.4** Global auto-reply sweep across all ~70 addresses. Needs Gmail. NOT DONE.
- **E3.5** Seed-list inbox placement test. NOT DONE.

**The single highest-value unworked item remains D.4.** George Yaryura's out-of-office on 2026-07-13
named a delegate. It is the only human-adjacent response ~200 touches have produced, and in three
weeks nobody has written to him. It needs no freeze lift and no tooling, just one personal email.

---

## 7. Held, blocked, and suppressed leads (carry these forward)

| Lead | Bank | Status |
|---|---|---|
| Said Al Marhoobi | NBO, Oman | BLOCKED both channels, role unconfirmed since 07-29 |
| Adam Jabry | Alizz, Oman | HELD, Bank Nizwa acquisition. Msg 3 was due 07-27 |
| Ahmed Ali | QNB Egypt | HELD to ~08-12, Salil multi-threading via another contact |
| Enrique Cuentas | CIB, Egypt | Msg 3 HELD pending confirmation he has not replied on LinkedIn |
| Haifa Binahmed | Riyad Bank, KSA | Email dead (bounced 07-15). LinkedIn-only, CR still pending |
| Ziad Alshami | OAB, Oman | Email suppressed (bounced 07-20). LinkedIn-only, CR still pending |
| Sharif Rafei | NBF, UAE | DROPPED, unreachable on both channels |
| Fida El Samad | CBI, UAE | Email suppressed (bounced). LinkedIn-only |
| Samir Al-Yakoob | ABK, Kuwait | Email suppressed (bounced). LinkedIn-only |
| Nasser Alawadhi | BisB, Bahrain | Email suppressed (bounced). LinkedIn-only, **Msg 3 now overdue** |
| Atul Choudrie | stc bank, KSA | SUPPRESSED, left the company. Replaced by Abdulkarim Giraud |
| Anuj Madan | OAB, Oman | SUPPRESSED, left the bank. Replaced by Ziad Alshami |

Roughly 40 connection requests across all batches are still pending acceptance and have never received
a Message 1. The full list is in `_LINKEDIN_TRACKER.md` under "Connection requests still PENDING".

---

## 8. Where the program actually stands

Seven batches, ~70 accounts, ~200 touches, **0 replies on either channel**. Batch-01 through batch-07
have all had at least touch 1. Nothing since 2026-07-29 has been sent on any channel.

Two things are true at once and both should survive into the next session. The accounts, the research,
the CRM hygiene and the verification protocol are all genuinely good, and the diagnosis exonerated the
copy on content grounds (0.1 of a 5.0 SpamAssassin threshold). The pipe was the problem, and the
strategy sat on a channel that GCC bank CxOs do not buy through, in the emptiest month of the year,
without the GCC reference that the knowledge base names as the primary constraint.

Resuming the cadence as it was would repeat that. The rebuild in Section D is the work.

---

## 9. To resume

1. Read this file, then `_REPLY_DIAGNOSIS_2026-07-29.md` Section D.
2. Settle the six decisions in Section 5. Postmaster first, it gates everything on email.
3. Re-authorize Gmail, then run the overdue reply and bounce sweep across ALL batches back to 07-23.
   Anyone who replied stops their cadence immediately.
4. Work the Mashreq delegate. It does not wait for anything.
5. Decide whether the cadence restarts at all, or whether August goes to the rebuild as planned.
6. Only then re-enable routines from the Section 1 table, and re-create batch-03 touch-4, which is
   spent and cannot be re-enabled.
