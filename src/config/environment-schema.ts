import { z } from "zod";

const optionalValue = (value: unknown) => value === "" ? undefined : value;
const origin = z.url().refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash;
}, "Use an HTTP(S) origin without credentials, path, query, or fragment.");

export const publicEnvironmentSchema = z.object({
  NEXT_PUBLIC_DEPLOYMENT_ENV: z.enum(["development", "preview", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.preprocess(optionalValue, origin.optional()),
}).superRefine((value, context) => {
  if (value.NEXT_PUBLIC_DEPLOYMENT_ENV === "production" && !value.NEXT_PUBLIC_SITE_URL?.startsWith("https://")) {
    context.addIssue({ code: "custom", path: ["NEXT_PUBLIC_SITE_URL"], message: "Production requires an HTTPS site origin." });
  }
});

export const serverEnvironmentSchema = z.object({
  REGISTRATION_PROVIDER: z.literal("disabled").default("disabled"),
  DATABASE_URL: z.preprocess(optionalValue, z.url().optional()),
  RATE_LIMIT_SECRET: z.preprocess(optionalValue, z.string().min(32).optional()),
});
