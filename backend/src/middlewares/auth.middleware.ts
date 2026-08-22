import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../utils/jwt';
import { ApiError } from '../utils/apiResponse';
import { userRepository } from '../repositories/user.repository';

// Augment Express Request to carry authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { status?: string };
    }
  }
}

export function authenticateJwt(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(ApiError.unauthorized('No authentication token provided'));
  }

  const token = authHeader.slice(7);
  try {
    const payload = verifyToken(token);
    // Attach to request for downstream use
    req.user = payload;
    next();
  } catch (err: unknown) {
    const message = err instanceof Error && err.message.includes('expired')
      ? 'Token has expired'
      : 'Invalid authentication token';
    next(new ApiError(401, message, err instanceof Error && err.message.includes('expired') ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID'));
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // anonymous allowed
  }
  try {
    const token = authHeader.slice(7);
    req.user = verifyToken(token);
  } catch {
    // silently ignore invalid optional token
  }
  next();
}

// Verify account is not suspended (enforces BR-003)
export function requireActiveAccount(req: Request, _res: Response, next: NextFunction): void {
  if (!req.user) return next(ApiError.unauthorized());

  const user = userRepository.findById(req.user.userId);
  if (user && user.status === 'Suspended') {
    return next(ApiError.accountSuspended());
  }
  next();
}
