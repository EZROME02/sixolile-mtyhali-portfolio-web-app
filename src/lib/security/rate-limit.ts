type Bucket = { count: number; resetAt: number };

type RateLimiterOptions = {
  limit: number;
  windowMs: number;
  maxKeys?: number;
};

export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 10_000,
}: RateLimiterOptions) {
  if (limit < 1 || windowMs < 1 || maxKeys < 1) throw new Error("Invalid rate limiter configuration");
  const buckets = new Map<string, Bucket>();

  return {
    allow(key: string, now = Date.now()): boolean {
      const current = buckets.get(key);
      if (!current || now >= current.resetAt) {
        if (buckets.size >= maxKeys && !buckets.has(key)) {
          const oldest = buckets.keys().next().value;
          if (oldest) buckets.delete(oldest);
        }
        buckets.set(key, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (current.count >= limit) return false;
      current.count += 1;
      return true;
    },
  };
}
