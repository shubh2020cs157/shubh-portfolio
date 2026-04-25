import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";

export function verifyAdminToken(token: string | undefined | null): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || !token) return false;
  try {
    // Hash both to same-length buffers so timingSafeEqual never leaks token length
    const a = createHash("sha256").update(token).digest();
    const b = createHash("sha256").update(expected).digest();
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const { cookies } = await import("next/headers");
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}
