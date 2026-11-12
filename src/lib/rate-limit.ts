// In-memory limiter: fine for a single server. On serverless/multi-instance
// hosting, swap this for a shared store (e.g. Upstash Redis) behind the same signature.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) { hits.set(key, recent); return false; }
  recent.push(now); hits.set(key, recent);
  return true;
}
