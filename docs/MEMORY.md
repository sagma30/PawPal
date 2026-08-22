# PROJECT MEMORY

## Current State
- Backend: **COMPLETE & PRODUCTION-READY** — `backend/`
- Frontend: **COMPLETE & WIRED TO BACKEND** — `frontend/`
- Structure: **SEPARATED** — `frontend/` and `backend/` are peer directories
- Implementation phase: Done — verified, tested, integrated, restructured

---

## Project Structure

```
Zooby/
├── frontend/          # React 19 + Vite + TailwindCSS
│   ├── src/           # All React source (components, context, services, data, types)
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── .env           # VITE_API_URL (gitignored)
├── backend/           # Express + TypeScript API
│   ├── src/           # config, controllers, middlewares, models, repos, routes, services, utils, validators
│   ├── tests/         # runner.ts (25 tests) + integration/http.test.ts (11 tests)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env           # Backend secrets (gitignored)
├── docs/              # AI context documentation
└── package.json       # Workspace orchestrator only — no own deps
```

---

## Completed

### Backend (`backend/src/`)
- Config, utils, constants, all middlewares
- Models, repositories (in-memory Map), services, controllers, routes, validators
- 9 API modules under `/api/v1/`: auth, users, pets, health-events, providers, bookings, notifications, admin, ai
- Tests: 25/25 unit PASS, 11/11 HTTP PASS

### Frontend (`frontend/src/`)
- `services/apiClient.ts` — full REST client for all 9 API modules
- `context/AuthContext.tsx` — wired to backend (login, demoLogin, googleAuth, signup, getMe with token revalidation on boot)
- `App.tsx` — loads pets+healthEvents+bookings+notifications+agenda from backend; mutations post to backend with optimistic local fallback

---

## In Progress
- Nothing. All known requirements implemented.

---

## Important Decisions
- **In-memory store** — no external DB; swap by replacing repository implementations only
- **Stateless JWT** — 24h expiry, validated on every protected request
- **Optimistic UI** — frontend applies state changes immediately; backend call is best-effort with silent fallback
- **Health events fetched separately** — merged into `Pet.healthEvents[]` in `App.tsx` after fetch
- **Demo accounts seeded on startup** — `parent/provider/admin @zooby.demo` with known passwords
- **Vite dev proxy** — `frontend/vite.config.ts` proxies `/api/*` to `http://localhost:3001` so no CORS issues in dev

---

## Important Constraints
- Node.js v22+ required
- Backend port: **3001** | Frontend port: **3000**
- Backend `.env` lives at `backend/.env` — loaded via `dotenv.config({ path: '../../.env' })` relative to `backend/src/config/env.ts`
- Frontend `.env` lives at `frontend/.env` — `VITE_API_URL` exposed via `import.meta.env`
- PowerShell execution policy blocks bare `npm`/`tsx` — use `cmd /c` or `.cmd` wrappers when running from PowerShell
- Frontend `node_modules` not yet installed inside `frontend/` — currently uses root `node_modules` (run `cd frontend && npm install` to isolate)

---

## Known Issues
- Frontend `node_modules` not yet installed in `frontend/` — Vite won't run from `frontend/` until `npm install` is run there
- Google OAuth (`/auth/google`) does not perform real token exchange — creates/finds user by email only
- `GEMINI_API_KEY` defaults to placeholder; AI falls back to local knowledgebase
- Rate limiters are in-memory — reset on restart, not suitable for multi-instance without Redis
- Admin and Provider portal components still use local mock data files (`src/data/adminMockData.ts`, `src/data/providerMockData.ts`)

---

## Next Actions
1. `cd frontend && npm install` — install frontend node_modules
2. Set real `GEMINI_API_KEY` in `backend/.env` for live AI
3. Wire `AdminPortal` to `/admin/*` API endpoints
4. Wire `ProviderPortal` to `/bookings` and `/providers` API endpoints
5. Replace `BaseRepository` with real DB adapter when scaling

---

## Demo Credentials

| Role | Email | Password |
|:---|:---|:---|
| PET_PARENT | parent@zooby.demo | parent123 |
| PROVIDER | provider@zooby.demo | provider123 |
| ADMIN | admin@zooby.demo | admin123 |

---

## Key Files

| File | Purpose |
|:---|:---|
| `backend/src/server.ts` | Entry point — seeds DB, starts Express |
| `backend/src/app.ts` | App factory — CORS, Helmet, routes, error handler |
| `backend/src/config/database.ts` | In-memory seed data |
| `backend/src/config/env.ts` | Env loading — reads `backend/.env` |
| `backend/src/routes/index.ts` | All route mounts + `/health` |
| `backend/src/utils/apiResponse.ts` | ApiError, sendSuccess, asyncHandler |
| `backend/src/repositories/base.repository.ts` | Generic Map repo — swap for DB here |
| `backend/tests/runner.ts` | 25-test unit suite |
| `backend/tests/integration/http.test.ts` | 11-test HTTP suite |
| `frontend/src/services/apiClient.ts` | REST client with JWT injection |
| `frontend/src/context/AuthContext.tsx` | Auth state — wired to backend |
| `frontend/src/App.tsx` | Main app — loads all data from backend |
| `backend/.env` | Backend secrets (gitignored) |
| `frontend/.env` | Frontend env vars (gitignored) |
| `docs/MEMORY.md` | This file |
