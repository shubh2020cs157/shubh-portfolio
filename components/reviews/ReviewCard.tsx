import { Quote, ExternalLink, Star } from "lucide-react";
import type { Review } from "@/lib/content/reviews";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function Stars({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${value} out of 5 stars`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          strokeWidth={1.5}
          fill={n <= value ? "#fbbf24" : "transparent"}
          style={{
            color:
              n <= value
                ? "#fbbf24"
                : "color-mix(in oklab, var(--color-outline) 50%, transparent)",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article
      className="h-full flex flex-col rounded-xl p-6 ghost-border"
      style={{ backgroundColor: "var(--color-surface-container)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <Quote
          size={22}
          aria-hidden="true"
          style={{
            color: "color-mix(in oklab, var(--color-primary-container) 50%, transparent)",
          }}
        />
        {review.rating > 0 && <Stars value={review.rating} />}
      </div>

      <p
        className="text-sm leading-relaxed mb-6 flex-1 whitespace-pre-wrap"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {review.message}
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold"
          style={{
            backgroundColor:
              "color-mix(in oklab, var(--color-primary-container) 15%, var(--color-surface-high))",
            color: "var(--color-primary-container)",
            border:
              "1px solid color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
          }}
          aria-hidden="true"
        >
          {initials(review.name)}
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-semibold leading-tight truncate"
            style={{ color: "var(--color-on-surface)" }}
          >
            {review.name}
          </p>
          <p
            className="text-xs truncate"
            style={{ color: "var(--color-outline)" }}
          >
            {review.role}
            {review.company ? ` · ${review.company}` : ""}
          </p>
        </div>
        {review.linkedin && (
          <a
            href={review.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors hover:text-primary-container"
            style={{ color: "var(--color-outline)" }}
            aria-label={`${review.name} on LinkedIn`}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
