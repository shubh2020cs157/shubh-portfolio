"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (v: number) => void;
  size?: number;
  "aria-invalid"?: boolean;
}

export function StarRating({ value, onChange, size = 28 }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= active;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-container)] rounded"
          >
            <Star
              size={size}
              strokeWidth={1.5}
              fill={filled ? "#fbbf24" : "transparent"}
              style={{
                color: filled
                  ? "#fbbf24"
                  : "color-mix(in oklab, var(--color-outline) 70%, transparent)",
              }}
            />
          </button>
        );
      })}
      {value > 0 && (
        <span
          className="ml-2 text-sm font-medium"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          {value}/5
        </span>
      )}
    </div>
  );
}
