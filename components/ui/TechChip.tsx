import { cn } from "@/lib/utils/cn";
import { renderTechIcon } from "@/lib/techIcons";

interface TechChipProps {
  label: string;
  variant?: "default" | "primary" | "secondary" | "mono";
  className?: string;
  flicker?: boolean;
}

export function TechChip({
  label,
  variant = "default",
  className,
  flicker = false,
}: TechChipProps) {
  const icon = renderTechIcon(label, { size: 11 });

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide",
        "border transition-colors duration-200",
        variant === "default" && [
          "bg-[var(--color-surface-high)]",
          "border-[color-mix(in_oklab,var(--color-outline-variant)_30%,transparent)]",
          "text-[var(--color-on-surface-variant)]",
          "hover:border-[color-mix(in_oklab,var(--color-outline-variant)_60%,transparent)]",
          "hover:text-[var(--color-on-surface)]",
        ],
        variant === "primary" && [
          "bg-[color-mix(in_oklab,var(--color-primary-container)_12%,transparent)]",
          "border-[color-mix(in_oklab,var(--color-primary-container)_25%,transparent)]",
          "text-[var(--color-primary-container)]",
        ],
        variant === "secondary" && [
          "bg-[color-mix(in_oklab,var(--color-secondary)_12%,transparent)]",
          "border-[color-mix(in_oklab,var(--color-secondary)_25%,transparent)]",
          "text-[var(--color-secondary)]",
        ],
        variant === "mono" && [
          "bg-transparent",
          "border-[color-mix(in_oklab,var(--color-outline-variant)_20%,transparent)]",
          "text-[var(--color-on-surface-variant)]",
          "font-mono text-[10px] tracking-[0.15em] uppercase",
        ],
        flicker && "hover:animate-flicker",
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}
