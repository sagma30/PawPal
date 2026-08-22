import { ValidationFieldError } from '../utils/apiResponse';
import { ROLES, SERVICE_CATEGORIES } from '../constants/roles';

export function validateLogin(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.emailOrPhone || typeof body.emailOrPhone !== 'string' || body.emailOrPhone.trim().length === 0) {
    errors.push({ field: 'emailOrPhone', message: 'Email or phone number is required.' });
  }

  return errors;
}

export function validateSignup(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name is required and must be at least 2 characters.' });
  }

  if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  if (!body.role || ![ROLES.PET_PARENT, ROLES.PROVIDER].includes(body.role)) {
    errors.push({ field: 'role', message: 'Role must be either PET_PARENT or PROVIDER.' });
  }

  if (body.role === ROLES.PROVIDER) {
    if (!body.businessName || typeof body.businessName !== 'string' || body.businessName.trim().length < 2) {
      errors.push({ field: 'businessName', message: 'Business Name is required for provider registration.' });
    }

    if (!body.serviceCategory || !SERVICE_CATEGORIES.includes(body.serviceCategory)) {
      errors.push({
        field: 'serviceCategory',
        message: `Service category is required and must be one of: ${SERVICE_CATEGORIES.join(', ')}.`
      });
    }
  }

  return errors;
}
