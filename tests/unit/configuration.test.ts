import { describe, expect, it } from "vitest";
import { parsePublicEnvironment } from "@/config/public";
import { serverEnvironmentSchema } from "@/config/environment-schema";
import { pageIds, routes, toolIds } from "@/config/identifiers";
import { formatCurrency, formatNumber } from "@/lib/formatting";

describe("environment boundaries", () => {
  it("starts locally without credentials and keeps registrations disabled", () => {
    expect(parsePublicEnvironment({}).NEXT_PUBLIC_DEPLOYMENT_ENV).toBe("development");
    expect(serverEnvironmentSchema.parse({})).toEqual({ REGISTRATION_PROVIDER: "disabled" });
    expect(serverEnvironmentSchema.parse({ DATABASE_URL: "", RATE_LIMIT_SECRET: "" }).DATABASE_URL).toBeUndefined();
  });

  it("requires an explicit HTTPS origin for a production deployment", () => {
    expect(() => parsePublicEnvironment({ NEXT_PUBLIC_DEPLOYMENT_ENV: "production" })).toThrow("NEXT_PUBLIC_SITE_URL");
    expect(() => parsePublicEnvironment({ NEXT_PUBLIC_DEPLOYMENT_ENV: "production", NEXT_PUBLIC_SITE_URL: "http://example.test" })).toThrow();
    expect(parsePublicEnvironment({ NEXT_PUBLIC_DEPLOYMENT_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://example.test" }).NEXT_PUBLIC_SITE_URL).toBe("https://example.test");
  });

  it.each(["https://example.test/path", "https://user:password@example.test", "https://example.test?token=secret", "ftp://example.test"])("rejects non-origin configuration %s", (url) => {
    expect(() => parsePublicEnvironment({ NEXT_PUBLIC_SITE_URL: url })).toThrow();
  });

  it("does not expose input values in errors or return private keys in public config", () => {
    const secret = "private-value-not-for-errors";
    expect(() => parsePublicEnvironment({ NEXT_PUBLIC_SITE_URL: secret })).toThrow("Invalid public environment: NEXT_PUBLIC_SITE_URL");
    try { parsePublicEnvironment({ NEXT_PUBLIC_SITE_URL: secret }); } catch (error) {
      expect(String(error)).not.toContain(secret);
    }
    expect(parsePublicEnvironment({ DATABASE_URL: secret })).not.toHaveProperty("DATABASE_URL");
    expect(serverEnvironmentSchema.safeParse({ REGISTRATION_PROVIDER: "test" }).success).toBe(false);
    expect(serverEnvironmentSchema.safeParse({ RATE_LIMIT_SECRET: "short" }).success).toBe(false);
  });
});

describe("public identifiers and formatting", () => {
  it("gives each page a unique route and every tool a stable page identifier", () => {
    expect(Object.keys(routes)).toHaveLength(pageIds.length);
    expect(new Set(Object.values(routes)).size).toBe(pageIds.length);
    for (const tool of toolIds) expect(pageIds).toContain(tool);
  });

  it("formats USD and numeric presentation using US English", () => {
    expect(formatCurrency(1234.5).replaceAll("\u00a0", " ")).toBe("USD 1,234.50");
    expect(formatNumber(0.208, 4)).toBe("0.2080");
  });
});
