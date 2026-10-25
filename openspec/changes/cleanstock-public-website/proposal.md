# Proposal

## Why

Small US commercial cleaning and janitorial companies need practical ways to understand supply spending, contract profitability, and pricing. CleanStock will validate organic acquisition, engagement, and interest in a future subscription product through useful self-service resources, without interviews, sales calls, or manual onboarding.

## What Changes

- Establish a public US English website with a home page, three browser-only calculators, a customizable CSV/XLSX budget template, and a substantive profitability guide.
- Explain assumptions, margin versus markup, and estimates without invented statistics or industry benchmarks.
- Provide responsive, accessible interfaces, indexable educational content, metadata, internal links, sitemap, and robots configuration.
- Add privacy-conscious demand events with no business inputs and a configurable analytics adapter.
- Add consent-based early-access registration with validated server handling, minimal configurable persistence, abuse protection, and honest integration states.
- Provide draft privacy and terms pages, testing, deployment documentation, and future localization boundaries.
- Deliver in five phases: Foundation; Public Website; Free Tools; Demand Validation; Quality and Deployment. Implementation starts only after explicit approval in a later request.

## Capabilities

### New Capabilities

- `public-website`: Home, navigation, educational guide, responsive accessible UI, localization readiness, and search discoverability.
- `cleaning-calculators`: Profit, supply cost, and square-foot pricing calculations with deterministic validation, rounding, frequency conversion, and local-only execution.
- `budget-template`: Customizable browser-generated CSV and XLSX downloads with examples, supported formulas, and instructions.
- `demand-analytics`: Allowlisted demand events, attribution, privacy controls, adapter configuration, and measurement documentation.
- `early-access`: Consent-based registration, configurable persistence, source attribution, duplication handling, and abuse protection.
- `privacy-security`: Data boundaries, deployment protections, legal drafts, retention/deletion, and privacy-sensitive configuration.

### Modified Capabilities

None. The initialized repository contains no existing specifications or application.

## Impact

A new Next.js App Router application will use React, strict TypeScript, Tailwind CSS, Zod, React Hook Form where useful, Vitest, and Playwright on Node.js LTS. Only registration needs a server write path; calculations and spreadsheets remain in the browser. A maintained XLSX writer and a minimal durable registration/rate-limit provider will be selected during implementation under the design constraints.

The scope excludes authentication, dashboards, inventory or contract management, billing/Stripe, AI, document storage, native apps, CRM, scheduling, payroll, accounting integrations, and complex infrastructure. No purchased domain, paid service, or live backend is assumed. Hosting, production origin, provider credentials, retention policy ownership, and legal review are launch configuration decisions; missing integrations must fail honestly. Acceptance requires all six capability specs, automated local tests, accessible responsive flows, protected data boundaries, and documented operational checks; no acquisition or conversion outcome is promised.
