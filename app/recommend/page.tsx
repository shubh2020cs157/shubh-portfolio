import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { RecommendForm } from "@/components/recommend/RecommendForm";

export const metadata: Metadata = {
  title: "Recommend Shubh",
  description:
    "Share how you've worked with Shubh Kamal Sharma. Approved recommendations appear on the portfolio.",
};

export default function RecommendPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen px-6 py-16 sm:py-24"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors hover:text-primary-container"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          <ArrowLeft size={14} />
          Back to Portfolio
        </Link>

        <h1
          className="font-bold mb-3"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "var(--color-on-surface)",
            lineHeight: 1.15,
          }}
        >
          Recommend{" "}
          <span style={{ color: "var(--color-primary-container)" }}>
            Shubh Kamal Sharma
          </span>
        </h1>
        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Your recommendation will be displayed publicly on my portfolio once
          approved. Takes less than 2 minutes.
        </p>

        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: "var(--color-surface-container)",
            border:
              "1px solid color-mix(in oklab, var(--color-outline-variant) 25%, transparent)",
          }}
        >
          <RecommendForm />
        </div>

        <p
          className="text-xs text-center mt-6 leading-relaxed"
          style={{ color: "var(--color-outline)" }}
        >
          By submitting, you agree that your name, role, and recommendation will
          be displayed publicly on this portfolio once approved.
        </p>
      </div>
    </main>
  );
}
