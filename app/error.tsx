"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="max-w-md text-center">
        <p
          className="font-mono text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: "var(--color-error)" }}
        >
          unexpected error
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
          Something broke on my end.
        </h1>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Try again in a moment. If it keeps happening, it&apos;s my fault —
          please head back to the portfolio.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--color-primary-container) 12%, transparent)",
              color: "var(--color-primary-container)",
              border:
                "1px solid color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
            }}
          >
            <RefreshCw size={14} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold ghost-border transition-all hover:scale-[1.02]"
            style={{ color: "var(--color-on-surface-variant)" }}
          >
            <ArrowLeft size={14} />
            Home
          </Link>
        </div>

        {error.digest && (
          <p
            className="mt-8 font-mono text-[10px] tracking-wider"
            style={{ color: "var(--color-outline)" }}
          >
            ref: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}
