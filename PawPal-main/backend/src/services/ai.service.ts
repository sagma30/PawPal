import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env';
import { logger } from '../config/logger';

export class AiService {
  private aiClient: GoogleGenAI | null = null;

  constructor() {
    if (env.geminiApiKey && env.geminiApiKey !== 'MY_GEMINI_API_KEY') {
      try {
        this.aiClient = new GoogleGenAI({ apiKey: env.geminiApiKey });
      } catch (err) {
        logger.warn('Failed to initialize Gemini AI client:', { error: (err as Error).message });
      }
    }
  }

  async consult(prompt: string, context?: { species?: string; breed?: string; age?: string }): Promise<{
    advice: string;
    recommendedAction: string;
    urgency: 'Low' | 'Medium' | 'High' | 'Emergency';
  }> {
    const petContextStr = context
      ? `Pet Profile: ${context.species || 'Pet'}, Breed: ${context.breed || 'Unknown'}, Age: ${context.age || 'Unknown'}`
      : 'Pet Profile: General';

    // 1. If Gemini AI is active and key is provided, execute prompt with Gemini
    if (this.aiClient) {
      try {
        const response = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are Zooby's Senior Veterinary Care Advisor. Provide compassionate, evidence-based, safe pet health guidance for the following inquiry:
Context: ${petContextStr}
Inquiry: ${prompt}

Format your reply clearly with:
1. Immediate observations & care tips
2. Suggested next steps
3. Clear medical disclaimer noting that you do not replace a licensed veterinarian.`
                }
              ]
            }
          ]
        });

        const text = response.text || 'Ensure your pet remains hydrated and observe symptoms.';
        const lowerText = text.toLowerCase();
        let urgency: 'Low' | 'Medium' | 'High' | 'Emergency' = 'Low';
        let action = 'Routine Observation';

        if (lowerText.includes('emergency') || lowerText.includes('immediate') || lowerText.includes('poison')) {
          urgency = 'Emergency';
          action = 'Contact Emergency Vet Clinic';
        } else if (lowerText.includes('urgent') || lowerText.includes('vet visit') || lowerText.includes('infection')) {
          urgency = 'Medium';
          action = 'Schedule Vet Consultation';
        }

        return {
          advice: text,
          recommendedAction: action,
          urgency
        };
      } catch (error) {
        logger.error('Gemini API call failed, falling back to local clinical knowledgebase:', {
          error: (error as Error).message
        });
      }
    }

    // 2. Intelligent Fallback Knowledgebase
    const lowerPrompt = prompt.toLowerCase();
    let advice = `Based on your pet's profile (${context?.species || 'Pet'}, ${context?.breed || 'General'}), ensure access to fresh water and keep them in a calm, temperature-controlled environment.`;
    let recommendedAction = 'Monitor for 24 hours';
    let urgency: 'Low' | 'Medium' | 'High' | 'Emergency' = 'Low';

    if (lowerPrompt.includes('itch') || lowerPrompt.includes('scratch') || lowerPrompt.includes('skin')) {
      advice = `Mild itching or ear scratching in ${context?.breed || 'pets'} is frequently linked to seasonal allergies, ear mite buildup, or sensitivity to food proteins. Avoid cleaning deep into the ear canal with cotton swabs. Check the skin for redness, hot spots, or flaking.`;
      recommendedAction = 'Book Grooming Spa or Vet Consult';
      urgency = 'Low';
    } else if (lowerPrompt.includes('vomit') || lowerPrompt.includes('diarrhea') || lowerPrompt.includes('stomach')) {
      advice = `Withhold solid food for 4-6 hours while offering small amounts of fresh water to prevent dehydration. If symptoms persist for more than 12 hours or lethargy develops, veterinary diagnostics are advised.`;
      recommendedAction = 'Schedule Vet Consult';
      urgency = 'Medium';
    } else if (lowerPrompt.includes('vaccine') || lowerPrompt.includes('shot') || lowerPrompt.includes('rabies')) {
      advice = `Core vaccinations (such as Rabies and DHPP/FVRCP) provide essential protection. Routine annual booster checks ensure continuous antibody coverage.`;
      recommendedAction = 'Book Vaccination Checkup';
      urgency = 'Low';
    } else if (lowerPrompt.includes('food') || lowerPrompt.includes('diet') || lowerPrompt.includes('eat')) {
      advice = `A balanced diet tailored to your ${context?.species || 'pet'}'s life stage and weight is vital. Always transition onto new food brands gradually over 7 days to avoid gastrointestinal upset.`;
      recommendedAction = 'Nutrition Routine';
      urgency = 'Low';
    }

    return {
      advice: `${advice}\n\n*Note: This automated advisor guidance is for informational care purposes and does not replace in-person veterinary examination.*`,
      recommendedAction,
      urgency
    };
  }
}

export const aiService = new AiService();
