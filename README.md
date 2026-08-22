# Zooby — Pet-Care Ecosystem

Zooby is a full-stack pet-care platform with pet health tracking, provider booking, admin oversight, and server-side Gemini AI consultations.

## Project Structure

```
Zooby/
├── frontend/          # React 19 + Vite + TailwindCSS frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/       # AuthContext (wired to backend API)
│   │   ├── data/          # Static mock data for demo
│   │   ├── services/      # apiClient.ts — REST client
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── types.ts
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .env               # VITE_API_URL (gitignored)
│   └── .env.example
│
├── backend/           # Express + TypeScript backend API
│   ├── src/
│   │   ├── config/        # env, database (seed), logger
│   │   ├── constants/     # roles, error codes
│   │   ├── controllers/   # thin HTTP handlers
│   │   ├── middlewares/   # auth, roles, validation, errors, rate limit
│   │   ├── models/        # TypeScript interfaces
│   │   ├── repositories/  # in-memory data layer (Map-based)
│   │   ├── routes/        # Express routers
│   │   ├── services/      # business logic
│   │   ├── utils/         # apiResponse, jwt, password, idGenerator
│   │   └── validators/    # request body validators
│   ├── tests/
│   │   ├── runner.ts              # 25-test unit suite
│   │   └── integration/
│   │       └── http.test.ts       # 11-test HTTP suite
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env               # Backend secrets (gitignored)
│   └── .env.example
│
├── docs/              # AI context documentation
│   ├── MEMORY.md          # Compact session memory for AI
│   ├── API_CONTRACT.md
│   ├── ARCHITECTURE.md
│   ├── BUSINESS_RULES.md
│   ├── SECURITY.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   ├── TODO.md
│   └── CHANGELOG.md
│
└── package.json       # Workspace orchestrator (delegates to frontend/ & backend/)
```

---

## Tech Stack

| Layer | Technology |
|:---|:---|
| Frontend | React 19, Vite, TailwindCSS 4, TypeScript |
| Backend | Node.js 22+, Express 4, TypeScript |
| Auth | JWT (bcryptjs, HS256, 24h expiry) |
| AI | Google Gemini API (`@google/genai`) |
| Storage | In-memory (Map-based repositories — swap for DB without changing services) |

---

## Quick Start

### 1. Install dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install
```

Or from the workspace root:
```bash
npm run install:all
```

### 2. Configure environment

**Backend** — copy and edit `backend/.env.example`:
```bash
cp backend/.env.example backend/.env
```

**Frontend** — copy and edit `frontend/.env.example`:
```bash
cp frontend/.env.example frontend/.env
```

### 3. Start backend

```bash
cd backend && npm run dev
# → http://localhost:3001/api/v1
# → Health check: http://localhost:3001/api/v1/health
```

Or from workspace root:
```bash
npm run dev:backend
```

### 4. Start frontend

```bash
cd frontend && npm run dev
# → http://localhost:3000
```

Or from workspace root:
```bash
npm run dev:frontend
```

---

## Demo Credentials

| Role | Email | Password |
|:---|:---|:---|
| Pet Parent | parent@zooby.demo | parent123 |
| Provider | provider@zooby.demo | provider123 |
| Admin | admin@zooby.demo | admin123 |

Or use the **1-Click Demo Switcher** on any screen.

---

## Running Tests

```bash
# From backend/ directory
cd backend
npm run test        # 25-test unit suite
npm run test:http   # 11-test HTTP integration suite

# From workspace root
npm run test:backend
npm run test:backend:http
```

---

## API Summary (`/api/v1`)

| Method | Endpoint | Auth |
|:---|:---|:---|
| `GET` | `/health` | Public |
| `POST` | `/auth/login` | Public |
| `POST` | `/auth/demo-login` | Public |
| `POST` | `/auth/google` | Public |
| `POST` | `/auth/signup` | Public |
| `GET` | `/auth/me` | Bearer |
| `GET/PUT` | `/users/profile` | Bearer |
| `GET/POST` | `/pets` | Bearer |
| `GET/PUT/DELETE` | `/pets/:id` | Bearer |
| `GET/POST` | `/health-events` | Bearer |
| `DELETE` | `/health-events/:id` | Bearer |
| `GET` | `/providers` | Public |
| `GET` | `/providers/:id` | Public |
| `GET/POST` | `/bookings` | Bearer |
| `PATCH` | `/bookings/:id/status` | Bearer |
| `GET` | `/notifications` | Bearer |
| `POST` | `/notifications/mark-all-read` | Bearer |
| `GET` | `/notifications/agenda` | Bearer |
| `GET/POST` | `/admin/users` | Admin |
| `PATCH` | `/admin/users/:id/status` | Admin |
| `GET` | `/admin/verifications` | Admin |
| `PATCH` | `/admin/verifications/:id/review` | Admin |
| `GET` | `/admin/analytics` | Admin |
| `POST` | `/ai/consult` | Bearer |

---

## Documentation

All project context lives in `/docs/`:
- [`MEMORY.md`](docs/MEMORY.md) — current project state for AI sessions
- [`API_CONTRACT.md`](docs/API_CONTRACT.md) — full REST API contract
- [`ARCHITECTURE.md`](docs/ARCHITECTURE.md) — layered architecture
- [`SECURITY.md`](docs/SECURITY.md) — auth, roles, rate limiting
- [`BUSINESS_RULES.md`](docs/BUSINESS_RULES.md) — domain rules
- [`DATABASE.md`](docs/DATABASE.md) — data models & relationships
- [`DEPLOYMENT.md`](docs/DEPLOYMENT.md) — environment & deploy guide
- [`TODO.md`](docs/TODO.md) — remaining work
- [`CHANGELOG.md`](docs/CHANGELOG.md) — version history
