# Validation Specification

## Validation Strategy
- All untrusted input validated before reaching controllers
- Validators return field-level error arrays for 400/422 responses
- Frontend validation is UX-only; backend validation is authoritative

## Auth Validators
### POST /auth/login
- `emailOrPhone`: required, string, min 3 chars
- `password`: optional string

### POST /auth/signup
- `name`: required, string, 2–100 chars
- `email`: required, valid email format
- `phone`: optional, string, min 7 chars
- `password`: required for real accounts, min 8 chars, not for demo logins
- `role`: required, one of `['PET_PARENT', 'PROVIDER']`
- `businessName`: required when `role === 'PROVIDER'`, max 120 chars
- `serviceCategory`: required when `role === 'PROVIDER'`, one of `['grooming', 'walking', 'sitting', 'vet_consult']`

## Pet Validators
### POST /pets
- `name`: required, string, 1–60 chars
- `species`: required, one of `['Dog', 'Cat', 'Other']`
- `breed`: required, string, 1–80 chars
- `age`: required, string, 1–30 chars
- `weight`: required, string, 1–20 chars
- `photoUrl`: required, valid URL
- `bloodGroup`: optional, string, max 40 chars
- `allergies`: optional, string, max 300 chars
- `currentMedications`: optional, string, max 500 chars
- `servicePreferences`: optional, array of strings

## Health Event Validators
### POST /health-events
- `petId`: required, string
- `eventType`: required, one of `['vaccination','medication','vet_visit','routine_checkup','surgery','allergy','treatment','other']`
- `eventTitle`: required, string, 1–120 chars
- `date`: required, non-empty string
- `administeredBy`: required, string, 1–120 chars
- `notes`: optional, string, max 1000 chars
- `reminderEnabled`: optional, boolean
- `reminderDate`: optional, string (required when reminderEnabled is true)

## Booking Validators
### POST /bookings
- `petId`: required, string
- `providerId`: required, string
- `serviceCategory`: required, valid category enum
- `serviceTitle`: required, string, 1–200 chars
- `date`: required, non-empty string
- `timeSlot`: required, non-empty string
- `location`: required, string, 1–200 chars
- `price`: required, positive number
- `notes`: optional, string, max 500 chars

## Admin Validators
### PATCH /admin/users/:id/status
- `status`: required, one of `['Active', 'Suspended']`

### PATCH /admin/verifications/:id/review
- `status`: required, one of `['Pending', 'Reviewing', 'Approved', 'Rejected']`
