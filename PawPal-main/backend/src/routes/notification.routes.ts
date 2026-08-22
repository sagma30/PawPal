import { Router } from 'express';
import { notificationController } from '../controllers/notification.controller';
import { authenticateJwt, requireActiveAccount } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

router.use(authenticateJwt, requireActiveAccount);

router.get('/', asyncHandler(notificationController.getNotifications.bind(notificationController)));
router.patch('/:id/read', asyncHandler(notificationController.markAsRead.bind(notificationController)));
router.post('/mark-all-read', asyncHandler(notificationController.markAllAsRead.bind(notificationController)));
router.get('/agenda', asyncHandler(notificationController.getAgenda.bind(notificationController)));

export const notificationRoutes = router;
