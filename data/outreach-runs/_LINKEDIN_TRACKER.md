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

## >>> DUE TOMORROW, 2026-07-27 (Mon) — the batch-05 run MUST generate these 7 Message 3s <<<
Do NOT skip any of these. Each is a v1.2 Message 3 (use-case, "the first journey I'd build"), and must
not repeat that lead's Msg 1 or Msg 2 content.

| Lead | Account / geo | Batch | Msg 3 due |
|---|---|---|---|
| Moayad Aldawood | Bank Albilad, KSA | b2 | 2026-07-27 |
| Bahaa Farouk | Suez Canal Bank, Egypt | b3 | 2026-07-27 |
| Amir Alsalous | Bank of Sharjah, UAE | b3 | 2026-07-27 |
| Sridhar Iyer | GIB (meem), KSA/Bahrain | b4 | 2026-07-27 |
| Wafa Al Harbi | Sharjah Islamic, UAE | b4 | 2026-07-27 |
| Mahmoud Okasha | AAIB, Egypt | b4 | 2026-07-27 |
| Navaid Ahmed | Sohar International, Oman | b4 | 2026-07-27 |

**HELD (do NOT send):** Adam Jabry (Alizz, b3) Msg 3 was due 07-27 but Alizz is under acquisition by
Bank Nizwa. Held until Salil clears it.

## Master table: everyone on the LinkedIn lane

| Lead | Account / geo | Batch | Last LinkedIn touch | Next due | State |
|---|---|---|---|---|---|
| Ashraf Elsaghir | NBE, Egypt | b1 | Msg 3 sent 2026-07-26 | Msg 4 · 2026-07-29 (Wed) | Silent |
| Enrique Cuentas | CIB, Egypt | b1 | Msg 2 sent 2026-07-20 | Msg 3 · HELD | Held: send Msg 3 only once Salil confirms NO LinkedIn reply; if he replied, STOP and mark Replied |
| Mohamed Hamdy | Banque Misr, Egypt | b2 | Msg 3 sent 2026-07-26 | Msg 4 · 2026-07-29 (Wed) | Silent |
| Moayad Aldawood | Bank Albilad, KSA | b2 | Msg 2 sent 2026-07-22 | **Msg 3 · 2026-07-27 (DUE TOMORROW)** | Silent |
| Bahaa Farouk | Suez Canal Bank, Egypt | b3 | Msg 2 sent 2026-07-22 | **Msg 3 · 2026-07-27 (DUE TOMORROW)** | Silent |
| Adam Jabry | Alizz, Oman | b3 | Msg 2 sent 2026-07-22 | Msg 3 · 2026-07-27 HELD | HELD (Alizz acquisition) |
| Amir Alsalous | Bank of Sharjah, UAE | b3 | Msg 2 sent 2026-07-22 | **Msg 3 · 2026-07-27 (DUE TOMORROW)** | Silent |
| Sridhar Iyer | GIB (meem), KSA/Bahrain | b4 | Msg 2 sent 2026-07-22 | **Msg 3 · 2026-07-27 (DUE TOMORROW)** | Silent |
| Wafa Al Harbi | Sharjah Islamic, UAE | b4 | Msg 2 sent 2026-07-22 | **Msg 3 · 2026-07-27 (DUE TOMORROW)** | Silent |
| Mahmoud Okasha | AAIB, Egypt | b4 | Msg 2 sent 2026-07-22 | **Msg 3 · 2026-07-27 (DUE TOMORROW)** | Silent |
| Navaid Ahmed | Sohar International, Oman | b4 | Msg 2 sent 2026-07-22 | **Msg 3 · 2026-07-27 (DUE TOMORROW)** | Silent |
| Nasser Alawadhi | BisB, Bahrain | b6 | Msg 1 sent 2026-07-26 | Msg 2 · 2026-07-29 (Wed) | Silent (email bounced, LinkedIn primary) |
| Ahmed Ali | QNB Egypt, Egypt | b6 | Msg 1 sent 2026-07-26 | Msg 2 · 2026-07-29 (Wed) | Silent |
| Luciano Di Pietro | tam Bank (KFH), Kuwait | b5 | Msg 1 sent 2026-07-26 | Msg 2 · 2026-07-29 (Wed) | Silent |
| Dr. Ahmed Taqi | BBK, Bahrain | b5 | Msg 1 sent 2026-07-26 | Msg 2 · 2026-07-29 (Wed) | Silent |
| Said Al Marhoobi | NBO, Oman | b4 | Msg 1 sent 2026-07-26 | Msg 2 · 2026-07-29 (Wed) | Silent (confirm still at NBO) |

16 leads on the LinkedIn lane. Next big sweep dates: 2026-07-27 (7 Msg 3), 2026-07-29 (Ashraf Msg 4,
Mohamed Hamdy Msg 4, and Msg 2 for Nasser, Ahmed Ali, Luciano, Ahmed Taqi, Said).

## Screenshot review log
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
