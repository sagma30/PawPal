import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../constants/roles';
import { ApiError } from '../utils/apiResponse';

/**
 * Require specific user role(s).
 * Enforces BR-001 Role Privileges.
 */
export function requireRoles(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Access forbidden: required role ${allowedRoles.join(' or ')} but current role is ${req.user.role}`
        )
      );
    }

    next();
  };
}
