# LinkedIn follow-up tracker (the manual LinkedIn lane)

Single source of truth for the LinkedIn channel. The email channel self-tracks through Gmail;
LinkedIn does not, and its clock is offset from email (Message 1 goes out the day a lead ACCEPTS,
not the day the batch's Email 1 went out). So every LinkedIn Message 1 recipient is logged here with
its own due-date, and the batch reminders read this file for the LinkedIn leg.

## LinkedIn cadence

- Connection request (Day 0) -> on ACCEPT, send LinkedIn **Message 1**.
- **Message 1 -> Message 2 = +3 Gulf working days** (Sun-Thu; skip Fri/Sat), same rule as email.
- Then Message 3, 4 continue the sequence, alternating with the email touches so the lead is not hit
  on both channels the same day.
- If the lead **replies on LinkedIn**, STOP the cadence (Salil tells me; I cannot see LinkedIn).
- LinkedIn sends are manual: I generate pasteable text, Salil sends, then I log to Zoho.

## Master table: everyone who has received LinkedIn Message 1

| Lead | Account / geo | Batch | Msg 1 sent | Msg 2 due | State |
|---|---|---|---|---|---|
| Ashraf Elsaghir | NBE, Egypt | b1 | 2026-07-13 | **2026-07-16 (OVERDUE)** | Silent, drafted below |
| Enrique Cuentas | CIB, Egypt | b1 | 2026-07-15 | hold | In conversation, cadence paused |
| Mohamed Hamdy | Banque Misr, Egypt | b2 | 2026-07-14 | **2026-07-17 (OVERDUE)** | Silent, drafted below |
| Moayad Aldawood | Bank Albilad, KSA | b2 | 2026-07-16 | 2026-07-21 (Tue) | Silent |
| Bahaa Farouk | Suez Canal Bank, Egypt | b3 | 2026-07-16 | 2026-07-21 (Tue) | Silent |
| Adam Jabry | Alizz, Oman | b3 | 2026-07-16 | 2026-07-21 (Tue) | Silent |
| Amir Alsalous | Bank of Sharjah, UAE | b3 | 2026-07-16 | 2026-07-21 (Tue) | Silent |
| Sridhar Iyer | (b4 account) | b4 | 2026-07-16 | 2026-07-21 (Tue) | Silent |
| Wafa Al Harbi | Sharjah Islamic, UAE | b4 | 2026-07-19 | 2026-07-22 (Wed) | Silent |
| Mahmoud Okasha | AAIB, Egypt | b4 | 2026-07-19 | 2026-07-22 (Wed) | Silent |
| Navaid Ahmed | Sohar International, Oman | b4 | 2026-07-19 | 2026-07-22 (Wed) | Silent |

11 leads on the LinkedIn Message 1 lane. (The earlier "8 accepted" count missed the 3 already-
connected leads, Ashraf, Mohamed Hamdy, Sridhar, who got Message 1 on Day 0 without an accept step.)

## Connection requests still PENDING acceptance (no Message 1 yet)

These got only a connection request. When Salil reports an acceptance, Message 1 is generated then,
and the lead moves to the master table above.

- b1: Robert Kufersin (FAB), Rahab Zadjali (Bank Muscat), Maitha Shuaib (DIB), Shoaib Rizvi (Emirates
  NBD), Daniel Szabo (QNB), George Yaryura (Mashreq). Mohammed Alabdullah (Al Rajhi) CR sent Day 3.
  Haifa Binahmed (Riyad, email dead) LinkedIn-only, awaiting accept.
- b2: Afif Kalo, Musaad Algadi, Talal Al-Khaja, Nasser Almutawaa, Othman Hendi, Neil Gardner,
  Sami Zadjali [title VERIFY], Dongjun Choi.
- b3: Fernando Plaza, Lama Alessa, Fadi Chalouhi, Karolina Pachucy, Aref Al-Ramli, Ines Kadri,
  Omar Batayyah.
- b4: Amgad Samy, Mohammad Alomani, Said Al Marhoobi, Nawaf Bawazir, Ali Almousa,
  Marian Kaisser [title VERIFY].

## How the batch reminders use this file

Each batch reminder's daily loop now covers BOTH channels for that batch's leads:
1. Email leg: reply sweep in Gmail, generate Email N, create drafts.
2. LinkedIn leg: read this tracker, generate Message N for any lead whose Msg N is due (or overdue),
   hand Salil pasteable text, and after he sends, advance the Msg N date here and log to Zoho.

Overdue LinkedIn touches are surfaced immediately, not held for the batch's next email date.
