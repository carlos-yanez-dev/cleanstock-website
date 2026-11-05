# Phase 1 review

Scope: tasks 1.1 through 1.5 of cleanstock-public-website. Later phases remain unchecked.

## Delivered

- Next.js App Router, React, strict TypeScript, Tailwind PostCSS, Node 24.22.1 pin, and npm lockfile.
- Vitest, ESLint, and Playwright with desktop and 320-pixel Chromium projects.
- Typed page/tool identifiers and route inventory; en-US formatting/content separation.
- Public/private environment schemas with safe defaults, secret-free errors, and the server-only compiler boundary.
- Shared buttons, cards, inputs, select controls, error messages, result panels, tables, and layout tokens.
- A noindex foundation preview with illustrative values and a local-only example form.
- Setup, architecture, component, environment, and review-gate documentation.

## Verification

- Production build and strict typecheck under Node 24.22.1.
- ESLint with zero warnings.
- 10 passing Vitest checks, including invalid production origins, environment privacy, stable identifiers, and formatting.
- Expected compiler rejection when a Client Component imports server configuration.
- 6 passing Playwright checks across desktop/mobile: no external service requests, local validation/reset without submission, noindex/language metadata, keyboard skip/focus behavior, disabled/pending semantics, mobile reflow, and automated WCAG accessibility/contrast checks.
- Desktop/mobile screenshots visually reviewed; horizontal table overflow is contained within its named region.
- Clean-copy installation verification uses npm ci and the documented local checks without environment credentials.

The automated accessibility checks report no violations for this preview. They do not establish full-site WCAG compliance; manual screen-reader/zoom review and public-site checks remain scheduled in later phases.

## Review locally

Run npm run dev and open http://localhost:3000. Review spacing, colors, controls, error feedback, keyboard focus, and mobile layout. This is a component gallery, not the Phase 2 home page or a working calculator.

No Phase 2 public content, calculators, exports, analytics, registration, deployment, or external integrations were implemented.

## Toolchain note

ESLint 9.39.5 is pinned because the current React/accessibility plugins used by eslint-config-next declare ESLint peers through 9.x. npm reports that ESLint release as deprecated. Lint passes with zero warnings and npm audit reports no known vulnerabilities, but the lint toolchain should move to a maintained major when its plugin peers support it. No peer checks were bypassed.
