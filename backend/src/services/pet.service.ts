import { petRepository } from '../repositories/pet.repository';
import { healthEventRepository } from '../repositories/healthEvent.repository';
import { Pet } from '../models/pet.model';
import { generateId } from '../utils/idGenerator';
import { ApiError } from '../utils/apiResponse';
import { ROLES, UserRole } from '../constants/roles';

export class PetService {
  async getPetsForUser(userId: string, role: UserRole): Promise<Pet[]> {
    if (role === ROLES.ADMIN) {
      return petRepository.findAll();
    }
    return petRepository.findByOwner(userId);
  }

  async getPetById(petId: string, userId: string, role: UserRole): Promise<Pet & { healthEvents: any[] }> {
    const pet = petRepository.findById(petId);
    if (!pet) {
      throw ApiError.notFound('Pet record not found.');
    }

    if (role !== ROLES.ADMIN && pet.ownerId !== userId) {
      throw ApiError.forbidden('You do not have permission to view this pet.');
    }

    const healthEvents = healthEventRepository.findByPet(petId);
    return { ...pet, healthEvents };
  }

  async createPet(userId: string, data: Partial<Pet>): Promise<Pet> {
    const newPet: Pet = {
      id: generateId('pet'),
      ownerId: userId,
      name: data.name!,
      species: data.species!,
      breed: data.breed!,
      age: data.age!,
      weight: data.weight!,
      location: data.location || 'Mumbai',
      description: data.description || '',
      photoUrl:
        data.photoUrl ||
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=240',
      bloodGroup: data.bloodGroup || 'None Recorded',
      allergies: data.allergies || 'None Known',
      currentMedications: data.currentMedications || 'None',
      servicePreferences: data.servicePreferences || ['Grooming', 'Walking'],
      vaccinationStatus: data.vaccinationStatus || 'Up-to-date',
      healthStatusText: data.healthStatusText || 'Healthy',
      isAttentionNeeded: false,
      liveLocation: data.liveLocation || {
        city: 'Mumbai',
        state: 'MH',
        status: 'At Home',
        battery: 90,
        lastUpdated: 'Just now',
        mapImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDzYp8mpNSCoVu-nKQCOP-deMgvF0e286h4HfSGNG87U-zX9c8mhbxpJ57wSMPVqzaF5IbDCca_Kt2_pfu5wmzw9A4Zu2qZ-M9hkEBKrMKMb8kS8LqAInLRLHVNWZX0P974XenU2kJb6GvJM28Tc9ZImwW_xVkzPy1gt-_DS77DDqZNcdZcEZ0_hS2RiM6ilnoDMBpULJxavqtl8balznoWDtQEV_9eYDAUIIOj_VEABouWlKaavn5t'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return petRepository.save(newPet);
  }

  async updatePet(petId: string, userId: string, role: UserRole, updates: Partial<Pet>): Promise<Pet> {
    const existing = petRepository.findById(petId);
    if (!existing) {
      throw ApiError.notFound('Pet record not found.');
    }

    if (role !== ROLES.ADMIN && existing.ownerId !== userId) {
      throw ApiError.forbidden('You do not have permission to modify this pet.');
    }

    delete updates.id;
    delete updates.ownerId;

    const updated = petRepository.update(petId, {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    return updated!;
  }

  async deletePet(petId: string, userId: string, role: UserRole): Promise<void> {
    const existing = petRepository.findById(petId);
    if (!existing) {
      throw ApiError.notFound('Pet record not found.');
    }

    if (role !== ROLES.ADMIN && existing.ownerId !== userId) {
      throw ApiError.forbidden('You do not have permission to delete this pet.');
    }

    petRepository.delete(petId);
  }
}

export const petService = new PetService();
