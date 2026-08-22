import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';
import { petRepository } from '../repositories/pet.repository';
import { sendSuccess } from '../utils/apiResponse';

export class AiController {
  async consult(req: Request, res: Response): Promise<void> {
    const { prompt, petId, context } = req.body;

    let petContext = context;
    if (petId && !petContext) {
      const pet = petRepository.findById(petId);
      if (pet) {
        petContext = {
          species: pet.species,
          breed: pet.breed,
          age: pet.age
        };
      }
    }

    const consultation = await aiService.consult(prompt, petContext);
    sendSuccess(res, consultation, 'AI Consultation complete');
  }
}

export const aiController = new AiController();
