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

## IMPORTANT: how the daily reminder uses this file (the fix for the offset gap)

Each working day exactly one batch reminder fires. **That reminder sweeps this ENTIRE tracker for any
lead whose next LinkedIn touch is due or overdue on the run date, across ALL batches, not just the
batch named in the reminder.** This is because a lead's LinkedIn clock (keyed to their accept date)
does not line up with their batch's email clock. The daily reminder is therefore the single driver
that clears both the email leg (for its named batch) and every LinkedIn touch due that day (any
batch). Nothing waits for its own batch's next email date.

## Master table: everyone who has received LinkedIn Message 1

| Lead | Account / geo | Batch | Last LinkedIn touch | Next due | State |
|---|---|---|---|---|---|
| Ashraf Elsaghir | NBE, Egypt | b1 | Msg 2 sent 2026-07-20 | Msg 3 · 2026-07-23 (Thu) | Silent, no reply |
| Enrique Cuentas | CIB, Egypt | b1 | Msg 2 sent 2026-07-20 | Msg 3 · 2026-07-23 (Thu) | Silent, no reply. [CONFIRM: did he reply on LinkedIn? If yes, stop and mark Replied.] |
| Mohamed Hamdy | Banque Misr, Egypt | b2 | Msg 2 sent 2026-07-20 | Msg 3 · 2026-07-23 (Thu) | Silent, no reply |
| Moayad Aldawood | Bank Albilad, KSA | b2 | Msg 2 (v1.2) sent 2026-07-22 | Msg 3 · 2026-07-27 (Mon) | Silent |
| Bahaa Farouk | Suez Canal Bank, Egypt | b3 | Msg 2 (v1.2) sent 2026-07-22 | Msg 3 · 2026-07-27 (Mon) | Silent |
| Adam Jabry | Alizz, Oman | b3 | Msg 2 (v1.2) sent 2026-07-22 | Msg 3 · 2026-07-27 (Mon) | Silent |
| Amir Alsalous | Bank of Sharjah, UAE | b3 | Msg 2 (v1.2) sent 2026-07-22 | Msg 3 · 2026-07-27 (Mon) | Silent |
| Sridhar Iyer | GIB (meem), KSA/Bahrain | b4 | Msg 2 (v1.2) sent 2026-07-22 | Msg 3 · 2026-07-27 (Mon) | Silent |
| Wafa Al Harbi | Sharjah Islamic, UAE | b4 | Msg 2 (v1.2) sent 2026-07-22 | Msg 3 · 2026-07-27 (Mon) | Silent |
| Mahmoud Okasha | AAIB, Egypt | b4 | Msg 2 (v1.2) sent 2026-07-22 (identity confirmed 07-22) | Msg 3 · 2026-07-27 (Mon) | Silent |
| Navaid Ahmed | Sohar International, Oman | b4 | Msg 2 (v1.2) sent 2026-07-22 | Msg 3 · 2026-07-27 (Mon) | Silent |

11 leads on the LinkedIn lane. (The earlier "8 accepted" count missed the 3 already-connected leads,
Ashraf, Mohamed Hamdy, Sridhar, who got Message 1 on Day 0 without an accept step.)

## Screenshot review log
- 2026-07-22: Reviewed Salil's latest "Recently added" connections screenshots, cross-referenced name
  by name against every pending CR list below. ONE new acceptance matching a pending CR:
  **Dr. Ahmed Taqi (BBK, b5), connected 2026-07-20** (role "Chief Retail Banking Officer, Bank of
  Bahrain and Kuwait" confirmed current by the screenshot). His LinkedIn Msg 1 is now due/overdue and
  will be generated in the batch-05 LinkedIn leg (cross-batch sweep). None of batch-01/02/03/04/06's
  pending CRs appeared as newly accepted. Specifically, none of batch-04's six pending CRs (Amgad,
  Mohammad Alomani, Said, Nawaf, Ali, Marian) accepted, so batch-04 has no new Msg 1.

## Correction log
- 2026-07-20: Enrique Cuentas was previously parked "held / in conversation." That was an unverified
  assumption (accepted + Msg 1 sent, read as "active"), not a confirmed reply. Gmail shows no email
  reply. Resumed his cadence; Msg 2 due 2026-07-20. Pending Salil's confirmation of any LinkedIn reply.

## Connection requests still PENDING acceptance (no Message 1 yet)

When Salil reports an acceptance, Message 1 is generated then and the lead moves to the table above.

- b1: Robert Kufersin (FAB), Rahab Zadjali (Bank Muscat), Maitha Shuaib (DIB), Shoaib Rizvi (Emirates
  NBD), Daniel Szabo (QNB), George Yaryura (Mashreq), Mohammed Alabdullah (Al Rajhi). Haifa Binahmed
  (Riyad, email dead) LinkedIn-only, awaiting accept.
- b2: Afif Kalo, Musaad Algadi, Talal Al-Khaja, Nasser Almutawaa, Othman Hendi, Neil Gardner,
  Sami Zadjali [title VERIFY], Dongjun Choi.
- b3: Fernando Plaza, Lama Alessa, Fadi Chalouhi, Karolina Pachucy, Aref Al-Ramli, Ines Kadri,
  Omar Batayyah.
- b4: Amgad Samy, Mohammad Alomani, Said Al Marhoobi, Nawaf Bawazir, Ali Almousa,
  Marian Kaisser [title VERIFY].
- b5 (CR sent 2026-07-20, 8 profiles): Hassan Al-Omran (SNB), Hassaan Munir (Emirates Islamic),
  Luciano Di Pietro (KFH), Abdullah Al-Tuwaijri (Boubyan), Constantinos Constantinides (QIB),
  Eiman Al-Naemi (CBQ, https://www.linkedin.com/in/eiman-al-naemi/), Karim Morcos (Banque du Caire).
  ACCEPTED (per 2026-07-22 screenshots): Ahmed Taqi (BBK,
  https://www.linkedin.com/in/dr-ahmed-taqi-89aba215/), connected 2026-07-20 -> LinkedIn Msg 1 DUE,
  to be generated in the batch-05 LinkedIn leg.
  Email-only, no LinkedIn located: Sharif Rafei (NBF).
  OAB: Anuj Madan SUPPRESSED (left the bank). REPLACED by Ziad Alshami (Head of CRM & Data Analytics,
  OAB, https://www.linkedin.com/in/ziad-alshami-57a21a14, verified email, current since 2021).
  CR + Email 1 SENT 2026-07-20, pending acceptance. So b5 CR-sent = 9 profiles now.

- b6 (note-less CR SENT 2026-07-22, 9 of 10; v1.2 Message 1 ready on accept, in
  batch-06/01_initial_2026-07-22.md; none accepted as of 07-22 screenshots. Atul Choudrie / stc bank
  SUPPRESSED, left the bank Jan 2026. Email bounced for Fida/CBI, Samir/ABK, Nasser/BisB, so those three
  are LinkedIn-only): Faizal Kundil (Ajman), Fida El Samad
  (CBI), Nader Al Khawaja (SAIB), Atul Choudrie (stc bank), Mohammed Al-Emadi (QIIB), Samir Al-Yakoob
  (ABK), Nasser Alawadhi (BisB), Ahmed Al-Waily (Bank Nizwa), Ahmed Ali (QNB Alahli), Hanan Fahmi
  (AlexBank). All emails pattern-unverified, so LinkedIn is the primary channel for this batch.

None of the batch 1-4 pending appeared as newly connected in Salil's 2026-07-20 screenshots
(validated name by name).
