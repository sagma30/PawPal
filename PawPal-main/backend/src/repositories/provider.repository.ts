import { BaseRepository } from './base.repository';
import { ServiceProvider } from '../models/provider.model';
import { ServiceCategory } from '../constants/roles';

class ProviderRepository extends BaseRepository<ServiceProvider> {
  findByCategory(category: ServiceCategory): ServiceProvider[] {
    return this.findWhere(p => p.category === category);
  }

  findVerified(): ServiceProvider[] {
    return this.findWhere(p => p.isVerified);
  }

  search(opts: {
    category?: ServiceCategory;
    city?: string;
    maxPrice?: number;
    minRating?: number;
    search?: string;
  }): ServiceProvider[] {
    return this.findAll().filter(p => {
      if (opts.category && p.category !== opts.category) return false;
      if (opts.city && !p.city.toLowerCase().includes(opts.city.toLowerCase())) return false;
      if (opts.maxPrice !== undefined && p.priceNumber > opts.maxPrice) return false;
      if (opts.minRating !== undefined && p.rating < opts.minRating) return false;
      if (opts.search) {
        const term = opts.search.toLowerCase();
        if (!p.name.toLowerCase().includes(term) && !p.bio.toLowerCase().includes(term)) return false;
      }
      return true;
    });
  }
}

export const providerRepository = new ProviderRepository();
