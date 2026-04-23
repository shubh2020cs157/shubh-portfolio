import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-md text-center">
        <p
          className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "var(--color-primary-container)" }}
        >
          404 · not found
        </p>
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            color: "var(--color-on-surface)",
            lineHeight: 1.15,
          }}
        >
          This page got lost in deployment.
        </h1>
        <p
          className="text-sm leading-relaxed mb-10"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          The link may be broken, or the page may have moved. Head back to the
          portfolio and pick up where you left off.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
          style={{
            backgroundColor:
              "color-mix(in oklab, var(--color-primary-container) 12%, transparent)",
            color: "var(--color-primary-container)",
            border:
              "1px solid color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
          }}
        >
          <ArrowLeft size={14} />
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
