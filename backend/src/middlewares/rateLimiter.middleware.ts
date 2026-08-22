import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiResponse';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

export function createRateLimiter(config: RateLimitConfig) {
  const requestCounts = new Map<string, { count: number; resetTime: number }>();

  return (req: Request, _res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();
    const clientRecord = requestCounts.get(ip);

    if (!clientRecord || now > clientRecord.resetTime) {
      requestCounts.set(ip, {
        count: 1,
        resetTime: now + config.windowMs
      });
      return next();
    }

    clientRecord.count++;

    if (clientRecord.count > config.maxRequests) {
      return next(
        new ApiError(
          429,
          config.message || 'Too many requests, please try again later',
          'RATE_LIMIT_EXCEEDED'
        )
      );
    }

    next();
  };
}

// Pre-configured rate limiters
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  maxRequests: 30,
  message: 'Too many authentication attempts. Please try again after 15 minutes.'
});

export const aiRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hr
  maxRequests: 30,
  message: 'Hourly AI consultation limit reached. Please try again later.'
});
