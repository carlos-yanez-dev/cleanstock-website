import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  { rules: { "@typescript-eslint/no-explicit-any": "error" } },
  {
    files: ["src/components/**/*.{ts,tsx}", "src/features/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": ["error", { patterns: [
      { group: ["@/server/**", "@/config/server", "**/config/server", "**/server/**"], message: "Pass public data from a Server Component; never import server configuration into UI." },
    ] }] },
  },
  {
    files: ["src/lib/calculations/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": ["error", { patterns: [
      { group: ["react", "react/**", "next", "next/**", "@/server/**", "@/config/server"], message: "Calculation functions must remain independent of React, routes, and server configuration." },
    ] }] },
  },
  globalIgnores([".local-tools/**", ".next/**", "**/.next/**", "out/**", "coverage/**", "playwright-report/**", "test-results/**", "next-env.d.ts"]),
]);
