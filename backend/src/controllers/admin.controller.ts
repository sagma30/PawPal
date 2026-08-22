import { Request, Response } from 'express';
import { adminService } from '../services/admin.service';
import { UserStatus, VerificationStatus } from '../constants/roles';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export class AdminController {
  async getAllUsers(_req: Request, res: Response): Promise<void> {
    const users = await adminService.getAllUsers();
    sendSuccess(res, users, 'Admin users list');
  }

  async createAdminUser(req: Request, res: Response): Promise<void> {
    const created = await adminService.createAdminUser(req.body);
    sendCreated(res, created, 'Admin user created successfully');
  }

  async updateUserStatus(req: Request, res: Response): Promise<void> {
    const status = req.body.status as UserStatus;
    const updated = await adminService.updateUserStatus(req.params['id']!, status);
    sendSuccess(res, updated, `User account status set to ${status}`);
  }

  async getVerifications(_req: Request, res: Response): Promise<void> {
    const verifications = await adminService.getVerifications();
    sendSuccess(res, verifications, 'Provider verifications queue');
  }

  async reviewVerification(req: Request, res: Response): Promise<void> {
    const status = req.body.status as VerificationStatus;
    const notes = req.body.notes as string | undefined;
    const updated = await adminService.reviewVerification(req.params['id']!, status, notes);
    sendSuccess(res, updated, `Verification marked as ${status}`);
  }

  async getAnalytics(_req: Request, res: Response): Promise<void> {
    const analytics = await adminService.getPlatformAnalytics();
    sendSuccess(res, analytics, 'Platform analytics data');
  }
}

export const adminController = new AdminController();
