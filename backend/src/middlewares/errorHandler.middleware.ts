import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiResponse';
import { logger } from '../config/logger';
import { env } from '../config/env';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      ...(err.errors && { errors: err.errors })
    });
    return;
  }

  // Handle SyntaxError (JSON parse errors)
  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400) {
    res.status(400).json({
      success: false,
      message: 'Malformed JSON payload in request body',
      code: 'BAD_REQUEST'
    });
    return;
  }

  const error = err as Error;
  logger.error(`Unhandled Exception on ${req.method} ${req.originalUrl}: ${error.message}`, {
    stack: error.stack,
    method: req.method,
    url: req.originalUrl,
    body: req.body
  });

  res.status(500).json({
    success: false,
    message: env.isProduction ? 'An unexpected internal error occurred' : error.message,
    code: 'INTERNAL_ERROR',
    ...(!env.isProduction && { stack: error.stack })
  });
}
