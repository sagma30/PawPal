import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { apiRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { ApiError } from './utils/apiResponse';

export function createApp(): Express {
  const app = express();

  // Security headers with Helmet
  app.use(
    helmet({
      contentSecurityPolicy: env.isProduction ? undefined : false,
      crossOriginEmbedderPolicy: false
    })
  );

  // Cross-Origin Resource Sharing
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (
          !env.isProduction ||
          env.allowedOrigins.includes(origin) ||
          env.allowedOrigins.includes('*')
        ) {
          return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true
    })
  );

  // Request Body Parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API Version 1 Mount
  app.use('/api/v1', apiRouter);

  // 404 Route Catch-All
  app.use('*', (req, _res, next) => {
    next(ApiError.notFound(`Endpoint ${req.method} ${req.originalUrl} does not exist on this server.`));
  });

  // Centralized Error Handling Middleware (must be registered last)
  app.use(errorHandler);

  return app;
}
