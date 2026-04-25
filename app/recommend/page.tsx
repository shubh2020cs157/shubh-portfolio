import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, ShieldCheck, Eye } from "lucide-react";
import { auth } from "@/auth";
import { RecommendForm } from "@/components/recommend/RecommendForm";

export const metadata: Metadata = {
  title: "Recommend Shubh",
  description:
    "Share how you've worked with Shubh Kamal Sharma. Approved recommendations appear on the portfolio.",
};

const INFO_POINTS = [
  {
    icon: Clock,
    title: "Takes less than 2 minutes",
    body: "Fill in your name, role, and a short note about working with Shubh.",
  },
  {
    icon: ShieldCheck,
    title: "Reviewed before publishing",
    body: "Every recommendation is personally reviewed before appearing publicly.",
  },
  {
    icon: Eye,
    title: "What gets displayed",
    body: "Your name, role, company, rating, and recommendation text — nothing else.",
  },
];

export default async function RecommendPage() {
  const session = await auth();
  const googleUser = session?.user
    ? {
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        image: session.user.image ?? null,
      }
    : null;

  return (
    <main
      id="main-content"
      className="min-h-screen grid-bg-lg"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pb-24">
        {/* Back link */}
        <Link
          href="/#reviews"
          className="inline-flex items-center gap-2 text-sm font-medium mb-8 sm:mb-10 transition-colors hover:text-primary-container"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>

        {/* Two-column layout */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 xl:gap-20 lg:items-start">
          {/* Left — context panel */}
          <div className="lg:sticky lg:top-24">
            <p
              className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--color-primary-container)" }}
            >
              RECOMMEND
            </p>

            <h1
              className="font-bold leading-tight mb-4"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "var(--color-on-surface)",
                lineHeight: 1.15,
              }}
            >
              Say something about{" "}
              <span style={{ color: "var(--color-primary-container)" }}>
                Shubh Kamal Sharma
              </span>
            </h1>

            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              If you&apos;ve worked with Shubh — as a colleague, manager, or collaborator
              — your recommendation helps others understand what it&apos;s like to work with him.
            </p>

            {/* Info points */}
            <div className="space-y-5">
              {INFO_POINTS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: "color-mix(in oklab, var(--color-primary-container) 10%, transparent)",
                      border: "1px solid color-mix(in oklab, var(--color-primary-container) 20%, transparent)",
                    }}
                  >
                    <Icon
                      size={16}
                      style={{ color: "var(--color-primary-container)" }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold leading-snug mb-0.5"
                      style={{ color: "var(--color-on-surface)" }}
                    >
                      {title}
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-on-surface-variant)" }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                backgroundColor: "var(--color-surface-container)",
                border: "1px solid color-mix(in oklab, var(--color-outline-variant) 25%, transparent)",
              }}
            >
              <RecommendForm googleUser={googleUser} />
            </div>

            <p
              className="text-xs text-center mt-5 leading-relaxed"
              style={{ color: "var(--color-outline)" }}
            >
              By submitting, you agree that your name, role, and recommendation will
              be displayed publicly on this portfolio once approved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
