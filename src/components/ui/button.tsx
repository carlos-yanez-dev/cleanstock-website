import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
  pendingLabel?: string;
};

export function Button({ children, className = "", variant = "primary", loading = false, pendingLabel = "Working…", disabled, type = "button", ...props }: ButtonProps) {
  return (
    <button {...props} type={type} className={`button button--${variant} ${className}`} disabled={disabled || loading} aria-busy={loading || undefined}>
      {loading ? pendingLabel : children}
    </button>
  );
}
