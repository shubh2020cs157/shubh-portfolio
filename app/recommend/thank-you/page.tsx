import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Thanks for your recommendation",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteNavbar />
      <main id="main-content" className="pt-28 pb-20 px-6 min-h-[60vh] flex items-center">
        <div className="max-w-xl mx-auto text-center">
          <div
            className="inline-flex w-16 h-16 rounded-full items-center justify-center mb-6"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--color-primary-container) 12%, transparent)",
              border:
                "1px solid color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
            }}
          >
            <CheckCircle2
              size={28}
              style={{ color: "var(--color-primary-container)" }}
            />
          </div>

          <h1
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--color-on-surface)",
              lineHeight: 1.15,
            }}
          >
            Thanks — your recommendation is in review.
          </h1>

          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            I read every submission personally. Once approved, your recommendation
            will appear on the portfolio.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary-container"
            style={{ color: "var(--color-primary)" }}
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
