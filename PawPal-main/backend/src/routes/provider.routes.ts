import { Router } from 'express';
import { providerController } from '../controllers/provider.controller';
import { optionalAuth } from '../middlewares/auth.middleware';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

// Publicly searchable provider catalog
router.get('/', optionalAuth, asyncHandler(providerController.getAllProviders.bind(providerController)));
router.get('/:id', optionalAuth, asyncHandler(providerController.getProviderById.bind(providerController)));

export const providerRoutes = router;
