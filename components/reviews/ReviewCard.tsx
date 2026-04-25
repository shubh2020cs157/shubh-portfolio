"use client";

import { useState } from "react";
import { ExternalLink, Star, ShieldCheck } from "lucide-react";
import type { Review } from "@/lib/content/reviews";

const TRUNCATE_AT = 200;

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={13}
          strokeWidth={1.5}
          fill={n <= value ? "#fbbf24" : "transparent"}
          style={{ color: n <= value ? "#fbbf24" : "color-mix(in oklab, var(--color-outline) 40%, transparent)" }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.message.length > TRUNCATE_AT;
  const displayText =
    expanded || !isLong ? review.message : review.message.slice(0, TRUNCATE_AT).trimEnd() + "…";

  return (
    <article
      className="flex flex-col rounded-xl p-5 ghost-border"
      style={{ backgroundColor: "var(--color-surface-container)", minHeight: "260px" }}
    >
      {/* Author row */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-primary-container) 15%, var(--color-surface-high))",
            color: "var(--color-primary-container)",
            border: "1px solid color-mix(in oklab, var(--color-primary-container) 25%, transparent)",
          }}
          aria-hidden="true"
        >
          {initials(review.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-sm font-semibold leading-tight"
              style={{ color: "var(--color-on-surface)" }}
            >
              {review.name}
            </span>
            {review.googleVerified && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: "color-mix(in oklab, var(--color-primary-container) 10%, transparent)",
                  color: "var(--color-primary-container)",
                  border: "1px solid color-mix(in oklab, var(--color-primary-container) 20%, transparent)",
                }}
              >
                <ShieldCheck size={10} strokeWidth={2} aria-hidden="true" />
                Verified
              </span>
            )}
          </div>

          <p className="text-xs leading-snug mt-0.5" style={{ color: "var(--color-outline)" }}>
            {review.role}
            {review.company ? ` at ${review.company}` : ""}
          </p>

          {review.relationship && (
            <p className="text-[11px] mt-0.5" style={{ color: "color-mix(in oklab, var(--color-outline) 70%, transparent)" }}>
              {review.relationship}
            </p>
          )}
        </div>

        {review.linkedin && (
          <a
            href={review.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--color-outline)" }}
            aria-label={`${review.name} on LinkedIn`}
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* Stars */}
      {review.rating > 0 && (
        <div className="mb-3">
          <Stars value={review.rating} />
        </div>
      )}

      {/* Message */}
      <div className="flex-1">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          &ldquo;{displayText}&rdquo;
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="mt-1.5 text-xs font-medium transition-colors"
            style={{ color: "var(--color-primary-container)" }}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: "1px solid color-mix(in oklab, var(--color-outline-variant) 20%, transparent)" }}
      >
        <span className="text-[11px] font-mono" style={{ color: "color-mix(in oklab, var(--color-outline) 60%, transparent)" }}>
          {formatDate(review.approvedAt ?? review.createdAt)}
        </span>
      </div>
    </article>
  );
}
