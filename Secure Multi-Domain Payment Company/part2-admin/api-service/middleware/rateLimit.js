// Simulated rate limiting for demonstration purposes only.
// Tracks request counts per client IP in memory within a sliding window.
// A production system would use a shared store (e.g. Redis) so limits
// apply correctly across multiple server instances.

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 100;

const buckets = new Map();

export function rateLimit(req, res, next) {
  const key = req.ip || "unknown";
  const now = Date.now();

  const bucket = buckets.get(key) || { count: 0, windowStart: now };

  if (now - bucket.windowStart > WINDOW_MS) {
    bucket.count = 0;
    bucket.windowStart = now;
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  res.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS));
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS - bucket.count)));

  if (bucket.count > MAX_REQUESTS) {
    return res.status(429).json({ error: "Too Many Requests" });
  }

  next();
}
