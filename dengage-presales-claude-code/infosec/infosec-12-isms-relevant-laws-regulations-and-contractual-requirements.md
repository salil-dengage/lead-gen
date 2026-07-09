# 12-ISMS Relevant Laws, Regulations, and Contractual Requirements

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 60-66
- Packet pages: 59-65

12-ISMS Relevant Laws, Regulations, and
Contractual Requirements
Policy Owner: Köksal Kayalı
Effective Date: Feb 18, 2026
Purpose
The purpose of this workbook is to identify, update, and maintain a current list of all relevant laws,
regulations, and contractual requirements and D·engage's approach to meeting these requirements.

Relevant laws, regulations, and contractual requirements
Relevant Laws,
Regulations, and D·engage as Approach to Meeting D·engage as
Contractual Data Controller Requirements Data Processor
Requirements
Group-wide ISMS: define scope
(entities/products/systems), perform
risk assessment, maintain Statement of
Applicability (SoA), policies &
procedures, internal audits,
management review, corrective actions;
supplier management, asset inventory,
access management,
logging/monitoring, change
ISO/IEC 27001:2022 management, incident management,
(ISMS) Yes security awareness training. Yes
Implement 27701 controls: personal
data inventory/records of processing,
privacy risk assessment/DPIA, data
subject rights (DSAR) process, DPA/SCC
management, subprocessor
management, privacy by design,
ISO/IEC 27701 (PIMS - retention & disposal, breach notification
privacy extension) Yes playbook. Yes
Business Impact Analysis (BIA), define
RTO/RPO targets, business continuity
plans (product, infrastructure, customer
support, HR), exercises/tabletops, crisis
communications, supplier continuity
(cloud, email/SMS providers,
payments), disaster recovery testing
ISO 22301 (BCMS) Yes and evidence collection. Yes
Implement and evidence TSC controls:
access controls, change management,
monitoring, incident response, vendor
risk, data classification, encryption,
security training, evidence
management; map controls across
SOC 2 (AICPA Trust entities + products and align with ISO
Services Criteria) Yes 27001/27701. Yes
If EU data subjects/customers are in
scope: establish lawful basis and
transparency (privacy notice), execute
DPA + SCCs/IDTA as applicable, conduct
DPIA where required, DSAR handling,
data minimization, retention, security
measures, breach notification; appoint
EU representative / DPO where
GDPR (EU) Sometimes required. Yes

Relevant Laws,
Regulations, and D·engage as Approach to Meeting D·engage as
Contractual Data Controller Requirements Data Processor
Requirements
If UK data subjects/customers are in
scope: use UK transfer mechanism
(IDTA or UK addendum), ensure DPA
terms, DSAR/breach processes;
UK GDPR (United maintain subprocessor list and
Kingdom) Sometimes contractual flow-down. Yes
For TR entity controller activities
(employees/candidates/visitors/CRM):
provide notice (aydınlatma), manage
explicit consent where required,
maintain inventory/records, retention &
destruction, technical/administrative
measures, breach notification process.
Turkey KVKK (Law No. For processor role: rely on DPA and
6698) + secondary implement security and processing
regulations Yes instructions. Yes
For BR entity controller activities:
establish legal basis, transparency,
rights request process, security
measures, contracts. For processor role:
process on customer instructions,
ensure security, manage subprocessors
Brazil LGPD (Law 13.709) Yes and contractual flow-down. Yes
If UAE (onshore) scope applies: provide
notices, manage lawful basis/consent as
applicable, ensure security, breach
handling, cross-border transfer
UAE Federal PDPL governance, contracts and records;
(Federal Decree-Law No. apply additional requirements for
45 of 2021) Yes sensitive/child data where relevant. Yes
If DIFC scope applies: comply with
controller/processor obligations,
transfer rules, rights management,
DPIA, breach response; maintain
contracts, records and evidence;
DIFC Data Protection Law implement a change-management plan
(Dubai - DIFC Law No. 5 for DIFC updates affecting privacy
of 2020) + updates Yes compliance. Yes
If ADGM scope applies: meet ADGM DPR
2021 obligations (processor duties,
DPIA, breach, transfer governance, DPO
ADGM Data Protection requirements where applicable),
Regulations 2021 (Abu maintain records and contractual flow-
Dhabi) If applicable down. Yes
Pakistan privacy and Sometimes Track Pakistan data protection bill Yes
cybersecurity framework status; apply best-effort baseline via
contracts (DPA), SOC 2/ISO controls,

Relevant Laws,
Regulations, and D·engage as Approach to Meeting D·engage as
Contractual Data Controller Requirements Data Processor
Requirements
(draft/sectoral + existing minimization, transfer assessments;
cyber law approach) align with local cybersecurity
expectations for incident handling,
logging and evidence preservation.
Maintain data mapping and transfer
impact assessments (TIA); apply
appropriate contractual mechanisms
(EU SCCs, UK IDTA/addendum) and
supplementary measures (encryption,
International data key management, access restriction);
transfers (SCC/IDTA + ensure subprocessor flow-down;
supplementary measures account for localization constraints
/ TIA) Yes (e.g., RU). Yes
Use standard DPA: processing
instructions, confidentiality,
subprocessor approval/listing, DSAR
Customer contractual assistance, breach notification
requirements (DPA, timelines, audit/evidence (SOC 2/ISO
Security Addendum, SLA, reports), retention/deletion/return; align
breach notification, audit SLAs and security addenda to
rights) Yes operational controls. Yes
When required by customer: implement
enhanced security (mandatory MFA,
encryption, pentest frequency, SIEM
Regulated-industry integration, data residency), additional
customer requirements reporting (SOC 2 bridge letters, ISO
(FinTech/Banking/Telecom certificates, DR test reports) and
etc.) Sometimes contractual commitments. Yes
If US/CA data subjects are in scope:
maintain privacy notice, evaluate 'Do
Not Sell/Share' obligations, DSAR
US state privacy & breach process; maintain breach notification
regimes (e.g., playbook for
CCPA/CPRA, CalOPPA, customers/regulators/individuals as
state breach laws) Sometimes applicable. Yes
If cardholder data is not processed:
keep PCI DSS out of product scope, use
third-party payment providers, and
enforce contractual and technical
controls to prevent CHD
Payment card data (PCI storage/processing within D·engage
DSS) - if out of scope No systems. No
Health data (HIPAA etc.) - Rare If health data is processed: use BAA Possible
customer-use-case (where applicable), enforce minimum
dependent necessary, audit logging, and stricter
access controls. Otherwise document as

Relevant Laws,
Regulations, and D·engage as Approach to Meeting D·engage as
Contractual Data Controller Requirements Data Processor
Requirements
out of scope and restrict via DPA and
product terms.
Yes (if
processing/sending
on behalf of
customer): As
Processor implement
consent/opt-out
enforcement per
customer
(Controller)
As Controller (TR): (1) collect/store instructions; define
marketing communication consents and responsibilities in
transfer/integrate with IYS where DPA/campaign terms
applicable; (2) manage opt-out/refusal (customer
centrally across channels and reflect in responsible for IYS
sending systems; (3) retain consent compliance,
evidence (timestamp, source, consent D·engage provides
text, transaction logs) audit-ready; (4) technical
enforce pre-campaign consent checks implementation);
(block sends without valid consent); (5) keep integration
maintain traceability for complaints. evidence and logs
Turkey - IYS (İleti Yönetim Align evidence with ISO 27001/27701 showing consent
Sistemi) / 6563 (records, access control, logs, retention) checks and
commercial electronic and SOC 2 (control suppression lists are
messages regime Yes evidence/monitoring). applied.
If KSA scope applies: maintain privacy
notice and lawful basis/consent model
per PDPL, restrict processing to stated
purposes, apply data minimization,
implement security measures, manage
DSAR workflow, keep records, govern
KSA - Personal Data cross-border transfers per PDPL rules
Protection Law (PDPL) + and contracts; align with ISO 27701
Implementing Yes (if KSA privacy controls and SOC 2 evidence
Regulations (SDAIA) entity/operations) collection. Yes
If organization/system is in ECC scope
(e.g., regulated/government/CNI-
related): implement ECC domains
(governance, asset mgmt, access
KSA - National control, security operations, incident
Cybersecurity Authority mgmt, BC/DR, third-party, etc.),
(NCA) Essential maintain audit evidence, map ECC to
Cybersecurity Controls ISO 27001/SOC 2 controls to avoid
(ECC-1) If applicable duplication. If applicable
KSA - Cloud Computing Sometimes If providing SaaS/cloud services to Sometimes
Services Provisioning / customers in KSA or hosting KSA data:
Cloud regulatory assess cloud classification/data

Relevant Laws,
Regulations, and D·engage as Approach to Meeting D·engage as
Contractual Data Controller Requirements Data Processor
Requirements
framework (CST/CITC - residency requirements, ensure
CCRF and related regs) contracts/SLA cover regulatory
obligations, implement security controls
and data-location commitments,
maintain subprocessor and hosting
transparency; evidence via architecture
diagrams, data-flow mapping and
vendor contracts.
If e-signatures/e-records are used in
contracting/onboarding: ensure
integrity, authenticity, non-repudiation
KSA - Electronic controls; retain logs, time-stamps, and
Transactions Law + evidence for electronic records; align
Implementing with ISO 27001 logging/records
Regulations (digital management and SOC 2 change/access
signatures / e-records) Sometimes controls. Sometimes
If D·engage operates as an e-commerce
provider in KSA context: ensure
required disclosures/terms, complaint
KSA - E-Commerce Law handling, and alignment with Electronic
(online service/commerce Transactions requirements; maintain
disclosures and consumer contract templates and customer
protections) Sometimes support processes as evidence. Sometimes
Compliance validation process
At least annually, compliance with relevant information security and data privacy frameworks, laws,
regulations, and contractual commitments shall be validated. Validation processes may include:
Verifying that tests are passing in Vanta
Compliance, configuration, and vulnerability scanning
Internal audits
External audits
Spot checks
Control owner validation processes
ISO 27001 coverage
ISO 27001 A.5.31; A.5.32; A.5.34
Version history
Version Date Description Author Approver
1.0 Feb 18, 2026 Version 1.0 Köksal Kayalı Mustafa Bilge, Osman Tufanoğulları

27701 Privacy Information Management System (PIMS) addendum
This addendum is automatically applicable for organizations implementing ISO 27701 and optional for
organizations who are implementing ISO 27001 only.
All references to "ISMS" in this document are changed to "IS&PMS"
All references is ISO 27001 in this document are changed to "ISO 27001/27701"
All references to "information security management system" are changed to "information security and
privacy management system"
