# Gulf + Egypt Banking ICP — Verified Persona Coverage

**336 verified personas** across **95/108** banks (max 10 per account, 0 duplicates).

Source: Apollo people search (masked, pre-enrichment) filtered through a strict business-buyer
classifier. Verified in multiple independent passes, including a full re-audit of every
previously-"uncovered" bank against Apollo's own organization records (not assumptions) after
the client correctly challenged the plausibility of 18 banks having zero relevant personas.

## Coverage by country

| Country | Banks covered | Personas |
|---|---|---|
| UAE | 23/24 | 76 |
| KSA | 12/13 | 58 |
| Kuwait | 9/10 | 26 |
| Qatar | 8/10 | 19 |
| Bahrain | 7/10 | 20 |
| Oman | 7/8 | 24 |
| Egypt | 29/33 | 113 |
| **Total** | **95/108** | **336** |

## Personas per bank

| Bank | Country | Personas |
|---|---|---|
| First Abu Dhabi Bank | UAE | 5 |
| Emirates NBD | UAE | 10 |
| Abu Dhabi Commercial Bank | UAE | 5 |
| Dubai Islamic Bank | UAE | 5 |
| Mashreq | UAE | 6 |
| Abu Dhabi Islamic Bank | UAE | 6 |
| RAKBANK | UAE | 6 |
| Commercial Bank of Dubai | UAE | 6 |
| National Bank of Fujairah | UAE | 1 |
| Emirates Islamic | UAE | 3 |
| Sharjah Islamic Bank | UAE | 3 |
| Bank of Sharjah | UAE | 2 |
| United Arab Bank | UAE | 2 |
| Invest Bank | UAE | 1 |
| Ajman Bank | UAE | 3 |
| Al Hilal Bank | UAE | 1 |
| Commercial Bank International | UAE | 2 |
| National Bank of Umm Al Qaiwain | UAE | 1 |
| Wio Bank | UAE | 2 |
| Zand Bank | UAE | 1 |
| Al Maryah Community Bank | UAE | 2 |
| Deem Finance | UAE | 1 |
| Finance House | UAE | 2 |
| Al Rajhi Bank | KSA | 6 |
| Saudi National Bank | KSA | 9 |
| Riyad Bank | KSA | 7 |
| SABB | KSA | 5 |
| Banque Saudi Fransi | KSA | 6 |
| Arab National Bank | KSA | 5 |
| Bank Albilad | KSA | 4 |
| Bank Aljazira | KSA | 7 |
| Alinma Bank | KSA | 6 |
| Saudi Investment Bank | KSA | 1 |
| STC Bank | KSA | 1 |
| D360 Bank | KSA | 1 |
| National Bank of Kuwait | Kuwait | 8 |
| Kuwait Finance House | Kuwait | 2 |
| Burgan Bank | Kuwait | 2 |
| Gulf Bank | Kuwait | 4 |
| Al Ahli Bank of Kuwait | Kuwait | 3 |
| Commercial Bank of Kuwait | Kuwait | 2 |
| Kuwait International Bank | Kuwait | 1 |
| Boubyan Bank | Kuwait | 3 |
| Warba Bank | Kuwait | 1 |
| Qatar National Bank | Qatar | 5 |
| Qatar Islamic Bank | Qatar | 3 |
| Doha Bank | Qatar | 3 |
| Ahli Bank Qatar | Qatar | 1 |
| Dukhan Bank | Qatar | 3 |
| Masraf Al Rayan | Qatar | 1 |
| Qatar Development Bank | Qatar | 2 |
| Lesha Bank | Qatar | 1 |
| Ahli United Bank | Bahrain | 2 |
| National Bank of Bahrain | Bahrain | 4 |
| BBK | Bahrain | 2 |
| Bahrain Islamic Bank | Bahrain | 1 |
| Al Salam Bank | Bahrain | 3 |
| Bank ABC | Bahrain | 5 |
| Gulf International Bank | Bahrain | 3 |
| Bank Muscat | Oman | 5 |
| Bank Dhofar | Oman | 3 |
| National Bank of Oman | Oman | 4 |
| Sohar International | Oman | 3 |
| Oman Arab Bank | Oman | 3 |
| Bank Nizwa | Oman | 2 |
| Alizz Islamic Bank | Oman | 4 |
| National Bank of Egypt | Egypt | 6 |
| Banque Misr | Egypt | 4 |
| Banque du Caire | Egypt | 7 |
| Commercial International Bank | Egypt | 8 |
| QNB Alahli | Egypt | 4 |
| Arab African International Bank | Egypt | 8 |
| Bank of Alexandria (ALEXBANK) | Egypt | 6 |
| Faisal Islamic Bank of Egypt | Egypt | 1 |
| Abu Dhabi Islamic Bank Egypt | Egypt | 4 |
| ADCB Egypt (ex-UNB) | Egypt | 4 |
| Al Baraka Bank Egypt | Egypt | 3 |
| Housing & Development Bank | Egypt | 5 |
| EG Bank (EGBANK) | Egypt | 4 |
| Suez Canal Bank | Egypt | 5 |
| SAIB (Societe Arabe Int'l de Banque) | Egypt | 5 |
| Industrial Development Bank | Egypt | 2 |
| Export Development Bank of Egypt | Egypt | 4 |
| Agricultural Bank of Egypt | Egypt | 4 |
| Bank NXT | Egypt | 3 |
| First Abu Dhabi Bank Misr | Egypt | 3 |
| MIDBANK | Egypt | 2 |
| Arab International Bank | Egypt | 3 |
| Al Ahli Bank of Kuwait Egypt | Egypt | 4 |
| Attijariwafa Bank Egypt | Egypt | 3 |
| Egyptian Arab Land Bank | Egypt | 1 |
| The United Bank | Egypt | 1 |
| HSBC Egypt | Egypt | 2 |
| Arab Bank Egypt | Egypt | 6 |
| Ahli United Bank Egypt | Egypt | 1 |

## Persona role distribution

| Persona role | Count |
|---|---|
| Digital / Digital Banking | 116 |
| Marketing / Brand | 102 |
| Customer Experience | 45 |
| Digital Marketing / Growth | 22 |
| Loyalty / CVM / Retention | 19 |
| Digital Channels / Products | 15 |
| MarTech / Campaigns | 8 |
| CRM | 7 |
| Cards / Payments (marketing) | 1 |
| Personalization / Engagement | 1 |

**Work email present (pre-enrichment):** 249/336 (74%)

## Re-audit: why the earlier "18 uncovered banks" claim was wrong

The client correctly rejected the earlier finding that 18 banks had zero relevant personas —
several of these are large institutions where that is implausible. Re-investigation using
Apollo's Organization Search/Enrichment API (not domain guesses) found the earlier searches had
missed real people at 5 banks, for two distinct root causes:

1. **Broken domain-to-org mapping in Apollo.** `hsbc.com.eg` was tagged in Apollo to an unrelated
   small creative agency, not the real HSBC Egypt entity. `arabbank.com.eg` was tagged to an
   unrelated 2-person "ATM" stub. Both real entities exist in Apollo under their global parent
   org (HSBC, Arab Bank) — searching there with an Egypt location filter surfaced real people.
2. **No domain indexed at all.** Ahli United Bank Egypt has a real Apollo org record with real
   employees but no domain attached, so any domain-based search silently returned nothing.
3. **Title list too narrow.** D360 Bank and Deem Finance both have real, sizeable marketing
   departments in Apollo (5 and 31 people respectively) that a specific-title-list search missed;
   a broader senior-level search (no title restriction) found them.

**Recovered as a result:** HSBC Egypt (2), Arab Bank Egypt (6), D360 Bank (1), Ahli United Bank
Egypt (1, and its name corrected from a leftover "Nbd?" data artifact), Deem Finance (1).

## Banks with no persona (13) — each individually re-verified against Apollo's own data

| Bank | Country | Evidence-based reason |
|---|---|---|
| Dubai First | UAE | Re-searched directly: 45 senior/manager profiles returned, 100% sales/relationship-management/collections/IT/HR/compliance — no marketing or digital role exists in Apollo's index for this entity |
| Gulf International Bank KSA | KSA | Confirmed same Apollo org/domain (gib.com) as Gulf International Bank (Bahrain) — same entity, already covered there |
| Industrial Bank of Kuwait | Kuwait | Not indexed in Apollo at all (domain lookup returns no organization record) |
| Commercial Bank (Qatar) | Qatar | Apollo's org record shows only 23 employees indexed company-wide (marketing=0) — genuinely sparse, confirmed via direct organization enrichment |
| Qatar International Islamic Bank | Qatar | Re-searched directly: 6 senior profiles (risk, compliance, SME, bancassurance, CFO) — no marketing/digital/CX role surfaced despite Apollo showing 3 marketing employees company-wide (likely below Head/Director seniority) |
| Ithmaar Bank | Bahrain | Re-searched directly: 6 senior profiles (CEO, CFO, audit, treasury, HR, corporate banking) — Apollo confirms a real 230-employee org but 0 marketing headcount |
| Khaleeji Bank | Bahrain | Not indexed in Apollo at all (domain lookup returns no organization record) |
| Bahrain Development Bank | Bahrain | Re-searched directly: 15 senior profiles, all compliance/SME/IT/treasury/audit/sharia/risk — this is a state-owned SME development bank (70% of Bahrain's SME financing); Apollo shows 3 marketing employees but none senior enough to surface, and the bank's core business (SME lending) sits outside the agreed retail-banking ICP scope regardless |
| Ahli Bank Oman | Oman | Apollo's org record shows only 1 employee indexed company-wide — genuinely unindexed, not a search miss |
| Credit Agricole Egypt | Egypt | Deliberately skipped (per explicit instruction) |
| Kuwait Finance House Egypt | Egypt | Re-searched directly with an Egypt location filter against the KFH Group org: 36 profiles, all customer-service/teller/treasury/PMO/IT/credit-risk/corporate-banking — no Egypt-specific marketing/digital/CX lead found (KFH Group personas are already captured under Kuwait Finance House) |
| Emirates NBD Egypt | Egypt | Apollo's org record is correctly tagged and complete (190 employees) but shows 0 marketing headcount; the org's own description confirms this subsidiary is wholesale/corporate-banking only ("focusing on wholesale and corporate banking... serves corporate and institutional clients") — out of the agreed retail-banking ICP scope independent of the Apollo data |
| Arab Banking Corporation Egypt | Egypt | Confirmed same Apollo org/domain (bank-abc.com) as Bank ABC (Bahrain) — same entity, already covered there |

## Prior re-verification (independent adversarial audit)

An earlier independent audit pass (no context on how the file was built) re-checked coverage,
caps, duplicates, title relevance, and seniority. 13 titles were confirmed as real leakage
(IT/PMO/collections-risk/contact-centre functions disguised in digital or marketing language) and
removed; the remainder were reviewed and kept as legitimate judgment calls. Full detail in the
prior version of this report (see git history).

