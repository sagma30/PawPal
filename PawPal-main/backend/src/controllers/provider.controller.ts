import { Request, Response } from 'express';
import { providerService } from '../services/provider.service';
import { ServiceCategory } from '../constants/roles';
import { sendSuccess } from '../utils/apiResponse';

export class ProviderController {
  async getAllProviders(req: Request, res: Response): Promise<void> {
    const category = req.query['category'] as ServiceCategory | undefined;
    const city = req.query['city'] as string | undefined;
    const search = req.query['search'] as string | undefined;
    const maxPrice = req.query['maxPrice'] ? Number(req.query['maxPrice']) : undefined;
    const minRating = req.query['minRating'] ? Number(req.query['minRating']) : undefined;

    const providers = await providerService.getAllProviders({
      category,
      city,
      search,
      maxPrice,
      minRating
    });

    sendSuccess(res, providers, 'Service providers list');
  }

  async getProviderById(req: Request, res: Response): Promise<void> {
    const provider = await providerService.getProviderById(req.params['id']!);
    sendSuccess(res, provider, 'Service provider details');
  }
}

export const providerController = new ProviderController();
