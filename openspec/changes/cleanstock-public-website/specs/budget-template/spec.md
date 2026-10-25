# Spec Delta

## Purpose

Let owners download and adapt practical cleaning supply budgets without accounts or uploading business information.

## ADDED Requirements

### Requirement: Customizable local downloads
The template page SHALL let visitors customize product names, units, unit costs, consumption quantities, and frequencies, add/remove rows, and generate CSV and XLSX locally without registration. No spreadsheet import or upload SHALL be required. Downloads SHALL include example products clearly labeled as illustrative, not recommended costs.

#### Scenario: Download a customized budget
- **WHEN** a visitor edits example rows and selects either download format
- **THEN** the downloaded file reflects their edits and no business data is sent to a server
- **AND** a generation failure shows a retryable error without reporting a successful download

### Requirement: Spreadsheet structure and calculation parity
Both formats SHALL include product, unit, unit cost, quantity per occurrence, frequency, annual occurrences, occurrence cost, monthly cost, and annual cost with totals. CSV SHALL contain computed values and explain that it does not preserve workbook formulas. XLSX SHALL include recalculating formulas, cached initial results where supported, and instructions identifying editable cells and frequency assumptions.

#### Scenario: Formula recalculation
- **WHEN** an XLSX user changes unit cost or quantity in a compatible spreadsheet application
- **THEN** row and aggregate amounts recalculate using the calculator frequency and rounding rules
- **AND** instructions explain how to change annual occurrences when changing a frequency outside the website

### Requirement: Safe portable exports
CSV SHALL use UTF-8, correctly escape delimiters/quotes/newlines, and neutralize formula-like user text. XLSX SHALL store user labels as literal strings, contain only application-authored formulas, and contain no macros or external links. Generation SHALL expose accessible loading and error states and downloadable files with correct extensions and MIME types.

#### Scenario: Formula injection attempt
- **WHEN** a product name starts with a spreadsheet formula prefix such as =, +, -, or @, including after leading whitespace
- **THEN** opening either export treats that label as inert text
- **AND** legitimate numeric columns and authored XLSX formulas remain functional

### Requirement: Practical instructions
The page and workbook SHALL explain budgeting workflow, units, annualized consumption, rounding, estimated versus actual costs, and how to allocate a shared product across contracts. They SHALL link to the supply calculator and profitability guide.

#### Scenario: New spreadsheet user
- **WHEN** a visitor follows the instructions using example rows
- **THEN** they can identify which cells to edit, understand the monthly estimate, and avoid counting the same shared purchase against multiple contracts
