export type PetSpecies = 'Dog' | 'Cat' | 'Other';

export interface HealthEvent {
  id: string;
  petId: string;
  eventType: 'vaccination' | 'medication' | 'vet_visit' | 'routine_checkup' | 'surgery' | 'allergy' | 'treatment' | 'other';
  eventTitle: string;
  date: string;
  administeredBy: string;
  notes: string;
  reminderEnabled: boolean;
  reminderDate?: string;
  isUpcoming?: boolean;
  statusBadge?: string;
}

export interface LiveLocationData {
  city: string;
  state: string;
  status: 'At Home' | 'On a Walk' | 'At Vet' | 'With Sitter';
  battery: number;
  lastUpdated: string;
  mapImage: string;
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: string;
  weight: string;
  location: string;
  description: string;
  photoUrl: string;
  bloodGroup: string;
  allergies: string;
  currentMedications: string;
  servicePreferences: string[];
  liveLocation: LiveLocationData;
  vaccinationStatus: string;
  healthStatusText: string;
  isAttentionNeeded?: boolean;
  healthEvents: HealthEvent[];
}

export type ServiceCategory = 'grooming' | 'walking' | 'sitting' | 'vet_consult';

export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  title: string;
  rating: number;
  reviewCount: number;
  priceFormatted: string;
  priceNumber: number;
  city: string;
  area: string;
  image: string;
  isVerified: boolean;
  bio: string;
  badge?: string;
  availableDays: string[];
  slots: string[];
}

export interface Booking {
  id: string;
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
  status: 'Requested' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  notes?: string;
  bookingRef: string;
}

export interface AgendaItem {
  id: string;
  category: 'Grooming' | 'Health' | 'Walking' | 'Sitting';
  title: string;
  timeText: string;
  locationOrDoctor: string;
  dueBadge: string;
  petName: string;
  actionText?: string;
  actionType?: 'book_vet' | 'view_booking';
}

export interface NotificationUpdate {
  id: string;
  text: string;
  time: string;
  type: 'booking' | 'health' | 'reminder';
  read: boolean;
}

export type UserRole = 'PET_PARENT' | 'PROVIDER' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl: string;
  location: string;
  role: UserRole;
  businessName?: string;
  serviceCategory?: ServiceCategory;
  isVerified?: boolean;
  rating?: number;
  joinedDate?: string;
}

export interface AdminUserPet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: string;
  avatarUrl: string;
}

export interface AdminUserBooking {
  id: string;
  service: string;
  provider: string;
  date: string;
  status: 'Completed' | 'Confirmed' | 'Pending' | 'Cancelled';
  amount: number;
}

export interface AdminUserTimeline {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'login' | 'profile' | 'pet' | 'booking' | 'system';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  location: string;
  primaryAddress: string;
  joinedDate: string;
  status: 'Active' | 'Suspended' | 'New';
  paymentMethod: {
    brand: string;
    last4: string;
    expiry: string;
  };
  pets: AdminUserPet[];
  recentBookings: AdminUserBooking[];
  activityTimeline: AdminUserTimeline[];
}

export interface ProviderVerification {
  id: string;
  name: string;
  initials: string;
  service: string;
  status: 'Pending' | 'Reviewing' | 'Approved' | 'Rejected';
  avatarBg: string;
}

export interface AdminDashboardBooking {
  id: string;
  pet: string;
  service: string;
  amount: number;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Cancelled';
}

