export type NotificationType = 'booking' | 'health' | 'reminder';

export interface NotificationUpdate {
  id: string;
  userId: string;
  text: string;
  time: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export type AgendaCategory = 'Grooming' | 'Health' | 'Walking' | 'Sitting';
export type AgendaActionType = 'book_vet' | 'view_booking';

export interface AgendaItem {
  id: string;
  userId: string;
  category: AgendaCategory;
  title: string;
  timeText: string;
  locationOrDoctor: string;
  dueBadge: string;
  petName: string;
  actionText?: string;
  actionType?: AgendaActionType;
  createdAt: string;
}
