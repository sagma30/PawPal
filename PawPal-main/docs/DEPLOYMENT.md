# Deployment Guide

## Project Structure

```
Zooby/
├── frontend/    # React + Vite SPA
├── backend/     # Express API server
└── docs/        # Project documentation
```

---

## Environment Variables

### Backend (`backend/.env`)

Copy `backend/.env.example` and fill in real values. Never commit `.env`.

| Variable | Required | Description |
|:---|:---|:---|
| `PORT` | Yes | Backend server port (default: `3001`) |
| `NODE_ENV` | Yes | `development` or `production` |
| `JWT_SECRET` | Yes | Strong random secret (min 64 chars) for token signing |
| `JWT_EXPIRES_IN` | Yes | Token expiry in seconds (default: `86400` = 24h) |
| `GEMINI_API_KEY` | Yes | Google Gemini AI API key |
| `APP_URL` | Yes | Deployed app URL |
| `ALLOWED_ORIGINS` | Yes | Comma-separated permitted frontend origins |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|:---|:---|:---|
| `VITE_API_URL` | No | Backend API base URL (default: `http://localhost:3001/api/v1`) |

---

## Development

```bash
# Install all dependencies
cd backend && npm install
cd frontend && npm install

# Start backend (port 3001)
cd backend && npm run dev

# Start frontend (port 3000)
cd frontend && npm run dev

# Or from workspace root (requires root node_modules with tsx)
npm run dev:backend
npm run dev:frontend
```

---

## Running Tests

```bash
cd backend

# Unit + service tests (25 tests)
npm run test

# HTTP integration tests (11 tests)
npm run test:http
```

---

## Production Build

```bash
# Build backend TypeScript
cd backend && npm run build
# Output: backend/dist/

# Start production backend
cd backend && npm start

# Build frontend SPA
cd frontend && npm run build
# Output: frontend/dist/ — serve with nginx or CDN
```

---

## Health Check

```
GET http://localhost:3001/api/v1/health
→ { "status": "healthy", "timestamp": "...", "uptime": 123.45, "version": "1.0.0" }
```

---

## Deployment Checklist

- [ ] `JWT_SECRET` is at least 64 random characters
- [ ] `NODE_ENV=production` set in backend
- [ ] `GEMINI_API_KEY` set to a real API key
- [ ] `ALLOWED_ORIGINS` restricted to the production frontend domain
- [ ] HTTPS enforced at reverse proxy / load balancer level
- [ ] `backend/.env` is NOT committed to source control
- [ ] `frontend/.env` is NOT committed to source control

---

## Logging

- **Development**: colorized console output
- **Production**: structured JSON to stdout (pipe to log aggregator e.g. CloudWatch, Datadog)

---

## Reverse Proxy Example (nginx)

```nginx
# Serve frontend SPA
server {
    listen 80;
    server_name zooby.example.com;

    root /var/www/zooby/frontend/dist;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy API calls to backend
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
