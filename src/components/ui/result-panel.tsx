import type { ReactNode } from "react";

type Result = { label: string; value: ReactNode; note?: string };

export function ResultPanel({ id, title, description, results }: { id: string; title: string; description: string; results: readonly Result[] }) {
  return (
    <section aria-labelledby={id} className="result-panel">
      <p className="eyebrow">Result component</p>
      <h2 id={id} className="mt-3 text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <dl className="mt-8 space-y-6" aria-live="polite" aria-atomic="true">
        {results.map(({ label, value, note }) => (
          <div key={label}>
            <dt className="text-sm font-medium text-muted">{label}</dt>
            <dd className="mt-1 break-words text-3xl font-semibold tracking-tight tabular-nums">{value}</dd>
            {note && <dd className="mt-1 text-sm text-muted">{note}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}
