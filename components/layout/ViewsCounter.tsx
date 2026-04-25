"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

function formatCount(n: number): string {
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}k`;
  return `${(n / 1_000_000).toFixed(1)}M`;
}

export function ViewsCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/views", { method: "POST", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { count?: number } | null) => {
        if (!cancelled) {
          const n = typeof data?.count === "number" ? data.count : 0;
          setCount(n);
        }
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null || count === 0) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono ghost-border"
      style={{ color: "var(--color-outline)" }}
      aria-label={`${count.toLocaleString()} total views`}
      title={`${count.toLocaleString()} total views`}
    >
      <Eye size={12} aria-hidden="true" />
      {formatCount(count)} views
    </span>
  );
}
