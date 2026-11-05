export const pageIds = ["home", "contract-profit", "supply-cost", "square-foot", "budget-template", "profitability-guide", "privacy", "terms"] as const;
export type PageId = (typeof pageIds)[number];

export const toolIds = ["contract-profit", "supply-cost", "square-foot", "budget-template", "profitability-guide"] as const;
export type ToolId = (typeof toolIds)[number];

export const routes = {
  home: "/",
  "contract-profit": "/cleaning-contract-profit-calculator",
  "supply-cost": "/janitorial-supply-cost-calculator",
  "square-foot": "/cleaning-cost-per-square-foot",
  "budget-template": "/cleaning-supplies-budget-template",
  "profitability-guide": "/cleaning-contract-profitability",
  privacy: "/privacy",
  terms: "/terms",
} as const satisfies Record<PageId, string>;
