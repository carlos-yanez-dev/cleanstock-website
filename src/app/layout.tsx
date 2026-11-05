import type { Metadata } from "next";
import type { ReactNode } from "react";
import { publicEnvironment } from "@/config/public";
import { getServerEnvironment } from "@/config/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "CleanStock | Foundation preview",
  description: "Development preview of the CleanStock website foundation.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  getServerEnvironment();
  return <html lang="en-US" data-environment={publicEnvironment.NEXT_PUBLIC_DEPLOYMENT_ENV}><body>{children}</body></html>;
}
