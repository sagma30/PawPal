import { Pet, ServiceProvider, Booking, AgendaItem, NotificationUpdate } from '../types';

export const INITIAL_PETS: Pet[] = [
  {
    id: 'pet-bruno',
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
    currentMedications: 'Heartworm Preventative (Administered monthly, Next due: Sept 15, 2026)',
    servicePreferences: ['Grooming', 'Walking'],
    vaccinationStatus: 'Vaccinations Up-to-date',
    healthStatusText: 'Healthy',
    liveLocation: {
      city: 'Mumbai',
      state: 'MH',
      status: 'At Home',
      battery: 85,
      lastUpdated: 'Just now',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzYp8mpNSCoVu-nKQCOP-deMgvF0e286h4HfSGNG87U-zX9c8mhbxpJ57wSMPVqzaF5IbDCca_Kt2_pfu5wmzw9A4Zu2qZ-M9hkEBKrMKMb8kS8LqAInLRLHVNWZX0P974XenU2kJb6GvJM28Tc9ZImwW_xVkzPy1gt-_DS77DDqZNcdZcEZ0_hS2RiM6ilnoDMBpULJxavqtl8balznoWDtQEV_9eYDAUIIOj_VEABouWlKaavn5t'
    },
    healthEvents: [
      {
        id: 'event-b1',
        petId: 'pet-bruno',
        eventType: 'vaccination',
        eventTitle: 'DHPP Vaccine',
        date: '2026-08-01',
        administeredBy: 'Paws & Claws Clinic',
        notes: 'Annual booster completed. No adverse reactions observed.',
        reminderEnabled: false,
        statusBadge: 'Status: Completed'
      },
      {
        id: 'event-b2',
        petId: 'pet-bruno',
        eventType: 'routine_checkup',
        eventTitle: 'Routine Checkup',
        date: '2026-07-15',
        administeredBy: 'Dr. Sharma, Paws & Claws Clinic',
        notes: 'Overall health excellent. Weight stable at 30kg. Coat looks healthy.',
        reminderEnabled: false
      },
      {
        id: 'event-b3',
        petId: 'pet-bruno',
        eventType: 'treatment',
        eventTitle: 'Anti-Tick Treatment',
        date: '2026-06-10',
        administeredBy: 'Home Care',
        notes: 'Administered topical solution (Bravecto). Protection valid for 3 months.',
        reminderEnabled: true,
        reminderDate: '2026-09-10'
      }
    ]
  },
  {
    id: 'pet-luna',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian Cat',
    age: '2 Years',
    weight: '4.5 kg',
    location: 'Mumbai',
    description: 'Luna is a gentle and affectionate Persian who loves lounging in sunny spots and requires regular grooming for her luxurious white coat.',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDARmREAm6zMpz5OuLTAr9xEsIGTXzOnLXiRFe2Td8NAXt4B1txJiP-qfwtf0rE6zYuZaOYl77W1d-098bh19_ZLvc6LtxdVNSpFqkAA21FS_12okyMzcgwxIjlGI0OLeh086CW6jctG-CdTiCD-4M6tFMHqMS3IEfU0HuLK865GcSqK__PkaAmVwUNtSw1QkrnP4Eh5QW3BiQo1D6-uHnVs2qnhI4QnQtUL1kUxF-lZwLMYg6bsJCx',
    bloodGroup: 'Type A',
    allergies: 'None Known',
    currentMedications: 'None',
    servicePreferences: ['Grooming', 'Sitting'],
    vaccinationStatus: 'De-worming Due Soon',
    healthStatusText: 'Healthy',
    isAttentionNeeded: true,
    liveLocation: {
      city: 'Mumbai',
      state: 'MH',
      status: 'At Home',
      battery: 92,
      lastUpdated: '2 mins ago',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzYp8mpNSCoVu-nKQCOP-deMgvF0e286h4HfSGNG87U-zX9c8mhbxpJ57wSMPVqzaF5IbDCca_Kt2_pfu5wmzw9A4Zu2qZ-M9hkEBKrMKMb8kS8LqAInLRLHVNWZX0P974XenU2kJb6GvJM28Tc9ZImwW_xVkzPy1gt-_DS77DDqZNcdZcEZ0_hS2RiM6ilnoDMBpULJxavqtl8balznoWDtQEV_9eYDAUIIOj_VEABouWlKaavn5t'
    },
    healthEvents: [
      {
        id: 'event-l1',
        petId: 'pet-luna',
        eventType: 'medication',
        eventTitle: 'De-worming Due Soon',
        date: '2026-08-23',
        administeredBy: 'Dr. Sharma / Home Care',
        notes: "Luna's regular de-worming treatment is due next week. Please consult your vet or schedule a home visit.",
        reminderEnabled: true,
        reminderDate: '2026-08-23',
        isUpcoming: true,
        statusBadge: 'Upcoming'
      },
      {
        id: 'event-l2',
        petId: 'pet-luna',
        eventType: 'routine_checkup',
        eventTitle: 'Routine Checkup',
        date: '2026-05-18',
        administeredBy: 'Dr. Smith, City Vet Clinic',
        notes: 'General physical examination completed. Weight and vitals normal. Luna is in great health.',
        reminderEnabled: false
      },
      {
        id: 'event-l3',
        petId: 'pet-luna',
        eventType: 'vaccination',
        eventTitle: 'FVRCP Vaccine',
        date: '2026-04-12',
        administeredBy: 'City Vet Clinic',
        notes: 'Annual Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia booster administered.',
        reminderEnabled: false
      }
    ]
  },
  {
    id: 'pet-tommy',
    name: 'Tommy',
    species: 'Dog',
    breed: 'Terrier Mix',
    age: '4 Years',
    weight: '14 kg',
    location: 'Mumbai',
    description: 'Tommy is an active, curious terrier mix with high energy and an inquisitive personality. Loves agility training and outdoor trails.',
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4u8Ahmf-oID75JfyI_cB9ZIj2JQAa2ypxMfArBRaGN2OlXT1LLhsqf596dRnc3a51NJkkN8j1GpfVRxB2FrSZHuy844Lch2xnBdxvDY10vaKdM4kJLW0u6U0frBES-HR76fkGbId8ET17GOrUFyxa940JYoCSBBDBOergl7uWj8u4Y-EKrLehndZdsELFTGIP-Ph7lvMflK0s0RiU04c-wFAzjkIrCP1frGjNAgl6SRD1m3Ca-ozG',
    bloodGroup: 'DEA 1.2 Positive',
    allergies: 'Chicken Protein (Mild sensitivity)',
    currentMedications: 'Omega-3 Joint Supplement',
    servicePreferences: ['Walking', 'Vet Consult'],
    vaccinationStatus: 'Rabies Booster Scheduled',
    healthStatusText: 'Healthy',
    liveLocation: {
      city: 'Mumbai',
      state: 'MH',
      status: 'On a Walk',
      battery: 78,
      lastUpdated: '5 mins ago',
      mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzYp8mpNSCoVu-nKQCOP-deMgvF0e286h4HfSGNG87U-zX9c8mhbxpJ57wSMPVqzaF5IbDCca_Kt2_pfu5wmzw9A4Zu2qZ-M9hkEBKrMKMb8kS8LqAInLRLHVNWZX0P974XenU2kJb6GvJM28Tc9ZImwW_xVkzPy1gt-_DS77DDqZNcdZcEZ0_hS2RiM6ilnoDMBpULJxavqtl8balznoWDtQEV_9eYDAUIIOj_VEABouWlKaavn5t'
    },
    healthEvents: [
      {
        id: 'event-t1',
        petId: 'pet-tommy',
        eventType: 'vaccination',
        eventTitle: 'Annual Rabies Shot',
        date: '2026-08-25',
        administeredBy: 'Happy Paws Clinic',
        notes: 'Scheduled for 3-year rabies booster. Pre-check vitals scheduled.',
        reminderEnabled: true,
        reminderDate: '2026-08-25',
        isUpcoming: true,
        statusBadge: 'Upcoming'
      },
      {
        id: 'event-t2',
        petId: 'pet-tommy',
        eventType: 'routine_checkup',
        eventTitle: 'Dental Scaling & Polish',
        date: '2026-03-10',
        administeredBy: 'Happy Paws Clinic',
        notes: 'Plaque removed from upper molars. Gums healthy with no gingivitis.',
        reminderEnabled: false
      }
    ]
  }
];

export const SERVICE_PROVIDERS: ServiceProvider[] = [
  {
    id: 'prov-1',
    name: 'Paws & Claws Spa & Salon',
    category: 'grooming',
    title: 'Luxury Grooming, Bathing & Coat Styling',
    rating: 4.9,
    reviewCount: 148,
    priceFormatted: '₹1,299',
    priceNumber: 1299,
    city: 'Mumbai',
    area: 'Bandra West & Juhu',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    badge: 'Top Rated Spa',
    bio: 'Certified master groomers with organic pet-safe shampoos, de-shedding treatments, ear cleaning, and styling.',
    availableDays: ['Today', 'Tomorrow', 'This Weekend'],
    slots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: 'prov-2',
    name: 'Dr. Sharma, Paws & Claws Clinic',
    category: 'vet_consult',
    title: 'General Wellness, Vaccinations & Diagnostics',
    rating: 5.0,
    reviewCount: 230,
    priceFormatted: '₹850',
    priceNumber: 850,
    city: 'Mumbai',
    area: 'Khar & Santacruz',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    badge: '15+ Yrs Experience',
    bio: 'Gold-standard veterinary care, health certification, preventive health screening, and compassionate pet consultations.',
    availableDays: ['Today', 'Tomorrow', 'Friday'],
    slots: ['09:30 AM', '11:00 AM', '03:00 PM', '05:30 PM']
  },
  {
    id: 'prov-3',
    name: 'Mumbai Wag Walkers Co.',
    category: 'walking',
    title: 'Daily Solo & Pack Fitness Walks with GPS Tracking',
    rating: 4.8,
    reviewCount: 94,
    priceFormatted: '₹450 / walk',
    priceNumber: 450,
    city: 'Mumbai',
    area: 'Colaba, Marine Drive & Worli',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    badge: 'GPS Tracked',
    bio: 'Professional trained dog handlers with verified background checks, hydration breaks, and live route sharing.',
    availableDays: ['Everyday'],
    slots: ['07:00 AM', '08:30 AM', '05:30 PM', '07:00 PM']
  },
  {
    id: 'prov-4',
    name: 'Cozy Feline & Canine Home Sitter',
    category: 'sitting',
    title: 'Loving In-Home Pet Sitting & Overnight Care',
    rating: 4.9,
    reviewCount: 76,
    priceFormatted: '₹1,500 / day',
    priceNumber: 1500,
    city: 'Mumbai',
    area: 'Powai, Andheri East & Thane',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=600',
    isVerified: true,
    badge: 'Verified Home Sitter',
    bio: 'Stress-free home environment sitting with regular photo updates, personalized feeding routines, and playtime.',
    availableDays: ['This Weekend', 'Next Week'],
    slots: ['Full Day (9 AM - 6 PM)', 'Overnight Stay']
  }
];

export const INITIAL_AGENDA: AgendaItem[] = [
  {
    id: 'agenda-1',
    category: 'Grooming',
    title: "Bruno's Grooming",
    timeText: '10:00 AM',
    locationOrDoctor: 'Paws & Claws Spa',
    dueBadge: 'Tomorrow',
    petName: 'Bruno',
    actionText: 'View Details',
    actionType: 'view_booking'
  },
  {
    id: 'agenda-2',
    category: 'Health',
    title: "Luna's De-worming",
    timeText: 'Next Week',
    locationOrDoctor: 'Schedule with Dr. Sharma',
    dueBadge: '3 Days Left',
    petName: 'Luna',
    actionText: 'Book Vet Now',
    actionType: 'book_vet'
  }
];

export const INITIAL_UPDATES: NotificationUpdate[] = [
  {
    id: 'up-1',
    text: 'Provider accepted your booking for Bruno.',
    time: '2 hours ago',
    type: 'booking',
    read: false
  },
  {
    id: 'up-2',
    text: "Luna's health reminder: De-worming booster due in 3 days.",
    time: '1 day ago',
    type: 'reminder',
    read: false
  },
  {
    id: 'up-3',
    text: 'Zooby GPS Beacon for Tommy synched successfully.',
    time: '2 days ago',
    type: 'health',
    read: true
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    petId: 'pet-bruno',
    petName: 'Bruno',
    petPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDd24ewJ-i4Pr3VfEc7UxESy2_J8KQBgWsvdAV_XYvL3hisMidta-8dXYMSna32Xhqoar3nvwcgeOCEeDnvWSKVLeKTFDeIGuqDEQmURYDhyqFSOsyOQcKQI1MYD0nSJtbH_1Pg9gFddQiVouOH-z5aT8_86OTDkHzMMFBpB7Mz1mgUw102TzJAPsQ4cVOIBKq4gva2D7ODuO9eIEl1DSeBEmnICKm4spJRe9gUH1f3vBpaUl-oB16',
    serviceCategory: 'grooming',
    serviceTitle: 'Luxury Grooming & Spa Session',
    providerId: 'prov-1',
    providerName: 'Paws & Claws Spa & Salon',
    date: 'Tomorrow, 10:00 AM',
    timeSlot: '10:00 AM',
    location: 'Bandra West, Mumbai',
    price: 1299,
    status: 'Confirmed',
    createdAt: '2026-08-19',
    bookingRef: 'PW-882194',
    notes: 'Please gentle trim around paws and hypoallergenic shampoo.'
  },
  {
    id: 'bk-100',
    petId: 'pet-bruno',
    petName: 'Bruno',
    petPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDd24ewJ-i4Pr3VfEc7UxESy2_J8KQBgWsvdAV_XYvL3hisMidta-8dXYMSna32Xhqoar3nvwcgeOCEeDnvWSKVLeKTFDeIGuqDEQmURYDhyqFSOsyOQcKQI1MYD0nSJtbH_1Pg9gFddQiVouOH-z5aT8_86OTDkHzMMFBpB7Mz1mgUw102TzJAPsQ4cVOIBKq4gva2D7ODuO9eIEl1DSeBEmnICKm4spJRe9gUH1f3vBpaUl-oB16',
    serviceCategory: 'vet_consult',
    serviceTitle: 'Routine Health Checkup',
    providerId: 'prov-2',
    providerName: 'Dr. Sharma, Paws & Claws Clinic',
    date: '15 July 2026',
    timeSlot: '11:00 AM',
    location: 'Khar, Mumbai',
    price: 850,
    status: 'Completed',
    createdAt: '2026-07-14',
    bookingRef: 'PW-771209',
    notes: 'General checkup completed. Weight stable.'
  },
  {
    id: 'bk-099',
    petId: 'pet-luna',
    petName: 'Luna',
    petPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDARmREAm6zMpz5OuLTAr9xEsIGTXzOnLXiRFe2Td8NAXt4B1txJiP-qfwtf0rE6zYuZaOYl77W1d-098bh19_ZLvc6LtxdVNSpFqkAA21FS_12okyMzcgwxIjlGI0OLeh086CW6jctG-CdTiCD-4M6tFMHqMS3IEfU0HuLK865GcSqK__PkaAmVwUNtSw1QkrnP4Eh5QW3BiQo1D6-uHnVs2qnhI4QnQtUL1kUxF-lZwLMYg6bsJCx',
    serviceCategory: 'grooming',
    serviceTitle: 'Feline Coat De-tangling & Wash',
    providerId: 'prov-1',
    providerName: 'Paws & Claws Spa & Salon',
    date: '20 May 2026',
    timeSlot: '02:00 PM',
    location: 'Bandra West, Mumbai',
    price: 1400,
    status: 'Completed',
    createdAt: '2026-05-19',
    bookingRef: 'PW-662301'
  }
];
