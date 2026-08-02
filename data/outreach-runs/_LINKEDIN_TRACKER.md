# LinkedIn follow-up tracker (the manual LinkedIn lane)

Single source of truth for the LinkedIn channel. The email channel self-tracks through Gmail;
LinkedIn does not, and its clock is offset from email (Message 1 goes out the day a lead ACCEPTS,
not the day the batch's Email 1 went out). So every LinkedIn Message 1 recipient is logged here with
its own due-date.

## LinkedIn cadence
- Connection request (Day 0) -> on ACCEPT, send LinkedIn **Message 1**.
- **Each LinkedIn touch -> next = +3 Gulf working days** (Sun-Thu; skip Fri/Sat), same rule as email.
- If the lead **replies on LinkedIn**, STOP the cadence (Salil tells me; I cannot see LinkedIn).
- LinkedIn sends are manual: I generate pasteable text, Salil sends, then I log to Zoho.
- Ladder per rulebook 6.8: Msg 1 intro, Msg 2 metric, Msg 3 use-case, Msg 4 permission close.

## IMPORTANT: how the daily reminder uses this file
Each working day exactly one batch reminder fires. **That reminder sweeps this ENTIRE tracker for any
lead whose next LinkedIn touch is due or overdue on the run date, across ALL batches.** Nothing waits
for its own batch's next email date. Do not skip a due lead because the reminder is named for a
different batch.

## >>> 2026-08-02: 9 messages DRAFTED and waiting on Salil's snapshot. Nothing sent. <<<
The pause set 2026-07-29 lifted this morning. The batch-01 touch-4 run (2026-08-02) owns today's cross-batch
sweep and has DRAFTED all 9 due messages in
`batch-01/04_permission_close_2026-08-02.md`. They are NOT sent: standing rule 3 makes Salil's LinkedIn
snapshot a hard gate, and no snapshot was received for 08-02, so the new-acceptance sweep has not run either.

Due and drafted today:
- Msg 4 (permission close), 7: Moayad, Bahaa Farouk, Amir, Sridhar, Wafa, Mahmoud, Navaid (Msg 3 went 07-27).
- Msg 2, 2: Ahmed Taqi (BBK), role confirmed, ready. Said Al Marhoobi (NBO) drafted but BLOCKED until his
  NBO role is confirmed.
LinkedIn is unaffected by the email deliverability problem, so this leg can go on Salil's snapshot alone; it
does not wait on the Postmaster check. The batch-05 touch-3 email run sits on Thu 2026-08-06.
HELD separately: Ahmed Ali (QNB Egypt) Msg 2 to ~2026-08-12 (Salil multi-threading QNB via another contact).

| Lead | Account / geo | Batch | Msg 3 sent | Msg 4 due | State |
|---|---|---|---|---|---|
| Moayad Aldawood | Bank Albilad, KSA | b2 | 2026-07-27 | 2026-08-02 | drafted, awaiting snapshot |
| Bahaa Farouk | Suez Canal Bank, Egypt | b3 | 2026-07-27 | 2026-08-02 | drafted, awaiting snapshot |
| Amir Alsalous | Bank of Sharjah, UAE | b3 | 2026-07-27 | 2026-08-02 | drafted, awaiting snapshot |
| Sridhar Iyer | GIB (meem), KSA/Bahrain | b4 | 2026-07-27 | 2026-08-02 | drafted, awaiting snapshot |
| Wafa Al Harbi | Sharjah Islamic, UAE | b4 | 2026-07-27 | 2026-08-02 | drafted, awaiting snapshot |
| Mahmoud Okasha | AAIB, Egypt | b4 | 2026-07-27 | 2026-08-02 | drafted, awaiting snapshot |
| Navaid Ahmed | Sohar International, Oman | b4 | 2026-07-27 | 2026-08-02 | drafted, awaiting snapshot |

**HELD (do NOT send):** Adam Jabry (Alizz, b3) Msg 3 was due 07-27 but Alizz is under acquisition by
Bank Nizwa. Held until Salil clears it.

## Master table: everyone on the LinkedIn lane

| Lead | Account / geo | Batch | Last LinkedIn touch | Next due | State |
|---|---|---|---|---|---|
| Ashraf Elsaghir | NBE, Egypt | b1 | Msg 4 sent 2026-07-29 | sequence complete (perm. close) | Silent |
| Enrique Cuentas | CIB, Egypt | b1 | Msg 2 sent 2026-07-20 | Msg 3 · HELD | Held: send Msg 3 only once Salil confirms NO LinkedIn reply; if he replied, STOP and mark Replied |
| Mohamed Hamdy | Banque Misr, Egypt | b2 | Msg 4 sent 2026-07-29 | sequence complete (perm. close) | Silent |
| Moayad Aldawood | Bank Albilad, KSA | b2 | Msg 3 sent 2026-07-27 | Msg 4 · 2026-08-02 (drafted, awaiting snapshot) | Silent |
| Bahaa Farouk | Suez Canal Bank, Egypt | b3 | Msg 3 sent 2026-07-27 | Msg 4 · 2026-08-02 (drafted, awaiting snapshot) | Silent |
| Adam Jabry | Alizz, Oman | b3 | Msg 2 sent 2026-07-22 | Msg 3 · HELD | HELD (Alizz acquisition) |
| Amir Alsalous | Bank of Sharjah, UAE | b3 | Msg 3 sent 2026-07-27 | Msg 4 · 2026-08-02 (drafted, awaiting snapshot) | Silent |
| Sridhar Iyer | GIB (meem), KSA/Bahrain | b4 | Msg 3 sent 2026-07-27 | Msg 4 · 2026-08-02 (drafted, awaiting snapshot) | Silent |
| Wafa Al Harbi | Sharjah Islamic, UAE | b4 | Msg 3 sent 2026-07-27 | Msg 4 · 2026-08-02 (drafted, awaiting snapshot) | Silent |
| Mahmoud Okasha | AAIB, Egypt | b4 | Msg 3 sent 2026-07-27 | Msg 4 · 2026-08-02 (drafted, awaiting snapshot) | Silent |
| Navaid Ahmed | Sohar International, Oman | b4 | Msg 3 sent 2026-07-27 | Msg 4 · 2026-08-02 (drafted, awaiting snapshot) | Silent |
| Nasser Alawadhi | BisB, Bahrain | b6 | Msg 2 sent 2026-07-29 | Msg 3 · 2026-08-03 (Mon) | Silent (email bounced, LinkedIn primary) |
| Ahmed Ali | QNB Egypt, Egypt | b6 | Msg 1 sent 2026-07-26 | Msg 2 · HELD to ~2026-08-12 | HELD: Salil multi-threading QNB via another contact |
| Luciano Di Pietro | tam Bank (KFH), Kuwait | b5 | Msg 2 sent 2026-07-29 | Msg 3 · 2026-08-03 (Mon) | Silent |
| Dr. Ahmed Taqi | BBK, Bahrain | b5 | Msg 1 sent 2026-07-26 | Msg 2 · 2026-08-02 (drafted, awaiting snapshot) | Role CONFIRMED (Chief Retail Banking Officer). Copy ready, carried verbatim from the 07-29 draft |
| Said Al Marhoobi | NBO, Oman | b4 | Msg 1 sent 2026-07-26 | Msg 2 · 2026-08-02 (drafted, BLOCKED) | DO NOT SEND. NBO role still unconfirmed (coaching headline, 07-29 snapshot). One profile click clears it |

16 leads on the LinkedIn lane. Next big sweep dates: 2026-07-29 (Ashraf Msg 4, Mohamed Hamdy Msg 4, and Msg 2
for Nasser, Ahmed Ali, Luciano, Ahmed Taqi, Said); 2026-07-30 (7 Msg 4).

## Screenshot review log
- 2026-08-02: **NO snapshot received.** The batch-01 touch-4 run drafted all 9 due messages but could not run
  the new-acceptance sweep, so any acceptance since 07-29 is still unswept and any lead who accepted in that
  window has not been given a Msg 1. Standing rule 3 holds: nothing sends until the snapshot arrives.
- 2026-07-29: Salil shared the snapshot. Swept all 25 connections vs every pending CR across all batches: NO new
  bank acceptances (all recognizable bank names already in cadence). Roles confirmed from headlines for Nasser
  (BisB), Ahmed Ali (QNB Egypt), Luciano (Head of Digital Banking), Ahmed Taqi (Chief Retail Banking Officer,
  BBK). Said Al Marhoobi headline reads as a coaching brand (ICF Certified Coach), no NBO mention: role confirm
  pending before his Msg 2. Three banking connections not in our tracker (Ali AbdelMuhsin, Krishna Shah, Sulaiman
  Al-Faifi) noted for Salil. SENT 07-29: Nasser Msg 2, Luciano Msg 2, Ashraf Msg 4, Mohamed Hamdy Msg 4. Held:
  Ahmed Ali Msg 2 (multi-thread via another QNB contact).
- 2026-07-27: Salil shared the snapshot again. Swept all pending CRs across every batch: NO new bank
  acceptances (every bank name already in cadence). 7 Message 3s sent (Moayad, Bahaa, Amir, Sridhar, Wafa,
  Mahmoud, Navaid).
- 2026-07-26: Salil shared the "Recently added" snapshot. Cross-referenced all 35 vs every pending CR.
  Five NEW bank acceptances -> Message 1 generated and SENT 07-26: Nasser Alawadhi (BisB, b6), Ahmed Ali
  (QNB Egypt, b6), Luciano Di Pietro (tam Bank, b5), Ahmed Taqi (BBK, b5), Said Al Marhoobi (NBO, b4).
  Also SENT 07-26: Msg 3 for Ashraf (NBE) and Mohamed Hamdy (Banque Misr). Enrique Msg 3 held. All logged.
- 2026-07-22: reviewed earlier snapshot; Ahmed Taqi accepted 07-20 (his Msg 1 sent 07-26 above).

## Correction log
- 2026-07-26: Luciano Di Pietro role corrected to Head of the tam Digital Bank Unit at tam Bank (KFH's
  Shari'a-compliant digital bank); Msg 1 re-centred on tam.
- 2026-07-20: Enrique Cuentas was previously parked "held / in conversation." Gmail shows no email reply.
  Resumed cadence; Msg 3 remains held pending Salil confirming no LinkedIn reply.

## Connection requests still PENDING acceptance (no Message 1 yet)
When Salil reports an acceptance, Message 1 is generated then and the lead moves to the table above.

- b1: Robert Kufersin (FAB), Rahab Zadjali (Bank Muscat), Maitha Shuaib (DIB), Shoaib Rizvi (Emirates
  NBD), Daniel Szabo (QNB), George Yaryura (Mashreq), Mohammed Alabdullah (Al Rajhi). Haifa Binahmed
  (Riyad, email dead) LinkedIn-only, awaiting accept.
- b2: Afif Kalo, Musaad Algadi, Talal Al-Khaja, Nasser Almutawaa, Othman Hendi, Neil Gardner,
  Sami Zadjali [title VERIFY], Dongjun Choi.
- b3: Fernando Plaza, Lama Alessa, Fadi Chalouhi, Karolina Pachucy, Aref Al-Ramli, Ines Kadri,
  Omar Batayyah.
- b4: Amgad Samy, Mohammad Alomani, Nawaf Bawazir, Ali Almousa, Marian Kaisser [title VERIFY].
  (Said Al Marhoobi accepted 07-26, now on the lane above.)
- b5: Hassan Al-Omran (SNB), Hassaan Munir (Emirates Islamic), Abdullah Al-Tuwaijri (Boubyan),
  Constantinos Constantinides (QIB), Eiman Al-Naemi (CBQ), Karim Morcos (Banque du Caire), Ziad Alshami
  (OAB). (Luciano and Ahmed Taqi accepted, now on the lane above.) Sharif Rafei (NBF) email-only, DROPPED.
- b6: Faizal Kundil (Ajman), Fida El Samad (CBI), Nader Al Khawaja (SAIB), Abdulkarim Giraud (stc),
  Mohammed Al-Emadi (QIIB), Samir Al-Yakoob (ABK), Ahmed Al-Waily (Bank Nizwa), Hanan Fahmi (AlexBank).
  (Nasser Alawadhi and Ahmed Ali accepted 07-26, now on the lane above.)
