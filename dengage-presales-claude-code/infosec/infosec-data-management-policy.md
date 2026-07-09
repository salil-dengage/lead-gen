# Data Management Policy

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 87-93
- Packet pages: 86-92
- Policy Owner: Köksal Kayalı
- Effective Date: Sep 30, 2025

Purpose
To ensure that information is classified, protected, retained and securely disposed of in accordance with its
importance to the organization.
The policy also establishes monitoring, logging, and restoration requirements necessary to meet SOC 2
criteria.
Scope
All D·engage data, information and information systems.
This policy applies to all production and non‑production environments, third‑party processors, and
backups/archives containing Confidential or Restricted data.
General requirements
D·engage classifies data and information systems in accordance with legal requirements, sensitivity, and
business criticality in order to ensure that information is given the appropriate level of protection. Data
owners are responsible for identifying any additional requirements for specific data or exceptions to
standard handling requirements.
Information systems and applications shall be classified according to the highest classification of data that
they store or process.
Roles
Data Owner: Executive or function lead accountable for classification, approved sharing, retention/disposal
decisions, and annual review sign-off for their domain.
Data Steward: Implements owner decisions in systems and processes; coordinates data scrubs and
retention enforcement.
Information Security Officer (ISO): Verifies control effectiveness; reviews access/log reports; approves
policy exceptions.

Data classification
To help D·engage and its employees easily understand requirements associated with different kinds of
information, the company has created three classes of data.
Confidential
Highly sensitive data requiring the highest levels of protection; access is restricted to specific employees or
departments, and these records can only be passed to others with approval from the data owner, or a
company executive. Examples include:
Customer Data
Personally identifiable information (PII)
Company financial and banking data
Salary, compensation and payroll information
Strategic plans
Incident reports
Risk assessment reports
Technical vulnerability reports
Authentication credentials
Secrets and private keys
Source code
Litigation data
Restricted
D·engage proprietary information requiring thorough protection; access is restricted to personnel with a
"need-to-know" based on business requirements. This data can only be distributed outside the company
with approval. This is default for all company information unless stated otherwise. Examples include:
Internal policies
Legal documents
Meeting minutes and internal presentations
Contracts
Internal reports
Corporate messaging platforms
Email
Public
Documents intended for public consumption which can be freely distributed outside D·engage. Examples
include:
Marketing materials
Product descriptions
User & developer guides
Release notes
External facing policies

Labeling
Confidential and Restricted data must carry labels in both digital and physical forms:
Digital: systems storing these classes must apply classification tags/labels at the dataset, table, folder, or
document level (e.g., DLP labels, S3 object tags, repository labels).
Physical: paper copies must visibly display ‘Confidential' or ‘Restricted' and be handled per disposal
controls.
Confidential customer records used for troubleshooting or analytics must be masked/tokenized;
production raw data is not permitted in non‑production systems.

Data handling
Confidential Data Handling
Confidential data is subject to the following protection and handling requirements:
Access for non-preapproved roles requires documented approval from the data owner
Access is restricted to specific employees, roles and/or departments
Confidential systems shall not allow unauthenticated or anonymous access
Confidential Customer Data shall not be used or stored in non-production systems/environments
Confidential data shall be encrypted at rest and in transit over public networks in accordance with the
Cryptography Policy
Mobile device hard drives containing confidential data, including laptops, shall be encrypted
Mobile devices storing or accessing confidential data shall be protected by a log-on password (or
equivalent, such as biometric) or passcode and shall be configured to lock the screen after five (5)
minutes of non-use
Confidential data is encrypted at rest with AES‑256 and in transit with TLS 1.2+ in accordance with the
Cryptography Policy. Backups are encrypted and managed under Key Management controls.
Confidential data shall not be stored on personal phones or devices or removable media including USB
drives, CD's, or DVD's
Paper records shall be labeled "confidential" and securely stored and disposed of in a secure,
approved manner in accordance with data handling and destruction policies and procedures
Hardcopy paper records shall only be created based on a business need and shall be avoided
whenever possible
Hard drives and mobile devices used to store confidential information must be securely wiped prior to
disposal or physically destroyed
Transfer of confidential data to people or entities outside the company shall only be done in
accordance with a legal contract or arrangement, and the explicit written permission of management
or the data owner
External transfers must use approved secure channels (e.g., SFTP, HTTPS/TLS 1.2+, managed file
shares with access control). Public links and personal email are prohibited. Data Loss Prevention (DLP)
monitors are enforced to block unapproved egress.
All access to systems/datastores holding Confidential/Restricted data is logged (user, timestamp,
action, source IP, object where feasible). Security reviews of access/activity logs occur weekly, with
anomaly escalation to the ISO. Log retention: 12 months hot storage; integrity controls applied.
Restricted Data Handling
Restricted data is subject to the following protection and handling requirements:
Access is restricted to users with a need-to-know based on business requirements
Restricted systems shall not allow unauthenticated or anonymous access
Transfer of restricted data to people or entities outside the company or authorized users shall require
management approval and shall only be done in accordance with a legal contract or arrangement
Paper records shall be securely stored and disposed of in a secure, approved manner in accordance
with data handling and destruction policies and procedures
Hard drives and mobile devices used to store restricted information must be securely wiped prior to
disposal or physically destroyed
Restricted data transferred externally must use the same secure channels as Confidential data and be
governed by contract/approval. Public link sharing is prohibited.
Public Data Handling
No special protection or handling controls are required for public data. Public data may be freely distributed.

Data retention
D·engage shall retain data as long as the company has a need for its use, or to meet regulatory or
contractual requirements. Once data is no longer needed, it shall be securely disposed of or archived. Data
owners, in consultation with legal counsel, may determine retention periods for their data.
Personally identifiable information (PII) shall be deleted or de-identified as soon as it no longer has a
business use.
Retention periods shall be documented in the Data Retention Matrix in Appendix B to this policy.
Where Appendix B lists "Indefinite" for any system that can contain PII (e.g., support, QA/testing,
autosupport), that designation applies only to non‑PII operational metadata. PII contained in those systems
must be deleted or de‑identified within the time limits specified in Appendix B (PII exceptions) or sooner
upon loss of business need.
We maintain RPO: 24 hours and RTO: 8 hours for production customer data. Quarterly restore
tests validate recoverability; results and exceptions are recorded and reviewed by
management.
Data & device disposal
Data classified as restricted or confidential shall be securely deleted when no longer needed. D·engage shall
assess the data and disposal practices of third-party vendors in accordance with the Third-Party
Management Policy. Only third-parties who meet D·engage requirements for secure data disposal shall be
used for storage and processing of restricted or confidential data.
D·engage shall ensure that all restricted and confidential data is securely deleted from company devices
prior to, or at the time of, disposal. Confidential and Restricted hardcopy materials shall be shredded or
otherwise disposed of using a secure method.
Personally identifiable information (PII) shall be collected, used and retained only for as long as the
company has a legitimate business purpose. PII shall be securely deleted and disposed of following contract
termination in accordance with company policy, contractual commitments and all relevant laws and
regulations. PII shall also be deleted in response to a verified request from a consumer or data subject,
where the company does not have a legitimate business interest or other legal obligation to retain the data.
Third parties processing Restricted/Confidential data must:
a. enforce equivalent classification/handling;
b. encrypt at rest/in transit;
c. restrict access by least privilege;
d. notify security incidents within 24 hours or contractually defined timeframe;
e. disclose and manage subprocessors;
f. honor data residency commitments where applicable;
g. support deletion upon request within agreed SLAs.
Annual data review
Management shall review data retention requirements during the annual review of this policy. Data shall be
disposed of in accordance with this policy.
Legal requirements
Under certain circumstances, D·engage may become subject to legal proceedings requiring retention of
data associated with legal holds, lawsuits, or other matters as stipulated by D·engage legal counsel. Such
records and information are exempt from any other requirements specified within this Data Management
Policy and are to be retained in accordance with requirements identified by the Legal department. All such
holds and special retention requirements are subject to annual review with D·engage's legal counsel to
evaluate continuing requirements and scope.

Policy compliance
D·engage will measure and verify compliance to this policy through various methods, including but not
limited to, business tool reports, and both internal and external audits.
The Information Security Officer reviews weekly access/logging reports for systems containing confidential
or restricted data; anomalies are tracked in the ticketing system with assigned remediation owners and due
dates. Quarterly, management receives a summary of: (a) restore‑test outcomes; (b) access anomalies; (c)
retention purge metrics; (d) exception approvals.
Production logs must not contain secrets or raw PII. Where unavoidable for troubleshooting, apply
tokenization/redaction and handle under PII retention rules.
Exceptions
Requests for an exception to this Policy must be submitted to the Information Security Officer for approval.
Violations & enforcement
Any known violations of this policy should be reported to the Information Security Officer. Violations of this
policy can result in immediate withdrawal or suspension of system and network privileges and/or
disciplinary action in accordance with company procedures up to and including termination of employment.
Version history
Version Date Description Author Approver
1.0 Nov 5, 2025 Version 1.0 Köksal Kayalı Mustafa Bilge, Ali Altan Saka, Osman Tufanoğulları
APPENDIX A - Internal retention and disposal procedure
Information Security Officer is responsible for setting and enforcing the data retention and disposal
procedures for D·engage managed accounts and devices.
Customer Accounts:
1. Customer accounts and data shall be deleted within sixty (60) days of contract termination through
manual data deletion processes.
Devices:
Employee devices will be collected promptly upon an employee's termination. Remote employees will be
sent a shipping label and the return of their device shall be monitored.
1. Collected devices will be cleared to be re-provisioned - or removed from inventory, D·engage will
securely erase the device when reprovisioning.
2. Device images: retain only when required for a defined business/legal purpose and for no longer than
90 days unless under legal hold. If images could contain PII or secrets, they must be encrypted,
access-restricted, and purged at the end of the period. Document the purpose and purge date in the
asset record.
Destroying devices or electronic media
In cases where a device is damaged in a way that D·engage cannot access the Recovery Partition to erase
the drive, D·engage may optionally decide to use an E-Waste service that includes data destruction with a
certificate. D·engage will keep certificates of destruction on record for one year. Physical destruction can be
optional if it is verified that the device is encrypted with Full Disk Encryption, which would negate the risk of
data recovery.
Management will review this procedure at least annually.

APPENDIX B - Data retention matrix
System or
Data Description Retention Period
Application
D·engage SaaS
Customer Data Up to 60 days after contract termination.
Products (AWS)
D·engage Customer
Support Tickets and Cases Indefinite.
Support Tickets
D·engage Security Security and system event and
1 year.
Event Data log data, network data flow logs
D·engage
Vulnerability scan results and 6 months after relevant assets removed and
Vulnerability Scan
detection data purged.
Data
D·engage Customer
Opportunity and Sales Data Indefinite.
Sales
Indefinite (synthetic data only).
D·engage QA and QA, testing scenarios and results PII Exception: production PII prohibited in
Testing Data data non‑prod; any incidental PII must be purged
within 30 days.
Security Policies Security Policies Indefinite
1. "PII" includes directly or indirectly identifiable information under applicable law.
2. Where retention conflicts with law or contract, the stricter requirement applies.
3. Data Owners may set stricter periods for their domains; changes require ISO review and policy update.
