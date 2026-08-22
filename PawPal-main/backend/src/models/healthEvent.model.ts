import { HealthEventType } from '../constants/roles';

export interface HealthEvent {
  id: string;
  petId: string;
  ownerId: string;
  eventType: HealthEventType;
  eventTitle: string;
  date: string;
  administeredBy: string;
  notes: string;
  reminderEnabled: boolean;
  reminderDate?: string;
  isUpcoming?: boolean;
  statusBadge?: string;
  createdAt: string;
}
