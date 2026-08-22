import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { authRateLimiter } from '../middlewares/rateLimiter.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateLogin, validateSignup } from '../validators/auth.validator';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

router.post(
  '/login',
  authRateLimiter,
  validateBody(validateLogin),
  asyncHandler(authController.login.bind(authController))
);

router.post(
  '/demo-login',
  authRateLimiter,
  asyncHandler(authController.demoLogin.bind(authController))
);

router.post(
  '/google',
  authRateLimiter,
  asyncHandler(authController.googleAuth.bind(authController))
);

router.post(
  '/signup',
  authRateLimiter,
  validateBody(validateSignup),
  asyncHandler(authController.signup.bind(authController))
);

router.get(
  '/me',
  authenticateJwt,
  asyncHandler(authController.getMe.bind(authController))
);

export const authRoutes = router;
