export const defaultLocale = "en-US" as const;
export const defaultCurrency = "USD" as const;

export function formatCurrency(value: number | bigint): string {
  return new Intl.NumberFormat(defaultLocale, {
    style: "currency",
    currency: defaultCurrency,
    currencyDisplay: "code",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number | bigint, fractionDigits = 2): string {
  return new Intl.NumberFormat(defaultLocale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

// Presentation only. Exact calculator arithmetic/rounding belongs to Phase 3.
