"use client";

import { cn } from "@/lib/utils/cn";

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  target?: string;
  rel?: string;
}

export function GradientButton({
  children,
  href,
  onClick,
  className,
  type = "button",
  disabled,
  size = "md",
  target,
  rel,
}: GradientButtonProps) {
  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 font-semibold rounded-lg overflow-hidden",
    "transition-all duration-200 ease-out",
    "hover:scale-[1.02] active:scale-[0.98]",
    "cyan-glow cyan-glow-hover",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-primary-container)] focus-visible:outline-offset-2",
    disabled && "opacity-50 pointer-events-none",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-3 text-sm",
    size === "lg" && "px-8 py-4 text-base",
    className
  );

  const gradientInner = (
    <>
      {/* Gradient fill */}
      <span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary-dim) 0%, var(--color-primary-container) 50%, var(--color-secondary) 100%)",
        }}
      />
      {/* Slide overlay on hover */}
      <span
        className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"
        style={{
          background:
            "linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary-container) 100%)",
        }}
      />
      <span
        className="relative z-10 flex items-center gap-2 whitespace-nowrap"
        style={{ color: "var(--color-on-primary, #00363d)" }}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn("group", baseClasses)} target={target} rel={rel}>
        {gradientInner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("group", baseClasses)}
    >
      {gradientInner}
    </button>
  );
}
