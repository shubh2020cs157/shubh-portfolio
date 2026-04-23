"use server";

import { randomUUID } from "crypto";
import { headers } from "next/headers";
import { Resend } from "resend";
import { recommendationSchema } from "@/lib/schemas/recommendation";
import { redis, KEYS, isRedisConfigured } from "@/lib/redis";

type ActionState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Record<string, string[]>;
};

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_TTL = 60 * 60 * 24;

export async function submitRecommendation(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const honeypot = formData.get("website");
  if (honeypot && String(honeypot).length > 0) {
    return { status: "ok" };
  }

  const raw = {
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company") ?? "",
    relationship: formData.get("relationship"),
    linkedin: formData.get("linkedin") ?? "",
    rating: formData.get("rating"),
    message: formData.get("message"),
  };

  const parsed = recommendationSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (!isRedisConfigured()) {
    console.error("[submit-recommendation] Upstash Redis is not configured.");
    return {
      status: "error",
      message: "Recommendations are temporarily unavailable. Please try again later.",
    };
  }

  const hdr = await headers();
  const ip =
    hdr.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    hdr.get("x-real-ip") ??
    "0.0.0.0";

  const r = redis();
  const rateKey = KEYS.rateLimitRecommend(ip);
  const count = await r.incr(rateKey);
  if (count === 1) {
    await r.expire(rateKey, RATE_LIMIT_TTL);
  }
  if (count > RATE_LIMIT_MAX) {
    return {
      status: "error",
      message: "You've hit the daily submission limit. Please try again tomorrow.",
    };
  }

  const id = randomUUID();
  const createdAt = Date.now();
  const { name, role, company, relationship, message, linkedin, rating } =
    parsed.data;

  await r.hset(KEYS.review(id), {
    name,
    role,
    company: company ?? "",
    relationship,
    message,
    linkedin: linkedin ?? "",
    rating: String(rating),
    status: "pending",
    createdAt: String(createdAt),
  });
  await r.zadd(KEYS.pending, { score: createdAt, member: id });

  try {
    await notifyAdmin({
      id,
      name,
      role,
      company: company ?? "",
      relationship,
      rating,
      message,
    });
  } catch (err) {
    console.error("[submit-recommendation] Notification email failed:", err);
  }

  return { status: "ok" };
}

async function notifyAdmin(args: {
  id: string;
  name: string;
  role: string;
  company: string;
  relationship: string;
  rating: number;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "shubhpersonalok@gmail.com";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const reviewsUrl = `${siteUrl.replace(/\/$/, "")}/admin/reviews`;
  const stars = "★".repeat(args.rating) + "☆".repeat(5 - args.rating);

  const resend = new Resend(apiKey);
  const subject = `[Portfolio] New recommendation from ${args.name}`;
  const textBody = [
    `New recommendation pending review:`,
    ``,
    `From: ${args.name}`,
    `Role: ${args.role}${args.company ? ` @ ${args.company}` : ""}`,
    `Relationship: ${args.relationship}`,
    `Rating: ${stars} (${args.rating}/5)`,
    ``,
    `Message:`,
    args.message,
    ``,
    `Review it: ${reviewsUrl}`,
  ].join("\n");

  await resend.emails.send({
    from: `Portfolio Reviews <${fromEmail}>`,
    to: toEmail,
    subject,
    text: textBody,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00e5ff;">New Recommendation — Pending Review</h2>
        <p><strong>${args.name}</strong> — ${args.role}${args.company ? ` @ ${args.company}` : ""}</p>
        <p style="color: #666;">Relationship: ${escapeHtml(args.relationship)}</p>
        <p style="color: #e0a500;">${stars} (${args.rating}/5)</p>
        <hr style="border-color: #3b494c;" />
        <p style="white-space: pre-wrap;">${escapeHtml(args.message)}</p>
        <hr style="border-color: #3b494c;" />
        <p><a href="${reviewsUrl}" style="color: #00e5ff;">Open admin dashboard &rarr;</a></p>
      </div>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
