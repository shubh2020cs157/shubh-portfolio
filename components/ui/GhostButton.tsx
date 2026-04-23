import { cn } from "@/lib/utils/cn";

interface GhostButtonProps {
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

export function GhostButton({
  children,
  href,
  onClick,
  className,
  type = "button",
  disabled,
  size = "md",
  target,
  rel,
}: GhostButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg",
    "glass ghost-border",
    "transition-all duration-200 ease-out",
    "hover:scale-[1.02] active:scale-[0.98]",
    "hover:bg-[color-mix(in_oklab,var(--color-primary-container)_8%,transparent)]",
    "hover:border-[color-mix(in_oklab,var(--color-primary-container)_30%,transparent)]",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-primary-container)] focus-visible:outline-offset-2",
    disabled && "opacity-50 pointer-events-none",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-3 text-sm",
    size === "lg" && "px-8 py-4 text-base",
    className
  );

  const content = (
    <span style={{ color: "var(--color-primary)" }}>{children}</span>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {content}
    </button>
  );
}
