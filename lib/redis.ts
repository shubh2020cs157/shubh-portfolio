import "server-only";
import { Redis } from "@upstash/redis";
import type { Review, ReviewStatus } from "@/lib/content/reviews";

let client: Redis | null = null;

function getClient(): Redis {
  if (client) return client;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      "Upstash Redis is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN."
    );
  }
  client = new Redis({ url, token });
  return client;
}

export function redis(): Redis {
  return getClient();
}

export function isRedisConfigured(): boolean {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

export const KEYS = {
  review: (id: string) => `review:${id}`,
  pending: "reviews:pending",
  approved: "reviews:approved",
  viewsTotal: "views:total",
  viewsDedup: (hash: string) => `views:dedup:${hash}`,
  rateLimitRecommend: (ip: string) => `ratelimit:recommend:${ip}`,
} as const;

export async function getReviewById(id: string): Promise<Review | null> {
  const raw = await getClient().hgetall<Record<string, string>>(KEYS.review(id));
  if (!raw || Object.keys(raw).length === 0) return null;
  return normalizeReview(id, raw);
}

async function getReviewsByIds(ids: string[]): Promise<Review[]> {
  if (ids.length === 0) return [];
  const r = getClient();
  const results = await Promise.all(
    ids.map((id) => r.hgetall<Record<string, string>>(KEYS.review(id)))
  );
  const reviews: Review[] = [];
  results.forEach((raw, i) => {
    if (raw && Object.keys(raw).length > 0) {
      reviews.push(normalizeReview(ids[i], raw));
    }
  });
  return reviews;
}

export async function listApprovedReviews(limit = 24): Promise<Review[]> {
  const ids = (await getClient().zrange<string[]>(
    KEYS.approved,
    0,
    limit - 1,
    { rev: true }
  )) ?? [];
  return getReviewsByIds(ids);
}

export async function listPendingReviews(limit = 50): Promise<Review[]> {
  const ids = (await getClient().zrange<string[]>(
    KEYS.pending,
    0,
    limit - 1,
    { rev: true }
  )) ?? [];
  return getReviewsByIds(ids);
}

function normalizeReview(id: string, raw: Record<string, string>): Review {
  return {
    id,
    name: raw.name ?? "",
    role: raw.role ?? "",
    company: raw.company ?? "",
    relationship: raw.relationship ?? "",
    message: raw.message ?? "",
    linkedin: raw.linkedin || undefined,
    rating: Number(raw.rating ?? 0),
    status: (raw.status as ReviewStatus) ?? "pending",
    createdAt: Number(raw.createdAt ?? 0),
    approvedAt: raw.approvedAt ? Number(raw.approvedAt) : undefined,
  };
}
