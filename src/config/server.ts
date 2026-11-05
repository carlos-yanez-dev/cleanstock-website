import "server-only";
import { serverEnvironmentSchema } from "./environment-schema";

export function getServerEnvironment() {
  const result = serverEnvironmentSchema.safeParse({
    REGISTRATION_PROVIDER: process.env.REGISTRATION_PROVIDER,
    DATABASE_URL: process.env.DATABASE_URL,
    RATE_LIMIT_SECRET: process.env.RATE_LIMIT_SECRET,
  });
  if (!result.success) {
    const fields = [...new Set(result.error.issues.map((issue) => issue.path.join(".")))];
    throw new Error("Invalid server environment: " + fields.join(", "));
  }
  return result.data;
}
