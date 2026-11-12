import * as React from "react";
import { cn } from "@/lib/utils";

const base = "w-full rounded-md border border-border bg-white px-3 text-sm text-charcoal placeholder:text-neutral-400 disabled:opacity-60 aria-[invalid=true]:border-red-600";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...p }, ref) => <input ref={ref} className={cn(base, "h-10", className)} {...p} />);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...p }, ref) => <textarea ref={ref} className={cn(base, "min-h-24 py-2", className)} {...p} />);
Textarea.displayName = "Textarea";

export const NativeSelect = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...p }, ref) => <select ref={ref} className={cn(base, "h-10", className)} {...p} />);
NativeSelect.displayName = "NativeSelect";

/** Label + control + inline error, wired for screen readers. */
export function Field({ label, error, hint, htmlFor, children, className }: {
  label: string; error?: string; hint?: string; htmlFor: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-charcoal">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p role="alert" className="text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}
