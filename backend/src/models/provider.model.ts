import { ServiceCategory } from '../constants/roles';

export interface ServiceProvider {
  id: string;
  userId?: string;
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
