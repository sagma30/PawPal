import { BaseRepository } from './base.repository';
import { Pet } from '../models/pet.model';

class PetRepository extends BaseRepository<Pet> {
  findByOwner(ownerId: string): Pet[] {
    return this.findWhere(p => p.ownerId === ownerId);
  }

  findByOwnerAndId(ownerId: string, petId: string): Pet | undefined {
    return this.findOneWhere(p => p.id === petId && p.ownerId === ownerId);
  }
}

export const petRepository = new PetRepository();
