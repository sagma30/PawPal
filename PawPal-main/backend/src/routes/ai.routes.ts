import { Router } from 'express';
import { aiController } from '../controllers/ai.controller';
import { authenticateJwt, requireActiveAccount } from '../middlewares/auth.middleware';
import { aiRateLimiter } from '../middlewares/rateLimiter.middleware';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

router.use(authenticateJwt, requireActiveAccount);

router.post('/consult', aiRateLimiter, asyncHandler(aiController.consult.bind(aiController)));

export const aiRoutes = router;
