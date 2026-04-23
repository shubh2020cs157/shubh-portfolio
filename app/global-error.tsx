"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          backgroundColor: "#0f1419",
          color: "#e6edf3",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          margin: 0,
        }}
      >
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#f87171",
              marginBottom: 12,
            }}
          >
            fatal error
          </p>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: 700,
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Something went seriously wrong.
          </h1>
          <p style={{ color: "#9ca3af", marginBottom: 24, lineHeight: 1.6 }}>
            The app hit an unrecoverable error. Try reloading.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.75rem 1.25rem",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              border: "1px solid rgba(0, 229, 255, 0.3)",
              backgroundColor: "rgba(0, 229, 255, 0.12)",
              color: "#00e5ff",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
          {error.digest && (
            <p
              style={{
                marginTop: 24,
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                color: "#6b7280",
              }}
            >
              ref: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
