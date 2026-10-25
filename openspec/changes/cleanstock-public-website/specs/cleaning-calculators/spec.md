# Spec Delta

## Purpose

Give cleaning business owners transparent local estimates of contract profit, recurring supply costs, and service pricing.

## ADDED Requirements

### Requirement: Validated instant local calculations
All three calculators SHALL update valid results without page reload and execute entirely in the browser. Required blanks, negative numbers, nonfinite values, malformed numbers, and values outside documented bounds SHALL produce accessible errors rather than misleading results. Monetary inputs SHALL accept at most two decimal places; quantities and hours SHALL accept up to four.

#### Scenario: Invalid and incomplete input
- **WHEN** an input is blank, negative, NaN, Infinity, malformed, over precision, or exceeds its stated bound
- **THEN** the affected results are withheld, the field error explains correction, and no completion event is emitted

#### Scenario: Private interaction
- **WHEN** the visitor edits any financial value or product label
- **THEN** no input or result is transmitted, placed in URLs, persisted in browser storage, or logged

### Requirement: Contract profit estimates
The profit calculator SHALL accept monthly revenue, labor, cleaning supplies, transportation, and other overhead. It SHALL show total costs, estimated profit, profit margin, supply share of revenue, and break-even revenue. Costs are fixed for this estimate; break-even revenue equals their sum. Percentage results at zero revenue SHALL be unavailable with an explanation.

#### Scenario: Profitable contract
- **WHEN** revenue is 10000 and labor, supplies, transportation, and overhead are 6000, 500, 200, and 300 USD
- **THEN** monthly costs and break-even revenue are 7000 USD, profit is 3000 USD, margin is 30%, and supply share is 5%

#### Scenario: Zero and loss cases
- **WHEN** revenue is zero and costs total 100 USD
- **THEN** profit is -100 USD and both revenue-based percentages display unavailable
- **AND** positive revenue with zero costs yields 100% margin and zero supply share
- **AND** costs above positive revenue yield a negative profit and margin

### Requirement: Supply consumption estimates
The supply calculator SHALL support adding/removing product rows with product name, unit, unit cost, quantity consumed per occurrence, and frequency. It SHALL show occurrence cost, monthly cost per product and total, annual projection, and monthly expense distribution. Unit cost and quantity SHALL use the same declared unit; the tool SHALL perform no implicit dilution or unit conversion.

#### Scenario: Recurring product
- **WHEN** a product costs 10 USD per unit and consumes 2 units weekly
- **THEN** occurrence cost is 20 USD, monthly cost is 86.67 USD, and annual projection is 1040 USD
- **AND** removing the row removes its contribution immediately

#### Scenario: Zero supply spending
- **WHEN** all row costs are zero or no rows remain
- **THEN** totals are zero, no division by zero occurs, and distribution is labeled as having no spending

### Requirement: Explicit annualized frequency assumptions
Supply frequencies SHALL be daily, weekly, every two weeks, monthly, quarterly, or annually with respective annual occurrences 365, 52, 26, 12, 4, or 1. Cleaning schedules SHALL support 1 through 7 visits per week, every two weeks, and monthly with annual visits 52 times weekly visits, 26, and 12. Monthly occurrences SHALL equal annual occurrences divided by 12. Labels SHALL distinguish every two weeks from twice monthly.

#### Scenario: Five visits per week
- **WHEN** five cleaning visits per week are selected
- **THEN** the estimate uses 260 annual visits and 21.666666 recurring monthly visits before rounding
- **AND** the page explains that holidays, closures, and actual calendar variation are excluded

### Requirement: Square foot pricing and margin distinction
The square-foot tool SHALL accept positive square feet, schedule, labor hours per visit, hourly labor cost, supplies per visit, other costs per visit, and desired margin from 0% inclusive to 100% exclusive. It SHALL show visit cost, monthly service cost, monthly suggested price, and monthly price per square foot, explicitly distinguishing margin from markup.

#### Scenario: Margin-based pricing
- **WHEN** area is 10000 square feet, labor is 4 hours at 25 USD/hour, supplies are 20 USD/visit, other costs are zero, frequency is 3 visits/week, and margin is 25%
- **THEN** visit cost is 120 USD, monthly visits are 13, monthly cost is 1560 USD, suggested monthly price is 2080 USD, and monthly price per square foot is 0.2080 USD
- **AND** the explanation uses price = cost / (1 - margin), showing that a 25% markup would instead produce 1950 USD and a 20% margin

#### Scenario: Undefined pricing inputs
- **WHEN** area is zero or margin is at least 100%
- **THEN** pricing is withheld with an accessible field error
- **AND** zero costs with a valid area and margin yield zero cost and suggested price

### Requirement: Predictable precision
Calculations SHALL preserve exact decimal/rational intermediates and round half up only at output boundaries. Currency totals SHALL display two decimals, percentages two decimals, and price per square foot four decimals. Annual projections and distributions SHALL derive from unrounded values; rounding discrepancies SHALL be explained.

#### Scenario: Fractional cents
- **WHEN** 0.10 USD per unit is multiplied by 0.25 units monthly
- **THEN** monthly cost displays 0.03 USD and annual cost displays 0.30 USD
- **AND** annual projection is not calculated by multiplying the rounded monthly display
