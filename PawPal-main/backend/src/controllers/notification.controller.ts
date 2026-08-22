import { Request, Response } from 'express';
import { notificationService } from '../services/notification.service';
import { sendSuccess } from '../utils/apiResponse';

export class NotificationController {
  async getNotifications(req: Request, res: Response): Promise<void> {
    const notifications = await notificationService.getNotifications(req.user!.userId);
    sendSuccess(res, notifications, 'Notifications list');
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    const updated = await notificationService.markAsRead(req.params['id']!, req.user!.userId);
    sendSuccess(res, updated, 'Notification marked as read');
  }

  async markAllAsRead(req: Request, res: Response): Promise<void> {
    await notificationService.markAllAsRead(req.user!.userId);
    sendSuccess(res, { success: true }, 'All notifications marked as read');
  }

  async getAgenda(req: Request, res: Response): Promise<void> {
    const agenda = await notificationService.getAgenda(req.user!.userId);
    sendSuccess(res, agenda, 'Agenda items');
  }
}

export const notificationController = new NotificationController();
