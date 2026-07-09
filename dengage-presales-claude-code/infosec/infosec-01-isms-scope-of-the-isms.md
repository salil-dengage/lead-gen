# 01-ISMS Scope of the ISMS

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 5-16
- Packet pages: 4-15
- Policy Owner: Köksal Kayalı
- Effective Date: Jan 29, 2026

Purpose
D·engage has established an Information Security Management System ("ISMS") in accordance with ISO/IEC
27001 ("ISO 27001") that governs the processes required to protect company and information assets. This
document specifies the scope of the ISMS at D·engage.
Introduction
D·engage utilizes the ISO 27001 Information Security ("InfoSec") standard to identify and maintain the
assets, technologies, and processes needed to protect customer information and to help ensure the
confidentiality, integrity, availability, and privacy of customer data and supporting services. To enable this,
D·engage:
1. Aligns its InfoSec policies and procedures to the global industry standard ISO 27001
2. Maintains a robust InfoSec framework for the efficient functioning of the organization All locations
identified including departments and assets are included in the scope of the ISMS as detailed in the
following sections.
ISMS scope
The Scope of D·engage's ISMS is: D·engage's one or more specific processes
The following statement defines the ISMS scope for D·engage: The scope of D·engage's ISMS includes the
assets, technologies and processes for the secure provision of Cloud-based marketing automation and
customer engagement platform. Additionally, the scope is defined with consideration of the external and
internal context of the organization (Appendix A), requirements of interested parties (Appendix B), such as
customers and regulatory bodies, and boundaries with third parties (Appendix C).
Assets
The assets of the ISMS are further categorized as information, application, database, cloud services, and
personnel. The details of the assets can be found in Appendix D.
Locations
The following locations are in scope for the ISMS:
UK
Türkiye
Dubai
Pakistan
Brazil
KSA

Departments
The following departments are in-scope for the ISMS:
1. System & Security
2. Engineering
3. Product
4. Customer Experience
5. People & Culture
6. Finance
7. Legal
Personnel
All personnel belonging to the above departments are in-scope for the ISMS.
Scope exclusions and boundaries
D·engage uses the following provider(s) for cloud computing and storage services. The provider(s) are
responsible for:
Managing logical access to the underlying network, system management, and storage devices
for its cloud service hosting D·engage data.
The physical security and environmental controls at data center facilities hosting D·engage
systems. Therefore, some of the physical security and environmental controls are out of scope
for those facilities.
The secure deletion of data and disposal of equipment used to support D·engage customer
operations.
D·engage information, application, database, facility, and personnel assets that are not related to the
identified in-scope components are out of scope for the ISMS.
ISO 27001 Coverage
ISO 27001 4.1; 4.2; 4.3; 7.5.1 A7.1
Version history
Version Date Description Author Approver
1.0 Jan 29, 2026 Version 1.0 Köksal Kayalı Mustafa Bilge, Osman Tufanoğulları

Appendix A - Context of the organization
By determining the organizational context, D·engage is able to articulate its objectives, define the external
and internal parameters to be considered when setting scope and risk criteria and managing risks to the
objectives of the ISMS. Analysis of external and internal contexts serves three primary purposes:
understanding the context in order to decide the scope of the ISMS
analyzing the context in order to determine risks and opportunities
ensuring that the ISMS is adapted to changing external and internal issues
The following tables represent the external and internal contexts that have been identified as relevant to
D·engage's security and objectives:
External Context
External
Description
Context
D·engage operates in an environment where customers, regulators, and end users have
increasing expectations regarding privacy, transparency, and ethical data use. Public
Social sensitivity to personal data misuse, data breaches, and unsolicited marketing directly
affects customer trust and brand reputation. Security incidents or perceived misuse of
data may result in loss of confidence, customer churn, and reputational damage.
D·engage serves clients across multiple regions and cultures, each with different
expectations around data privacy, consent, communication norms, and regulatory rigor.
Cultural Cultural differences influence how marketing data is collected, processed, and
perceived, requiring adaptable security controls and compliance practices to meet local
expectations while maintaining a consistent global security baseline.
Political developments in jurisdictions where D·engage operates or processes data may
impact data localization requirements, cross-border data transfers, sanctions, and
Political regulatory enforcement intensity. Changes in geopolitical relations can affect data
transfer mechanisms, cloud service availability, and contractual obligations with
customers and vendors.
D·engage is subject to multiple data protection, privacy, and cybersecurity regulations,
including GDPR, KVKK, and other applicable local laws depending on customer
Legal,
geography. Regulatory expectations around accountability, breach notification, data
regulatory, and
subject rights, and vendor management directly influence security governance, risk
compliance
management, and compliance objectives. Failure to meet these requirements may result
in administrative fines, contractual penalties, or suspension of processing activities.
As a SaaS provider, D·engage's revenue model depends on customer trust, platform
availability, and compliance assurances. Security incidents, audit failures, or regulatory
sanctions may lead to financial losses through penalties, customer attrition, increased
Financial
insurance costs, and remediation expenses. Conversely, strong security and compliance
posture supports revenue growth, enterprise sales, and long-term financial
sustainability.
D·engage operates in a rapidly evolving technological landscape characterized by cloud
infrastructure, APIs, microservices, AI-driven analytics, and third-party integrations.
Technological Emerging threats, software vulnerabilities, and dependency risks require continuous
monitoring, secure development practices, and effective vendor risk management to
ensure confidentiality, integrity, and availability of information assets.
Economic Macroeconomic conditions influence customer spending behavior, technology
investments, and vendor stability. Economic uncertainty may increase pressure on

External
Description
Context
operational efficiency while simultaneously raising customer expectations for cost-
effective yet secure solutions. Vendor financial instability may also introduce supply-
chain and continuity risks that affect D·engage's service delivery.
Natural disasters, pandemics, and environmental events may disrupt cloud service
providers, network connectivity, and workforce availability. These risks necessitate
Natural
robust business continuity, disaster recovery, and incident response planning to ensure
sustained service availability and protection of customer data under adverse conditions.
The competitive SaaS and CDMP market places strong emphasis on security
certifications, audit reports, and trust signals (e.g., ISO 27001, SOC 2). Competitors with
Competitive stronger or more visible security assurances may gain advantage in enterprise sales.
Maintaining a mature security posture is therefore a strategic necessity to remain
competitive and differentiate D·engage in the market.
Key external drivers include increasing regulatory scrutiny, growing customer demand
for privacy-by-design, rising cyber-attack sophistication, cloud dependency, and
Key drivers and
automation of compliance processes. Trends such as zero-trust architectures, secure
trends
SDLC practices, and continuous control monitoring directly shape D·engage's security
objectives and investments.
External stakeholders include customers, end users (data subjects), regulators,
certification bodies, cloud service providers, payment processors, auditors, and strategic
External
partners. Each stakeholder group has distinct expectations regarding data protection,
stakeholders
availability, confidentiality, and compliance, influencing security priorities and
governance decisions.
D·engage enters into contractual agreements with customers, vendors, and partners
that impose security, confidentiality, availability, and compliance obligations. These
Contractual
contracts often include data protection clauses, audit rights, breach notification
relationships
requirements, and service level commitments, making contractual compliance a critical
driver of the information security management system.
Depending on the service scope and customer configuration, D·engage operates
Data Controller primarily as a Data Processor, processing personal data on behalf of customers acting as
and/or Data Controllers. In limited cases, D·engage may act as a Data Controller for its own
Processor operational data. This role distinction directly affects legal obligations, technical
safeguards, incident handling, and customer communication responsibilities.
Internal Context
Internal Context Description
D·engage maintains a governance structure that ensures information security, risk
management, and compliance are integrated into business decision-making. Security
Governance governance is aligned with strategic objectives, regulatory obligations, and customer
expectations, with oversight mechanisms in place to monitor risks, approve policies,
and track compliance performance.
D·engage operates with a technology-driven organizational structure consisting of
engineering, product, security, operations, client services, legal, and management
Organizational
functions. This structure supports rapid development and service delivery while
structure
requiring clear coordination mechanisms to manage security responsibilities across
distributed teams and environments.

Internal Context Description
Roles and responsibilities related to information security are formally defined and
assigned, including accountability for risk management, access control, incident
Roles and
response, compliance, and vendor oversight. Segregation of duties is applied where
accountabilities
feasible to reduce the risk of unauthorized or inappropriate actions, particularly within
privileged access and change management processes.
D·engage has established documented information security policies, objectives, and
Policies, strategies aligned with its business goals, regulatory requirements, and recognized
objectives, and frameworks such as ISO/IEC 27001 and SOC 2. Security objectives focus on protecting
strategy customer data, ensuring service availability, supporting secure growth, and
maintaining trust with customers and partners.
D·engage's internal capabilities include secure software development, cloud
infrastructure management, monitoring, incident response, and compliance
Capabilities operations. These capabilities are supported by qualified personnel, automated
security tooling, and defined processes, enabling the organization to identify, assess,
and manage information security risks effectively.
Internal stakeholders include executive management, engineering teams, product
owners, security and compliance functions, operations, and client services. Each
Internal
stakeholder group has defined responsibilities and expectations related to information
stakeholders
security, contributing to the protection of information assets and continuity of
services.
D·engage promotes a culture that values security awareness, accountability, and
continuous improvement. Employees are encouraged to follow secure practices,
Organizational
report incidents or weaknesses, and participate in security awareness initiatives. This
culture
culture supports proactive risk management and compliance with internal policies and
external obligations.
Information at D·engage is managed throughout its lifecycle, including collection,
processing, storage, transmission, and disposal, in accordance with data
Information
classification, access control, and retention requirements. Information management
management
practices are designed to ensure confidentiality, integrity, and availability of both
customer and internal data across systems and environments.
Internally managed contractual relationships with customers, vendors, and partners
include defined security, confidentiality, and data protection obligations. These
Contractual
contracts influence internal processes such as vendor risk assessments, access
relationships
provisioning, incident handling, and compliance monitoring, making contract
management a key component of the internal control environment.

Appendix B - Interested parties and their requirements
D·engage defines the ISMS key interested parties and their requirements, as well as which of these
requirements will be addressed through the information security management system:
Interested Addressed by
Type Requirements
Party ISMS
Customers expect D·engage to provide a secure,
reliable, and compliant platform for processing their Yes, this
data. Key expectations include protection of requirement is
confidentiality, integrity, and availability of customer addressed by the
Customers External
and personal data; compliance with applicable data ISMS as per our
protection laws; transparency regarding security Statement of
controls; timely incident notification; and fulfillment of Applicability.
contractual security and service commitments.
Regulators expect D·engage to comply with applicable
Yes, this
data protection, privacy, and cybersecurity regulations,
requirement is
including lawful processing, accountability, and effective
addressed by the
Regulators External security safeguards. Expectations also include timely
ISMS as per our
breach notification, cooperation during regulatory
Statement of
inquiries, and demonstrable compliance through
Applicability.
documentation, controls, and audits.
Business partners and external stakeholders expect
Yes, this
D·engage to maintain adequate security controls,
requirement is
Business reliable integrations, and clear contractual
addressed by the
Partners and Internal commitments. This includes secure data exchange,
ISMS as per our
Stakeholders protection of shared assets, compliance with agreed
Statement of
security requirements, and responsible management of
Applicability.
third-party risks.
Employees expect clear guidance on security
Yes, this
responsibilities, acceptable use, and data handling
requirement is
practices, as well as training and tools to perform their
addressed by the
Employees Internal roles securely. They also expect fair access controls,
ISMS as per our
protection of their personal data, and a work
Statement of
environment that supports secure and compliant
Applicability.
operations.
Auditors expect D·engage to demonstrate a well-defined Yes, this
and effectively implemented information security requirement is
Internal
management system. This includes complete and addressed by the
Auditors &
accurate documentation, evidence of control operation, ISMS as per our
External
risk-based decision-making, management oversight, Statement of
and timely remediation of identified issues. Applicability.
Management and the Board expect information security
Yes, this
to support business objectives, customer trust, and
requirement is
Management & regulatory compliance while enabling growth and
addressed by the
Board of Internal innovation. Expectations include visibility into security
ISMS as per our
Directors risks, assurance of control effectiveness, alignment with
Statement of
strategic goals, and informed decision-making based on
Applicability.
reliable security metrics.

Interested Addressed by
Type Requirements
Party ISMS
Data subjects and consumers expect their personal data
to be processed in accordance with privacy and data
Yes, this
protection principles, including lawfulness, fairness,
PII Principles requirement is
transparency, purpose limitation, data minimization,
(i.e. Data addressed by the
External accuracy, storage limitation, and security. They also
Subjects and ISMS as per our
expect respect for their rights, such as access,
Consumers) Statement of
rectification, erasure, and objection, as well as clear
Applicability.
communication regarding how their data is used and
protected.

Appendix C - Interfaces and dependencies
The interfaces and dependencies between activities performed by D·engage and other organizations are
listed below and are considered while determining the scope of ISMS. The organizations listed below are
critical to D·engage's operations. However, since the company does not have direct control over these
organizations, inherent risks are reduced via signed contractual agreements which comply with D·engage
standards.
Other
Description of the interfaces and dependencies
organizations
D·engage depends on cloud infrastructure providers for hosting, compute, storage,
and network services. These providers form a critical dependency for service
Cloud Service availability and data protection. Interfaces are established through secured network
Providers connections, role-based access controls, and encryption mechanisms. Provider risks
are addressed through vendor risk assessments, contractual security requirements,
and continuous monitoring of service availability and security posture.
The platform integrates with third-party tools and services such as analytics,
monitoring, authentication, communication, and development tooling. Interfaces are
Third-Party primarily API-based and protected through authentication, authorization, and
Technology Vendors logging controls. Dependencies on these vendors are managed by evaluating their
security assurances, reviewing compliance documentation, and limiting access to
the minimum required scope.
D·engage engages sub-processors to support specific processing activities on behalf
of customers. Data exchanges with sub-processors are governed by data processing
Sub-Processors agreements, confidentiality obligations, and security requirements aligned with
applicable data protection regulations. Sub-processor usage is documented and
communicated to customers where required.
D·engage interfaces with customer systems through web interfaces, APIs, and data
ingestion mechanisms. Dependencies include customer-provided configurations,
Customers and
credentials, and data quality. Security controls such as authentication, access
Client Systems
restrictions, encryption, and monitoring are applied to manage risks arising from
these interfaces.
Business and Centralized endpoint threat detection and monitoring, and managed threat
Strategic Partners response, for malware
Regulatory and
Responsible for securing their own email and account credentials
Certification Bodies
Dependencies on other organizations introduce risks related to availability, security
Dependency incidents, compliance failures, and operational disruptions. D·engage manages
Management and these risks through vendor management processes, defined escalation paths,
Risk Considerations incident coordination procedures, business continuity planning, and periodic reviews
of third-party performance.

Appendix D - Assets
Below is a detailed description of the all assets in-scope for the ISMS:
Asset
Asset domain Asset Name Description
category
Business Primary Personal and non-personal data processed
Customer Data
Assets Assets on behalf of customers
Business Primary Processes of Service
Processes ensuring uptime and continuity
Assets Assets Availability
Business Secondary
Corporate Data Internal financial, HR, legal data
Assets Assets
Business Secondary Governance, HR, finance, compliance
Corporate Processes
Assets Assets processes
Business Intangible
Reputation Brand trust and market credibility
Assets Assets
Supporting Software
Proprietary Software Core platform source code and logic
Assets Assets
Supporting Software
Internal Applications Admin, monitoring, compliance tools
Assets Assets
Supporting Software
Databases Structured data repositories
Assets Assets
Supporting Software
Operating Systems OS for servers and endpoints
Assets Assets
Supporting Software
Third-Party Software Libraries, SDKs, external tools
Assets Assets
Supporting Software
System Utilities Logging, backup, monitoring tools
Assets Assets
Supporting Hardware
Servers Compute resources hosting services
Assets Assets
Supporting Hardware
Network Equipment Firewalls, load balancers, routing
Assets Assets
Supporting Hardware
End-User Devices Employee and contractor laptops
Assets Assets
Supporting Hardware
Storage Media Logical/physical storage for data
Assets Assets
Supporting Infrastructure as a
Services Compute, storage, networking
Assets Service
Supporting
Services Platform as a Service Managed runtime & DB platforms
Assets
Supporting
Services Software as a Service Business support tools
Assets
Supporting
Services Communication Services Email, chat, collaboration tools
Assets
Supporting
Services Support Services Customer & technical support
Assets
Supporting
People Employees Full-time personnel
Assets

Asset
Asset domain Asset Name Description
category
Supporting
People Contractors External service providers
Assets
Supporting
People Clients Customer organizations
Assets

Appendix E - External and Internal Issues
4.1 requires an organization to determine external and internal issues relevant to its purpose and affecting
its ability to achieve the intended outcome(s) of the information security management system (ISMS). As
part of the Management Review process D·engage continually analyzes itself and the world surrounding it in
order to identify issues that in some way affect information security and how information security can be
managed, insofar as they are relevant to the organization's objectives. Analysis of external and internal
issues serves three primary purposes:
understanding the context in order to decide the scope of the ISMS;
analyzing the context in order to determine risks and opportunities; and
ensuring that the ISMS is adapted to changing external and internal issues.
The following tables represent the external and internal issues that have been identified as relevant to
D·engage's security and objectives.
External Issues (defined as those outside of the organization's control)
Issue Description
Changes in customer attitudes toward privacy, consent, and digital marketing
practices may reduce demand for data-driven engagement services. Increased
Social and cultural
public sensitivity to personal data usage, unsolicited communications, and data
breaches may negatively impact customer trust and adoption of the platform.
Insufficient analysis of legal and regulatory implications when using outsourced IT or
Political, legal, cloud services may result in non-compliance with data protection, privacy, or cross-
normative and border data transfer requirements. Additionally, frequent changes in the regulatory
regulatory landscape may introduce new compliance obligations, increasing operational
complexity and risk exposure.
Inflationary pressures, currency fluctuations, and market commodification of SaaS
Financial and services may increase operational costs while limiting customers' willingness to
macroeconomic invest in premium services. These factors may affect pricing strategies, profitability,
and the organization's ability to invest in security and compliance improvements.
Rapid advancement of cyber-attack techniques and hacking tools may exceed the
organization's ability to respond if security controls are not continuously updated.
Technological
Insufficient or inconsistent use of cryptographic mechanisms may expose sensitive
data to unauthorized access, interception, or manipulation.
Natural disasters such as fire, flood, earthquakes, or pandemics may disrupt cloud
Natural infrastructure, network connectivity, or workforce availability, potentially affecting
service continuity, data availability, and incident response capabilities.
Intense market competition and oversaturation of similar SaaS and marketing
platforms may pressure D·engage to accelerate feature development and reduce
Competitive
costs, potentially increasing security and operational risks if changes are not
adequately governed and controlled.
Internal Issues (defined as those subject to the organization's control)
Issue Description <SAMPLES PROVIDED - UPDATE>
Organizational culture Inconsistent security awareness and lack of clearly communicated
direction may limit the organization's ability to establish a strong
culture of accountability, continuous improvement, and security-by-

Issue Description <SAMPLES PROVIDED - UPDATE>
design. This may result in uneven adoption of policies and practices
across teams.
Absence of clearly defined and measurable security objectives aligned
Policies, objectives, and the with organizational goals may hinder effective planning, prioritization,
strategies to achieve them and monitoring of information security initiatives, increasing the risk
of misaligned efforts and inefficient resource use.
Insufficient leadership oversight or unclear assignment of roles and
Governance, organizational
responsibilities may lead to gaps in accountability, delayed decision-
structure, roles and
making, and inconsistent implementation of security and compliance
responsibilities
controls across the organization.
Lack of consistent internal alignment with applicable legal, regulatory,
Standards, guidelines and models and industry standards may result in fragmented processes,
adopted by the organization duplicated efforts, and increased risk of non-compliance with external
requirements and customer expectations.
Contractual relationships that can Changes to customer, vendor, or partner contractual terms may
directly affect the organization's introduce new security, compliance, or operational requirements that
processes included in the scope of affect processes within the ISMS scope, requiring timely assessment
the ISMS and adaptation to avoid contractual or regulatory breaches.
Incomplete, outdated, or undocumented policies and procedures may
lead to inconsistent execution of security controls, increased
Processes and procedures
operational risk, and difficulties in demonstrating control effectiveness
during audits or incidents.
Limitations in budget, staffing, expertise, or technological capabilities
Resources, knowledge, and may restrict the organization's ability to implement, operate, and
technologies continuously improve information security controls, increasing
reliance on manual processes and external dependencies.
Insufficient or inadequately maintained IT infrastructure may reduce
Physical infrastructure and
system reliability, scalability, and resilience, potentially impacting
environment
service availability and the protection of information assets.
Information systems, information
Lack of formal IT governance and clearly defined information flows
flows and decision making
may result in fragmented decision-making, delayed risk response, and
processes (both formal and
limited visibility into security posture and operational risks.
informal)
Failure to adequately track, remediate, and oversee findings from
Previous audits and previous risk internal and external audits or risk assessments may result in
assessment results. recurring weaknesses, reduced audit confidence, and increased
exposure to security and compliance risks.
27701 Privacy information management System (PIMS) addendum
This addendum is automatically applicable for organizations implementing ISO 27701 and optional for
organizations who are implementing ISO 27001 only.
All references to "ISMS" in this document are changed to "IS&PMS"
All references to ISO 27001 in this document are changed to "ISO 27001/27701"
All references to "information security management system" are changed to "information security and
privacy management system"
