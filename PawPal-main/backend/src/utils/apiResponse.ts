import { Response } from 'express';
import { ErrorCode } from '../constants/errorCodes';

export interface ValidationFieldError {
  field: string;
  message: string;
}

// ── Custom ApiError ─────────────────────────────────────────────────────────
export class ApiError extends Error {
  statusCode: number;
  code: ErrorCode;
  errors?: ValidationFieldError[];

  constructor(statusCode: number, message: string, code: ErrorCode, errors?: ValidationFieldError[]) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string, errors?: ValidationFieldError[]): ApiError {
    return new ApiError(400, message, 'BAD_REQUEST', errors);
  }

  static unauthorized(message = 'Authentication required'): ApiError {
    return new ApiError(401, message, 'UNAUTHORIZED');
  }

  static forbidden(message = 'Access denied'): ApiError {
    return new ApiError(403, message, 'FORBIDDEN');
  }

  static notFound(message = 'Resource not found'): ApiError {
    return new ApiError(404, message, 'NOT_FOUND');
  }

  static conflict(message: string): ApiError {
    return new ApiError(409, message, 'CONFLICT');
  }

  static validation(errors: ValidationFieldError[]): ApiError {
    return new ApiError(422, 'Validation failed', 'VALIDATION_ERROR', errors);
  }

  static accountSuspended(): ApiError {
    return new ApiError(403, 'Your account has been suspended', 'ACCOUNT_SUSPENDED');
  }
}

// ── Response helpers ─────────────────────────────────────────────────────────
export function sendSuccess(res: Response, data: unknown, message = 'Success', statusCode = 200): void {
  res.status(statusCode).json({
    success: true,
    message,
    data,
    meta: { timestamp: new Date().toISOString() },
  });
}

export function sendCreated(res: Response, data: unknown, message = 'Created'): void {
  sendSuccess(res, data, message, 201);
}

// ── Async handler wrapper ────────────────────────────────────────────────────
import { Request, NextFunction } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export function asyncHandler(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
}
