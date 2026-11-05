import type { ComponentProps } from "react";
import { FieldError } from "./field-error";

type InputFieldProps = Omit<ComponentProps<"input">, "id"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
};

export function InputField({ id, label, hint, error, className = "", "aria-describedby": describedBy, ...props }: InputFieldProps) {
  const description = [describedBy, hint ? id + "-hint" : undefined, error ? id + "-error" : undefined].filter(Boolean).join(" ") || undefined;
  return (
    <div className="field">
      <label htmlFor={id} className="field-label">{label}</label>
      {hint && <p id={id + "-hint"} className="field-hint">{hint}</p>}
      <input {...props} id={id} aria-describedby={description} aria-invalid={error ? true : props["aria-invalid"]} className={`input ${className}`} />
      <FieldError id={id + "-error"} message={error} />
    </div>
  );
}
