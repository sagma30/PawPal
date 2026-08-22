import { Router } from 'express';
import { healthEventController } from '../controllers/healthEvent.controller';
import { authenticateJwt, requireActiveAccount } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateCreateHealthEvent } from '../validators/healthEvent.validator';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

router.use(authenticateJwt, requireActiveAccount);

router.get('/', asyncHandler(healthEventController.getEventsByPet.bind(healthEventController)));
router.post(
  '/',
  validateBody(validateCreateHealthEvent),
  asyncHandler(healthEventController.createHealthEvent.bind(healthEventController))
);
router.delete('/:id', asyncHandler(healthEventController.deleteHealthEvent.bind(healthEventController)));

export const healthEventRoutes = router;
