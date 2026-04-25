import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { listApprovedReviews, isRedisConfigured } from "@/lib/redis";
import type { Review } from "@/lib/content/reviews";


function AggregateStars({ avg }: { avg: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={15}
          strokeWidth={1.5}
          fill={n <= Math.round(avg) ? "#fbbf24" : "transparent"}
          style={{ color: n <= Math.round(avg) ? "#fbbf24" : "color-mix(in oklab, var(--color-outline) 40%, transparent)" }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export async function ReviewsSection() {
  let reviews: Review[] = [];

  if (isRedisConfigured()) {
    try {
      reviews = await listApprovedReviews(12);
    } catch (err) {
      console.error("[ReviewsSection] Failed to load reviews:", err);
    }
  }

  const displayReviews = reviews;

  const avg =
    displayReviews.length > 0
      ? displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length
      : 0;
  const avgFormatted = avg.toFixed(1);

  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-32 section-divider"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between mb-14">
          {/* Left: label + title + subtitle */}
          <div className="max-w-xl">
            <p
              className="font-mono text-xs tracking-[0.25em] uppercase mb-3"
              style={{ color: "var(--color-primary-container)" }}
            >
              RECOMMENDATIONS
            </p>
            <h2
              className="font-bold leading-tight mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "var(--color-on-surface)",
              }}
            >
              What people{" "}
              <span style={{ color: "var(--color-primary-container)" }}>say about me</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
              Verified recommendations from colleagues, managers, and collaborators I&apos;ve worked with.
            </p>
          </div>

          {/* Right: aggregate + CTA */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-5 md:gap-3 shrink-0 flex-wrap">
            {displayReviews.length > 0 && (
              <div className="text-center md:text-right">
                <p
                  className="font-bold leading-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    color: "var(--color-on-surface)",
                  }}
                >
                  {avgFormatted}
                </p>
                <AggregateStars avg={avg} />
                <p className="text-xs mt-1" style={{ color: "var(--color-outline)" }}>
                  ({displayReviews.length} {displayReviews.length === 1 ? "review" : "reviews"})
                </p>
              </div>
            )}

            <Link
              href="/recommend"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] whitespace-nowrap"
              style={{
                backgroundColor: "color-mix(in oklab, var(--color-primary-container) 10%, transparent)",
                color: "var(--color-primary-container)",
                border: "1px solid color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
              }}
            >
              Recommend Me
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Cards grid */}
        {displayReviews.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayReviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
