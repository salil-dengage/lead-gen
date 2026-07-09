# Code Review Procedure

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 83-84
- Packet pages: 82-83
- Procedure Owner: Köksal Kayalı]
- Effective Date: Approval Date]

Purpose
This procedure defines how code review activities are conducted in the software development process, supporting
the production of secure, high-quality, and maintainable code.
Scope
The purpose of this SOP is to define the standardized procedure for both frontend and backend services of
our marketing automation platform.
Responsibilities
This procedure applies to all software engineers, technical leads, and DevOps engineers who develop
components of our marketing automation platform.
Procedure
Creating a Pull Request
A separate feature branch must be created for each new feature, bug fix, or refactoring.
The PR title and description must include:
A detailed explanation
Related Jira task number
Test scenarios / test outputs
PRs cannot be merged directly into main or release branches. They must go through an intermediate
branch like develop.
Review Criteria
Code review should consider the following criteria:
Functionality: Does the code meet the specified requirement?
Security: Is it vulnerable to OWASP Top 10 risks? Are user inputs sanitized?
Performance: Are there unnecessary queries or excessive memory usage?

Readability: Is the code understandable, are comments sufficient?
Testability: Are there unit/integration tests? Do they pass?
Logging and Observability: Are important actions logged?
Data Privacy: Are personal data masked/encrypted?
Review and Approval
Each PR must be reviewed by at least one experienced developer.
Critical components require a two-person approval rule.
Reviewers can take the following actions:
Approve: Code is acceptable and can be merged.
Request Changes: Feedback is provided for necessary changes.
Comment Only: Informational comment is made.
Merge Process
After receiving necessary approvals, the developer merges the PR into the develop branch.
The merge strategy used is merge commit.
CI/CD pipeline must successfully pass before merging.
Automated Checks and Tools
Static Code Analysis: Tools like SonarQube / GitHub CodeQL are used.
Lint Rules: Tools like ESLint, StyleCop are used for automated checks.
Unit Test & Code Coverage: A minimum of 10% code coverage is targeted.
CI/CD Automated tests and checks are triggered when a PR is created.
Monitoring and Audit
All PR activities (who opened, reviewed, merged) are logged by the system.
Developer access and code change permissions are limited by the principle of least privilege.
The security team periodically reviews random PRs.
If a merged PR is later found to contain security vulnerabilities, rollback and emergency patch
procedures are applied.
Version History
Version Date Description Author Approver
1.0 Approval Date]Version 1.0 Köksal KayalıMurat Darçın
