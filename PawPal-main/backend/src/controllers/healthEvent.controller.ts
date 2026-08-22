import { Request, Response } from 'express';
import { healthEventService } from '../services/healthEvent.service';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export class HealthEventController {
  async getEventsByPet(req: Request, res: Response): Promise<void> {
    const petId = (req.query['petId'] as string) || req.params['petId'];
    if (!petId) {
      sendSuccess(res, [], 'Health events');
      return;
    }
    const events = await healthEventService.getEventsByPet(petId, req.user!.userId, req.user!.role);
    sendSuccess(res, events, 'Health events');
  }

  async createHealthEvent(req: Request, res: Response): Promise<void> {
    const event = await healthEventService.createHealthEvent(req.user!.userId, req.body);
    sendCreated(res, event, 'Health event recorded successfully');
  }

  async deleteHealthEvent(req: Request, res: Response): Promise<void> {
    await healthEventService.deleteHealthEvent(req.params['id']!, req.user!.userId, req.user!.role);
    sendSuccess(res, { deleted: true }, 'Health event removed');
  }
}

export const healthEventController = new HealthEventController();
