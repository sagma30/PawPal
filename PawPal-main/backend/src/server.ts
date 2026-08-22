import { createApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { seedDatabase } from './config/database';

async function bootstrap(): Promise<void> {
  // Initialize and seed database
  await seedDatabase();

  const app = createApp();

  const server = app.listen(env.port, () => {
    logger.info(`Zooby Backend Server running on port ${env.port} (${env.nodeEnv})`, {
      port: env.port,
      environment: env.nodeEnv,
      apiRoot: `http://localhost:${env.port}/api/v1`,
      healthCheck: `http://localhost:${env.port}/api/v1/health`
    });
  });

  // Graceful shutdown handling
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      logger.info('HTTP server closed. Exiting process.');
      process.exit(0);
    });

    // Force exit after 10s if hanging
    setTimeout(() => {
      logger.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error('Fatal error during application bootstrap:', { error: (err as Error).message });
  process.exit(1);
});
