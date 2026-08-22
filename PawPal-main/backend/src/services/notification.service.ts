import { notificationRepository, agendaRepository } from '../repositories/notification.repository';
import { NotificationUpdate, AgendaItem } from '../models/notification.model';

export class NotificationService {
  async getNotifications(userId: string): Promise<NotificationUpdate[]> {
    return notificationRepository.findByUser(userId);
  }

  async markAsRead(id: string, userId: string): Promise<NotificationUpdate | undefined> {
    const notif = notificationRepository.findById(id);
    if (!notif || notif.userId !== userId) return undefined;
    return notificationRepository.markRead(id);
  }

  async markAllAsRead(userId: string): Promise<void> {
    notificationRepository.markAllRead(userId);
  }

  async getAgenda(userId: string): Promise<AgendaItem[]> {
    return agendaRepository.findByUser(userId);
  }
}

export const notificationService = new NotificationService();
