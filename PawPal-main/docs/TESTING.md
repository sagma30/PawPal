# Testing Strategy

## Test Organization
```
backend/tests/
  unit/          # Pure function tests — services, validators, utilities
  integration/   # HTTP-level API endpoint tests
  fixtures/      # Seed data and test factories
```

## Coverage Priorities
| Priority | Module |
|:---|:---|
| Critical | Authentication, Authorization, JWT validation |
| Critical | Object-level ownership enforcement |
| Critical | Booking state machine transitions |
| High | Pet CRUD with ownership isolation |
| High | Health event creation & side effects |
| High | Admin user suspension & verification |
| Medium | Provider filtering & search |
| Medium | Notification generation |
| Low | AI service (mocked in tests) |

## Test Execution
```bash
npm.cmd run test
```

## Test Patterns
- Each integration test starts with a fresh in-memory store populated from fixtures
- Auth tests cover: valid login, invalid credentials, expired token, missing token, wrong role
- Ownership tests verify that User A cannot access User B's pets/bookings/health-events
- Validation tests send deliberately malformed payloads and assert 400/422 + structured error details
- Business rule tests verify booking state machine, verification workflow, suspension enforcement
