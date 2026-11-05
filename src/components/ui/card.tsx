import type { ReactNode } from "react";

type CardProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ id, title, description, children, className = "" }: CardProps) {
  return (
    <section aria-labelledby={id} className={`card ${className}`}>
      <div className="card-heading">
        <h2 id={id} className="text-xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-muted">{description}</p>}
      </div>
      {children}
    </section>
  );
}
