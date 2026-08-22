import { BaseRepository } from './base.repository';
import { NotificationUpdate, AgendaItem } from '../models/notification.model';

class NotificationRepository extends BaseRepository<NotificationUpdate> {
  findByUser(userId: string): NotificationUpdate[] {
    return this.findWhere(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  markRead(id: string): NotificationUpdate | undefined {
    return this.update(id, { read: true } as Partial<NotificationUpdate>);
  }

  markAllRead(userId: string): void {
    this.findByUser(userId).forEach(n => this.update(n.id, { read: true } as Partial<NotificationUpdate>));
  }

  unreadCount(userId: string): number {
    return this.findWhere(n => n.userId === userId && !n.read).length;
  }
}

class AgendaRepository extends BaseRepository<AgendaItem> {
  findByUser(userId: string): AgendaItem[] {
    return this.findWhere(a => a.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}

export const notificationRepository = new NotificationRepository();
export const agendaRepository = new AgendaRepository();
