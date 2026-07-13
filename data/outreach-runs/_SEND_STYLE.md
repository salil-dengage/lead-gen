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

## Signature — append to every email as htmlBody
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

## Proof / reference line — Salil's clear preference
On 4 of 5 emails read, Salil replaced the single geography-annotated reference with a **standalone
multi-logo proof paragraph**, placed on its own line after the value paragraph and before the CTA:

> Burgan Bank, AKBank, Bank Al Baraka, UBL, Allied Bank, and many others use Dengage to run
> millions of messages for millions of their customers this way.

(Robert variant: "...and many others run millions of messages a day this way with Dengage.")

Formatting: its own paragraph, blank line above and below. Keep the researched hook and the
persona-matched angle in the body exactly as before.

### OPEN ITEM — confirm the approved named-customer set before I reuse this line
CLAUDE.md verifies only Burgan Bank (plus Fibabanka, MCB, Şok, Zellbury, Beymen) as customers.
AKBank, Bank Al Baraka, and Allied Bank are not in the knowledge base. **UBL appears in the KB only
as an RFP *response* (08_FULL_RFP_RESPONSES.md), the same category as Wizz Air, i.e. not confirmed
as a customer.** Naming a non-customer as a reference is exactly the risk CLAUDE.md §2 was written to
prevent. So before I reuse this multi-logo line tomorrow, Salil to confirm which logos are approved
as named customer references. Once confirmed, update this file (and ideally CLAUDE.md §4) so the
approved set is verified going forward. Until confirmed, default to Burgan Bank (Turkey) plus the
other KB-verified logos, geography-annotated.

## Body rules (unchanged, still enforced)
- Greeting "Hi <First name>,"; one researched hook per lead; persona-matched angle; soft single CTA.
- No em/en dashes, no rule-of-three, no filler. KSA leads cite GCP Dammam. Deterministic identity only.
- Short paragraphs; proof line stands alone; CTA as its own short line before the sign-off.

## Draft mechanics
- Create as Gmail drafts (create_draft) with BOTH body (plain-text) and htmlBody (with signature),
  so each draft is fully send-ready and Salil only has to review and click send.
