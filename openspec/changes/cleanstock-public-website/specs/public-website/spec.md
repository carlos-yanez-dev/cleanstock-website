# Spec Delta

## Purpose

Provide useful, accessible public content that helps small cleaning businesses discover CleanStock and evaluate contract economics.

## ADDED Requirements

### Requirement: Public routes and product positioning
The website SHALL provide `/`, `/cleaning-contract-profit-calculator`, `/janitorial-supply-cost-calculator`, `/cleaning-cost-per-square-foot`, `/cleaning-supplies-budget-template`, `/cleaning-contract-profitability`, `/privacy`, and `/terms`. The home SHALL contain a hero, value proposition, free tools directory, small-business benefits, future SaaS features, early-access CTA, and legal footer links. Future features MUST be labeled as planned.

#### Scenario: Visitor explores the website
- **WHEN** a visitor opens the home and follows each directory and footer link
- **THEN** each route loads directly and through navigation with a unique heading and useful content
- **AND** no dashboard, account, payment, or manual onboarding is required

### Requirement: Educational value
Each tool page SHALL include unique explanations, worked examples, assumptions, instructions, and relevant internal links. The profitability guide SHALL cover contract profit, supply cost mistakes, allocation across contracts, estimates versus actuals, identifying losses, and practical numerical examples without fabricated statistics or unsupported benchmarks.

#### Scenario: Owner reads an allocation example
- **WHEN** the owner reads the guide
- **THEN** it explains an explicit allocation basis, shows arithmetic that reconciles to total supply costs, distinguishes assumptions from observed costs, and links to related calculators

### Requirement: Accessible responsive interface
The website SHALL follow WCAG 2.2 AA principles with keyboard navigation, visible unobscured focus, labels, semantic structure, readable contrast, accessible errors/results, and mobile reflow. It SHALL use a consistent professional light theme, reusable controls, clear loading/error states, and no unnecessary animations.

#### Scenario: Keyboard and mobile usage
- **WHEN** a visitor operates navigation and forms using a keyboard at a 320 CSS pixel viewport or with zoom
- **THEN** all controls remain reachable and labeled, focus remains visible, no information depends only on color, and content reflows except justified scrollable data tables
- **AND** dynamic results are announced without stealing focus on each keystroke

### Requirement: Search discoverability
Every public content page SHALL have a unique title, description, canonical URL, Open Graph metadata, semantic headings, descriptive slug, and relevant internal links. Educational text SHALL be available in initial HTML. Sitemap and robots endpoints SHALL reflect the configured production origin; structured data SHALL only describe visible applicable content.

#### Scenario: Production and preview indexing
- **WHEN** a production origin is configured
- **THEN** canonicals and sitemap URLs use that HTTPS origin without a fabricated purchased domain
- **AND** preview deployments emit noindex and restrictive robots directives
- **AND** production content is indexable while API endpoints are excluded from the sitemap

### Requirement: US English and localization readiness
All public content SHALL use US English, USD, and square feet with clear labels. Content and formatting SHALL allow future Canadian English and French localization without implementing translations or locale routes in this release.

#### Scenario: Visitor reads pricing estimates
- **WHEN** an estimate is shown
- **THEN** it explicitly identifies USD and the area/time basis, and does not imply Canadian tax, currency, or regulatory treatment
