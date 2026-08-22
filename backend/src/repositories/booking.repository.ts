import { BaseRepository } from './base.repository';
import { Booking } from '../models/booking.model';

class BookingRepository extends BaseRepository<Booking> {
  findByCustomer(customerId: string): Booking[] {
    return this.findWhere(b => b.customerId === customerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  findByProvider(providerId: string): Booking[] {
    return this.findWhere(b => b.providerId === providerId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  findByRef(bookingRef: string): Booking | undefined {
    return this.findOneWhere(b => b.bookingRef === bookingRef);
  }

  findAllSorted(): Booking[] {
    return this.findAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const bookingRepository = new BookingRepository();
