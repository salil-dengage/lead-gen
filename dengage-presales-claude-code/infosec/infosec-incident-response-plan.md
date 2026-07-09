# Incident Response Plan

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 97-101
- Packet pages: 96-100
- Policy Owner: Köksal Kayalı
- Effective Date: Nov 5, 2025

Purpose
This document establishes the plan for managing information security incidents and events, and offers guidance for employees or incident responders who
believe they have discovered, or are responding to, a security incident.
Scope
This policy covers all information security or data privacy events or incidents.
Incident and event definitions
A security event is an observable occurrence relevant to the confidentiality, availability, integrity, or privacy of company controlled data, systems or networks.
A security incident is a security event which results in loss or damage to the confidentiality, availability, integrity, or privacy of company controlled data, systems
or networks.
Logging, Detection & Monitoring
Production apps/infrastructure centralize logs to the SIEM; high-severity rules generate 24×7 on-call alerts. Logs capture user ID, source IP, timestamp,
action/object, are protected from tampering, and retained ≥ 12 months. Disabling logging or altering evidence is prohibited outside the evidence process.
Reporting
If a D·engage employee, contractor, user, or customer becomes aware of an information security event or incident, possible incident, imminent incident,
unauthorized access, policy violation, security weakness, or suspicious activity, then they shall immediately report the information using one of the following
communication channels:
https://forms.gle/HXWQZksvFt5hr6fk7 or https://forms.gle/kPvDh4YSw3es8zM27
Reporters should act as a good witness and behave as if they are reporting a crime. Reports should include specific details about what has been observed or
discovered.
Severity
System & Security shall monitor incident and event tickets and shall assign a ticket severity based on the following categories.
P2/P3 - Medium and Low Severity
Issues meeting this severity are simply suspicions or odd behaviors. They are not verified and require further investigation. There is no clear indicator that
systems have tangible risk and do not require emergency response. This includes lost/stolen laptop with disk encryption, suspicious emails, outages, strange
activity on a laptop, etc.
P1 - High Severity
High severity issues relate to problems where an adversary or active exploitation hasn't been proven yet, and may not have happened, but is likely to happen.
This may include lost/stolen laptop without encryption, vulnerabilities with direct risk of exploitation, threats with risk or adversarial persistence on our systems
(e.g., backdoors, malware), malicious access of business data (e.g., passwords, vulnerability data, payments information).
P0 - Critical Severity
Critical issues relate to actively exploited risks and involve a malicious actor or threats that put any individual at risk of physical harm. Identification of active
exploitation is required to meet this severity category.
Escalation and internal reporting
The incident escalation contacts can be found below in Appendix A.
Severity Escalation Path
P0 - Critical Severity P0 issues require immediate notification to IT and/or Engineering management.
A support ticket must be created and the appropriate manager (see P0 above) must also be notified via email or Slack with a
P1 - High Severity
reference to the ticket number.
P2/P3 - Medium and Low
A support ticket must be created and assigned to the appropriate department for response.
Severity
Documentation
All reported security events, incidents, and response activities shall be documented and adequately protected in Google Forms.
A root cause analysis may be performed on all verified P0 security incidents. A root cause analysis report shall be documented and referenced in the incident
ticket. The root cause analysis shall be reviewed by the Information Security Officer who shall determine if a post-mortem meeting will be called.

Incident response process
For critical issues, the response team will follow an iterative response process designed to investigate, contain exploitation, eradicate the threat, recover system
and services, remediate vulnerabilities, and document a post-mortem report including the lessons learned from the incident.
Summary
Event reported
Triage and analysis
Investigation
Containment & neutralization (short term/triage)
Recovery & vulnerability remediation
Hardening & Detection improvements (lessons learned, long term response)
Detailed
IT Manager or VP of Support will manage the incident response effort
If necessary, a central "War Room" will be designated, which may be a physical or virtual location (i.e Slack channel)
A recurring Incident Response Meeting will occur at regular intervals until the incident is resolved
Legal and executive staff will be informed as required
Incident response meeting agenda
Update Incident Ticket and timelines
Document new Indicators of Compromise (IOCs)
Perform investigative Q&A
Apply emergency mitigations
External Reporting / Breach Reporting
Plan long term mitigations
Document Root Cause Analysis (RCA)
Additional items as needed
Evidence Handling & Chain of Custody
Collect logs, memory, disk images, and config diffs using approved tools. Record who/what/when/where/how for every item; store in tamper- resistant repository;
attach a chain-of-custody form to the IR ticket.
Special considerations
Internal issues
Issues where the malicious actor is an internal employee, contractor, vendor, or partner requires sensitive handling. The incident manager shall contact CEO
directly and will not discuss with other employees. These are critical issues where follow-up must occur.
Compromised communication
Incident responders must have Cliq arranged before listing themselves as part of the incident response team. If there are IT communication risks, an out of band
solution will be chosen, and communicated to incident responders via cell phone.
Root account compromise
If an AWS root account compromise is known or expected, refer to the playbook in Appendix D.
Additional requirements
Suspected and reported events and incidents shall be documented
Suspected incidents shall be assessed and classified as either an event or an incident
Incident response shall be performed according to this plan and any associated procedures.
All incidents shall be formally documented, and a documented root cause analysis shall be performed
Incident responders shall collect, store, and preserve incident-related evidence in accordance with industry guidance and best practices such as NIST SP
800-86 'Guide to Integrating Forensic Techniques into Incident Response'
Suspected and confirmed unauthorized access events shall be reviewed by the Incident Response Team. Breach determinations shall only be made by the
CEO
D·engage shall promptly and properly notify customers, partners, users, affected parties, and regulatory agencies of relevant incidents or breaches in
accordance with D·engage policies, contractual commitments, and regulatory requirements, as determined by the CEO
This Incident Response Plan shall be reviewed and formally tested at least annually. Results of IR plan testing activities including findings and lessons
learned will be formally documented and maintained to support security, compliance and audit requirements
External communications and breach reporting
Legal and executive staff shall confer with technical teams in the event of unauthorized access to company or customer systems, networks, and/or data. Legal
staff along with the CEO shall determine if breach reporting or external communications are required. Breaches shall be reported to customers, consumers, data
subjects and regulators without undue delay and in accordance with all contractual commitments and applicable legislation.
No personnel may disclose information regarding incident or potential breaches to any third party or unauthorized person without the approval of legal and/or
executive management.
Mitigation and remediation
Legal and executive staff shall determine any immediate or long term mitigations or remedial actions that need to be taken as a result of an incident or breach. In
the event that mitigations or remedial actions are needed, executive staff shall direct personnel with respect to planning, communicating and executing those
activities.
Cooperation with customers, Data Controller, and authorities
As needed and determined by legal and executive staff, the company shall cooperate with customers, Data Controllers and regulators to fulfill all of its obligations
in the event of an incident or data breach.

Roles & responsibilities
Every employee and user of any D·engage information resources has responsibilities toward the protection of the information assets. The table below establishes
the specific responsibilities of the incident responder roles.
Response Team Members
Role Responsibility
The Incident Manager is the primary and ultimate decision maker during the response period. The Incident Manager is ultimately
responsible for resolving the incident and formally closing incident response actions. See Appendix A for Incident Manager contact
information.
These responsibilities include:
Incident Manager Ensuring the right people from all functions are actively involved as appropriate
Communicating status updates to the appropriate person or teams at regular intervals
Resolving incidents in the immediate term
Determining necessary follow-up actions
Assigning follow-up activities to the appropriate people
Promptly reporting incident details which may trigger breach reporting, in writing to the Information Security Officer
Incident Response The individuals who have been engaged and are actively working on the incident. All members of the IRT will remain engaged in incident
Team (IRT) response until the incident is formally resolved, or they are formally dismissed by the Incident Manager.
Qualified engineers will be placed into the on-call rotation and may act as the Incident Manager (if primary resources are not available) or
Engineers a member of the IRT when engaged to respond to an incident. Engineers are responsible for understanding the technologies and
(Support and components of the information systems, the security controls in place including logging, monitoring, and alerting tools, appropriate
Development) communications channels, incident response protocols, escalation procedures, and documentation requirements. When Engineers are
engaged in incident response, they become members of the IRT.
Employees and contractors of D·engage. Users are responsible for following policies, reporting problems, suspected problems,
Users
weaknesses, suspicious activity, and security incidents and events.
Customers are responsible for reporting problems with their use of D·engage services. Customers are responsible for verifying that
Customers
reported problems are resolved.
Responsible, in conjunction with the CEO and executive management, for determining if an incident presents legal or regulatory exposure
Legal Counsel as well as whether an incident shall be considered a reportable breach. Counsel shall review and approve in writing all external breach
notices before they are sent to any external party.
Responsible, in conjunction with the CEO and Legal Counsel, for determining if an incident shall be considered a reportable breach. An
Executive appropriate company officer shall review and approve in writing all external breach notices before they are sent to any external party.
Management D·engage shall seek stakeholder consensus when determining whether a breach has occurred. The D·engage CEO shall make a final
breach determination in the event that consensus cannot be reached.
Management commitment
D·engage management has approved this policy and commits to providing the resources, tools and training needed to reasonably respond to identified security
events and incidents with the potential to adversely affect the company or its customers.
Exceptions
Requests for an exception to this Policy must be submitted to and authorized by the Information Security Officer for approval. Exceptions shall be documented.
Violations & enforcements
Any known violations of this policy should be reported to the Information Security Officer. Violations of this policy may result in immediate withdrawal or
suspension of system and network privileges and/or disciplinary action in accordance with company procedures up to and including termination of employment.
Version history
Version Date Description Author Approver
1.0 Nov 5, 2025 Version 1.0 Köksal Kayalı Mustafa Bilge, Ali Altan Saka, Osman Tufanoğulları
Appendix A — Contact information
Contacts for IT and Engineering Management as well as executive staff and can be found Google Contacts, Slack and Cliq.

Appendix B — Incident collection form
General Information
Incident detector's information
Name: __________________________________ Date and time detected: __________________________________
Location incident detected
Title: __________________________________ __________________________________
from:
Phone: __________________________________ Additional information: __________________________________
Email: __________________________________
Incident Summary
Type of incident detected:
Denial of service Unauthorized use Espionage Probe Hoax
Malicious code Unauthorized access Other: ________________________
Incident location
Site: ______________________________________________________________
Site point of contact: _______________________________________________________________
Phone: _______________________________________________________________
Email: _______________________________________________________________
How was the incident detected:
___________________________________________________________________________________________________________________________________________________________________
Additional information:
___________________________________________________________________________________________________________________________________________________________________
Location(s) of affected systems:
___________________________________________________________________________________________________________________________________________________________________
Date and time incident handlers arrived at
________________________________________________________________
site:
Describe affected information system(s) (one form per system is recommended)
Hardware manufacturer: _______________________________________________________________
Serial number: _______________________________________________________________
Corporate property number (if applicable): ________________________________________________________________
Is the affected system connected to a network? Yes No
Describe the physical security of the location affected information systems (locks, security alarms, building access, etc.)
___________________________________________________________________________________________________________________________________________________________________
___________________________________________________________________________________________________________________________________________________________________
Isolate affected systems
Approval to remove from network Yes No
If YES, Name of approver: _______________________________________________________________
Date and time removed: _______________________________________________________________
If NO, state the reason: _______________________________________________________________
Backup of affected system(s):
Last system backup successful? Yes No
Name of the persons who did backup: ____________________________________________________________________
Date and time last backups started: ____________________________________________________________________
Date and time last backups completed: ____________________________________________________________________
Backup storage location: ____________________________________________________________________
Incident eradication:
Name of persons performing forensics: ____________________________________________________________________
Was the vulnerability (root cause) identified: Yes No
Describe:
___________________________________________________________________________________________________________________________________________________________________
___________________________________________________________________________________________________________________________________________________________________
How was eradication validated:
___________________________________________________________________________________________________________________________________________________________________
___________________________________________________________________________________________________________________________________________________________________

-
Appendix C — AWS root account compromise playbook
Objective
The objective of this runbook is to provide specific guidance on how to manage Root AWS account usage. This runbook is not a substitute for an in-depth Incident
Response strategy. This runbook focuses on the IR lifecycle:
Establish control
Determine impact
Recover as needed
Investigate the root cause
Improve
The Indicators of Compromise (IOC), initial steps (stop the bleeding), and the detailed CLI commands needed to execute those steps are listed below.
Assumptions
CLI configured and installed
Reporting process is already in place
Trusted Advisor is active
Security Hub is active
Indicators of Compromise
Activity that is abnormal for the account.
Creation of IAM users
CloudTrail turned off
Cloudwatch turned off
SNS paused
Step Functions paused
Launching of new or unexpected AMIs
Changes to the contacts on the account
Steps to Remediate — Establish Control
AWS documentation for a possible compromised account calls out the specific tasks listed below. The documentation for a possible compromised account can be
found at: What do I do if I notice unauthorized activity in my AWS account?
1. Contact AWS Support and TAM as soon as possible
2. Change and rotate Root password and add an MFA device associated with Root
3. Rotate passwords, access/secret keys, and CLI commands relevant to remediation steps
4. Review actions taken by the root user
5. Open the runbooks for those actions
6. Close incident
7. Review the incident and understand what happened
8. Fix the underlying issues, implement improvements, and update the runbook as needed
Further Action Items — Determine Impact
Review created items and mutating calls. There are may be items that have been created to allow access in the future. Some things to look at:
IAM Cross account roles
IAM Users
S3 buckets
EC2 instances
