import { Request, Response } from 'express';
import { bookingService } from '../services/booking.service';
import { BookingStatus } from '../constants/roles';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export class BookingController {
  async getBookings(req: Request, res: Response): Promise<void> {
    const bookings = await bookingService.getBookingsForUser(req.user!.userId, req.user!.role);
    sendSuccess(res, bookings, 'Bookings list');
  }

  async createBooking(req: Request, res: Response): Promise<void> {
    const booking = await bookingService.createBooking(req.user!.userId, req.body);
    sendCreated(res, booking, 'Booking created and confirmed successfully');
  }

  async updateBookingStatus(req: Request, res: Response): Promise<void> {
    const status = req.body.status as BookingStatus;
    const updated = await bookingService.updateBookingStatus(
      req.params['id']!,
      status,
      req.user!.userId,
      req.user!.role
    );
    sendSuccess(res, updated, `Booking status updated to ${status}`);
  }
}

export const bookingController = new BookingController();
