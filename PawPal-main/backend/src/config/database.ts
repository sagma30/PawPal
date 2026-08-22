import { userRepository } from '../repositories/user.repository';
import { petRepository } from '../repositories/pet.repository';
import { healthEventRepository } from '../repositories/healthEvent.repository';
import { providerRepository } from '../repositories/provider.repository';
import { bookingRepository } from '../repositories/booking.repository';
import { notificationRepository, agendaRepository } from '../repositories/notification.repository';
import { verificationRepository } from '../repositories/verification.repository';
import { User } from '../models/user.model';
import { Pet } from '../models/pet.model';
import { HealthEvent } from '../models/healthEvent.model';
import { ServiceProvider } from '../models/provider.model';
import { Booking } from '../models/booking.model';
import { NotificationUpdate, AgendaItem } from '../models/notification.model';
import { ProviderVerification } from '../models/verification.model';
import { hashPassword } from '../utils/password';
import { logger } from './logger';

async function seedDatabase(): Promise<void> {
  logger.info('Seeding database with demo data...');

  // ── Users ──────────────────────────────────────────────────────────────────
  const parentHash = await hashPassword('parent123');
  const providerHash = await hashPassword('provider123');
  const adminHash = await hashPassword('admin123');

  const users: User[] = [
    {
      id: 'usr-parent-demo',
      name: 'Rohan Deshmukh',
      email: 'parent@zooby.demo',
      phone: '+91 98201 23456',
      passwordHash: parentHash,
      role: 'PET_PARENT',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
      location: 'Bandra West, Mumbai',
      primaryAddress: 'Bandra West, Mumbai 400050',
      status: 'Active',
      isVerified: true,
      joinedDate: 'January 2025',
      paymentMethod: { brand: 'Visa', last4: '4242', expiry: '09/28' },
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
      id: 'usr-provider-demo',
      name: 'Dr. Aarav Mehta',
      email: 'provider@zooby.demo',
      phone: '+91 98330 44556',
      passwordHash: providerHash,
      role: 'PROVIDER',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=240',
      location: 'Khar West, Mumbai',
      status: 'Active',
      businessName: 'Paws & Claws Veterinary Wellness Clinic',
      serviceCategory: 'vet_consult',
      isVerified: true,
      rating: 4.95,
      joinedDate: 'March 2024',
      createdAt: '2024-03-01T00:00:00.000Z',
      updatedAt: '2024-03-01T00:00:00.000Z',
    },
    {
      id: 'usr-admin-demo',
      name: 'Priya Sharma',
      email: 'admin@zooby.demo',
      phone: '+91 98000 11223',
      passwordHash: adminHash,
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240',
      location: 'Zooby Mumbai HQ',
      status: 'Active',
      isVerified: true,
      joinedDate: 'November 2023',
      createdAt: '2023-11-01T00:00:00.000Z',
      updatedAt: '2023-11-01T00:00:00.000Z',
    },
    {
      id: 'usr-parent-aditi',
      name: 'Aditi Sharma',
      email: 'aditi.sharma@example.com',
      phone: '+91 98765 43210',
      passwordHash: await hashPassword('aditi123'),
      role: 'PET_PARENT',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240',
      location: 'Mumbai',
      primaryAddress: '1402, Sea View Apartments, Bandra West, Mumbai 400050',
      status: 'Active',
      isVerified: true,
      joinedDate: 'Jan 12, 2024',
      paymentMethod: { brand: 'Visa', last4: '4242', expiry: '09/25' },
      createdAt: '2024-01-12T00:00:00.000Z',
      updatedAt: '2024-01-12T00:00:00.000Z',
    },
    {
      id: 'usr-parent-vikram',
      name: 'Vikram Patel',
      email: 'vikram.patel@gmail.com',
      phone: '+91 98199 11223',
      passwordHash: await hashPassword('vikram123'),
      role: 'PET_PARENT',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240',
      location: 'Mumbai',
      primaryAddress: '7B, Sagar Darshan, Worli Sea Face, Mumbai 400030',
      status: 'Active',
      isVerified: true,
      joinedDate: 'Nov 18, 2023',
      paymentMethod: { brand: 'Visa', last4: '1092', expiry: '04/27' },
      createdAt: '2023-11-18T00:00:00.000Z',
      updatedAt: '2023-11-18T00:00:00.000Z',
    },
    {
      id: 'usr-parent-pooja',
      name: 'Pooja Deshmukh',
      email: 'pooja.d@example.com',
      phone: '+91 97654 32190',
      passwordHash: await hashPassword('pooja123'),
      role: 'PET_PARENT',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=240',
      location: 'Delhi',
      primaryAddress: 'House 88, Vasant Vihar, New Delhi 110057',
      status: 'Suspended',
      isVerified: true,
      joinedDate: 'Aug 04, 2023',
      paymentMethod: { brand: 'MasterCard', last4: '5543', expiry: '02/25' },
      createdAt: '2023-08-04T00:00:00.000Z',
      updatedAt: '2023-10-01T00:00:00.000Z',
    },
  ];
  userRepository.seed(users);

  // ── Pets ───────────────────────────────────────────────────────────────────
  const pets: Pet[] = [
    {
      id: 'pet-bruno',
      ownerId: 'usr-parent-demo',
      name: 'Bruno',
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '3 Years',
      weight: '32 kg',
      location: 'Mumbai',
      description: 'Bruno is a lively, gentle Golden Retriever who loves morning park walks, chasing tennis balls, and socializing with other friendly dogs.',
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDd24ewJ-i4Pr3VfEc7UxESy2_J8KQBgWsvdAV_XYvL3hisMidta-8dXYMSna32Xhqoar3nvwcgeOCEeDnvWSKVLeKTFDeIGuqDEQmURYDhyqFSOsyOQcKQI1MYD0nSJtbH_1Pg9gFddQiVouOH-z5aT8_86OTDkHzMMFBpB7Mz1mgUw102TzJAPsQ4cVOIBKq4gva2D7ODuO9eIEl1DSeBEmnICKm4spJRe9gUH1f3vBpaUl-oB16',
      bloodGroup: 'DEA 1.1 Positive',
      allergies: 'None Known',
      currentMedications: 'Heartworm Preventative (Monthly, Next due: Sept 15, 2026)',
      servicePreferences: ['Grooming', 'Walking'],
      vaccinationStatus: 'Vaccinations Up-to-date',
      healthStatusText: 'Healthy',
      isAttentionNeeded: false,
      liveLocation: { city: 'Mumbai', state: 'MH', status: 'At Home', battery: 85, lastUpdated: 'Just now', mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzYp8mpNSCoVu-nKQCOP-deMgvF0e286h4HfSGNG87U-zX9c8mhbxpJ57wSMPVqzaF5IbDCca_Kt2_pfu5wmzw9A4Zu2qZ-M9hkEBKrMKMb8kS8LqAInLRLHVNWZX0P974XenU2kJb6GvJM28Tc9ZImwW_xVkzPy1gt-_DS77DDqZNcdZcEZ0_hS2RiM6ilnoDMBpULJxavqtl8balznoWDtQEV_9eYDAUIIOj_VEABouWlKaavn5t' },
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
      id: 'pet-luna',
      ownerId: 'usr-parent-demo',
      name: 'Luna',
      species: 'Cat',
      breed: 'Persian Cat',
      age: '2 Years',
      weight: '4.5 kg',
      location: 'Mumbai',
      description: 'Luna is a gentle and affectionate Persian who loves lounging in sunny spots and requires regular grooming.',
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDARmREAm6zMpz5OuLTAr9xEsIGTXzOnLXiRFe2Td8NAXt4B1txJiP-qfwtf0rE6zYuZaOYl77W1d-098bh19_ZLvc6LtxdVNSpFqkAA21FS_12okyMzcgwxIjlGI0OLeh086CW6jctG-CdTiCD-4M6tFMHqMS3IEfU0HuLK865GcSqK__PkaAmVwUNtSw1QkrnP4Eh5QW3BiQo1D6-uHnVs2qnhI4QnQtUL1kUxF-lZwLMYg6bsJCx',
      bloodGroup: 'Type A',
      allergies: 'None Known',
      currentMedications: 'None',
      servicePreferences: ['Grooming', 'Sitting'],
      vaccinationStatus: 'De-worming Due Soon',
      healthStatusText: 'Healthy',
      isAttentionNeeded: true,
      liveLocation: { city: 'Mumbai', state: 'MH', status: 'At Home', battery: 92, lastUpdated: '2 mins ago', mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzYp8mpNSCoVu-nKQCOP-deMgvF0e286h4HfSGNG87U-zX9c8mhbxpJ57wSMPVqzaF5IbDCca_Kt2_pfu5wmzw9A4Zu2qZ-M9hkEBKrMKMb8kS8LqAInLRLHVNWZX0P974XenU2kJb6GvJM28Tc9ZImwW_xVkzPy1gt-_DS77DDqZNcdZcEZ0_hS2RiM6ilnoDMBpULJxavqtl8balznoWDtQEV_9eYDAUIIOj_VEABouWlKaavn5t' },
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
      id: 'pet-tommy',
      ownerId: 'usr-parent-demo',
      name: 'Tommy',
      species: 'Dog',
      breed: 'Terrier Mix',
      age: '4 Years',
      weight: '14 kg',
      location: 'Mumbai',
      description: 'Tommy is an active, curious terrier mix with high energy.',
      photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4u8Ahmf-oID75JfyI_cB9ZIj2JQAa2ypxMfArBRaGN2OlXT1LLhsqf596dRnc3a51NJkkN8j1GpfVRxB2FrSZHuy844Lch2xnBdxvDY10vaKdM4kJLW0u6U0frBES-HR76fkGbId8ET17GOrUFyxa940JYoCSBBDBOergl7uWj8u4Y-EKrLehndZdsELFTGIP-Ph7lvMflK0s0RiU04c-wFAzjkIrCP1frGjNAgl6SRD1m3Ca-ozG',
      bloodGroup: 'DEA 1.2 Positive',
      allergies: 'Chicken Protein (Mild sensitivity)',
      currentMedications: 'Omega-3 Joint Supplement',
      servicePreferences: ['Walking', 'Vet Consult'],
      vaccinationStatus: 'Rabies Booster Scheduled',
      healthStatusText: 'Healthy',
      isAttentionNeeded: false,
      liveLocation: { city: 'Mumbai', state: 'MH', status: 'On a Walk', battery: 78, lastUpdated: '5 mins ago', mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzYp8mpNSCoVu-nKQCOP-deMgvF0e286h4HfSGNG87U-zX9c8mhbxpJ57wSMPVqzaF5IbDCca_Kt2_pfu5wmzw9A4Zu2qZ-M9hkEBKrMKMb8kS8LqAInLRLHVNWZX0P974XenU2kJb6GvJM28Tc9ZImwW_xVkzPy1gt-_DS77DDqZNcdZcEZ0_hS2RiM6ilnoDMBpULJxavqtl8balznoWDtQEV_9eYDAUIIOj_VEABouWlKaavn5t' },
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
  ];
  petRepository.seed(pets);

  // ── Health Events ──────────────────────────────────────────────────────────
  const healthEvents: HealthEvent[] = [
    { id: 'event-b1', petId: 'pet-bruno', ownerId: 'usr-parent-demo', eventType: 'vaccination', eventTitle: 'DHPP Vaccine', date: '2026-08-01', administeredBy: 'Paws & Claws Clinic', notes: 'Annual booster completed. No adverse reactions observed.', reminderEnabled: false, statusBadge: 'Status: Completed', createdAt: '2026-08-01T00:00:00.000Z' },
    { id: 'event-b2', petId: 'pet-bruno', ownerId: 'usr-parent-demo', eventType: 'routine_checkup', eventTitle: 'Routine Checkup', date: '2026-07-15', administeredBy: 'Dr. Sharma, Paws & Claws Clinic', notes: 'Overall health excellent. Weight stable at 30kg.', reminderEnabled: false, createdAt: '2026-07-15T00:00:00.000Z' },
    { id: 'event-l1', petId: 'pet-luna', ownerId: 'usr-parent-demo', eventType: 'medication', eventTitle: 'De-worming Due Soon', date: '2026-08-23', administeredBy: 'Dr. Sharma / Home Care', notes: "Luna's regular de-worming treatment is due next week.", reminderEnabled: true, reminderDate: '2026-08-23', isUpcoming: true, statusBadge: 'Upcoming', createdAt: '2026-08-20T00:00:00.000Z' },
    { id: 'event-t1', petId: 'pet-tommy', ownerId: 'usr-parent-demo', eventType: 'vaccination', eventTitle: 'Annual Rabies Shot', date: '2026-08-25', administeredBy: 'Happy Paws Clinic', notes: 'Scheduled for 3-year rabies booster.', reminderEnabled: true, reminderDate: '2026-08-25', isUpcoming: true, statusBadge: 'Upcoming', createdAt: '2026-08-18T00:00:00.000Z' },
  ];
  healthEventRepository.seed(healthEvents);

  // ── Service Providers ──────────────────────────────────────────────────────
  const providers: ServiceProvider[] = [
    { id: 'prov-1', userId: 'usr-provider-demo', name: 'Paws & Claws Spa & Salon', category: 'grooming', title: 'Luxury Grooming, Bathing & Coat Styling', rating: 4.9, reviewCount: 148, priceFormatted: '₹1,299', priceNumber: 1299, city: 'Mumbai', area: 'Bandra West & Juhu', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600', isVerified: true, badge: 'Top Rated Spa', bio: 'Certified master groomers with organic pet-safe shampoos, de-shedding treatments, ear cleaning, and styling.', availableDays: ['Today', 'Tomorrow', 'This Weekend'], slots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'] },
    { id: 'prov-2', name: 'Dr. Sharma, Paws & Claws Clinic', category: 'vet_consult', title: 'General Wellness, Vaccinations & Diagnostics', rating: 5.0, reviewCount: 230, priceFormatted: '₹850', priceNumber: 850, city: 'Mumbai', area: 'Khar & Santacruz', image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600', isVerified: true, badge: '15+ Yrs Experience', bio: 'Gold-standard veterinary care, health certification, preventive health screening.', availableDays: ['Today', 'Tomorrow', 'Friday'], slots: ['09:30 AM', '11:00 AM', '03:00 PM', '05:30 PM'] },
    { id: 'prov-3', name: 'Mumbai Wag Walkers Co.', category: 'walking', title: 'Daily Solo & Pack Fitness Walks with GPS Tracking', rating: 4.8, reviewCount: 94, priceFormatted: '₹450 / walk', priceNumber: 450, city: 'Mumbai', area: 'Colaba, Marine Drive & Worli', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600', isVerified: true, badge: 'GPS Tracked', bio: 'Professional trained dog handlers with verified background checks.', availableDays: ['Everyday'], slots: ['07:00 AM', '08:30 AM', '05:30 PM', '07:00 PM'] },
    { id: 'prov-4', name: 'Cozy Feline & Canine Home Sitter', category: 'sitting', title: 'Loving In-Home Pet Sitting & Overnight Care', rating: 4.9, reviewCount: 76, priceFormatted: '₹1,500 / day', priceNumber: 1500, city: 'Mumbai', area: 'Powai, Andheri East & Thane', image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600', isVerified: true, badge: 'Verified Home Sitter', bio: 'Stress-free home environment sitting with regular photo updates.', availableDays: ['This Weekend', 'Next Week'], slots: ['Full Day (9 AM - 6 PM)', 'Overnight Stay'] },
  ];
  providerRepository.seed(providers);

  // ── Bookings ───────────────────────────────────────────────────────────────
  const bookings: Booking[] = [
    { id: 'bk-101', bookingRef: 'PW-882194', customerId: 'usr-parent-demo', petId: 'pet-bruno', petName: 'Bruno', petPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDd24ewJ-i4Pr3VfEc7UxESy2_J8KQBgWsvdAV_XYvL3hisMidta-8dXYMSna32Xhqoar3nvwcgeOCEeDnvWSKVLeKTFDeIGuqDEQmURYDhyqFSOsyOQcKQI1MYD0nSJtbH_1Pg9gFddQiVouOH-z5aT8_86OTDkHzMMFBpB7Mz1mgUw102TzJAPsQ4cVOIBKq4gva2D7ODuO9eIEl1DSeBEmnICKm4spJRe9gUH1f3vBpaUl-oB16', serviceCategory: 'grooming', serviceTitle: 'Luxury Grooming & Spa Session', providerId: 'prov-1', providerName: 'Paws & Claws Spa & Salon', date: 'Tomorrow, 10:00 AM', timeSlot: '10:00 AM', location: 'Bandra West, Mumbai', price: 1299, status: 'Confirmed', notes: 'Please gentle trim around paws and hypoallergenic shampoo.', createdAt: '2026-08-19T00:00:00.000Z', updatedAt: '2026-08-19T00:00:00.000Z' },
    { id: 'bk-100', bookingRef: 'PW-771209', customerId: 'usr-parent-demo', petId: 'pet-bruno', petName: 'Bruno', petPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDd24ewJ-i4Pr3VfEc7UxESy2_J8KQBgWsvdAV_XYvL3hisMidta-8dXYMSna32Xhqoar3nvwcgeOCEeDnvWSKVLeKTFDeIGuqDEQmURYDhyqFSOsyOQcKQI1MYD0nSJtbH_1Pg9gFddQiVouOH-z5aT8_86OTDkHzMMFBpB7Mz1mgUw102TzJAPsQ4cVOIBKq4gva2D7ODuO9eIEl1DSeBEmnICKm4spJRe9gUH1f3vBpaUl-oB16', serviceCategory: 'vet_consult', serviceTitle: 'Routine Health Checkup', providerId: 'prov-2', providerName: 'Dr. Sharma, Paws & Claws Clinic', date: '15 July 2026', timeSlot: '11:00 AM', location: 'Khar, Mumbai', price: 850, status: 'Completed', notes: 'General checkup completed. Weight stable.', createdAt: '2026-07-14T00:00:00.000Z', updatedAt: '2026-07-15T00:00:00.000Z' },
  ];
  bookingRepository.seed(bookings);

  // ── Notifications ──────────────────────────────────────────────────────────
  const notifications: NotificationUpdate[] = [
    { id: 'notif-1', userId: 'usr-parent-demo', text: 'Provider accepted your booking for Bruno.', time: '2 hours ago', type: 'booking', read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
    { id: 'notif-2', userId: 'usr-parent-demo', text: "Luna's health reminder: De-worming booster due in 3 days.", time: '1 day ago', type: 'reminder', read: false, createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'notif-3', userId: 'usr-parent-demo', text: 'Zooby GPS Beacon for Tommy synched successfully.', time: '2 days ago', type: 'health', read: true, createdAt: new Date(Date.now() - 172800000).toISOString() },
  ];
  notificationRepository.seed(notifications);

  // ── Agenda ─────────────────────────────────────────────────────────────────
  const agendaItems: AgendaItem[] = [
    { id: 'agenda-1', userId: 'usr-parent-demo', category: 'Grooming', title: "Bruno's Grooming", timeText: '10:00 AM', locationOrDoctor: 'Paws & Claws Spa', dueBadge: 'Tomorrow', petName: 'Bruno', actionText: 'View Details', actionType: 'view_booking', createdAt: '2026-08-19T00:00:00.000Z' },
    { id: 'agenda-2', userId: 'usr-parent-demo', category: 'Health', title: "Luna's De-worming", timeText: 'Next Week', locationOrDoctor: 'Schedule with Dr. Sharma', dueBadge: '3 Days Left', petName: 'Luna', actionText: 'Book Vet Now', actionType: 'book_vet', createdAt: '2026-08-20T00:00:00.000Z' },
  ];
  agendaRepository.seed(agendaItems);

  // ── Verifications ──────────────────────────────────────────────────────────
  const verifications: ProviderVerification[] = [
    { id: 'v-1', name: 'Jane Doe', initials: 'JD', service: 'Dog Walking', status: 'Pending', avatarBg: 'bg-green-100 text-green-800' },
    { id: 'v-2', name: 'Mark Smith', initials: 'MS', service: 'Grooming', status: 'Reviewing', avatarBg: 'bg-purple-100 text-purple-800' },
    { id: 'v-3', name: 'Alex Jones', initials: 'AJ', service: 'Pet Sitting', status: 'Pending', avatarBg: 'bg-green-100 text-green-800' },
    { id: 'v-4', name: 'Rajesh Kumar', initials: 'RK', service: 'Vet Consult', status: 'Reviewing', avatarBg: 'bg-amber-100 text-amber-800' },
  ];
  verificationRepository.seed(verifications);

  logger.info('Database seeded successfully', {
    users: userRepository.count(),
    pets: petRepository.count(),
    healthEvents: healthEventRepository.count(),
    providers: providerRepository.count(),
    bookings: bookingRepository.count(),
    notifications: notificationRepository.count(),
    verifications: verificationRepository.count(),
  });
}

export { seedDatabase };
