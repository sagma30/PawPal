import { Router, Request, Response } from 'express';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { petRoutes } from './pet.routes';
import { healthEventRoutes } from './healthEvent.routes';
import { providerRoutes } from './provider.routes';
import { bookingRoutes } from './booking.routes';
import { notificationRoutes } from './notification.routes';
import { adminRoutes } from './admin.routes';
import { aiRoutes } from './ai.routes';
import { sendSuccess } from '../utils/apiResponse';

const router = Router();

// Platform Health Check
router.get('/health', (_req: Request, res: Response) => {
  sendSuccess(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  }, 'Zooby Backend Service is Operational');
});

// Modular Routes Registration
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/health-events', healthEventRoutes);
router.use('/providers', providerRoutes);
router.use('/bookings', bookingRoutes);
router.use('/notifications', notificationRoutes);
router.use('/admin', adminRoutes);
router.use('/ai', aiRoutes);

export const apiRouter = router;
