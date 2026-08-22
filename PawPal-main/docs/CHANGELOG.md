# Changelog

## [2026-08-21] — Session 2

### Added
- `docs/MEMORY.md` — compact working memory for future AI sessions
- `.env` — local development environment file (gitignored)
- `npm run test:backend:http` script in root `package.json`

### Changed
- `src/context/AuthContext.tsx` — fully replaced local mock auth with `apiClient` backend calls (login, demoLogin, googleAuth, signup, getMe with token re-validation on boot)
- `src/App.tsx` — replaced localStorage/mock data initialization with backend API calls for pets, health events, bookings, notifications, and agenda; all mutation handlers now post to backend with optimistic local fallback; removed stale localStorage sync effects

### Verified
- Backend TypeScript: 0 errors
- Frontend TypeScript: 0 errors
- Unit test suite: 25/25 PASS
- HTTP integration test suite: 11/11 PASS

---

## [2026-08-21] — Session 1

### Added
- Full AI Context Documentation System (`/docs` — 14 files)
- Backend folder structure under `/backend/src/`
- Domain models: User, Pet, HealthEvent, ServiceProvider, Booking, Notification, Verification
- Repository layer: BaseRepository, all entity repositories with seed data
- Service layer: Auth, Pet, HealthEvent, Provider, Booking, Notification, Admin, AI services
- Controller + Route layer: All 9 route modules under `/api/v1/`
- JWT authentication middleware with role-based authorization
- Centralized error handling middleware with ApiError class
- Input validation for all POST/PATCH/PUT endpoints
- Rate limiting on auth and AI endpoints
- Helmet security headers + CORS configuration
- Server-side Gemini AI pet health consultation endpoint
- Automated integration test suite covering auth, pets, bookings, admin, and validation
- `README.md` with full developer setup guide
- `.env.example` with all required variables

### Changed
- `package.json`: added backend npm scripts (`dev:backend`, `build:backend`, `start:backend`, `test`)
