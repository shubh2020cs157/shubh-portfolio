"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, AlertCircle, Loader2, ChevronDown, ShieldCheck, ShieldOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import type { Resolver } from "react-hook-form";
import { GradientButton } from "@/components/ui/GradientButton";
import { StarRating } from "@/components/recommend/StarRating";
import {
  recommendationSchema,
  RELATIONSHIPS,
  type RecommendationFormData,
} from "@/lib/schemas/recommendation";
import { submitRecommendation } from "@/app/actions/submit-recommendation";

type State = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Record<string, string[]>;
};

type GoogleUser = {
  name: string;
  email: string;
  image: string | null;
};

interface RecommendFormProps {
  googleUser: GoogleUser | null;
}

const initialState: State = { status: "idle" };

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
  hint?: string;
  required?: boolean;
  optional?: boolean;
}

function FieldLabel({
  htmlFor,
  label,
  required,
  optional,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-[10px] tracking-[0.15em] uppercase"
      style={{ color: "var(--color-on-surface-variant)" }}
    >
      {label}
      {required && (
        <span style={{ color: "var(--color-primary-container)" }}> *</span>
      )}
      {optional && (
        <span className="ml-1 opacity-60">(optional)</span>
      )}
    </label>
  );
}

function Field({
  label,
  id,
  error,
  multiline,
  rows = 4,
  hint,
  required,
  optional,
  ...props
}: FieldProps) {
  const base = [
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200",
    "border bg-[var(--color-surface-high)]",
    error
      ? "border-[var(--color-error)] focus:border-[var(--color-error)]"
      : "border-[color-mix(in_oklab,var(--color-outline-variant)_40%,transparent)] focus:border-[var(--color-primary-container)]",
    "focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary-container)_15%,transparent)]",
    "placeholder:text-[var(--color-outline)]",
  ].join(" ");

  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={id} label={label} required={required} optional={optional} />
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          className={`${base} resize-none`}
          style={{ color: "var(--color-on-surface)" }}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={base}
          style={{ color: "var(--color-on-surface)" }}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {hint && !error && (
        <p className="text-xs" style={{ color: "var(--color-outline)" }}>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-xs" style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function RecommendForm({ googleUser }: RecommendFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    async (prev: State, formData: FormData) => submitRecommendation(prev, formData),
    initialState
  );

  const [rating, setRating] = useState(5);
  const [signingIn, setSigningIn] = useState(false);

  const {
    register,
    control,
    formState: { errors },
  } = useForm<RecommendationFormData>({
    resolver: zodResolver(recommendationSchema) as Resolver<RecommendationFormData>,
    mode: "onBlur",
    defaultValues: { rating: 5, name: googleUser?.name ?? "" },
  });

  useEffect(() => {
    if (state.status === "ok") {
      router.push("/recommend/thank-you");
    }
  }, [state.status, router]);

  const inputBase = [
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200",
    "border bg-[var(--color-surface-high)]",
    "border-[color-mix(in_oklab,var(--color-outline-variant)_40%,transparent)] focus:border-[var(--color-primary-container)]",
    "focus:ring-2 focus:ring-[color-mix(in_oklab,var(--color-primary-container)_15%,transparent)]",
  ].join(" ");

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        autoComplete="off"
      />

      {/* Hidden field — server action reads this to set googleVerified */}
      <input type="hidden" name="googleVerified" value={googleUser ? "true" : "false"} />

      {/* Google verification banner */}
      {googleUser ? (
        <div
          className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-primary-container) 8%, transparent)",
            border: "1px solid color-mix(in oklab, var(--color-primary-container) 20%, transparent)",
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {googleUser.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={googleUser.image}
                alt={googleUser.name}
                className="w-7 h-7 rounded-full shrink-0"
              />
            ) : (
              <ShieldCheck size={16} style={{ color: "var(--color-primary-container)" }} className="shrink-0" />
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold leading-snug" style={{ color: "var(--color-primary-container)" }}>
                Verified via Google
              </p>
              <p className="text-[11px] truncate" style={{ color: "var(--color-outline)" }}>
                {googleUser.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ redirectTo: "/recommend" })}
            className="shrink-0 text-[11px] font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--color-outline)" }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div
          className="rounded-xl px-4 py-4"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-outline-variant) 8%, transparent)",
            border: "1px solid color-mix(in oklab, var(--color-outline-variant) 20%, transparent)",
          }}
        >
          <div className="flex items-start gap-3">
            <ShieldOff size={16} className="shrink-0 mt-0.5" style={{ color: "var(--color-outline)" }} />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold mb-0.5" style={{ color: "var(--color-on-surface)" }}>
                Want a Verified badge on your review?
              </p>
              <p className="text-[11px] leading-relaxed mb-3" style={{ color: "var(--color-outline)" }}>
                Sign in with Google to show a Verified badge alongside your recommendation.
              </p>
              <button
                type="button"
                disabled={signingIn}
                onClick={async () => {
                  setSigningIn(true);
                  await signIn("google", { redirectTo: "/recommend" });
                }}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 ghost-border cursor-pointer bg-surface-high text-on-surface hover:bg-[#4285F4] hover:border-[#4285F4] hover:text-white"
              >
                {signingIn ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <FcGoogle size={14} />
                )}
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      )}

      <Field
        label="Your full name"
        id="name"
        type="text"
        required
        placeholder="e.g. John Doe"
        autoComplete="name"
        defaultValue={googleUser?.name ?? ""}
        error={errors.name?.message ?? state.errors?.name?.[0]}
        {...register("name")}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Your role / title"
          id="role"
          type="text"
          required
          placeholder="e.g. Engineering Manager"
          autoComplete="organization-title"
          error={errors.role?.message ?? state.errors?.role?.[0]}
          {...register("role")}
        />
        <Field
          label="Company"
          id="company"
          type="text"
          optional
          placeholder="e.g. Microsoft"
          autoComplete="organization"
          error={errors.company?.message ?? state.errors?.company?.[0]}
          {...register("company")}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel
          htmlFor="relationship"
          label="How do you know Shubh?"
          required
        />
        <div className="relative">
          <select
            id="relationship"
            {...register("relationship")}
            defaultValue=""
            className={`${inputBase} appearance-none pr-10`}
            style={{ color: "var(--color-on-surface)" }}
          >
            <option value="" disabled>
              Select...
            </option>
            {RELATIONSHIPS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-outline)" }}
          />
        </div>
        {(errors.relationship?.message ?? state.errors?.relationship?.[0]) && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {errors.relationship?.message ?? state.errors?.relationship?.[0]}
          </p>
        )}
      </div>

      <Field
        label="Your LinkedIn URL"
        id="linkedin"
        type="url"
        optional
        placeholder="https://linkedin.com/in/..."
        autoComplete="url"
        error={errors.linkedin?.message ?? state.errors?.linkedin?.[0]}
        {...register("linkedin")}
      />

      <div className="space-y-2">
        <p
          className="font-mono text-[10px] tracking-[0.15em] uppercase"
          style={{ color: "var(--color-on-surface-variant)" }}
        >
          Rating <span style={{ color: "var(--color-primary-container)" }}>*</span>
        </p>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <>
              <StarRating
                value={rating}
                onChange={(v) => {
                  setRating(v);
                  field.onChange(v);
                }}
              />
              <input type="hidden" name="rating" value={rating} />
            </>
          )}
        />
        {(errors.rating?.message ?? state.errors?.rating?.[0]) && (
          <p className="text-xs" style={{ color: "var(--color-error)" }}>
            {errors.rating?.message ?? state.errors?.rating?.[0]}
          </p>
        )}
      </div>

      <Field
        label="Your recommendation"
        id="message"
        multiline
        rows={6}
        required
        placeholder="What was it like working with Shubh? What stands out about his technical skills, leadership, or collaboration?"
        error={errors.message?.message ?? state.errors?.message?.[0]}
        {...register("message")}
      />

      {state.status === "error" && !state.errors && (
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
          {state.message ?? "Something went wrong. Please try again."}
        </div>
      )}

      <GradientButton
        type="submit"
        disabled={pending}
        size="lg"
        className="w-full"
      >
        {pending ? (
          <>
            <Loader2 size={14} className="animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Send size={14} /> Submit Recommendation
          </>
        )}
      </GradientButton>
    </form>
  );
}
