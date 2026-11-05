# CleanStock website

CleanStock is a public tools and education website for small US commercial cleaning businesses. **Phase 1 only** is implemented: the Next.js foundation, shared components, module/configuration boundaries, and local test setup.

The root page is a noindex component preview for review. The public home page, calculators, spreadsheet downloads, analytics, and early-access backend belong to later phases.

## Local setup

Use **Node.js 24.22.1 LTS** (pinned in .nvmrc and .node-version) and npm 11. The package engine rejects unsupported Node major versions during installation. Switch Node versions with your preferred version manager; no global runtime change is performed by this repository.

```sh
node --version
npm ci
npx playwright install chromium
npm run dev
```

Open http://localhost:3000 to review the foundation. No database, external provider, paid account, Docker, credentials, or purchased domain is needed.

Environment configuration is optional for local use. To inspect the defaults, see .env.example; if overrides are needed, copy it to the ignored .env.local file. Never put credentials in NEXT_PUBLIC_ variables.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run check:boundaries
npm run test:e2e
```

The boundary check intentionally builds an invalid Client Component in .local-tools/ and succeeds only when Next.js rejects its import of server configuration. This expected fixture build failure is not an application failure.

The E2E command builds the app, starts a temporary production server at http://127.0.0.1:3100, runs desktop/320-pixel Chromium checks, and stops the server. Keep that port free. Use npm run test:watch for Vitest watch mode or npm run test:e2e:ui for Playwright's interactive runner. Playwright produces local screenshots and reports in ignored test-results/ and playwright-report/ directories.

For a local production preview:

```sh
npm run build
npm start
```

All checks run without paid external services. Initial package/browser installation needs internet access.

## Project documentation

- [Architecture and boundaries](docs/architecture.md)
- [Shared components and accessibility checks](docs/components.md)
- [Configuration and review gates](docs/configuration.md)
- [Phase 1 verification record](docs/phase-1-review.md)
- [OpenSpec implementation checklist](openspec/changes/cleanstock-public-website/tasks.md)

## Review boundary

Phase 1 is ready for review after its five tasks pass. Phase 2 starts only after a new explicit instruction. Publishing, provider activation, a real production origin, legal review, and operational data handling remain separate launch gates.

Framework setup follows the official [Next.js installation guidance](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind PostCSS setup](https://tailwindcss.com/docs/installation/using-postcss). The runtime line follows the [Node.js release schedule](https://nodejs.org/en/about/previous-releases).
