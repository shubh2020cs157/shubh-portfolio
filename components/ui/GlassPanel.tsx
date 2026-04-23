import { cn } from "@/lib/utils/cn";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "light" | "dark";
  as?: React.ElementType;
}

export function GlassPanel({
  children,
  className,
  variant = "default",
  as: Tag = "div",
}: GlassPanelProps) {
  return (
    <Tag
      className={cn(
        "rounded-lg ghost-border",
        variant === "default" && "glass",
        variant === "light" && "glass-light",
        variant === "dark" &&
          "bg-[var(--color-surface-lowest)] border border-[color-mix(in_oklab,var(--color-outline-variant)_20%,transparent)]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
