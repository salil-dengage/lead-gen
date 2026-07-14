# Outreach send style — learned from Salil's actual sent emails (2026-07-13)

Apply this to EVERY future run so drafts are send-ready and match the sender's real voice.
Learned by reading the 10 emails Salil actually sent on Day 1, not the original drafts.

## Sender
- From: salil@dengage.com
- Signature name/title: **Salil Gupta | Sr. Director - Middle East**
  (Note: this differs from CLAUDE.md §6 which says "Director, International Business" — use the
  signature title above in outbound email.)

## Sign-off (exact)
```
Best,
Salil
```
Never use "[Your name]". Draft with "Best, Salil" every time.

## Signature — DO NOT add it to drafts (Salil appends his own)
UPDATED 2026-07-14: Do not build the HTML signature into drafts. When passed as htmlBody, Gmail
rewrote the social links into ugly google.com/url tracking-wrapped URLs and the logo/social images
rendered broken, so the drafts had to be cleaned by hand before sending. Going forward: create each
draft as PLAIN TEXT body only (no htmlBody, no signature block, no links), ending at "Best, Salil".
Salil adds his own signature in Gmail before sending. The signature reference below is kept only for
record, it is NOT to be inserted into drafts.

```html
<div dir="ltr" class="gmail_signature"><div dir="ltr">
<a href="https://www.dengage.com/" target="_blank"><img src="https://dengage.com/email-signat/Dengage_logo.png" width="138" height="24" alt="Logo" style="width:138px"></a>
<p style="margin:0;font-family:Arial,sans-serif;font-weight:bold;color:rgb(0,2,38)">Salil Gupta | <span style="color:rgb(0,0,255);font-weight:normal">Sr. Director - Middle East</span></p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse"><tbody><tr>
<td style="padding-right:10px;padding-top:15px"><a href="https://www.linkedin.com/in/salil88/" target="_blank"><img src="https://dengage.com/email-signat/LinkedIn.png" width="16" height="16" alt="LinkedIn"></a></td>
<td style="padding-right:10px;padding-top:15px"><a href="https://www.x.com/dengageglobal" target="_blank"><img src="https://dengage.com/email-signat/Twitter.png" width="16" height="16" alt="Twitter"></a></td>
<td style="padding-right:10px;padding-top:15px"><a href="https://www.instagram.com/dengageglobal" target="_blank"><img src="https://dengage.com/email-signat/Instagram.png" width="16" height="16" alt="Instagram"></a></td>
<td style="padding-right:10px;padding-top:15px"><a href="https://www.youtube.com/@dengage" target="_blank"><img src="https://dengage.com/email-signat/Youtube.png" width="23" height="16" alt="YouTube"></a></td>
<td style="padding-right:10px;padding-top:15px"><a href="https://www.g2.com/products/d-engage/reviews" target="_blank"><img src="https://dengage.com/email-signat/G2.png" width="90" height="16" alt="G2"></a></td>
</tr></tbody></table>
</div></div>
```
Plain-text fallback (body field): `Salil Gupta | Sr. Director - Middle East` + the five links.

## Proof / reference line — UPDATED 2026-07-14: tailor it per prospect
Salil's instruction (2026-07-14): do NOT reuse one fixed multi-logo line for every email. Now that
the full verified customer roster is in `knowledge-base/00_CUSTOMER_MASTER.md`, pick the closest
same-segment, closest-geography reference for each specific prospect:
- Islamic bank prospect -> cite Islamic-bank customers (Meezan Bank, the largest Islamic bank in
  Pakistan; Bank Islami, Pakistan).
- Conventional bank prospect -> cite Turkey conventional customers (İşbank, Akbank).
- Attach a verified metric ONLY for the two banks we have numbers for: Burgan Bank (~1M messages/day,
  Turkey) and Fibabanka (4.45M customers, Turkey). All other named customers are logos only, no
  metric, geography-annotated. Never imply a GCC customer.
The fixed multi-logo line below is retained only as historical record of the Day-1 style.

## Proof / reference line — Salil's clear preference (Day 1, superseded by the note above)
On 4 of 5 emails read, Salil replaced the single geography-annotated reference with a **standalone
multi-logo proof paragraph**, placed on its own line after the value paragraph and before the CTA:

> Burgan Bank, AKBank, Bank Al Baraka, UBL, Allied Bank, and many others use Dengage to run
> millions of messages for millions of their customers this way.

(Robert variant: "...and many others run millions of messages a day this way with Dengage.")

Formatting: its own paragraph, blank line above and below. Keep the researched hook and the
persona-matched angle in the body exactly as before.

### RESOLVED (2026-07-13) — proof line approved against the CRM customer master
Salil provided the Zoho "Account by Industry" customer export on 2026-07-13. It is now the
authoritative roster (`knowledge-base/00_CUSTOMER_MASTER.md`). Against it, four of the five logos in
the sent-email proof line are **verified paying customers**:

- **Burgan Bank** (Turkey) — verified
- **Akbank** (Turkey) — verified
- **UBL / United Bank Limited** (Pakistan) — verified (CLAUDE.md §2 corrected: UBL is a customer,
  no longer treated as RFP-response-only)
- **Allied Bank** (Pakistan) — verified
- **Bank Al Baraka** — confirmed a customer by Salil on 2026-07-13 (not present in the Account-by-
  Industry export, confirmed separately). Approved for the proof line. Geography to confirm.

Approved multi-logo line to reuse (all five verified):
> Burgan Bank, Akbank, Bank Al Baraka, UBL, Allied Bank, and many others use Dengage to run millions
> of messages for millions of their customers this way.

Note on geography: these are Turkey and Pakistan banks. When the prospect is GCC/Gulf, this is still
adjacent-geography proof, not a GCC logo. Do not imply any of these are Gulf customers. There is no
GCC banking customer in the roster (CLAUDE.md §4 constraint holds).

## Body rules (unchanged, still enforced)
- Greeting "Hi <First name>,"; one researched hook per lead; persona-matched angle; soft single CTA.
- No em/en dashes, no rule-of-three, no filler. KSA leads cite GCP Dammam. Deterministic identity only.
- Short paragraphs; proof line stands alone; CTA as its own short line before the sign-off.

## Draft mechanics
- Create as Gmail drafts (create_draft) with PLAIN TEXT body ONLY. No htmlBody, no signature block,
  no embedded links. Paragraphs separated by blank lines. End at "Best, Salil".
- Salil reviews each draft and adds his own signature before sending. Do not add it for him.
- Reason: htmlBody with the signature caused Gmail to mangle the links and images (see the
  signature section above). Plain text renders cleanly every time.
