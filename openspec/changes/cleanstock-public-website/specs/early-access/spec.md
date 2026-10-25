# Spec Delta

## Purpose

Collect minimal, consent-based expressions of interest in CleanStock through a reliable self-service registration flow.

## ADDED Requirements

### Requirement: Reusable consent-based form
The registration form SHALL accept business email, optional company name, and optional country. An unchecked explicit consent control and linked privacy notice SHALL explain relevant CleanStock communications. The server SHALL validate all fields, required consent, and allowlisted source page independently of client validation. It SHALL accept valid email syntax without an arbitrary ban on consumer email domains.

#### Scenario: Consent or input missing
- **WHEN** a visitor submits invalid email, overlong fields, invalid country, unknown source, or missing consent
- **THEN** accessible field errors are shown and no registration is stored or success event emitted

### Requirement: Minimal configured persistence
Registration SHALL use an environment-selected server-side persistence provider. Stored data SHALL be limited to normalized email, optional company/country, creation time, source page, and consent time/version. Success SHALL be returned only after a durable acknowledged write. An unavailable or unconfigured provider SHALL return a clear unavailable/retry state without claiming a save or email delivery.

#### Scenario: Successful configured registration
- **WHEN** a valid consented submission is durably accepted
- **THEN** the form confirms registration, preserves source attribution, and emits early_access_submitted without personal fields
- **AND** no claim that email was sent appears unless a functioning delivery integration confirms it

#### Scenario: Backend unavailable
- **WHEN** persistence is missing or fails
- **THEN** the form explains registration is unavailable or could not be saved, permits retry, and emits no success event

### Requirement: Race-safe duplicate handling
The service SHALL normalize email consistently and enforce uniqueness atomically. Duplicate submissions SHALL receive a neutral acknowledgement without revealing list membership, creating another registration, overwriting consent, or emitting another successful submission event.

#### Scenario: Concurrent or repeated email
- **WHEN** equivalent normalized emails are submitted concurrently or with different casing
- **THEN** at most one registration is created and only its creation triggers a success event
- **AND** subsequent requests receive the same neutral acknowledgement independent of list membership

### Requirement: Spam and abuse controls
The endpoint SHALL enforce request-size limits, same-origin validation, a honeypot, minimum plausible form elapsed time, and bounded request rates. Production rate limits SHALL work across instances and fail closed when the limiter is unavailable. Raw IP addresses SHALL not be retained in registrations or logs. Rejected requests SHALL not be persisted.

#### Scenario: Rate exceeded or automated spam
- **WHEN** a requester exceeds five attempts in ten minutes, fills the honeypot, or submits an oversized/cross-origin request
- **THEN** the service rejects the request without exposing personal information
- **AND** rate-limited requests include a retry interval

### Requirement: Accessible submission states and local verification
The form SHALL expose pending, success, duplicate acknowledgement, validation error, rate-limit, and unavailable states accessibly. It SHALL prevent accidental repeat submissions while pending. Integration tests SHALL exercise success and failure without paid services and without enabling a fake success provider in production.

#### Scenario: Local end-to-end verification
- **WHEN** tests use an explicitly test-only persistence and rate-limit adapter
- **THEN** success, duplicate, invalid consent, throttling, and persistence failure can be verified deterministically
- **AND** production startup rejects a test-only adapter
