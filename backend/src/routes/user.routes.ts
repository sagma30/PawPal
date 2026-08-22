import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticateJwt, requireActiveAccount } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

router.use(authenticateJwt, requireActiveAccount);

router.get('/profile', asyncHandler(userController.getProfile.bind(userController)));
router.put('/profile', asyncHandler(userController.updateProfile.bind(userController)));

export const userRoutes = router;
