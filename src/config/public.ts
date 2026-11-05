import { publicEnvironmentSchema } from "./environment-schema";

export function parsePublicEnvironment(input: Record<string, unknown>) {
  const result = publicEnvironmentSchema.safeParse(input);
  if (!result.success) {
    const fields = [...new Set(result.error.issues.map((issue) => issue.path.join(".")))];
    throw new Error("Invalid public environment: " + fields.join(", "));
  }
  return result.data;
}

// Explicit references allow Next.js to inline only the intended public variables.
export const publicEnvironment = parsePublicEnvironment({
  NEXT_PUBLIC_DEPLOYMENT_ENV: process.env.NEXT_PUBLIC_DEPLOYMENT_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
