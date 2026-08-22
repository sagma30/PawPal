# TODO

## Backend Implementation — COMPLETE ✅

All backend modules implemented, tested, and verified.

### Infrastructure ✅
- [x] All config, utils, constants, middlewares
- [x] All models, repositories, services, controllers, routes, validators
- [x] App bootstrap (app.ts, server.ts, routes/index.ts)
- [x] Automated test suite: 25/25 passing
- [x] HTTP integration test suite: 11/11 passing
- [x] TypeScript: 0 errors (frontend + backend)
- [x] `.env` created from `.env.example`

## Frontend Integration — COMPLETE ✅
- [x] `src/services/apiClient.ts` — full REST client
- [x] `src/context/AuthContext.tsx` — wired to backend (login, signup, demo, google, getMe)
- [x] `src/App.tsx` — loads pets, health events, bookings, notifications, agenda from backend

---

## Remaining / Future Work

### Real Database (when scaling beyond demo)
- [ ] Replace `BaseRepository` in-memory Maps with Postgres/MongoDB adapters
- [ ] Add database migrations (e.g. Prisma or Drizzle)
- [ ] Add connection pooling and retry logic

### Production Auth
- [ ] Replace mock Google OAuth with real Google OAuth token verification
- [ ] Add refresh token rotation
- [ ] Add password reset flow

### Admin & Provider Portal Backend Wiring
- [ ] Wire `AdminPortal` component to live `/admin/*` API endpoints (currently uses `src/data/adminMockData.ts`)
- [ ] Wire `ProviderPortal` component to live `/bookings` and `/providers` API endpoints (currently uses `src/data/providerMockData.ts`)

### Production Hardening
- [ ] Replace in-memory rate limiters with Redis-backed rate limiting for multi-instance deploys
- [ ] Add request logging middleware (Morgan or custom)
- [ ] Add structured error alerting (Sentry or similar)
- [ ] Add health check DB connectivity probe

### AI
- [ ] Set real `GEMINI_API_KEY` in production environment
- [ ] Add conversation history / multi-turn AI context

### File Uploads
- [ ] Pet photo upload endpoint (currently accepts URL strings only)
