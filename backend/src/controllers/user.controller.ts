import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { sendSuccess } from '../utils/apiResponse';

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    const profile = await userService.getProfile(req.user!.userId);
    sendSuccess(res, profile, 'User profile');
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    const updated = await userService.updateProfile(req.user!.userId, req.body);
    sendSuccess(res, updated, 'Profile updated successfully');
  }
}

export const userController = new UserController();
