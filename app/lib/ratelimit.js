// Simple in-memory per-key rate limiter (T-006 / T-021).
//
// Sliding window keyed by IP. This is per-instance (good enough for basic spam
// deterrence on a single region); swap for a Firestore/Redis counter if strict
// global limits are needed.

const hits = new Map(); // key -> number[] (timestamps ms)

/**
 * @param {string} key       Usually the client IP.
 * @param {number} limit     Max requests allowed per window.
 * @param {number} windowMs  Window size in milliseconds.
 * @returns {{ allowed: boolean, remaining: number }}
 */
export function rateLimit(key, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = (hits.get(key) || []).filter((t) => t > windowStart);

  if (timestamps.length >= limit) {
    hits.set(key, timestamps);
    return { allowed: false, remaining: 0 };
  }

  timestamps.push(now);
  hits.set(key, timestamps);

  // Opportunistic cleanup to bound memory growth.
  if (hits.size > 5000) {
    for (const [k, ts] of hits) {
      const live = ts.filter((t) => t > windowStart);
      if (live.length === 0) hits.delete(k);
      else hits.set(k, live);
    }
  }

  return { allowed: true, remaining: limit - timestamps.length };
}

/** Best-effort client IP from proxy headers. */
export function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
