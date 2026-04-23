import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/auth/admin";
import { listPendingReviews, listApprovedReviews, isRedisConfigured } from "@/lib/redis";
import { AdminReviewList } from "@/components/admin/AdminReviewList";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  if (!(await isAuthenticatedAdmin())) {
    redirect("/admin/login");
  }

  if (!isRedisConfigured()) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-2xl font-bold mb-3"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-on-surface)",
            }}
          >
            Reviews
          </h1>
          <p
            className="text-sm"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            Upstash Redis is not configured. Set
            <code className="mx-1 font-mono">UPSTASH_REDIS_REST_URL</code>
            and
            <code className="mx-1 font-mono">UPSTASH_REDIS_REST_TOKEN</code>
            to load reviews.
          </p>
        </div>
      </main>
    );
  }

  const [pending, approved] = await Promise.all([
    listPendingReviews(),
    listApprovedReviews(100),
  ]);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
          <div>
            <h1
              className="text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-on-surface)",
              }}
            >
              Reviews moderation
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Approve or reject incoming recommendations.
            </p>
          </div>
          <AdminSignOutButton />
        </div>

        <AdminReviewList pending={pending} approved={approved} />
      </div>
    </main>
  );
}
