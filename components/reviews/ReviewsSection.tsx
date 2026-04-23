import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { listApprovedReviews, isRedisConfigured } from "@/lib/redis";

export async function ReviewsSection() {
  let reviews: Awaited<ReturnType<typeof listApprovedReviews>> = [];

  if (isRedisConfigured()) {
    try {
      reviews = await listApprovedReviews(12);
    } catch (err) {
      console.error("[ReviewsSection] Failed to load reviews:", err);
    }
  }

  return (
    <section
      id="reviews"
      className="relative py-24 sm:py-32 section-divider"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="REVIEWS"
          title="Kind words from collaborators"
          accentWord="collaborators"
          subtitle="Short recommendations from people I've shipped alongside."
          align="center"
          className="mx-auto"
        />

        {reviews.length > 0 && (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}

        <div className={reviews.length > 0 ? "mt-12 flex justify-center" : "mt-10 flex justify-center"}>
          <Link
            href="/recommend"
            className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--color-primary-container) 10%, transparent)",
              color: "var(--color-primary-container)",
              border:
                "1px solid color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
            }}
          >
            Recommend Me
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
