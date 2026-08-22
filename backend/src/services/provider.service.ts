import { providerRepository } from '../repositories/provider.repository';
import { ServiceProvider } from '../models/provider.model';
import { ServiceCategory } from '../constants/roles';
import { ApiError } from '../utils/apiResponse';

export class ProviderService {
  async getAllProviders(filter?: {
    category?: ServiceCategory;
    city?: string;
    maxPrice?: number;
    minRating?: number;
    search?: string;
  }): Promise<ServiceProvider[]> {
    if (!filter || Object.keys(filter).length === 0) {
      return providerRepository.findAll();
    }
    return providerRepository.search(filter);
  }

  async getProviderById(id: string): Promise<ServiceProvider> {
    const provider = providerRepository.findById(id);
    if (!provider) {
      throw ApiError.notFound('Service provider not found.');
    }
    return provider;
  }
}

export const providerService = new ProviderService();
