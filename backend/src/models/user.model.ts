import { UserRole, ServiceCategory, UserStatus } from '../constants/roles';

export interface PaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash?: string;
  role: UserRole;
  avatarUrl: string;
  location?: string;
  primaryAddress?: string;
  status: UserStatus;
  businessName?: string;
  serviceCategory?: ServiceCategory;
  isVerified?: boolean;
  rating?: number;
  joinedDate: string;
  paymentMethod?: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

// Safe public projection — never exposes passwordHash
export type PublicUser = Omit<User, 'passwordHash'>;
