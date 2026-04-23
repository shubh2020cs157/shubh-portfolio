"use client";

import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  multiline?: boolean;
  rows?: number;
  error?: string;
}

export const FloatingLabelInput = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FloatingLabelInputProps
>(function FloatingLabelInput(
  { label, id, multiline = false, rows = 4, error, className, ...props },
  ref
) {
  const [focused, setFocused] = useState(false);
  const hasValue =
    props.value !== undefined
      ? String(props.value).length > 0
      : (props.defaultValue as string)?.length > 0;
  const isFloated = focused || hasValue;

  const inputClasses = cn(
    "w-full bg-transparent pt-5 pb-2 px-0",
    "border-0 border-b-2 outline-none ring-0",
    "text-sm transition-colors duration-200",
    "placeholder-transparent",
    focused
      ? "border-[var(--color-primary-container)]"
      : error
      ? "border-[var(--color-error)]"
      : "border-[color-mix(in_oklab,var(--color-outline-variant)_50%,transparent)]",
    "focus:border-[var(--color-primary-container)]",
    className
  );

  return (
    <div className="relative">
      {/* Gradient left-accent bar */}
      <span
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-opacity duration-200 gradient-bar"
        style={{ opacity: focused ? 1 : 0 }}
      />

      <div className="pl-3">
        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            rows={rows}
            className={cn(inputClasses, "resize-none")}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={label}
            style={{ color: "var(--color-on-surface)" }}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            className={inputClasses}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={label}
            style={{ color: "var(--color-on-surface)" }}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3 pointer-events-none transition-all duration-200 font-mono",
            isFloated
              ? "top-0 text-[10px] tracking-[0.2em] uppercase"
              : "top-4 text-sm tracking-normal normal-case"
          )}
          style={{
            color: focused
              ? "var(--color-primary-container)"
              : error
              ? "var(--color-error)"
              : "var(--color-outline)",
          }}
        >
          {label}
        </label>
      </div>

      {error && (
        <p
          className="mt-1 pl-3 font-mono text-[10px] tracking-wide"
          style={{ color: "var(--color-error)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
});
