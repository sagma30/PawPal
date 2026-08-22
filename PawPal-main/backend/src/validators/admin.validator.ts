import { ValidationFieldError } from '../utils/apiResponse';
import { USER_STATUSES, VERIFICATION_STATUSES } from '../constants/roles';

export function validateUpdateUserStatus(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.status || !USER_STATUSES.includes(body.status)) {
    errors.push({
      field: 'status',
      message: `status must be one of: ${USER_STATUSES.join(', ')}.`
    });
  }

  return errors;
}

export function validateReviewVerification(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.status || !VERIFICATION_STATUSES.includes(body.status)) {
    errors.push({
      field: 'status',
      message: `status must be one of: ${VERIFICATION_STATUSES.join(', ')}.`
    });
  }

  return errors;
}
