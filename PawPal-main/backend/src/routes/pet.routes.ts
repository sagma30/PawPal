import { Router } from 'express';
import { petController } from '../controllers/pet.controller';
import { authenticateJwt, requireActiveAccount } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateCreatePet, validateUpdatePet } from '../validators/pet.validator';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

router.use(authenticateJwt, requireActiveAccount);

router.get('/', asyncHandler(petController.getAllPets.bind(petController)));
router.get('/:id', asyncHandler(petController.getPetById.bind(petController)));
router.post(
  '/',
  validateBody(validateCreatePet),
  asyncHandler(petController.createPet.bind(petController))
);
router.put(
  '/:id',
  validateBody(validateUpdatePet),
  asyncHandler(petController.updatePet.bind(petController))
);
router.delete('/:id', asyncHandler(petController.deletePet.bind(petController)));

export const petRoutes = router;
