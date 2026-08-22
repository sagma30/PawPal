import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { authenticateJwt, requireActiveAccount } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { validateCreateBooking, validateUpdateBookingStatus } from '../validators/booking.validator';
import { asyncHandler } from '../utils/apiResponse';

const router = Router();

router.use(authenticateJwt, requireActiveAccount);

router.get('/', asyncHandler(bookingController.getBookings.bind(bookingController)));
router.post(
  '/',
  validateBody(validateCreateBooking),
  asyncHandler(bookingController.createBooking.bind(bookingController))
);
router.patch(
  '/:id/status',
  validateBody(validateUpdateBookingStatus),
  asyncHandler(bookingController.updateBookingStatus.bind(bookingController))
);

export const bookingRoutes = router;
