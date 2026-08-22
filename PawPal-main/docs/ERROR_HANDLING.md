# Error Handling Specification

## Standard Error Response Format
```json
{
  "success": false,
  "message": "Human-readable error description",
  "code": "MACHINE_READABLE_CODE",
  "errors": [
    { "field": "email", "message": "Must be a valid email address" }
  ]
}
```
The `errors` array is only present for validation errors (400/422).

## HTTP Status Code Map
| Status | Code | Situation |
|:---|:---|:---|
| 400 | `BAD_REQUEST` | Malformed request body or missing required fields |
| 401 | `UNAUTHORIZED` | No token provided or token expired/invalid |
| 403 | `FORBIDDEN` | Token valid but insufficient role permissions or account suspended |
| 404 | `NOT_FOUND` | Requested resource does not exist |
| 409 | `CONFLICT` | Duplicate resource (e.g. email already registered) |
| 422 | `VALIDATION_ERROR` | Input fails business validation rules |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests in a time window |
| 500 | `INTERNAL_ERROR` | Unexpected server-side failure |

## Centralized Error Handler
- Single `errorHandler` middleware registered as the last middleware in `app.ts`
- All thrown `ApiError` instances are caught and formatted consistently
- Unhandled exceptions are caught, logged with full stack, but only safe info returned to client
- In production (`NODE_ENV=production`): stack traces suppressed in responses

## Custom ApiError Class
```typescript
class ApiError extends Error {
  statusCode: number;
  code: string;
  errors?: ValidationError[];
}
```

## Async Error Propagation
- All async controller handlers wrapped in `asyncHandler()` utility which passes errors to `next(err)`
- No try-catch boilerplate in individual controllers
