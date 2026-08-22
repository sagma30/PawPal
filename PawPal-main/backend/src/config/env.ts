import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env from backend/ root (two levels up from src/config/)
// Falls back gracefully if .env is absent (e.g. when env vars are injected directly in production)
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: parseInt(process.env['PORT'] ?? '3001', 10),
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  isProduction: process.env['NODE_ENV'] === 'production',

  jwtSecret: requireEnv('JWT_SECRET', 'zooby-dev-secret-change-in-production-min-64-chars-long'),
  jwtExpiresIn: parseInt(process.env['JWT_EXPIRES_IN'] ?? '86400', 10),

  geminiApiKey: process.env['GEMINI_API_KEY'] ?? '',
  appUrl: process.env['APP_URL'] ?? 'http://localhost:3000',
  allowedOrigins: (process.env['ALLOWED_ORIGINS'] ?? 'http://localhost:3000,http://localhost:5173').split(',').map(o => o.trim()),
};
