import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { emailOrPhone, password } = req.body;
    const result = await authService.login(emailOrPhone, password);
    sendSuccess(res, result, 'Login successful');
  }

  async demoLogin(req: Request, res: Response): Promise<void> {
    const { role } = req.body;
    const result = await authService.demoLogin(role);
    sendSuccess(res, result, `Logged in as demo ${role}`);
  }

  async googleAuth(req: Request, res: Response): Promise<void> {
    const { profile } = req.body;
    const result = await authService.googleAuth(profile);
    sendSuccess(res, result, 'Google authentication successful');
  }

  async signup(req: Request, res: Response): Promise<void> {
    const result = await authService.signup(req.body);
    sendCreated(res, result, 'Account registered successfully');
  }

  async getMe(req: Request, res: Response): Promise<void> {
    const user = await authService.getMe(req.user!.userId);
    sendSuccess(res, user, 'Current user profile');
  }
}

export const authController = new AuthController();
