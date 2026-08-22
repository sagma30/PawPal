import { bookingRepository } from '../repositories/booking.repository';
import { petRepository } from '../repositories/pet.repository';
import { providerRepository } from '../repositories/provider.repository';
import { notificationRepository, agendaRepository } from '../repositories/notification.repository';
import { Booking } from '../models/booking.model';
import { BookingStatus, ROLES, UserRole } from '../constants/roles';
import { generateId, generateBookingRef } from '../utils/idGenerator';
import { ApiError } from '../utils/apiResponse';

export class BookingService {
  async getBookingsForUser(userId: string, role: UserRole): Promise<Booking[]> {
    if (role === ROLES.ADMIN) {
      return bookingRepository.findAllSorted();
    }
    if (role === ROLES.PROVIDER) {
      return bookingRepository.findByProvider(userId);
    }
    return bookingRepository.findByCustomer(userId);
  }

  async createBooking(userId: string, data: Partial<Booking>): Promise<Booking> {
    const pet = petRepository.findById(data.petId!);
    if (!pet) {
      throw ApiError.notFound('Specified pet not found.');
    }

    if (pet.ownerId !== userId) {
      throw ApiError.forbidden('You can only book services for your own pets.');
    }

    const provider = providerRepository.findById(data.providerId!);
    if (!provider) {
      throw ApiError.notFound('Selected service provider not found.');
    }

    const newBooking: Booking = {
      id: generateId('bk'),
      bookingRef: generateBookingRef(),
      customerId: userId,
      petId: pet.id,
      petName: pet.name,
      petPhoto: pet.photoUrl,
      serviceCategory: data.serviceCategory || provider.category,
      serviceTitle: data.serviceTitle || provider.title,
      providerId: provider.id,
      providerName: provider.name,
      date: data.date!,
      timeSlot: data.timeSlot!,
      location: data.location || provider.area,
      price: data.price !== undefined ? data.price : provider.priceNumber,
      status: 'Confirmed',
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = bookingRepository.save(newBooking);

    // Auto-create Agenda Item (BR-006)
    agendaRepository.save({
      id: generateId('agenda'),
      userId,
      category: newBooking.serviceCategory === 'grooming' ? 'Grooming' : 'Health',
      title: `${newBooking.petName}'s ${newBooking.serviceCategory.replace('_', ' ')}`,
      timeText: newBooking.date,
      locationOrDoctor: newBooking.providerName,
      dueBadge: 'Confirmed',
      petName: newBooking.petName,
      actionText: 'View Details',
      actionType: 'view_booking',
      createdAt: new Date().toISOString()
    });

    // Auto-create Notification Update (BR-006)
    notificationRepository.save({
      id: generateId('notif'),
      userId,
      text: `Booking confirmed: ${newBooking.serviceTitle} with ${newBooking.providerName} for ${newBooking.petName}.`,
      time: 'Just now',
      type: 'booking',
      read: false,
      createdAt: new Date().toISOString()
    });

    return saved;
  }

  async updateBookingStatus(
    bookingId: string,
    newStatus: BookingStatus,
    userId: string,
    role: UserRole
  ): Promise<Booking> {
    const booking = bookingRepository.findById(bookingId);
    if (!booking) {
      throw ApiError.notFound('Booking not found.');
    }

    // Authorization check
    if (
      role !== ROLES.ADMIN &&
      booking.customerId !== userId &&
      booking.providerId !== userId
    ) {
      throw ApiError.forbidden('You are not authorized to update this booking.');
    }

    // Terminal state protection (BR-005)
    if (booking.status === 'Completed' || booking.status === 'Cancelled') {
      throw new ApiError(
        422,
        `Cannot change status of a booking that is already ${booking.status}.`,
        'INVALID_TRANSITION'
      );
    }

    const updated = bookingRepository.update(bookingId, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });

    return updated!;
  }
}

export const bookingService = new BookingService();
