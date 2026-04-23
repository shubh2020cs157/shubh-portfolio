import { NextResponse } from "next/server";
import { redis, KEYS, isRedisConfigured } from "@/lib/redis";

export const runtime = "edge";

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

export async function GET() {
  if (!isRedisConfigured()) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
  const count = (await redis().get<number>(KEYS.viewsTotal)) ?? 0;
  return NextResponse.json({ count });
}

export async function POST(req: Request) {
  if (!isRedisConfigured()) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }

  const ip = getClientIp(req);
  const ua = req.headers.get("user-agent") ?? "unknown";
  const hash = await sha256Hex(`${ip}|${ua}`);
  const dedupKey = KEYS.viewsDedup(hash);

  const r = redis();
  const firstVisit = await r.set(dedupKey, "1", { nx: true, ex: 3600 });

  let count: number;
  if (firstVisit) {
    count = await r.incr(KEYS.viewsTotal);
  } else {
    count = (await r.get<number>(KEYS.viewsTotal)) ?? 0;
  }

  return NextResponse.json({ count });
}
