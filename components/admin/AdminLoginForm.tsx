"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/reviews";

  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        router.push(next);
        router.refresh();
      } else {
        setError("Invalid token.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="token"
          className="block text-sm font-medium"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Admin token
        </label>
        <input
          id="token"
          type="password"
          autoComplete="current-password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
          className="w-full rounded-lg px-4 py-3 text-sm outline-none border bg-[var(--color-surface-high)] border-[color-mix(in_oklab,var(--color-outline-variant)_40%,transparent)] focus:border-[var(--color-primary-container)] focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary-container)_15%,transparent)]"
          style={{ color: "var(--color-on-surface)" }}
        />
      </div>

      {error && (
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-error) 8%, transparent)",
            border: "1px solid color-mix(in oklab, var(--color-error) 20%, transparent)",
            color: "var(--color-error)",
          }}
          role="alert"
        >
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <GradientButton type="submit" disabled={submitting} size="lg" className="w-full">
        {submitting ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </GradientButton>
    </form>
  );
}
