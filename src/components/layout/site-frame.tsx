import Link from "next/link";
import type { ReactNode } from "react";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="page-container flex min-h-20 flex-wrap items-center justify-between gap-3 py-4">
          <Link className="brand" href="/" aria-label="CleanStock foundation preview">
            <span className="brand-mark" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 8h14v11H5zM8 8V5h8v3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><path d="m9 13 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            CleanStock
          </Link>
          <span className="preview-badge">Foundation preview</span>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="page-container py-10 sm:py-14">{children}</main>
      <footer className="page-container border-t border-line py-6 text-sm leading-6 text-muted">CleanStock / Phase 1 review</footer>
    </>
  );
}
