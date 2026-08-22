import { Request, Response, NextFunction } from 'express';
import { ApiError, ValidationFieldError } from '../utils/apiResponse';

export type ValidatorFunction = (body: any) => ValidationFieldError[];

export function validateBody(validator: ValidatorFunction) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const errors = validator(req.body);
    if (errors.length > 0) {
      return next(ApiError.badRequest('Validation failed for request body', errors));
    }
    next();
  };
}
