export const ROLES = {
  PET_PARENT: 'PET_PARENT',
  PROVIDER: 'PROVIDER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const SERVICE_CATEGORIES = ['grooming', 'walking', 'sitting', 'vet_consult'] as const;
export type ServiceCategory = typeof SERVICE_CATEGORIES[number];

export const PET_SPECIES = ['Dog', 'Cat', 'Other'] as const;
export type PetSpecies = typeof PET_SPECIES[number];

export const HEALTH_EVENT_TYPES = [
  'vaccination', 'medication', 'vet_visit', 'routine_checkup',
  'surgery', 'allergy', 'treatment', 'other',
] as const;
export type HealthEventType = typeof HEALTH_EVENT_TYPES[number];

export const BOOKING_STATUSES = ['Requested', 'Confirmed', 'Completed', 'Cancelled'] as const;
export type BookingStatus = typeof BOOKING_STATUSES[number];

export const USER_STATUSES = ['Active', 'Suspended', 'New'] as const;
export type UserStatus = typeof USER_STATUSES[number];

export const VERIFICATION_STATUSES = ['Pending', 'Reviewing', 'Approved', 'Rejected'] as const;
export type VerificationStatus = typeof VERIFICATION_STATUSES[number];
