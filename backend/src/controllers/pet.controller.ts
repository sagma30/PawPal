import { Request, Response } from 'express';
import { petService } from '../services/pet.service';
import { sendSuccess, sendCreated } from '../utils/apiResponse';

export class PetController {
  async getAllPets(req: Request, res: Response): Promise<void> {
    const pets = await petService.getPetsForUser(req.user!.userId, req.user!.role);
    sendSuccess(res, pets, 'Pets list');
  }

  async getPetById(req: Request, res: Response): Promise<void> {
    const pet = await petService.getPetById(req.params['id']!, req.user!.userId, req.user!.role);
    sendSuccess(res, pet, 'Pet details');
  }

  async createPet(req: Request, res: Response): Promise<void> {
    const newPet = await petService.createPet(req.user!.userId, req.body);
    sendCreated(res, newPet, 'Pet profile created successfully');
  }

  async updatePet(req: Request, res: Response): Promise<void> {
    const updated = await petService.updatePet(
      req.params['id']!,
      req.user!.userId,
      req.user!.role,
      req.body
    );
    sendSuccess(res, updated, 'Pet profile updated successfully');
  }

  async deletePet(req: Request, res: Response): Promise<void> {
    await petService.deletePet(req.params['id']!, req.user!.userId, req.user!.role);
    sendSuccess(res, { deleted: true }, 'Pet profile deleted successfully');
  }
}

export const petController = new PetController();
