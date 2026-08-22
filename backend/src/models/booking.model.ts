import { ServiceCategory, BookingStatus } from '../constants/roles';

export interface Booking {
  id: string;
  bookingRef: string;
  customerId: string;
  petId: string;
  petName: string;
  petPhoto: string;
  serviceCategory: ServiceCategory;
  serviceTitle: string;
  providerId: string;
  providerName: string;
  date: string;
  timeSlot: string;
  location: string;
  price: number;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
