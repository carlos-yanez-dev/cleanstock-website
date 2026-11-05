# Configuration and review gates

No environment file is required to build or test locally. .env.example contains safe empty/default examples; copy it to .env.local only for local overrides. All .env files except .env.example are ignored by Git.

| Variable | Default | Visibility and behavior |
| --- | --- | --- |
| NEXT_PUBLIC_DEPLOYMENT_ENV | development | Public enum: development, preview, production |
| NEXT_PUBLIC_SITE_URL | unset | Public origin; no credentials, path, query, or fragment. Production requires HTTPS |
| REGISTRATION_PROVIDER | disabled | Server-only; disabled is the only supported Phase 1 provider |
| DATABASE_URL | unset | Server-only reserved URL; unused until the registration phase |
| RATE_LIMIT_SECRET | unset | Server-only reserved secret; at least 32 characters when supplied, unused until the registration phase |
| NEXT_TELEMETRY_DISABLED | unset | Set to 1 to disable framework telemetry; Playwright sets it for its managed server |

Production here means an explicit NEXT_PUBLIC_DEPLOYMENT_ENV=production, not just NODE_ENV=production: local production builds and previews must work without a real domain. Phase 1 always emits noindex/nofollow, even if an origin is configured. Actual production indexing, canonical URLs, sitemap, and robots behavior are Phase 2 work.

NEXT_PUBLIC_ values are embedded at build time; rebuild when changing them. The sample deliberately contains no invented domain or credentials. Private values are read only through src/config/server.ts, marked server-only. Configuration errors report field names, never supplied values.

Registration, rate limiting, and analytics adapters do not exist in Phase 1. A database URL alone does not activate anything, and no form claims to save information or send mail. The preview example form stays in local component memory.

## Review and launch gates

1. Review Phase 1 implementation and shared component preview.
2. Explicitly authorize Phase 2 before public website work.
3. Implement and verify the later tool and demand-validation phases only when authorized.
4. Before launch, supply the actual domain/origin and deployment account, real persistence/limiter and optional analytics configuration, processor regions, operator/legal contact, reviewed notices/terms/consent, retention/deletion operations, and security/performance checks.
5. Publishing and external account changes require separate authorization.

See the OpenSpec design for the full later-phase architecture. Those decisions do not imply that the services already exist.
