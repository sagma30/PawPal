import { BaseRepository } from './base.repository';
import { HealthEvent } from '../models/healthEvent.model';

class HealthEventRepository extends BaseRepository<HealthEvent> {
  findByPet(petId: string): HealthEvent[] {
    return this.findWhere(e => e.petId === petId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  findByOwner(ownerId: string): HealthEvent[] {
    return this.findWhere(e => e.ownerId === ownerId);
  }
}

export const healthEventRepository = new HealthEventRepository();
