# Cryptography Policy

- Source PDF: `D·engage-2026-05-22-policy-packet.pdf`
- PDF pages: 85-86
- Packet pages: 84-85
- Policy Owner: Köksal Kayalı
- Effective Date: Jul 14, 2025

Purpose
To ensure proper and effective use of cryptography to protect the confidentiality, authenticity and/or integrity of information. This policy establishes requirements
for the use and protection of cryptographic keys and cryptographic methods throughout the entire encryption lifecycle.
Scope
All information systems developed and/or controlled by D·engage which store or transmit confidential data.
General requirements
D·engage shall evaluate the risks inherent in processing and storing data, and shall implement cryptographic controls to mitigate those risks where deemed
appropriate. Where encryption is in use, strong cryptography with associated key management processes and procedures shall be implemented and documented.
All encryption shall be performed in accordance with industry standards, including NIST SP 800-57.
Customer or confidential company data must utilize strong ciphers and configurations in accordance with vendor recommendations and industry best practices
including NIST when stored or transferred over a public network.
Key management
Access to keys and secrets shall be tightly controlled in accordance with the Access Control Policy.
All cryptographic material shall be logged and access recorded.
Keys must be rotated at least annually or upon suspected compromise.
Certificates must be renewed before expiration and revoked immediately upon compromise
All certificates must be managed through an approved Certificate Authority.
The lifecycle must include issuance, renewal tracking, expiry monitoring, and revocation procedures.
Access to cryptographic key material must be logged.
Logs must include user ID, timestamp, type of access, and outcome.
Logs must be retained for at least 1 year and protected from unauthorized changes.
Annual reviews and deprecation of weak algorithms.
Monitoring tools must be in place.
The following table details D·engage's approved encryption algorithms:
Max
Domain Key Type Algorithm Key Length
Expiration
Dengage hosted *.dengage.com RSA or ECC with SHA2+ 2048 bit or greater/RSA, 256 bit or
RSA or ECC with SHA2+ signature Up to 1 year
domains signature greater/ECC
Third party hosted Dengage RSA or ECC with SHA2+ 2048 bit or greater/RSA, 256 bit or
RSA or ECC with SHA2+ signature Up to 3 months
domains. signature greater/ECC
Ciphers of B or greater grade on SSL
Web Cipher (TLS) Asymmetric Encryption Varies N/A
Labs Rating
Passwords One-way Hash Bcrypt, PBKDF2, or scrypt, Argon2 256 bit Up to 1 month
Server Disks Symmetric Encryption AES 256 bit N/A
Exceptions
Requests for an exception to this policy must be submitted to the ISMS Manager for approval.
A documented exception is required prior to moving, copying, or storing customer or company confidential data on any media or removable device; all portable
devices and removable media containing sensitive data must be encrypted using approved standards and mechanisms.

Violations & enforcement
Any known violations of this policy should be reported to the ISMS Manager. Violations of this policy can result in immediate withdrawal or suspension of system
and network privileges and/or disciplinary action in accordance with company procedures up to and including termination of employment.
Version history
Version Date Description Author Approver
1.0 Jul 14, 2025 Version 1.0 Köksal Kayalı Ali Altan Saka, Osman Tufanoğulları, Murat Darçın
