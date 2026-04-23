"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { GradientButton } from "@/components/ui/GradientButton";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { sendMessage } from "@/app/actions/send-message";

type State = { status: "idle" | "ok" | "error"; message?: string; errors?: Record<string, string[]> };

const initialState: State = { status: "idle" };

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

function Field({ label, id, error, multiline, rows = 4, ...props }: FieldProps) {
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
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        {label}
      </label>
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
      {error && (
        <p className="text-xs" style={{ color: "var(--color-error)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    async (prev: State, formData: FormData) => sendMessage(prev, formData),
    initialState
  );

  const { register, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") {
      reset();
      formRef.current?.reset();
    }
  }, [state.status, reset]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 w-0 h-0 pointer-events-none"
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Your Name"
          id="name"
          type="text"
          placeholder="e.g. Jane Smith"
          autoComplete="name"
          error={errors.name?.message ?? state.errors?.name?.[0]}
          {...register("name")}
        />
        <Field
          label="Email Address"
          id="email"
          type="email"
          placeholder="e.g. jane@company.com"
          autoComplete="email"
          error={errors.email?.message ?? state.errors?.email?.[0]}
          {...register("email")}
        />
      </div>

      <Field
        label="Message"
        id="message"
        multiline
        rows={5}
        placeholder="Tell me about your project, role, or idea..."
        error={errors.message?.message ?? state.errors?.message?.[0]}
        {...register("message")}
      />

      {state.status === "ok" && (
        <div
          className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-primary-container) 8%, transparent)",
            border: "1px solid color-mix(in oklab, var(--color-primary-container) 20%, transparent)",
            color: "var(--color-primary)",
          }}
          role="status"
        >
          <CheckCircle size={16} className="shrink-0" />
          Message sent — I&apos;ll get back to you soon.
        </div>
      )}

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

      <GradientButton type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
        {pending ? (
          <><Loader2 size={14} className="animate-spin" /> Sending...</>
        ) : (
          <><Send size={14} /> Send Message</>
        )}
      </GradientButton>
    </form>
  );
}
