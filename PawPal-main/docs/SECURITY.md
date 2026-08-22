# Security Specification

## Authentication
- JWT access tokens signed with `JWT_SECRET` environment variable (HS256)
- Token expiry: 24 hours (`JWT_EXPIRES_IN`)
- Tokens stored client-side; never stored server-side (stateless)

## Password Hashing
- Algorithm: `bcryptjs` with salt rounds = 12
- `passwordHash` field NEVER returned in any API response
- Passwords never logged

## Role-Based Authorization
| Role | Permissions |
|:---|:---|
| `PET_PARENT` | Own pets, own bookings, own health events, own notifications |
| `PROVIDER` | View/update bookings assigned to them, manage service catalog |
| `ADMIN` | Full platform access, user/provider management, analytics |

## Object-Level Authorization
- All resource operations verify `ownerId === req.user.id` before proceeding
- Admin bypass: `req.user.role === 'ADMIN'` skips ownership check

## Input Validation
- All POST/PUT/PATCH request bodies validated via schema validators before controllers execute
- Reject unknown fields (strict mode validation)
- String length limits enforced (names ≤ 100, notes ≤ 1000, etc.)

## Rate Limiting
- Auth endpoints: 10 requests / 15 minutes per IP
- AI endpoints: 20 requests / 60 minutes per IP
- General API: 100 requests / 15 minutes per IP

## CORS
- `ALLOWED_ORIGINS` environment variable controls permitted origins
- Credentials: `true` for authenticated routes

## Security Headers (Helmet)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy` configured
- `Strict-Transport-Security` in production

## Sensitive Data — Never Expose
- `passwordHash`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- Full card numbers or payment credentials
- Internal stack traces in production

## Injection Prevention
- No raw SQL string interpolation (parameterized queries only when using DB)
- Input sanitization strips `<script>` and HTML injection patterns
