import { healthEventRepository } from '../repositories/healthEvent.repository';
import { petRepository } from '../repositories/pet.repository';
import { notificationRepository, agendaRepository } from '../repositories/notification.repository';
import { HealthEvent } from '../models/healthEvent.model';
import { AgendaItem, NotificationUpdate } from '../models/notification.model';
import { generateId } from '../utils/idGenerator';
import { ApiError } from '../utils/apiResponse';
import { ROLES, UserRole } from '../constants/roles';

export class HealthEventService {
  async getEventsByPet(petId: string, userId: string, role: UserRole): Promise<HealthEvent[]> {
    const pet = petRepository.findById(petId);
    if (!pet) {
      throw ApiError.notFound('Pet record not found.');
    }

    if (role !== ROLES.ADMIN && pet.ownerId !== userId) {
      throw ApiError.forbidden('You do not have permission to view health records for this pet.');
    }

    return healthEventRepository.findByPet(petId);
  }

  async createHealthEvent(userId: string, data: Partial<HealthEvent>): Promise<HealthEvent> {
    const pet = petRepository.findById(data.petId!);
    if (!pet) {
      throw ApiError.notFound('Pet record not found.');
    }

    if (pet.ownerId !== userId) {
      throw ApiError.forbidden('You can only record health events for your own pets.');
    }

    const newEvent: HealthEvent = {
      id: generateId('event'),
      petId: data.petId!,
      ownerId: userId,
      eventType: data.eventType!,
      eventTitle: data.eventTitle!,
      date: data.date!,
      administeredBy: data.administeredBy!,
      notes: data.notes || '',
      reminderEnabled: !!data.reminderEnabled,
      reminderDate: data.reminderDate,
      isUpcoming: !!data.isUpcoming,
      statusBadge: data.statusBadge || (data.isUpcoming ? 'Upcoming' : 'Completed'),
      createdAt: new Date().toISOString()
    };

    const saved = healthEventRepository.save(newEvent);

    // Update pet attention & status if needed
    petRepository.update(pet.id, {
      isAttentionNeeded: newEvent.isUpcoming ? true : pet.isAttentionNeeded,
      vaccinationStatus:
        newEvent.eventType === 'vaccination' ? 'Vaccinations Up-to-date' : pet.vaccinationStatus,
      updatedAt: new Date().toISOString()
    });

    // Auto-create Agenda Item (BR-006)
    if (newEvent.isUpcoming) {
      const agendaItem: AgendaItem = {
        id: generateId('agenda'),
        userId,
        category: 'Health',
        title: `${pet.name}'s ${newEvent.eventTitle}`,
        timeText: newEvent.date,
        locationOrDoctor: newEvent.administeredBy,
        dueBadge: 'Scheduled',
        petName: pet.name,
        actionText: 'Book Vet Now',
        actionType: 'book_vet',
        createdAt: new Date().toISOString()
      };
      agendaRepository.save(agendaItem);
    }

    // Auto-create Notification Update (BR-006)
    const notification: NotificationUpdate = {
      id: generateId('notif'),
      userId,
      text: `Health event recorded: "${newEvent.eventTitle}" for ${pet.name}.`,
      time: 'Just now',
      type: 'health',
      read: false,
      createdAt: new Date().toISOString()
    };
    notificationRepository.save(notification);

    return saved;
  }

  async deleteHealthEvent(eventId: string, userId: string, role: UserRole): Promise<void> {
    const existing = healthEventRepository.findById(eventId);
    if (!existing) {
      throw ApiError.notFound('Health event not found.');
    }

    if (role !== ROLES.ADMIN && existing.ownerId !== userId) {
      throw ApiError.forbidden('You do not have permission to delete this event.');
    }

    healthEventRepository.delete(eventId);
  }
}

export const healthEventService = new HealthEventService();
