import type { ComponentProps, ReactNode } from "react";
import { FieldError } from "./field-error";

type SelectFieldProps = Omit<ComponentProps<"select">, "id"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function SelectField({ id, label, hint, error, children, className = "", "aria-describedby": describedBy, ...props }: SelectFieldProps) {
  const description = [describedBy, hint ? id + "-hint" : undefined, error ? id + "-error" : undefined].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">{label}</label>
      {hint && <p id={id + "-hint"} className="field-hint">{hint}</p>}
      <select {...props} id={id} aria-describedby={description} aria-invalid={error ? true : props["aria-invalid"]} className={`input ${className}`}>{children}</select>
      <FieldError id={id + "-error"} message={error} />
    </div>
  );
}
