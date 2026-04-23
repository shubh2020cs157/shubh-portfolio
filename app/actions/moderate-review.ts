"use server";

import { revalidatePath } from "next/cache";
import { isAuthenticatedAdmin } from "@/lib/auth/admin";
import { redis, KEYS, getReviewById } from "@/lib/redis";

type ModerateResult = { ok: true } | { ok: false; error: string };

export async function approveReview(id: string): Promise<ModerateResult> {
  if (!(await isAuthenticatedAdmin())) {
    return { ok: false, error: "Unauthorized" };
  }

  const review = await getReviewById(id);
  if (!review) return { ok: false, error: "Review not found" };

  const approvedAt = Date.now();
  const r = redis();
  await r.hset(KEYS.review(id), {
    status: "approved",
    approvedAt: String(approvedAt),
  });
  await r.zrem(KEYS.pending, id);
  await r.zadd(KEYS.approved, { score: approvedAt, member: id });

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { ok: true };
}

export async function rejectReview(id: string): Promise<ModerateResult> {
  if (!(await isAuthenticatedAdmin())) {
    return { ok: false, error: "Unauthorized" };
  }

  const r = redis();
  await r.zrem(KEYS.pending, id);
  await r.zrem(KEYS.approved, id);
  await r.del(KEYS.review(id));

  revalidatePath("/");
  revalidatePath("/admin/reviews");
  return { ok: true };
}
