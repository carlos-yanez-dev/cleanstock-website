# Tasks

Implementation is blocked until the specifications have been reviewed and the user explicitly requests the apply workflow. All boxes intentionally remain unchecked. Capability contracts live in specs/; design.md defines architecture, bounds, formulas, and launch inputs.

## 1. Phase 1 - Foundation

- [ ] 1.1 Initialize Next.js App Router with React, strict TypeScript, Tailwind, supported Node.js LTS, and a lockfile; verify the starter production build and typecheck succeed.
- [ ] 1.2 Configure Vitest, Playwright, lint, typecheck, build, and test scripts; verify a minimal smoke test runs locally without external service credentials.
- [ ] 1.3 Establish the source/content/server/test boundaries described in design.md, typed page/tool identifiers, en-US formatting, and validated public/server environment configuration; verify server secrets cannot be imported by client entry points and document the structure.
- [ ] 1.4 Create reusable buttons, cards, labeled fields, errors, result panels, tables, and layout tokens; verify keyboard focus, contrast, and a 320 CSS pixel component preview.
- [ ] 1.5 Document local setup, architecture, commands, environment examples without secrets, and the later approval/launch gates; verify a clean local checkout can follow the setup instructions.

## 2. Phase 2 - Public Website

- [ ] 2.1 Build the home hero, value proposition, directory, small-janitorial benefits, planned SaaS features, and early-access CTA placement; verify all required sections and planned-feature labels in rendered HTML.
- [ ] 2.2 Build responsive navigation/footer linking the five resources and legal pages; add Playwright desktop/mobile route and keyboard-menu coverage and verify direct route loads.
- [ ] 2.3 Add metadata helpers, unique page titles/descriptions, canonical/Open Graph configuration, sitemap.xml, robots.txt, and valid optional structured data; verify initial HTML and production/preview indexing behavior with local tests and a configured test origin.
- [ ] 2.4 Establish US English editorial and localization conventions, page-specific explanatory content slots, and loading/error patterns; verify no translation routes or invented industry claims appear and document editorial rules.
- [ ] 2.5 Check shared layouts with automated accessibility checks and manual keyboard, zoom, focus, and contrast review; record findings and fixes in the accessibility checklist before building tool-specific controls.

## 3. Phase 3 - Free Tools

- [ ] 3.1 Implement shared bounded decimal schemas, exact rational arithmetic, half-up display rounding, and annual frequency conversion; verify Vitest coverage for zero, negative, nonfinite, malformed, precision, bound, tie, and monthly/annual cases and document assumptions.
- [ ] 3.2 Implement pure contract-profit calculations and the interactive profit route with unique explanations and examples; verify zero revenue/expenses, losses, break-even, supply share, and the 10000/7000 example with unit and Playwright tests.
- [ ] 3.3 Implement pure supply calculations and dynamic product rows, units, frequencies, distribution table, and page instructions; verify add/remove focus behavior, zero/empty rows, the 86.67 monthly/1040 annual example, and invalid input through unit and E2E tests.
- [ ] 3.4 Implement pure square-foot pricing and its interface with explicit per-visit other costs, frequency assumptions, and margin-versus-markup explanation; verify 120/1560/2080/0.2080 outputs, zero area, 100% margin rejection, near-boundary margin, and zero-cost cases using unit and E2E tests.
- [ ] 3.5 Implement the customizable budget editor and safe UTF-8 CSV generation; verify computed totals, comma/quote/newline escaping, formula-prefix neutralization, no-registration download, and local-only behavior with unit and Playwright tests.
- [ ] 3.6 Select and document one maintained, license-compatible browser XLSX writer; implement deferred loading, Budget/Instructions sheets, authored formulas, editable inputs, and recalculate-on-open; reopen files in tests and verify formulas recalculate in a compatible free spreadsheet application.
- [ ] 3.7 Add accessible export pending/error states and example-use instructions covering units, annual occurrences, rounding, and allocation; verify both file types and simulated generation failures in Playwright, and document export limitations.
- [ ] 3.8 Write the profitability guide covering all six requested topics with explicit hypothetical numerical allocation examples and calculator links; verify arithmetic reconciles, links resolve, and full guide content is available without JavaScript.
- [ ] 3.9 Verify network/storage isolation across calculators and template editing/downloads using distinctive test inputs; assert no business values appear in requests, URLs, logs, cookies, or persistent storage and reload resets state.

## 4. Phase 4 - Demand Validation

- [ ] 4.1 Implement allowlisted typed analytics, runtime sanitization, a default no-op adapter, configurable provider boundary, privacy preference checks, and nonblocking failure handling; verify forbidden payload rejection, opt-out/GPC/DNT, and provider failure with integration tests.
- [ ] 4.2 Wire the six event types with visit-scoped engagement deduplication and no default-value completions; verify route transitions, repeated edits, CTA clicks, successful download initiation, and failure suppression using adapter-spy integration/E2E tests.
- [ ] 4.3 Build the reusable early-access form with optional company/country, required unchecked consent, privacy notice, source enum, and all accessible states; verify invalid fields, missing consent, pending behavior, and honest unconfigured-provider messaging in Playwright.
- [ ] 4.4 Implement bounded same-origin registration handling, email normalization, server schemas, honeypot, and elapsed-time checks; verify direct invalid/oversized/cross-origin/spam requests cannot reach persistence using integration tests.
- [ ] 4.5 Implement disabled, test/local, and real managed SQL registration adapters with versioned schema and unique normalized-email constraint; verify durable creation, concurrent duplicate handling, unchanged original consent/source, provider outage, and production rejection of test adapters using a local database/test fixture.
- [ ] 4.6 Implement shared atomic rate-limit storage, trusted platform requester extraction, HMAC keys, ten-minute expiry, five-attempt policy, and fail-closed behavior; verify concurrency, spoofed headers, expiry, missing configuration, and 429 Retry-After with deterministic integration tests.
- [ ] 4.7 Connect acknowledged registrations to early_access_submitted at the trusted server boundary, maintaining identical public duplicate acknowledgements and excluding personal fields; verify only a new durable record emits an event and errors/duplicates do not, including concurrent tests.
- [ ] 4.8 Implement registration expiry/deletion operations and document twelve-month retention, verified withdrawal, thirty-day active-record deletion, provider backup handling, access restrictions, and processor region; verify seeded expired/requested records are deleted without personal logging.
- [ ] 4.9 Create draft privacy and terms pages with actual-behavior descriptions and explicit legal-review markers; verify required disclosures, accessible links, and a launch checklist for US/Canadian/Quebec considerations without compliance assertions.
- [ ] 4.10 Document Search Console verification/sitemap submission, provider adapter connection, privacy configuration, event semantics, and organic/engagement/interest review; verify a local test adapter demonstrates the documented event contract without invented results or paid services.

## 5. Phase 5 - Quality and Deployment

- [ ] 5.1 Run the complete calculation/export/registration/analytics unit and integration suites, typecheck, lint, and production build; verify all earlier phase checks pass and record reproducible commands and remaining limitations.
- [ ] 5.2 Run the complete Playwright suite for all five resources, home/legal navigation, calculator validation, both downloads, mobile navigation, registration success/duplicate/failure/throttle, initial HTML, and SEO metadata; verify local execution requires no paid services.
- [ ] 5.3 Perform integrated WCAG 2.2 AA review with automated scanning plus keyboard, screen-reader, zoom/reflow, contrast, error announcement, and dynamic-row focus checks; fix blocking findings and record manual evidence.
- [ ] 5.4 Measure production-build performance and client bundle costs including deferred XLSX loading; verify lab LCP/CLS and interaction checks against design targets and document that field INP/Core Web Vitals require real traffic.
- [ ] 5.5 Configure and test HTTPS deployment assumptions, CSP, HSTS, framing/content-type/referrer/permissions headers, environment isolation, and sanitized logs; verify hydration, analytics allowlists, and data-boundary tests remain functional under security headers.
- [ ] 5.6 Add CI for typecheck, lint, unit/integration tests, build, and critical E2E, using local fixtures; verify the complete pipeline passes without production secrets.
- [ ] 5.7 Write low-cost Vercel/Node deployment and rollback instructions, configuration table, database migration/backup/retention runbook, trusted-IP setup, and noindex preview/production checklist; verify instructions against a local production build and validate all configuration gates.
- [ ] 5.8 Prepare the acceptance report mapping every capability requirement to test/manual evidence and listing outstanding domain/provider/legal launch inputs; verify all tracked implementation work is complete while external publishing remains a separately authorized action.
