import { Building2, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { TechChip } from "@/components/ui/TechChip";
import type { ExperienceEntry } from "@/lib/content/experience";

interface TimelineEntryProps {
  entry: ExperienceEntry;
  isLast?: boolean;
}

export function TimelineEntry({ entry, isLast }: TimelineEntryProps) {
  return (
    <div className="relative flex gap-6 pb-12">
      {/* Vertical connector line */}
      {!isLast && (
        <div
          className="absolute left-5 top-10 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--color-primary-container) 40%, transparent), color-mix(in oklab, var(--color-outline-variant) 30%, transparent), transparent)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Circle node */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: "var(--color-surface-high)",
            border: "2px solid var(--color-primary-container)",
            boxShadow: "0 0 16px color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
          }}
        >
          {entry.id === "microsoft" ? (
            <Building2
              size={16}
              style={{ color: "var(--color-primary-container)" }}
            />
          ) : (
            <Briefcase
              size={16}
              style={{ color: "var(--color-primary-container)" }}
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Date badge */}
        <p
          className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2"
          style={{ color: "var(--color-outline)" }}
        >
          {entry.startDate} — {entry.endDate}
        </p>

        {/* Role + company */}
        <div className="mb-1 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3
              className="text-lg font-semibold leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-on-surface)",
              }}
            >
              {entry.role}
            </h3>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-primary)" }}
            >
              {entry.company}
              {entry.type && (
                <span
                  className="ml-2 font-mono text-[10px] tracking-[0.1em] uppercase"
                  style={{ color: "var(--color-outline)" }}
                >
                  · {entry.type}
                </span>
              )}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--color-outline)" }}
            >
              {entry.location}
            </p>
          </div>
          {entry.isCurrent && (
            <span
              className="shrink-0 font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-md"
              style={{
                color: "var(--color-primary-container)",
                backgroundColor:
                  "color-mix(in oklab, var(--color-primary-container) 10%, transparent)",
                border:
                  "1px solid color-mix(in oklab, var(--color-primary-container) 25%, transparent)",
              }}
            >
              Current
            </span>
          )}
        </div>

        {/* Highlights */}
        <ul
          className={cn(
            "mt-3 space-y-2.5 rounded-lg p-4",
            "bg-[var(--color-surface-container)]"
          )}
          style={{
            border: "1px solid color-mix(in oklab, var(--color-primary-container) 20%, transparent)",
          }}
        >
          {entry.highlights.map((hl, i) => (
            <li
              key={i}
              className="text-sm leading-relaxed flex gap-2.5"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              <span
                className="mt-[5px] shrink-0 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--color-primary-container) 35%, transparent)",
                  border: "1.5px solid var(--color-primary-container)",
                  boxShadow: "0 0 6px color-mix(in oklab, var(--color-primary-container) 40%, transparent)",
                }}
                aria-hidden="true"
              />
              {hl}
            </li>
          ))}
        </ul>

        {/* Tech chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.techStack.map((t) => (
            <TechChip key={t} label={t} flicker />
          ))}
        </div>
      </div>
    </div>
  );
}
