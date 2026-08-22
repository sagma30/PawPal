import { ValidationFieldError } from '../utils/apiResponse';
import { PET_SPECIES } from '../constants/roles';

export function validateCreatePet(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.push({ field: 'name', message: 'Pet name is required.' });
  }

  if (!body.species || !PET_SPECIES.includes(body.species)) {
    errors.push({ field: 'species', message: `Species must be one of: ${PET_SPECIES.join(', ')}.` });
  }

  if (!body.breed || typeof body.breed !== 'string' || body.breed.trim().length === 0) {
    errors.push({ field: 'breed', message: 'Breed is required.' });
  }

  if (!body.age || typeof body.age !== 'string' || body.age.trim().length === 0) {
    errors.push({ field: 'age', message: 'Age is required (e.g., "3 Years").' });
  }

  if (!body.weight || typeof body.weight !== 'string' || body.weight.trim().length === 0) {
    errors.push({ field: 'weight', message: 'Weight is required (e.g., "32 kg").' });
  }

  return errors;
}

export function validateUpdatePet(body: any): ValidationFieldError[] {
  const errors: ValidationFieldError[] = [];

  if (body.species && !PET_SPECIES.includes(body.species)) {
    errors.push({ field: 'species', message: `Species must be one of: ${PET_SPECIES.join(', ')}.` });
  }

  return errors;
}
