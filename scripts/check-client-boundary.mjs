import { mkdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const fixture = path.join(root, ".local-tools", "client-boundary");
await mkdir(path.join(fixture, "app"), { recursive: true });
await writeFile(path.join(fixture, "package.json"), JSON.stringify({ name: "client-boundary-fixture", private: true, type: "module" }));
await writeFile(path.join(fixture, "tsconfig.json"), JSON.stringify({ extends: "../../tsconfig.json", include: ["app/**/*.tsx", ".next/types/**/*.ts"], exclude: ["node_modules"] }));
await writeFile(path.join(fixture, "next.config.mjs"), "export default {};\n");
await writeFile(path.join(fixture, "app/layout.tsx"), 'export default function Layout({ children }: { children: React.ReactNode }) { return <html><body>{children}</body></html>; }\n');
await writeFile(path.join(fixture, "app/page.tsx"), '"use client";\nimport { getServerEnvironment } from "../../../src/config/server";\nexport default function InvalidClient() { return <p>{getServerEnvironment().REGISTRATION_PROVIDER}</p>; }\n');

const result = spawnSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build", fixture, "--webpack"], {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  timeout: 120_000,
});
const output = (result.stdout ?? "") + (result.stderr ?? "");
if (result.error || result.status === 0 || !/server-only/i.test(output) || !/Server Components|Client Component|client component|use client/.test(output)) {
  console.error(output);
  throw new Error("Expected Next.js to reject server configuration in a client component.");
}
console.log("PASS: Next.js rejected a client import of server configuration.");
