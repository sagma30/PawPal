import { ValidationFieldError } from '../utils/apiResponse';
import { HEALTH_EVENT_TYPES } from '../constants/roles';

export function validateCreateHealthEvent(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.petId || typeof body.petId !== 'string') {
    errors.push({ field: 'petId', message: 'petId is required.' });
  }

  if (!body.eventTitle || typeof body.eventTitle !== 'string' || body.eventTitle.trim().length === 0) {
    errors.push({ field: 'eventTitle', message: 'eventTitle is required.' });
  }

  if (!body.eventType || !HEALTH_EVENT_TYPES.includes(body.eventType)) {
    errors.push({
      field: 'eventType',
      message: `eventType must be one of: ${HEALTH_EVENT_TYPES.join(', ')}.`
    });
  }

  if (!body.date || typeof body.date !== 'string') {
    errors.push({ field: 'date', message: 'date is required.' });
  }

  if (!body.administeredBy || typeof body.administeredBy !== 'string') {
    errors.push({ field: 'administeredBy', message: 'administeredBy is required.' });
  }

  return errors;
}
