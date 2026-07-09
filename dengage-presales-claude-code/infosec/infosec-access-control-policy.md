# Access Control Policy

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 67-73
- Packet pages: 66-72
- Policy Owner: Köksal Kayalı
- Effective Date: Feb 6, 2026

Purpose
To limit access to information and information processing systems, networks, and facilities to authorized
parties in accordance with business objectives.
Scope
All D·engage information systems that process, store, or transmit confidential data as defined in the
D·engage Data Management Policy. This policy applies to all employees of D·engage and to all external
parties with access to D·engage networks and system resources.
General requirements
Access to information computing resources is limited to personnel with a business requirement for such
access. Access rights shall be granted or revoked in accordance with this Access Control Policy.
Business requirements of Access Control Policy
D·engage shall determine the type and level of access granted to individual users based on the "principle of
least privilege." This principle states that users are only granted the level of access absolutely required to
perform their job functions, and is dictated by D·engage's business and security requirements. Permissions
and access rights not expressly granted shall be, by default, prohibited.
D·engage's primary method of assigning and maintaining consistent access controls and access rights shall
be through the implementation of Role-Based Access Control (RBAC). Wherever feasible, rights and
restrictions shall be allocated to groups. Individual user accounts may be granted additional permissions as
needed with approval from the system owner or authorized party.
All privileged access to production infrastructure shall use Multi-Factor Authentication (MFA).
Access to networks and network services
The following security standards shall govern access to D·engage networks and network services:
Technical access to D·engage networks must be formally documented including the standard role or
approver, grantor, and date
Only authorized D·engage employees and third-parties working off a signed contract or statement of
work, with a business need, shall be granted access to the D·engage production networks and
resources
D·engage guests may be granted access to guest networks after registering with office staff without a
documented request
Remote connections to production systems and networks must be encrypted

Customer access management
When configuring cross-account access using AWS IAM roles, you must use a value you generate for the
external ID, instead of one provided by the customer, to ensure the integrity of the cross account role
configuration. A partner-generated external ID ensures that malicious parties cannot impersonate a
customer's configuration and enforces uniqueness and format consistency across all customers.
The external IDs used must be unique across all customers. Reusing external IDs for different customers
does not solve the confused deputy problem and runs the risk of customer A being able to view data of
customer B by using the role ARN of customer B along with the external ID of customer B.
Customers must not be able to set or influence external IDs. When the external ID is editable, it is possible
for one customer to impersonate the configuration of another.
User access management
D·engage requires that all personnel have a unique user identifier for system access, and that user
credentials and passwords are not shared between multiple personnel. Users with multiple levels of access
(e.g. administrators) should be given separate accounts for normal system use and for administrative
functions wherever feasible. Root, service, and administrator accounts may use a password management
system to share passwords for business continuity purposes only. Administrators shall only use shared
administrative accounts as needed. If a password is compromised or suspected of compromise the incident
should be escalated to the information security team immediately and the password must be changed.
User registration and deregistration
Only authorized administrators shall be permitted to create new user IDs, and may only do so upon receipt
of a documented request from authorized parties. User provisioning requests must include approval from
data owners or D·engage management authorized to grant system access. Prior to account creation,
administrators should verify that the account does not violate any D·engage security or system access
control policies such as segregation of duties, fraud prevention measures, or access rights restrictions.
User IDs shall be promptly disabled or removed when users leave the organization or contract work ends in
accordance with SLA which is 3 business days. User IDs shall not be reused.
User access provisioning
New employees and/or contractors are not to be granted access to any D·engage production systems
until after they have completed all HR on-boarding tasks, which may include but is not limited to
signed employment agreement, intellectual property agreement, and acknowledgement of D·engage's
information security policy
Access should be restricted to only what is necessary to perform job duties
No access may be granted earlier than official employee start date
Access requests and rights modifications shall be documented in an access request ticket or email. No
permissions shall be granted without approval from the system or data owner or management
Records of all permission and privilege changes shall be maintained for no less than one year

Management of privileged access
D·engage shall ensure that the allocation and use of privileged access rights are restricted and managed
judiciously. The objective is to ensure that only authorized users, software components, and services are
granted privileged access rights. D·engage will ensure that access and privileges conform to the following
standard:
Identify and Validate Users: Identify users who require privileged access for each system and process.
Allocate Privileged Rights: Provision access rights basing allocations on specific needs and
competencies, and adhering strictly to the access control policy.
Maintain Authorization Protocols: maintain records of all privileged access allocations.
Enforce Strong Authentication: Require MFA for all privileged access.
Prevent Generic Admin ID Usage: prevent the usage of generic administrative user IDs
Ensure Logging and Auditing: Log all privileged logins and activity
Adopt Time-Bound Access Protocols: Grant privileged access only for the necessary duration required
to accomplish specific tasks and revoke once the task is completed.
Uphold Distinct and Separate Identities: Preserve distinct identities for privileged access rights and
ensure such identities are neither shared among multiple users nor used for routine, non-
administrative tasks.
User access reviews
Administrators shall perform access rights reviews of user, administrator, and service accounts on a
quarterly basis to verify that user access is limited to systems that are required for their job function. Access
reviews shall be documented.
Access reviews may include group membership as well as evaluations of any specific or exception-based
permission. Access rights shall also be reviewed as part of any job role change, including promotion,
demotion, or transfer within the company.
Removal & adjustment of access rights
The access rights of all users shall be promptly removed upon termination of their employment or contract,
or when rights are no longer needed due to a change in job function or role. The maximum allowable time
period for access termination is 24 business hours.
Access provisioning, deprovisioning, and change procedure
The Access Management Procedure for D·engage systems can be found in Appendix A to this policy.
Segregation of duties
Conflicting duties and areas of responsibility shall be segregated to reduce opportunities for unauthorized or
unintentional modification or misuse of D·engage assets. When provisioning access, care should be taken
that no single person can access, modify or use assets without authorization or detection. The initiation of
an event should be separated from its authorization. The possibility of collusion should be considered when
determining access levels for individuals and groups.
User responsibility for the management of secret authentication
information
Control and management of individual user passwords is the responsibility of all D·engage personnel and
third-party users. Users shall protect secret authentication information in accordance with the Information
Security Policy.

Password policy
Where feasible, passwords for confidential systems shall be configured to have at least eight (8) or
more characters, one upper case, one number
Passwords shall be set to lock out after 6 failed attempts
Passwords shall expire after 90 days
Initial passwords must be set to a unique value and changed after first log in
For manual password resets, a user's identity must be verified prior to changing passwords
Do not use secret questions (place of birth, etc.) as a sole password reset requirement
Enforce appropriate account lockout and brute force protection on account access
Information access restriction
Applications must restrict access to program functions and information to authorized users and support
personnel in accordance with the defined access control policy. The level and type of restrictions applied by
each application should be based on the individual application requirements, as identified by the data
owner. The application-specific access control policy must also conform to D·engage policies regarding
access controls and data management.
Prior to implementation, evaluation criteria are to be applied to application software to determine the
necessary access controls and data policies. Assessment criteria include, but are not limited to:
Sensitivity and classification of data.
Risk to the organization of unauthorized access or disclosure of data
The ability to, and granularity of, control(s) on user access rights to the application and data stored
within the application
Restrictions on data outputs, including filtering sensitive information, controlling output, and
restricting information access to authorized personnel
Controls over access rights between the evaluated application and other applications and systems
Programmatic restrictions on user access to application functions and privileged instructions
Logging and auditing functionality for system functions and information access
Data retention and aging features
All unnecessary default accounts must be removed or disabled before making a system available on the
network. Specifically, vendor default passwords and credentials must be changed on all D·engage systems,
devices, and infrastructure prior to deployment. This applies to ALL default passwords, including but not
limited to those used by operating systems, software that provides security services, application and
system accounts, and Simple Network Management Protocol (SNMP) community strings where feasible.
Secure log-on procedures
Secure log-on controls shall be designed and selected in accordance with the sensitivity of data and the risk
of unauthorized access based on the totality of the security and access control architecture.
Password management system
Systems for managing passwords should be interactive and assist D·engage personnel in maintaining
password standards by enforcing password strength criteria including minimum length, and password
complexity where feasible.
All storage and transmission of passwords is to be protected using appropriate cryptographic protections,
either through hashing or encryption.

Use of privileged utility programs
Use of utility programs, system files, or other software that might be capable of overriding system and
application controls or altering system configurations must be restricted to the minimum personnel
required. Systems are to maintain logs of all use of system utilities or alteration of system configurations.
Extraneous system utilities or other privileged programs are to be removed or disabled as part of the
system build and configuration process.
Management approval is required prior to the installation or use of any ad hoc or third-party system utilities.
Access to program source code
Access to program source code and associated items, including designs, specifications, verification plans,
and validation plans shall be strictly controlled in order to prevent the introduction of unauthorized
functionality into software, avoid unintentional changes, and protect D·engage intellectual property.
All access to source code shall be based on business need and must be logged for review and audit.
Exceptions
Requests for an exception to this Policy must be submitted to the ISMS Manager for approval.
Violations & enforcement
Any known violations of this policy should be reported to the ISMS Manager. Violations of this policy can
result in immediate withdrawal or suspension of system and network privileges and/or disciplinary action in
accordance with company procedures up to and including termination of employment.
Version history
Version Date Description Author Approver
2.0 Feb 6, 2026 Version 2.0 Köksal Kayalı Mustafa Bilge, Osman Tufanoğulları
1.0 Jul 22, 2025 Version 1.0 Köksal Kayalı Murat Darçın, Ali Altan Saka, Osman Tufanoğulları

APPENDIX A — Access management procedure
1. Overview
This procedure outlines the standardized process for creating, modifying, reviewing, and revoking user
access to company systems and resources. The objective is to ensure that all personnel have the
appropriate level of access required to perform their job functions while maintaining strict security
controls and compliance standards.
2. Initiation and Standard Access Provisioning
1. Onboarding Completion:
1. Upon the successful completion of a new employee's onboarding process, Human
Resources (HR) initiates the access provisioning process by creating a service ticket on the
HR Board.
2. Provisioning Access:
1. System Owners (VP of the system where the request will be fulfilled) receive the ticket and
provision the new employee with a pre-defined set of standard access rights.
2. This includes access to all company-wide systems and baseline engineering systems
relevant to their role.
3. Requesting Additional Access
1. Access Request Submission:
1. Requests for any access beyond the standard provisioning set must be submitted by the
employee's direct VP or an employee authorized by VP. Requests from employees
themselves will not be processed.
2. The VP must create a new service ticket on the Access Board, including the following
details:
1. Employee's e-mail address
2. System, application, or resource to be accessed
3. Specific access level required (e.g., Read-Only, Read/Write, Admin)
4. Detailed business justification explaining why the access is necessary for the
employee's duties.
5. Date on which authorization will be revoked.
2. Approval Process:
1. All requests for additional access are routed to the System Owner for review.
2. System Owner evaluates the request based on the business justification and the principle
of least privilege before approving or denying it.
4. Provisioning and Notification of Approved Access
1. Provisioning:
1. Once a request is approved, System Owners provision the specified access for the user.
2. The team documents all actions taken and updates the service ticket accordingly.
2. Notification:
1. System Owners notify the requesting VP once access has been granted.
2. The notification will include details of the granted access and specify any associated
conditions or limitations.
5. Access Review and Revocation
1. Periodic Review:
1. The ISMS Manager conducts periodic reviews of all user access rights to ensure they
remain necessary and appropriate for each employee's current role.
2. Access that is no longer required will be flagged for revocation in consultation with the
relevant manager.
2. Revocation (When the period for which the privilege is granted is completed):
1. If the period for which the privilege is granted cannot be automatically defined in the
system, the privilege request remains open on the "Access Board" after it is met and is
checked regularly.
3. Revocation (Role Change or Offboarding):

1. When an employee changes roles or leaves the company, HR is responsible for
immediately notifying the System Owner by issuing an update request.
2. System Owners are responsible for revoking all access rights for the employee in a timely
manner and updating the service ticket to confirm completion.
APPENDIX B — Access matrix
Will be provided upon request.
