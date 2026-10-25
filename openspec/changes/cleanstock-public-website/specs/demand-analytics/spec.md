# Spec Delta

## Purpose

Measure organic discovery, tool engagement, and future product interest without collecting visitor business inputs.

## ADDED Requirements

### Requirement: Allowlisted demand events
Analytics SHALL support page_view, calculator_started, calculator_completed, template_downloaded, saas_cta_clicked, and early_access_submitted. Every event SHALL contain event name and an allowlisted page identifier, plus tool identifier where applicable. Payloads SHALL exclude financial inputs/results, product names, spreadsheet contents, email, company, country, raw URLs/query strings, and free text.

#### Scenario: Sanitized event
- **WHEN** a visitor completes a calculator after entering a distinctive product name and financial amount
- **THEN** the event contains only the allowed event/page/tool identifiers
- **AND** extra properties are rejected or removed before reaching any adapter

### Requirement: Stable event semantics
page_view SHALL fire once per committed public route visit. calculator_started SHALL fire on the first user edit and calculator_completed on the first valid result following user interaction, each once per tool per page visit. Initial defaults SHALL not count as engagement. template_downloaded SHALL fire after file creation and download initiation; early_access_submitted SHALL fire only after confirmed persistence.

#### Scenario: Repeated edits and failures
- **WHEN** a visitor edits a valid calculator repeatedly, then attempts a failed download or registration
- **THEN** only one started and one completed event fire for that tool visit
- **AND** failed actions emit no successful download or submission events
- **AND** returning to the route creates a new visit scope without persistent visitor identification

### Requirement: Configurable privacy-conscious delivery
Analytics SHALL default to a no-op adapter and permit provider configuration without modifying calculator logic. It SHALL avoid cookies, fingerprinting, persistent visitor IDs, and cross-site tracking in the baseline. Delivery failures SHALL not block tools or registration. A configured provider SHALL honor documented consent and browser privacy preferences, with no events sent after opt-out.

#### Scenario: Provider disabled or unavailable
- **WHEN** analytics is unconfigured, denied by consent policy, opted out, or temporarily failing
- **THEN** tools, downloads, and registration continue normally without console payload logging or queued personal data

### Requirement: Honest measurement documentation
Documentation SHALL explain production domain verification and sitemap submission in Google Search Console, adapter setup and verification, event definitions, privacy checks, and interpretation of demand. It SHALL distinguish event counts from unique users and describe an organic impressions/clicks, engagement, and early-access review process without fabricated metrics.

#### Scenario: Operator configures measurement
- **WHEN** an operator follows the documentation with their own domain and provider
- **THEN** they can verify anonymized event delivery and Search Console setup without paid services being required for local tests
- **AND** documentation states that no demand thresholds or success results have been observed yet
