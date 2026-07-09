# Operations Security Policy

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 108-118
- Packet pages: 107-117
- Policy Owner: Köksal Kayalı
- Effective Date: Oct 1, 2025

Purpose
To ensure the correct and secure operation of information processing systems and facilities.
This policy also establishes control requirements aligned to SOC 2 Trust Services Criteria.
Scope
All D·engage information systems that are business critical and/or process, store, or transmit company data.
This Policy applies to all employees, contractors, and third-party entities with access to D·engage networks,
systems, or data in any environment (development, staging, production, DR, and backups).
Documented operating procedures
Both technical and administrative operating procedures shall be documented as needed and made available
to all users who need them.
Procedures must be version‑controlled, formally approved, and reviewed at least annually. Operational
runbooks must include pre‑checks, rollback steps, owner contacts, and monitoring/verification.
Change management
Changes to the organization, business processes, information processing facilities, production software and
infrastructure, and systems that affect information security shall be raised in the ticketing system,
peer‑reviewed, tested in segregated environments, and approved prior to production deployment. All
significant changes must include:
1. Documentation & Review: Purpose, scope, impact analysis (dependencies, security/privacy),
implementation and rollback plans, and evidence of testing (unit/integration, security checks).
2. Approvals & SoD: Segregation of Duties enforced (requester ≠ approver ≠ deployer where feasible).
Information Security Officer approves high‑risk changes.
3. CI/CD Controls: Production deployments use approved CI/CD pipelines with artifact signing,
environment‑based secrets, and automated controls (SAST/DAST/secret scanning where applicable).
4. Emergency Changes: May be expedited using break‑glass access and must undergo retrospective
review within 1 business day, with documented risk and permanent fix.
5. Evidence: Tickets must contain links to change diffs, build numbers, test results, approvers, and
post‑deployment verification.
Scaling resources for additional processing or storage capacity must occur via pre-approved autoscaling
policies or infrastructure-as-code. Any manual scaling requires a change ticket and approval.
Customer‑impacting changes occur during defined maintenance windows unless approved by the ISO.

Capacity management
The use of processing resources and system storage shall be monitored and adjusted to ensure that system
availability and performance meets D·engage requirements.
Human resource skills, availability, and capacity shall be reviewed and considered as a component of
capacity planning and as part of the annual risk assessment process.
Scaling resources for additional processing or storage capacity must occur via pre- approved autoscaling
policies or infrastructure-as-code. Any manual scaling requires a change ticket and approval.
Capacity plans are reviewed quarterly and include cost, performance, and security considerations. Alerts
notify owners before thresholds breach.
Data leakage prevention
In adherence to this Data Leakage Prevention Policy, and in order to minimize the risk of leakage of
sensitive information, the organization shall:
Identify and classify information in accordance with the Data Management Policy
Provide awareness training to users including the appropriate use and handling of sensitive
information
Consider the use of technical monitoring and Data Loss Prevention (DLP) tools in accordance with the risks
to the organization and data subjects.
Web filtering
The organization shall ensure safe, secure, and appropriate internet use by the organization's personnel.
Website Access and Blocking:
Implement mechanisms, such as secure DNS and IP address or domain blocking, to restrict access to
websites that pose a substantial risk due to their content or known distribution of malware, viruses, or
phishing materials.
Web filter events are logged and retained, with a quarterly review of categories and exceptions.
Exception process documented in the ticketing system
Employ browsers and anti-malware technologies capable of automatic website blocking or
configuration for the same.
Unless justified by legitimate business reasons, consider blocking access to websites with:
1. Information upload capabilities.
2. Known or suspected malicious content.
3. Act as command and control servers.
4. Identified as malicious through threat intelligence.
5. Sharing of illegal content.
Usage Rules and Guidelines:
User shall conform to all company rules in accordance with the Code of Conduct and the Acceptable
Use Policy found in the Information Security Policy.
Separation of development, staging and production environments
Development and staging environments shall be strictly segregated from production SaaS environments to
reduce the risks of unauthorized access or changes to the operational environment. Confidential production
customer data must not be used in development or test environments.
Production customer PII may not be used in non‑production. Only synthetic or tokenized datasets are
permitted. Any exception requires Data Owner & ISO approval, a defined de‑identification method, and a
purge date.

Systems and network configuration, hardening, and review
Systems and networks shall be provisioned and maintained in accordance with the configuration and
hardening standards described in Appendix A to this policy.
Firewalls and/or appropriate network access controls and configurations shall be used to control network
traffic to and from the production environment in accordance with this policy.
Production network access configuration rules shall be reviewed at least annually. Tickets shall be created to
obtain approvals for any needed changes.
Systems must conform to CIS/NIST baselines. Configuration is managed via infrastructure‑as‑code with peer
review. Network rule reviews occur at least quarterly for internet‑facing controls and annually for internal
segments.
Protection from malware
In order to protect the company's infrastructure against the introduction of malicious software, detection,
prevention, and recovery controls to protect against malware shall be implemented, combined with
appropriate user awareness.
Anti-malware protections shall be utilized on all company-issued endpoints except for those running
operating systems not normally prone to malicious software. Additionally, threat detection and response
software shall be utilized for company email. The anti-malware protections utilized shall be capable of
detecting common forms of malicious threats and performing the appropriate mitigation activity (such as
removing, blocking or quarantining).
D·engage should scan all files upon their introduction to systems, and continually scan files upon access,
modification, or download. Anti-malware definition and engine updates should be configured to be
downloaded and installed automatically whenever new updates are available. Known or suspected malware
incidents must be reported as a security incident.
It is a violation of company policy to disable or alter the configuration of anti-malware protections without
authorization.
Information backup
The need for backups of systems, databases, information and data shall be considered and appropriate
backup processes shall be designed, planned and implemented. Backup procedures must include
procedures for maintaining and recovering customer data in accordance with documented SLAs. Security
measures to protect backups shall be designed and applied in accordance with the confidentiality or
sensitivity of the data. Backup copies of information, software and system images shall be taken regularly to
protect against loss of data. Backups and restore capabilities are tested quarterly; results and exceptions
are recorded and reviewed.
Backups of production systems and data are encrypted (AES‑256) and stored in geo‑separate locations
consistent with data residency obligations. RPO: 24 hours, RTO: 8 hours for customer data. Quarterly restore
tests validate recoverability and access controls; results are recorded and reviewed.
D·engage does not regularly backup user devices like laptops. Users are expected to store critical files and
information in company-sanctioned file storage repositories.
Backups are configured to run daily on in-scope systems. The backup schedules are maintained within the
backup application software.
A backup restore test should be performed at least annually to validate the backup data and backup
process.
Backup access is restricted and logged; keys are managed per the Cryptography Policy.

Logging & monitoring
Production infrastructure shall be configured to produce detailed logs appropriate to the function served by
the system or device. Event logs recording user activities, exceptions, faults and information security events
shall be produced, kept and reviewed through manual or automated processes as needed. Appropriate
alerts shall be configured for events that represent a significant threat to the confidentiality, availability or
integrity of production systems or Confidential data.
Logging should meet the following criteria for production applications and supporting infrastructure:
Production applications and infrastructure log authentication events, admin actions, security configuration
changes, and CRUD on sensitive objects, including user ID, source IP, timestamp, action, and object. Logs
are centralized in the SIEM, protected from tampering (immutable/WORM where feasible), and retained for
12 months minimum. Security reviews occur weekly; high‑severity alerts generate on‑call notifications.
Logs must not contain secrets or raw PII; where unavoidable, apply tokenization/redaction.
Protection of log information
Logging facilities and log information shall be protected against tampering and unauthorized access.
Access to logging platforms follows least privilege and SoD; administrative actions are recorded.
Administrator & operator logs
Privileged activities are captured and reviewed weekly; anomalies are escalated via the Incident Response
Plan. Where feasible, session recording is enabled for vendor remote access.
Data restore logs
In the event the company needs to restore production data containing PII from backups, either for the
purposes of providing services or for testing purposes, shall be logged or tracked in auditable tickets.
Restore activities include requester/approver, dataset scope, and post‑restore purge dates if PII is involved.
Clock synchronization
The clocks of all relevant information processing systems within an organization or security domain shall be
synchronized to network time servers using reputable time sources.
Systems synchronize with approved NTP sources; clock drift alerts trigger investigation.
File integrity monitoring and intrusion detection
D·engage production systems shall be configured to monitor, log, and self-repair and/or alert on suspicious
changes to critical system files where feasible.
Alerts shall be configured for suspicious conditions and engineers shall review logs on a regular basis.
Unauthorized intrusions and access attempts or changes to D·engage systems shall be investigated and
remediated in accordance with the Incident Response Plan.
Coverage includes critical OS files, configuration stores, and container images; alerts are triaged within 24
hours.
Control of operational software
The installation of software on production systems shall follow the change management requirements
defined in this policy.
Only signed, approved artifacts may be deployed to production via controlled pipelines.

Threat intelligence
Information relating to information security threats should be collected and analyzed to produce threat
intelligence.
Collection: Draw from diverse sources, such as blogs, news articles, vendor updates, public databases, and
industry communities.
Analysis: Examine the data to derive actionable insights and enable proactive response initiatives. Report
any actionable insights or specific threats to the Security Team.
Dissemination: Ensure effective communication of threat intelligence to pertinent teams for effective action.
The Security Team shall disseminate actionable information via communication channels, such as slack,
email and emergency alerts.
Feedback: Cultivate continuous improvement by leveraging feedback for policy enhancements. Integrate
feedback into policy amendments and conduct regular policy reviews.
Actionable intel feeds directly into detection rules and vulnerability mgmt; quarterly reviews measure
usefulness and gaps.

Technical vulnerability management
Information about technical vulnerabilities of information systems being used shall be obtained in a timely
fashion, the organization's exposure to such vulnerabilities shall be evaluated, and appropriate measures
taken to address the associated risk. A variety of methods shall be used to obtain information about
technical vulnerabilities, including scanning, vendor alerts and pen tests.
Penetration tests of the applications and production network shall be performed at least annually, and
additional scanning and testing shall be performed following major changes to production systems and
software.
Vulnerability scans shall be performed on public-facing systems in the production environment at least
quarterly.
The VP of Engineering and the VP of System & Security departments shall evaluate the severity of
vulnerabilities identified from any source, and if it is determined to be a risk-relevant critical or high-risk
vulnerability, a service ticket will be created. The D·engage assessed severity level may differ from the level
automatically generated by scanning software or determined by external researchers based on D·engage's
internal knowledge and understanding of technical architecture and real-world impact/exploitability. Tickets
are assigned to the system, application, or platform owners for further investigation and/or remediation.
Internet-facing vulnerabilities assessed by D·engage shall be patched or remediated in the
following timeframes:
Determined Remediation
Description
Severity Time
Relevant operations are stopped, and the workforce is channeled
Critical Immediate Action
to resolve this vulnerability.
High 24 Hours Remediation must be completed within 1 day of discovery.
Medium 7 Days Remediation must be completed within 7 days of discovery.
Low 30 Days Remediation must be completed within 30 days of discovery.
Informational As needed Addressed as needed based on internal resources and planning.
Internal vulnerabilities assessed by D·engage shall be patched or remediated in the following
timeframes:
Determined Remediation
Description
Severity Time
Critical 30 Days Remediation must be completed within 30 days of discovery.
High 60 Days Remediation must be completed within 60 days of discovery.
Medium 90 Day Remediation must be completed within 90 days of discovery.
Remediation must be completed within 120 days of
Low 120 Days
discovery.
Addressed as needed based on internal resources and
Informational As needed
planning.
Service tickets for any vulnerability which cannot be remediated within the standard timeline must show a
risk treatment plan and planned remediation timeline.

Restrictions on software installation
Rules governing the installation of software by users shall be established and implemented in accordance
with the D·engage Information Security Policy.
Application allow‑listing is enforced on production endpoints/servers.
Information systems audit considerations
Audit requirements and activities involving verification of operational systems shall be carefully planned and
agreed to minimize disruptions to business processes.
Audit tooling access and data collection are change‑controlled; audit accounts and activities are logged.
Systems security assessment & requirements
Risks shall be considered prior to the acquisition of, or significant changes to, systems, technologies, or
facilities. Where requirements are formally identified, any relevant security requirements shall be included.
The acquisition of new suppliers and services shall be made in accordance with the Third-Party Management
Policy.
The company shall perform an annual network security assessment that includes a review of major changes
to the environment such as new system components and network topology.
Supplier/service acquisitions include security questionnaires and contractual security clauses aligned with
Third‑Party Management Policy.
Data masking
D·engage will implement data masking based on risk or a specific requirement to do so.
Techniques Guidance:
Adopt appropriate techniques such as data masking, pseudonymization, or anonymization to protect
PII and other sensitive data effectively.
Guarantee that pseudonymization and anonymization methods effectively break the link between PII
and individuals or sensitive data elements.
Confirm all elements of the information are considered for adequate data anonymization.
Employ additional data masking methods, such as encryption, character nulling/deleting, varying
numbers and dates, substitution, and replacing values with their hashes.
Data Masking Considerations:
Design data queries and masks to disclose only the minimally required data to users, safeguarding
privacy and security.
Develop mechanisms for data obfuscation, considering specific circumstances under which certain
data should be concealed from users.
Provide options for PII principals to control the visibility of their obfuscated data and adhere to any
applicable legal or regulatory requirements related to data masking.
Using Data Masking, Pseudonymization, or Anonymization:
Determine the suitable strength level, access controls, user agreements, and usage restrictions for
processed data.
Prevent the combination of processed data with other information to identify PII principals and ensure
traceability of provided and received processed data.
Data masking/pseudonymization is required where operational staff or non‑production users do not need full
identifiers. Masking must prevent re‑identification absent privileged join keys; masked datasets have
owners and review dates.

Exceptions
Requests for an exception to this policy must be submitted to the Information Security Officer for approval.
Violations & enforcement
Any known violations of this policy should be reported to the Information Security Officer. Violations of this
policy can result in immediate withdrawal or suspension of system and network privileges and/or
disciplinary action in accordance with company procedures up to and including termination of employment.
Version history
Version Date Description Author Approver
1.0 Oct 1, 2025 Version 1.0 Köksal Kayalı Mustafa Bilge, Ali Altan Saka, Osman Tufanoğulları

APPENDIX A - Configuration and hardening standards
Servers and Virtual Machines
This is the standard for system-level server and virtual server (VM) configuration hardening. Some
customization to these settings may be required to configure the system for its specific target environment,
such as setting the proper names, groups, authentication settings, and other personalization options.
In addition all physical and virtual systems must adhere to the following technical requirements:
All vendor default passwords (including default passwords on operating systems, software providing
security services, application and system accounts, Simple Network Management Protocol (SNMP)
community strings, etc.) must be changed before a system is installed on the network.
Unnecessary default accounts (including accounts used by operating systems, security software,
applications, systems, SNMP, etc.) must be removed or disabled before a system is installed on the
network.
Only one primary function may be implemented per server or virtual machine to prevent functions
that require different security levels from coexisting on the same system.
Only necessary services, protocols, daemons, etc., may be enabled, and only as required for the
function of the system. All unnecessary functionality (such as scripts, drivers, features, subsystems,
file systems, and unnecessary web servers) must be disabled.
All security patches identified as critical, high, or medium must be applied to systems within SLAs
established in this policy.
Ensure systems are aligned with industry-standard baselines (CIS Benchmarks, NIST Guidelines).
Enforce one primary function per server/VM; configuration via code with peer review.
Technical Adherence
Vendor Defaults: All default configurations, especially passwords, must be altered prior to network
integration.
Role Specialization: Maintain a singular primary function per VM to uphold segregation of duties and
reduce lateral movement opportunities.
Patch Management: Establish a patch management strategy to meet defined SLAs.
Network Standards
Management of network rules and settings may only be performed by authorized members of the
Engineering team and all changes must comply with change Management procedures defined in the
Operations Security Policy.
Supported network controls for production networks are firewalls and network access control lists
(NACLs). Management of production network systems is accomplished through the use of a centralized
configuration management system and secure access protocols.
In the production environment, defined rules and configurations must be enforced to control traffic
from untrusted networks (e.g. publicly available services) to internal production networks.
Network control systems must be configured to use default Network Address Translation to prevent
the disclosure of internal IP addresses to the Internet.
Mobile devices connecting to production networks must meet the requirements of the Mobile Device
Policy found in the Information Security Policy.
All network control systems must be configured with default antispoofing rules to block or deny
inbound internal addresses originating from the Internet.
External configurations must limit inbound traffic to only system components that provide authorized
publicly accessible services, protocols, and ports.
Use of insecure services and protocols without justification and documentation of additional security
features implemented to mitigate risk is prohibited.

Idle timeout for privileged remote admin sessions: 30 minutes (vendors 15 minutes).
Remote-access technologies for vendors and business partners used to access production systems
must be enabled only when needed for business purposes and immediately deactivated after use.
Any hybrid networks with both cloud and on-premise access shall be scanned and tested at least
annually to ensure that security requirements are maintained.
Change Management: Any alterations to network settings must adhere to the change management
processes.
Idle timeout for privileged remote admin sessions: 30 minutes (vendors 15 minutes).
MFA is mandatory for all privileged remote access; session recording for vendor access where feasible.
Public exposure limited to approved ports/services; rule reviews quarterly.
Traffic Management in Production Environments
Rule Enforcement: Strictly enforce predefined rules, which should be revisited and validated at least
annually.
Remote Access Control: Ensure strict control and auditing of remote access, restricting and logging all
connections.
NACLs and Traffic Control
Establish stringent rules governing traffic in accordance with a define business justification
Cloud Hardening
Identity and Access Management (IAM)
Least Privilege Principle: Ensure each entity (user, service, system) possesses minimal necessary
access.
Enforce Multi-Factor Authentication (MFA) for production access
Enforce private endpoints, deny public buckets by default, enable object lock/immutability for critical
logs/backups.
Data Storage and Management
Data Encryption: Ensure encryption for data at rest and in transit in accordance with the Cryptography
Policy
Private Endpoints: Enable private endpoints and VPNs to safeguard against data interception.
Data Lifecycle Management: Configure backups for customer data repositories.
Network Security
Isolation: Utilize VPC and subnets to isolate environments and segment networks.
Firewalls: Implement cloud-native or third-party firewall solutions and DDoS protection services.
Monitoring and Logging
Logging: Configure logging focusing on write-once-read-many storage to prevent tampering.
Alerting: Implement cloud-based alerting (Amazon CloudWatch, Azure Alerts) for real-time incident
response.

Container Hardening
Image Security
Secure Source Image: Create images only from D·engage-authorized base images or repositories
Minimalist Design: Adopt minimal base images to reduce attack vectors.
Runtime Security
Runtime Analysis: Implement runtime security tools for live vulnerability and threat detection.
Network Security
Policy-Based Controls: Implement network policies using third party or cloud native tools.
Orchestration Security
API Server: Shield the API server with appropriate firewalls, IAM controls, and secure communication
channels.
RBAC: Establish and periodically review orchestration access privileges, ensuring conformance to the
least privilege principle.
CI/CD Security
Dependency Scanning: Scan for vulnerable dependencies during build processes
Base images are scanned; deployments require image signature verification; CI/CD enforces branch
protection and mandatory reviews.
