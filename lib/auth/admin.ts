export const ADMIN_COOKIE_NAME = "admin_session";

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected || !token) return false;
  return safeEqual(token, expected);
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const { cookies } = await import("next/headers");
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}
