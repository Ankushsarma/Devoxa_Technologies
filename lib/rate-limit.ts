type RateLimitConfig = {
    limit: number;
    windowMs: number;
};

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60000; // 1 minute

const ipRequests = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(
    req: Request,
    config: RateLimitConfig = { limit: DEFAULT_LIMIT, windowMs: DEFAULT_WINDOW_MS }
) {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();

    // Clean up expired entries periodically or inline (lazy cleanup)
    if (ipRequests.has(ip)) {
        const record = ipRequests.get(ip)!;
        if (now > record.expiresAt) {
            // Expired, reset
            ipRequests.set(ip, { count: 1, expiresAt: now + config.windowMs });
            return { success: true };
        }

        if (record.count >= config.limit) {
            return { success: false, limit: config.limit, windowMs: config.windowMs };
        }

        record.count++;
        return { success: true };
    }

    // First request
    ipRequests.set(ip, { count: 1, expiresAt: now + config.windowMs });
    return { success: true };
}
