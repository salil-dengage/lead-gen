# Business Continuity and Disaster Recovery Plan

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 76-79
- Packet pages: 75-78

Business Continuity and Disaster Recovery (BC/DR) Plan
Policy Owner: Köksal Kayalı
Effective Date: Nov 5, 2025
Purpose
The purpose of this business continuity plan is to prepare D·engage in the event of service outages caused
by factors beyond our control (e.g., natural disasters, man-made events), and to restore services to the
widest extent possible in a minimum time frame.
Scope
All D·engage IT systems that are business critical. This policy applies to all employees of D·engage and to all
relevant external parties, including but not limited to D·engage consultants and contractors.
In the event of a loss of availability of a hosting service provider, the VP of System & Security will confer
with the VP of Engineering and the VP of Data Science to determine an appropriate response strategy.
General requirements
In the event of a major disruption to production services and a disaster affecting the availability and/or
security of the D·engage office, senior managers and executive staff shall determine mitigation actions.
A disaster recovery test, including a test of backup restoration processes, shall be performed on an annual
basis.
Alternate work facilities
If the D·engage office becomes unavailable due to a disaster, all staff shall work remotely from their homes
or any safe location.
Communications and escalation
Executive staff and senior managers should be notified of any disaster affecting D·engage facilities or
operations.
Communications shall take place over approved channels such as Cell Phone, Slack, Cliq & Email.
Key communication contacts are maintained in this list: Google Contacts, Slack and Cliq
Roles and responsibilities
The Business Continuity Team (BCT) is activated upon the declaration of a disaster.
BC Lead (CTO): Has overall authority to declare a disaster, activate the BCP, and approve major
decisions.
Technical Recovery Lead (VP of System & Security): Manages all technical recovery efforts,
including infrastructure restoration, data recovery, and application deployment.
Communications Lead (CAO): Manages all internal and external communications, ensuring clear,
consistent, and timely updates.
Customer Support Lead (VP of Tech & Client Services): Coordinates the customer support
response, managing inbound inquiries and proactive client outreach.
Department Heads: Responsible for executing continuity plans within their respective teams.

Continuity of critical services
Procedures for maintaining continuity of critical services in a disaster can be found in Appendix A.
Recovery Time Objectives (RTO) and Recovery Point Objects (RPO) can be found in Appendix B.
Strategy for maintaining continuity of services can be seen in the following table:
Key business process Continuity strategy
Customer (Production)
Rely on redundancy in AWS Availability Zones
Service Delivery
Not dependent on HQ. VPN is redundant between HQ and Colo. Critical data
IT Operations
is backed up to alternate locations.
Utilize Gmail and its distributed nature, rely on Google's standard service
Email
level agreements.
Finance, Legal and HR All systems are vendor-hosted SaaS applications.
Sales and Marketing All systems are vendor-hosted SaaS applications.
Plan activation
5.1 Triggers for Activation
The BC Lead may activate this plan if any of the following events occur:
Complete unavailability of the Dengage platform for more than 60 minutes.
Confirmed, widespread data integrity issue (e.g., cryptolocking of production DB).
Total loss of a primary cloud availability zone or region.
Major security breach impacting core infrastructure.
Loss of the primary physical office (İstanbul, Bursa) or critical personnel.
5.2 Activation Process
1. Detection & Verification: The on-call engineering team detects a critical incident and escalates to
the Technical Recovery Lead.
2. Assessment: The Technical Lead and key engineers assess the impact and estimate the recovery
time. If the estimated RTO for a Priority 1 function will be exceeded, they recommend BCP activation.
3. Declaration: The BC Lead is briefed and formally declares a disaster, activating the full BCT.
4. Communication: The Communications Lead activates the Communication Plan
Version history
Version Date Description Author Approver
1.0 Nov 5, 2025 Version 1.0 Köksal Kayalı Mustafa Bilge, Ali Altan Saka, Osman Tufanoğulları

Appendix A - Business continuity procedures by scenario
This appendix provides high-level procedural checklists for specific disaster scenarios. These are intended to
guide the Business Continuity Team's response.
A.1 Scenario: Major Logical Disaster (e.g., Ransomware/Cryptolocking)
Trigger: Confirmed widespread encryption or destruction of production data.
Lead: Technical Recovery Lead.
Procedure:
1. Activate BCP: On-call team escalates immediately. BC Lead declares a disaster.
2. Isolate Environment: The engineering team locks down all network access to the
compromised production environment to prevent lateral movement.
3. Activate Comms: Communications Lead activates internal and external communication plans,
providing the initial update to the status page.
4. Provision Recovery Environment: The infrastructure team begins provisioning a new, clean
IaaS environment from IaC templates in the designated recovery region.
5. Restore Data: The database team initiates the restoration of the latest known-good, immutable
backup to the new database instances.
6. Validate: Engineering and QA teams perform rigorous validation of data integrity and core
application functionality in the isolated recovery environment.
7. Failover: Once validated, DNS records are updated to route all production traffic to the new
recovery environment.
8. Confirm Restoration: The Communications Lead updates the status page and notifies clients
that service has been restored.
9. Forensics: A third-party security team is engaged to conduct a full forensic analysis of the
original, compromised environment.
A.2 Scenario: Cloud Region Failure
Trigger: Confirmation from the IaaS provider of a full regional outage.
Lead: Technical Recovery Lead.
Procedure:
1. Verify Outage: Confirm the scope and expected duration of the outage via the cloud provider's
official status page and support channels.
2. Activate BCP: Declare a disaster and activate the BCT.
3. Initiate Failover: Begin the documented procedure to promote the warm standby environment
in the secondary region to full production status.
4. Validate Services: Run automated and manual tests to ensure all services are operating
correctly in the secondary region.
5. Communicate: Keep clients informed of the failover progress via the status page.
A.3 Scenario: Critical Third-Party Supplier Failure
Trigger: Confirmed, prolonged outage of a critical supplier (e.g., primary SMS gateway or DNS
provider).
Lead: Technical Recovery Lead.
Procedure:
1. Verify & Escalate: Confirm the outage with the supplier and escalate to their emergency
support contacts.
2. Assess Impact: Determine which Dengage services are affected and the severity of the impact.
3. Communicate: Update the status page to inform clients of the specific feature degradation.
4. Initiate Failover: Execute the pre-defined technical playbook to switch service traffic to the
secondary, redundant provider.
5. Monitor: Closely monitor the performance, error rates, and delivery success with the secondary
provider.

Appendix B - RTOs/RPOs
Recovery Point
Recovery Time Objective
Rank Asset Objective (RPO) - Max Dependencies
(RTO) - Max Downtime
Data Loss
Platform Data Cloud IaaS,
1 2 Hours 5 Minutes
Ingestion Databases
Message Cloud IaaS, 3rd Party
1 2 Hours 15 Minutes
Delivery Gateways
Production Cloud IaaS (Storage,
1 2 Hours 5 Minutes
Database Compute)
Platform
2 4 Hours 24 Hours Cloud IaaS
Monitoring Tools
Customer
2 4 Hours 1 Hours Zoho Desk
Support System
Zoho, Google
2 Internal Comms 4 Hours 1 Hours
Workspace
Sales &
CRM, Marketing
3 Marketing 24 Hours 4 Hours
Automation
System
