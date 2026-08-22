import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { authenticateJwt, requireActiveAccount } from '../middlewares/auth.middleware';
import { requireRoles } from '../middlewares/role.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateUpdateUserStatus, validateReviewVerification } from '../validators/admin.validator';
import { ROLES } from '../constants/roles';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

// Strictly ADMIN only routes (BR-001)
router.use(authenticateJwt, requireActiveAccount, requireRoles(ROLES.ADMIN));

router.get('/users', asyncHandler(adminController.getAllUsers.bind(adminController)));
router.post('/users', asyncHandler(adminController.createAdminUser.bind(adminController)));
router.patch(
  '/users/:id/status',
  validateBody(validateUpdateUserStatus),
  asyncHandler(adminController.updateUserStatus.bind(adminController))
);

router.get('/verifications', asyncHandler(adminController.getVerifications.bind(adminController)));
router.patch(
  '/verifications/:id/review',
  validateBody(validateReviewVerification),
  asyncHandler(adminController.reviewVerification.bind(adminController))
);

router.get('/analytics', asyncHandler(adminController.getAnalytics.bind(adminController)));

export const adminRoutes = router;
