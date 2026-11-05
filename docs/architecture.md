# Architecture

Phase 1 establishes a single Next.js App Router application. Public content uses Server Components; interactive islands use Client Components. The root currently renders a noindex foundation preview, not the Phase 2 home page.

| Location | Responsibility |
| --- | --- |
| src/app | Routes, root layout, global styling |
| src/components/ui | Reusable accessible presentation |
| src/components/layout | Shared content container and shell |
| src/features/calculators | Future interactive calculator interfaces |
| src/features/budget | Future local template editor |
| src/features/early-access | Future registration interface |
| src/lib/calculations | Future pure exact calculation functions |
| src/lib/schemas | Future shared business input schemas |
| src/lib/exports | Future browser-only export generation |
| src/lib/analytics | Future allowlisted event adapters |
| src/lib/formatting.ts | en-US presentation helpers, not money arithmetic |
| src/server/registrations | Future server-only persistence |
| src/server/rate-limit | Future server-only abuse protection |
| src/config | Page/tool IDs and validated public/server configuration |
| src/content/en-US | English editorial content, ready for later locale separation |
| tests/unit, integration, e2e | Logic, module integration, and real-browser checks |

Empty feature/module directories are intentional boundaries for later phases. Do not add services or business logic until their phase is authorized.

Server configuration imports the Next.js server-only marker; never re-export it through a shared barrel. Public configuration reads only explicit NEXT_PUBLIC_ variables. Values prefixed NEXT_PUBLIC_ are embedded in browser bundles and must never contain secrets. ESLint additionally blocks client imports from server paths; npm run check:boundaries tests the actual framework protection using an intentionally invalid isolated fixture.

Optional private database/rate-limit settings are validated but unused. Registration accepts only the disabled setting in Phase 1. No provider, analytics event, calculation, or registration endpoint is implemented.

Keep calculations independent of React. Formatting helpers in Phase 1 are display utilities; Phase 3 must supply the exact decimal/rational arithmetic and half-up rounding required by the specs before showing financial estimates.
