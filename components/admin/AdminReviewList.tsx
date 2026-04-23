"use client";

import { useState, useTransition } from "react";
import { Check, X, Loader2, ExternalLink, Star } from "lucide-react";
import type { Review } from "@/lib/content/reviews";
import { approveReview, rejectReview } from "@/app/actions/moderate-review";

interface Props {
  pending: Review[];
  approved: Review[];
}

function formatDate(ms: number): string {
  return new Date(ms).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function AdminReviewList({ pending, approved }: Props) {
  const [pendingList, setPendingList] = useState(pending);
  const [approvedList, setApprovedList] = useState(approved);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function onApprove(review: Review) {
    setBusyId(review.id);
    startTransition(async () => {
      const result = await approveReview(review.id);
      if (result.ok) {
        setPendingList((list) => list.filter((r) => r.id !== review.id));
        setApprovedList((list) => [
          { ...review, status: "approved", approvedAt: Date.now() },
          ...list,
        ]);
      }
      setBusyId(null);
    });
  }

  function onReject(id: string, from: "pending" | "approved") {
    if (!confirm("Delete this review permanently?")) return;
    setBusyId(id);
    startTransition(async () => {
      const result = await rejectReview(id);
      if (result.ok) {
        if (from === "pending") {
          setPendingList((list) => list.filter((r) => r.id !== id));
        } else {
          setApprovedList((list) => list.filter((r) => r.id !== id));
        }
      }
      setBusyId(null);
    });
  }

  return (
    <div className="space-y-12">
      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-on-surface)",
          }}
        >
          Pending ({pendingList.length})
        </h2>
        {pendingList.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-outline)" }}>
            No pending submissions.
          </p>
        ) : (
          <ul className="space-y-4">
            {pendingList.map((r) => (
              <ReviewRow
                key={r.id}
                review={r}
                busy={busyId === r.id}
                actions={
                  <>
                    <button
                      type="button"
                      onClick={() => onApprove(r)}
                      disabled={busyId === r.id}
                      className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, var(--color-primary-container) 14%, transparent)",
                        color: "var(--color-primary-container)",
                        border:
                          "1px solid color-mix(in oklab, var(--color-primary-container) 30%, transparent)",
                      }}
                    >
                      {busyId === r.id ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Check size={12} />
                      )}
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => onReject(r.id, "pending")}
                      disabled={busyId === r.id}
                      className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor:
                          "color-mix(in oklab, var(--color-error) 10%, transparent)",
                        color: "var(--color-error)",
                        border:
                          "1px solid color-mix(in oklab, var(--color-error) 30%, transparent)",
                      }}
                    >
                      <X size={12} />
                      Reject
                    </button>
                  </>
                }
              />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2
          className="text-xl font-semibold mb-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-on-surface)",
          }}
        >
          Approved ({approvedList.length})
        </h2>
        {approvedList.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-outline)" }}>
            No approved reviews yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {approvedList.map((r) => (
              <ReviewRow
                key={r.id}
                review={r}
                busy={busyId === r.id}
                actions={
                  <button
                    type="button"
                    onClick={() => onReject(r.id, "approved")}
                    disabled={busyId === r.id}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      backgroundColor:
                        "color-mix(in oklab, var(--color-error) 10%, transparent)",
                      color: "var(--color-error)",
                      border:
                        "1px solid color-mix(in oklab, var(--color-error) 30%, transparent)",
                    }}
                  >
                    <X size={12} />
                    Remove
                  </button>
                }
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ReviewRow({
  review,
  actions,
  busy,
}: {
  review: Review;
  actions: React.ReactNode;
  busy: boolean;
}) {
  return (
    <li
      className="rounded-lg p-5"
      style={{
        backgroundColor: "var(--color-surface-container)",
        border:
          "1px solid color-mix(in oklab, var(--color-outline-variant) 25%, transparent)",
        opacity: busy ? 0.6 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
        <div>
          <p
            className="font-semibold text-sm"
            style={{ color: "var(--color-on-surface)" }}
          >
            {review.name}
          </p>
          <p className="text-xs" style={{ color: "var(--color-outline)" }}>
            {review.role}
            {review.company ? ` · ${review.company}` : ""}
          </p>
          <p className="text-[11px] mt-1.5" style={{ color: "var(--color-outline)" }}>
            {review.relationship}
          </p>
          <div className="flex items-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={11}
                strokeWidth={1.5}
                fill={n <= review.rating ? "#fbbf24" : "transparent"}
                style={{ color: n <= review.rating ? "#fbbf24" : "var(--color-outline)" }}
              />
            ))}
            <span className="ml-1 text-[11px] font-mono" style={{ color: "var(--color-outline)" }}>
              {review.rating}/5
            </span>
          </div>
          <p
            className="text-[11px] font-mono mt-1"
            style={{ color: "var(--color-outline)" }}
          >
            {formatDate(review.createdAt)}
            {review.approvedAt ? ` · approved ${formatDate(review.approvedAt)}` : ""}
          </p>
        </div>
        <div className="flex gap-2 shrink-0">{actions}</div>
      </div>
      <p
        className="text-sm leading-relaxed whitespace-pre-wrap"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {review.message}
      </p>
      {review.linkedin && (
        <a
          href={review.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs mt-3"
          style={{ color: "var(--color-primary)" }}
        >
          <ExternalLink size={11} /> LinkedIn
        </a>
      )}
    </li>
  );
}
