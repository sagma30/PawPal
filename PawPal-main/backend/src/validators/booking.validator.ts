import { ValidationFieldError } from '../utils/apiResponse';
import { BOOKING_STATUSES, SERVICE_CATEGORIES } from '../constants/roles';

export function validateCreateBooking(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.petId || typeof body.petId !== 'string') {
    errors.push({ field: 'petId', message: 'petId is required.' });
  }

  if (!body.providerId || typeof body.providerId !== 'string') {
    errors.push({ field: 'providerId', message: 'providerId is required.' });
  }

  if (!body.serviceCategory || !SERVICE_CATEGORIES.includes(body.serviceCategory)) {
    errors.push({
      field: 'serviceCategory',
      message: `serviceCategory must be one of: ${SERVICE_CATEGORIES.join(', ')}.`
    });
  }

  if (!body.serviceTitle || typeof body.serviceTitle !== 'string') {
    errors.push({ field: 'serviceTitle', message: 'serviceTitle is required.' });
  }

  if (!body.date || typeof body.date !== 'string') {
    errors.push({ field: 'date', message: 'date is required.' });
  }

  if (!body.timeSlot || typeof body.timeSlot !== 'string') {
    errors.push({ field: 'timeSlot', message: 'timeSlot is required.' });
  }

  if (body.price === undefined || typeof body.price !== 'number' || body.price < 0) {
    errors.push({ field: 'price', message: 'price must be a positive number.' });
  }

  return errors;
}

export function validateUpdateBookingStatus(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.status || !BOOKING_STATUSES.includes(body.status)) {
    errors.push({
      field: 'status',
      message: `status must be one of: ${BOOKING_STATUSES.join(', ')}.`
    });
  }

  return errors;
}
