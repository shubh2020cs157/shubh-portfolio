import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  accentWord,
  subtitle,
  align = "left",
  className,
}: SectionHeaderProps) {
  // If accentWord is provided, split the title to highlight it
  const renderTitle = () => {
    if (!accentWord) return title;
    const idx = title.indexOf(accentWord);
    if (idx === -1) return title;
    return (
      <>
        {title.slice(0, idx)}
        <span style={{ color: "var(--color-primary-container)" }}>{accentWord}</span>
        {title.slice(idx + accentWord.length)}
      </>
    );
  };

  return (
    <div className={cn("space-y-4", align === "center" && "text-center", className)}>
      {/* Accent bar + optional label */}
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
        <span
          className="block h-px w-8 rounded-full"
          style={{ backgroundColor: "var(--color-primary-container)" }}
          aria-hidden="true"
        />
        {eyebrow && (
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--color-primary-container)" }}
          >
            {eyebrow}
          </span>
        )}
      </div>

      {/* Title */}
      <h2
        className="text-3xl sm:text-4xl font-bold leading-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-on-surface)",
        }}
      >
        {renderTitle()}
      </h2>

      {subtitle && (
        <p
          className="text-base leading-relaxed max-w-2xl"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
