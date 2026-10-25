# Design

## Context

See proposal.md for motivation and specs/ for behavior contracts. Inspection found only installed OpenSpec skills and an initialized openspec/ tree: CLI 1.15.0, spec-driven schema, no application, package manifest, tests, or existing specifications. No project-specific context or artifact rules are configured. This is a greenfield design, not a description of existing software. Planning artifacts are the only authorized edits until a separate approval/apply request.

## Goals / Non-Goals

**Goals:** isolate calculation and export data from all network paths; make calculations deterministic; keep public content renderable without interactive JavaScript; isolate optional providers; keep operational cost and maintenance low.

**Non-Goals:** SaaS product workflows, visitor identity tracking, CRM, document uploads, automatic email campaigns, internationalized routes, or production provider provisioning. Do not turn the early-access interface into an account system.

## Decisions

### 1. Single modular Next.js application

Use App Router, React, strict TypeScript with no explicit any, Tailwind, Zod, React Hook Form for interactive forms/dynamic rows, Vitest, and Playwright. Pin a supported Node.js LTS and compatible stable dependency versions at implementation time; commit a lockfile. No package installation is needed for this proposal. Use Server Components for layout, metadata, guide, instructions, and page copy; keep Client Components limited to forms, calculators, downloads, and event dispatch. Prefer static generation for public content and a single registration route handler for writes.

Proposed structure:

- src/app/: eight public routes, metadata routes, and api/early-access/route.ts.
- src/components/ui/ and src/components/layout/: shared accessible controls and site shell.
- src/features/calculators/: interactive profit, supplies, and square-foot interfaces.
- src/features/budget/ and src/features/early-access/: download UI and reusable registration form.
- src/lib/calculations/: pure typed calculation and rational-money utilities, with no React or network imports.
- src/lib/schemas/: shared input schemas, safe bounds, and registration validation.
- src/lib/exports/: CSV escaping, workbook model, XLSX generation.
- src/lib/analytics/: typed event contract, sanitizer, consent policy, no-op/provider adapters.
- src/server/registrations/ and src/server/rate-limit/: server-only contracts and adapters.
- src/config/ and src/content/en-US/: environment validation, page identifiers, formatting, and editorial copy.
- tests/unit/, tests/integration/, tests/e2e/, and docs/: verification and operational guidance.

A client-side SPA was considered but would add dependence on JavaScript for educational content. Separate services and a general CMS add operating work without supporting the initial validation objective.

### 2. Exact calculation model and bounded inputs

Parse decimal strings through Zod before calculation; do not parse money through binary floating point. Represent money/quantity intermediates as reduced BigInt rational values, round half up at display/export boundaries, and format USD with explicit locale. Values stay inside client boundaries and do not need server serialization. Keep one shared tested rounding implementation instead of independent UI formulas. A decimal dependency is an acceptable replacement only if it preserves every precision scenario; a full accounting engine is unnecessary.

Initial safe bounds: monetary input 0 through 100000000 USD with two decimal places; hours and quantities 0 through 1000000 with four places; square feet greater than zero through 100000000 with two places; at most 100 product rows, product labels 120 characters, units 40 characters. Document these bounds beside inputs/in instructions. Do not silently coerce blanks to zero or accept exponent notation, currency symbols, or mixed separators. Hours may be zero; area may not. Product names are local labels, never tracking identifiers.

Contract: C = labor + supplies + transport + overhead; profit = revenue - C; margin = profit/revenue * 100; supply share = supplies/revenue * 100; break-even revenue = C under the fixed-cost assumption. At revenue zero, percentages are unavailable.

Supplies: occurrence = unit cost * quantity; annual = occurrence * annual frequency; monthly = annual/12; distribution = unrounded monthly row / unrounded monthly total. Daily uses 365, weekly 52, every two weeks 26, monthly 12, quarterly 4, annually 1. Weekly cleaning schedules use 52 * visits/week, every two weeks 26, monthly 12; label the annualized assumption and excluded holidays/closures.

Square-foot pricing: visit cost = hours * hourly labor + supplies/visit + other/visit; monthly cost = visit cost * annual visits/12; monthly price = monthly cost/(1 - margin/100); monthly price/area yields monthly USD/sq ft. Margin must be below 100%. Markup is (price - cost)/cost and is unavailable at zero cost. Display money to two places, percentages to two, and square-foot rates to four; compute annual projections before display rounding. Explain possible discrepancies when summing displayed rounded rows. Zero spending has no meaningful percentage distribution.

### 3. Content, interface, and SEO

Use a restrained light B2B visual system with consistent typography, spacing, cards, tables, and forms. Include mobile menu keyboard/focus behavior, skip link, semantic navigation, associated errors, and polite debounced result announcements. Keep page content readable at 320 CSS pixels and 400% zoom, meet AA contrast, and use minimal motion. Supply rows use stable local IDs and predictable focus when added/removed; distributions have accessible numeric tables rather than requiring a chart library.

Keep editorial content separate from computation and use en-US format helpers so later en-CA/fr-CA additions do not require formula rewrites. No translations, currency conversion, Canadian taxes, or locale routes are included. The guide uses clearly hypothetical arithmetic and allocation examples whose totals reconcile.

Each page defines unique metadata, canonical, Open Graph, headings, and related links. Use a required configured production SITE_URL for launch; development may use localhost but previews are noindex with restrictive robots. An absent production origin fails the launch check rather than inventing a domain. Generate sitemap.xml and robots.txt from the route inventory; exclude APIs. Use Organization/WebSite or other structured data only when configured facts support it; omit unsupported ratings, FAQ claims, and contact details.

Minimize hydration, optimize fonts/images, and load the XLSX writer only when requested. Target production field p75 LCP <=2.5s, INP <=200ms, CLS <=0.1 once real data exists. Before traffic, use production-build lab checks for LCP/CLS and scripted interaction responsiveness; lab scores cannot prove field performance or search ranking.

### 4. Browser-only export generation

Use a shared workbook model based on the same calculation/frequency rules. Select one maintained browser-compatible XLSX writer with acceptable license, formula cell support, and no required server service; record the choice and bundle/security review during implementation. CSV needs no dependency. A server export endpoint was rejected because it would transmit business data.

Both exports include example/editable rows and derived occurrence/monthly/annual columns plus totals. XLSX has Budget and Instructions sheets, editable input styling, authored formulas using annual occurrences, cached numeric values where supported, and recalculate-on-open metadata. Instructions explain the frequency-to-occurrences column, rounding, and compatible spreadsheet recalculation; do not promise formula evaluation by the writer itself. CSV contains calculated snapshot values with separate on-page instructions.

Escape CSV quotes/newlines and prefix formula-like text safely after testing whitespace/control prefixes. Store workbook labels as literal string cells; never interpolate user names into formulas, external links, or worksheet names. Test file contents and formulas by reopening generated workbooks and verify actual recalculation in a compatible free spreadsheet application before release. Revoke object URLs after download initiation. Browser initiation is the observable download event; successful saving to disk cannot be asserted by the page.

### 5. Allowlisted analytics with bounded lifecycle

Expose a typed event dispatcher accepting only event/page/tool enum identifiers; sanitize at runtime as well. Default to no-op and never log payloads as a development fallback. Keep all form state outside event calls. Emit page_view for committed route visits, started on first edit, completed on first valid user-driven result, download after generation/initiation, CTA on activation, and registration after a new durable save. Deduplicate engagement in memory per route visit, including React development re-renders. No initial-default completions or persistent user/session identifiers.

An external adapter is optional and environment-selected; baseline requires cookieless, non-fingerprinting behavior and no collection of form values or URL queries. Honor local opt-out, Global Privacy Control, and Do Not Track. Providers needing consent remain silent until granted. Provider failure is nonblocking and must not queue personal data. Documentation explains Search Console ownership verification, sitemap submission, event verification, provider privacy settings, and a review of impressions/clicks, tool starts/completions, downloads, and registrations. These are event counts, not unique visitors or proven demand; no fabricated targets or conversion results.

### 6. Minimal registration and rate-limit service

POST /api/early-access accepts only email (max 254 characters), optional company (120), optional ISO country code, consent true/version, source page enum, and honeypot/timing metadata. Limit body to 8 KiB, require expected JSON content type and same origin, and validate server-side. Trim and lowercase emails consistently as a documented deduplication assumption; accept syntax-valid personal-domain business contacts. Do not store honeypot or timing metadata. Minimum form interval is two seconds; it supplements other controls and is not trusted proof of humanity.

Define a server-only repository with atomic create-if-absent, delete, and delete-expired operations. Results are created, existing, or unavailable. Persist only the fields listed in early-access/spec.md; first source/consent remain unchanged on duplicates. New and existing registrations receive the same neutral public status and response body. Emit the submission event only for created at the trusted server analytics boundary; do not return a membership-revealing creation flag to the browser. The server adapter accepts only event/page/tool identifiers, honors the same privacy policy, and does not forward requester headers or personal fields. No email delivery is part of the baseline.

Use environment-selected disabled, local/test, and managed SQL-compatible persistence adapters. The implementation includes a real managed SQL adapter with unique normalized email, parameterized statements, and durable acknowledgement; the exact vendor is replaceable and need not be provisioned to implement/test. Use that managed data service for atomic shared rate-limit counters where practical, avoiding another service. A production file or process-local memory store is rejected because instances are ephemeral and concurrent. The disabled mode returns 503 with honest UI; production rejects local/test adapters.

Rate limit to five attempts per ten minutes per HMAC-derived requester key using a server-only rotating secret and a trusted platform client-address source. Never trust arbitrary forwarded headers without the platform contract. Retain only the derived key/counter until expiry, no raw IP. Missing limiter or trusted identity configuration fails registration closed; calculators stay available. Apply request limits before repository calls; return 429 plus Retry-After. Test adapters provide deterministic success, duplicates, concurrency, and failure with no paid account.

Retain registrations for twelve months; a documented scheduled command/job deletes expired rows. Provide operator deletion/withdrawal procedures within thirty days after verification, with provider backup expiry disclosed. Operator-only deletion is adequate for this MVP and is distinct from manual onboarding. No public lookup endpoint or CRM is added.

### 7. Security and legal operations

Use validated environment configuration, server-only provider credentials, HTTPS, bounded logs with nonpersonal diagnostic codes, parameterized persistence, and same-origin protection. Configure CSP compatible with Next.js rendering and the selected analytics endpoint, frame-ancestors, nosniff, restrictive referrer/permissions policy, and production HSTS. Test rendered scripts under the deployed CSP; do not disable protections broadly to fix hydration.

Privacy/terms start as conspicuous drafts and describe actual providers and data flow. Launch requires legal review of US requirements and relevant Canadian/Quebec consent/privacy considerations, actual operator contact, processor/region disclosures, retention and deletion, and communication purpose. This design makes no legal compliance claim. No sensitive request-body, email, raw IP, or business-value logging; review hosting/provider defaults too.

### 8. Verification and acceptance

Vitest covers exact arithmetic and independently calculated examples: zero revenue/expenses, negative/nonfinite/blank/out-of-bound inputs, decimal ties, losses, margin versus markup, near-100% margin, annual/monthly and frequency conversions, zero distributions, and export parity. Integration tests cover payload sanitization, event lifecycle, server validation, consent, atomic duplicate races, rate limiting/expiry, provider outage, retention deletion, and safe CSV/XLSX contents.

Playwright exercises all five resources and home/legal routes; each calculator; invalid inputs; row add/remove; both downloads; mobile navigation; registration success/duplicate/failure/throttle; metadata and initial HTML; and intercepted network/storage privacy assertions. Include keyboard checks and an accessibility scanner plus manual contrast, zoom, focus, and screen-reader review. Unit and E2E tests use local adapters and no paid services. CI runs typecheck, lint, unit/integration tests, production build, and critical E2E. All implementation tasks remain unchecked until a later authorized apply workflow.

## Risks / Trade-offs

- Annualized frequencies differ from actual calendars -> publish assumptions and position outputs as estimates.
- Rational arithmetic and spreadsheet precision differ -> test boundary values and document spreadsheet display limits.
- Minimal analytics cannot identify unique visitors -> interpret aggregate events cautiously and use Search Console for organic discovery.
- Missing domain/backend/legal details block launch -> retain explicit configuration gates and honest unavailable states.
- Spam controls may reject legitimate bursts -> provide Retry-After and clear retry UI; tune only with evidence.
- Provider logs/regions and XLSX dependency risk -> review configuration, license, maintenance, and data processing before activation.
- No traffic yet -> record real measurements later without claiming validated demand.

## Migration Plan

No existing application data needs migration. After approval, implement Foundation, Public Website, Free Tools, Demand Validation, and Quality and Deployment in that order. Create versioned registration schema/indexes, verify local fixtures, then deploy a noindex preview. Configure actual origin/providers/secrets, run production adapter and deletion smoke checks, complete legal review, and enable indexing only at launch. Vercel is a suitable default; another Node-compatible low-cost host is acceptable. No Docker, Kubernetes, or microservices are required.

Rollback by restoring the previous deployment and disabling affected analytics/registration adapters. Preserve durable registrations and avoid destructive schema rollback; backward-compatible schema changes are preferred. Static tools remain usable during registration outage. Document deployment, environment setup, rate-limit trust configuration, provider changes, backup/retention handling, and Search Console steps.

## Open Questions

These are launch inputs that do not alter scope or contracts: actual domain/origin; deployment account; managed SQL vendor and processing region; optional analytics provider; legal operator/contact and reviewer. No domain purchase or external account is assumed. The design supplies disabled defaults and local test adapters so these choices need not block implementation after approval.

