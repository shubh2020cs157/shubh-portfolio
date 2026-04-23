import { cn } from "@/lib/utils/cn";

interface StatusBadgeProps {
  label: string;
  status?: "online" | "active" | "deployed" | "neutral";
  className?: string;
  mono?: boolean;
}

export function StatusBadge({
  label,
  status = "online",
  className,
  mono = true,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md",
        "ghost-border",
        "bg-[color-mix(in_oklab,var(--color-surface-highest)_60%,transparent)]",
        mono && "font-mono text-xs tracking-[0.15em] uppercase",
        !mono && "text-sm",
        className
      )}
      style={{ color: "var(--color-on-surface-variant)" }}
    >
      {/* Pulsing dot */}
      <span
        className="animate-pulse-dot shrink-0 w-2 h-2 rounded-full"
        style={{
          backgroundColor:
            status === "online" || status === "active" || status === "deployed"
              ? "var(--color-primary-container)"
              : "var(--color-outline)",
        }}
      />
      <span style={{ color: status !== "neutral" ? "var(--color-primary)" : undefined }}>
        {label}
      </span>
    </span>
  );
}
