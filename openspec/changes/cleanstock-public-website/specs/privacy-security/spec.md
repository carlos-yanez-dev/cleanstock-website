# Spec Delta

## Purpose

Protect visitors' business inputs and minimal registration information through explicit data boundaries and operational safeguards.

## ADDED Requirements

### Requirement: Local business data boundary
Calculator values, results, product names, and spreadsheet contents SHALL remain in current browser memory and generated local downloads. They SHALL not enter server requests, analytics, URLs, logs, cookies, or browser persistence. Reload SHALL reset calculator data. Registration SHALL be the only visitor-personal-data submission flow in scope.

#### Scenario: Network and storage audit
- **WHEN** a test enters distinctive financial and spreadsheet data, operates every tool, downloads files, and reloads
- **THEN** captured requests and storage contain none of those values and reload restores defaults
- **AND** only explicitly submitted registration fields reach the registration endpoint

### Requirement: Secure deployment and validation
Production SHALL use HTTPS, validated server-only secrets, bounded server inputs, safe output handling, and appropriate Content Security Policy, transport security, content-type, framing, referrer, and permissions headers. Logs SHALL exclude request bodies, financial data, email, company, raw IP, secrets, and complete registration records.

#### Scenario: Misconfiguration and unsafe input
- **WHEN** required provider secrets are absent or input contains markup
- **THEN** no credentials reach the client, unsafe markup remains inert, and registration reports an honest unavailable/validation state
- **AND** errors use nonpersonal diagnostic codes rather than dumping payloads

### Requirement: Retention and deletion
The service SHALL document registration data ownership, purpose, storage location, processors, access restrictions, retention, deletion, and communication withdrawal. The initial retention SHALL be twelve months from registration unless withdrawn earlier. An operator runbook SHALL support deletion of active records within thirty days of a verified request and explain provider backup expiry. Rate-limit identifiers SHALL expire within their ten-minute window.

#### Scenario: Withdrawal or expiry
- **WHEN** an operator processes a verified withdrawal/deletion request or the retention period expires
- **THEN** the registration is deleted through the documented procedure without copying personal data into logs
- **AND** residual backup handling follows the disclosed configured-provider policy

### Requirement: Legal drafts and jurisdiction readiness
Privacy and terms pages SHALL be marked as drafts requiring legal review. They SHALL explain browser-only tools, estimate limitations, registration purpose/consent, analytics behavior, retention/deletion, and contact details. Launch review SHALL consider applicable US and Canadian privacy and communications requirements, including Quebec Law 25, without asserting automatic compliance.

#### Scenario: Prelaunch legal review
- **WHEN** the operator prepares public launch
- **THEN** the checklist requires actual operator/contact/processor details, reviewed notices and terms, consent wording, and configured deletion handling
- **AND** no placeholder contact or unsupported compliance badge is published as factual

### Requirement: Privacy-preserving provider activation
Enabling an analytics or registration provider SHALL require reviewing its payloads, processing region, logging, retention, subprocessors, and consent implications. Privacy notices and configuration SHALL match actual behavior. Browser privacy opt-out SHALL disable analytics delivery without disabling tools.

#### Scenario: Provider activation audit
- **WHEN** a provider is configured for production
- **THEN** the launch checklist records its data handling and verifies that business inputs and registration personal fields are absent from analytics
- **AND** production is blocked from using test providers or public secrets
