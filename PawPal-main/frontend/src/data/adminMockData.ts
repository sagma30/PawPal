import { AdminUser, ProviderVerification, AdminDashboardBooking } from '../types';

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'USR-9942-X',
    name: 'Aditi Sharma',
    email: 'aditi.sharma@example.com',
    phone: '+91 98765 43210',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240',
    location: 'Mumbai',
    primaryAddress: '1402, Sea View Apartments, Bandra West, Mumbai 400050',
    joinedDate: 'Jan 12, 2024',
    status: 'Active',
    paymentMethod: {
      brand: 'Visa',
      last4: '4242',
      expiry: '09/25'
    },
    pets: [
      {
        id: 'pet-ad-1',
        name: 'Luna',
        type: 'cat',
        breed: 'Persian Cat',
        age: '3 yrs',
        avatarUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 'pet-ad-2',
        name: 'Rocky',
        type: 'dog',
        breed: 'Golden Retriever',
        age: '5 yrs',
        avatarUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200'
      }
    ],
    recentBookings: [
      {
        id: 'b-ad-1',
        service: 'Full Grooming (Luna)',
        provider: 'Paws & Claws Spa',
        date: 'Oct 24, 2023',
        status: 'Completed',
        amount: 1500
      },
      {
        id: 'b-ad-2',
        service: 'Dog Walk (Rocky)',
        provider: 'Rahul V.',
        date: 'Oct 22, 2023',
        status: 'Completed',
        amount: 300
      },
      {
        id: 'b-ad-3',
        service: 'Vet Consult (Luna)',
        provider: 'Dr. Mehta Clinic',
        date: 'Oct 15, 2023',
        status: 'Cancelled',
        amount: 800
      }
    ],
    activityTimeline: [
      {
        id: 't-1',
        title: 'User Logged In',
        description: 'Mobile App (iOS) - Mumbai, India',
        timestamp: 'Today, 09:42 AM',
        type: 'login'
      },
      {
        id: 't-2',
        title: 'Profile Updated',
        description: 'Updated primary address to Bandra West.',
        timestamp: 'Oct 20, 2023',
        type: 'profile'
      },
      {
        id: 't-3',
        title: 'New Pet Added',
        description: "Added 'Luna' (Persian Cat) to profile.",
        timestamp: 'Sep 05, 2023',
        type: 'pet'
      }
    ]
  },
  {
    id: 'USR-8812-M',
    name: 'Rohan Mehta',
    email: 'rohan@email.com',
    phone: '+91 91234 56789',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240',
    location: 'Pune',
    primaryAddress: 'Flat 402, Green Meadows, Koregaon Park, Pune 411001',
    joinedDate: 'Feb 05, 2024',
    status: 'Active',
    paymentMethod: {
      brand: 'MasterCard',
      last4: '8819',
      expiry: '11/26'
    },
    pets: [
      {
        id: 'pet-rm-1',
        name: 'Tommy',
        type: 'dog',
        breed: 'Labrador Retriever',
        age: '2 yrs',
        avatarUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=200'
      }
    ],
    recentBookings: [
      {
        id: 'b-rm-1',
        service: 'Dog Walk (Tommy)',
        provider: 'Paws & Trails',
        date: 'Nov 02, 2023',
        status: 'Completed',
        amount: 350
      }
    ],
    activityTimeline: [
      {
        id: 't-rm-1',
        title: 'Scheduled Walk Completed',
        description: '30 min walk verified via GPS route.',
        timestamp: 'Yesterday, 06:15 PM',
        type: 'booking'
      },
      {
        id: 't-rm-2',
        title: 'User Logged In',
        description: 'Web Portal - Pune, India',
        timestamp: 'Nov 01, 2023',
        type: 'login'
      }
    ]
  },
  {
    id: 'USR-7731-S',
    name: 'Sneha Rao',
    email: 'sneha@email.com',
    phone: '+91 88888 77777',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240',
    location: 'Bangalore',
    primaryAddress: 'Villa 12, Palm Meadows, Whitefield, Bangalore 560066',
    joinedDate: 'Mar 15, 2024',
    status: 'New',
    paymentMethod: {
      brand: 'UPI / GPay',
      last4: '9901',
      expiry: 'N/A'
    },
    pets: [],
    recentBookings: [],
    activityTimeline: [
      {
        id: 't-sr-1',
        title: 'Account Created',
        description: 'Registered via Google Sign-In.',
        timestamp: 'Mar 15, 2024, 02:30 PM',
        type: 'profile'
      }
    ]
  },
  {
    id: 'USR-6520-V',
    name: 'Vikram Patel',
    email: 'vikram.patel@gmail.com',
    phone: '+91 98199 11223',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240',
    location: 'Mumbai',
    primaryAddress: '7B, Sagar Darshan, Worli Sea Face, Mumbai 400030',
    joinedDate: 'Nov 18, 2023',
    status: 'Active',
    paymentMethod: {
      brand: 'Visa',
      last4: '1092',
      expiry: '04/27'
    },
    pets: [
      {
        id: 'pet-vp-1',
        name: 'Bruno',
        type: 'dog',
        breed: 'Golden Retriever',
        age: '3 yrs',
        avatarUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=200'
      },
      {
        id: 'pet-vp-2',
        name: 'Simba',
        type: 'dog',
        breed: 'Beagle',
        age: '1 yr',
        avatarUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=200'
      }
    ],
    recentBookings: [
      {
        id: 'b-vp-1',
        service: 'Vaccination Checkup',
        provider: 'Crown Vet Worli',
        date: 'Dec 05, 2023',
        status: 'Completed',
        amount: 1200
      }
    ],
    activityTimeline: [
      {
        id: 't-vp-1',
        title: 'Vaccination Certificate Uploaded',
        description: 'Uploaded Rabies Booster record for Bruno.',
        timestamp: 'Dec 05, 2023',
        type: 'pet'
      }
    ]
  },
  {
    id: 'USR-5419-P',
    name: 'Pooja Deshmukh',
    email: 'pooja.d@example.com',
    phone: '+91 97654 32190',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=240',
    location: 'Delhi',
    primaryAddress: 'House 88, Vasant Vihar, New Delhi 110057',
    joinedDate: 'Aug 04, 2023',
    status: 'Suspended',
    paymentMethod: {
      brand: 'MasterCard',
      last4: '5543',
      expiry: '02/25'
    },
    pets: [
      {
        id: 'pet-pd-1',
        name: 'Bella',
        type: 'dog',
        breed: 'Shih Tzu',
        age: '4 yrs',
        avatarUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=200'
      }
    ],
    recentBookings: [
      {
        id: 'b-pd-1',
        service: 'Pet Sitting (Bella)',
        provider: 'Urban Tails Sitting',
        date: 'Sep 10, 2023',
        status: 'Cancelled',
        amount: 2200
      }
    ],
    activityTimeline: [
      {
        id: 't-pd-1',
        title: 'Account Flagged',
        description: 'Multiple chargeback disputes reported.',
        timestamp: 'Oct 01, 2023',
        type: 'system'
      }
    ]
  }
];

export const INITIAL_VERIFICATIONS: ProviderVerification[] = [
  {
    id: 'v-1',
    name: 'Jane Doe',
    initials: 'JD',
    service: 'Dog Walking',
    status: 'Pending',
    avatarBg: 'bg-[#d2f4d3] text-[#1c6422]'
  },
  {
    id: 'v-2',
    name: 'Mark Smith',
    initials: 'MS',
    service: 'Grooming',
    status: 'Reviewing',
    avatarBg: 'bg-[#e2dcfe] text-[#4b35b6]'
  },
  {
    id: 'v-3',
    name: 'Alex Jones',
    initials: 'AJ',
    service: 'Pet Sitting',
    status: 'Pending',
    avatarBg: 'bg-[#d2f4d3] text-[#1c6422]'
  },
  {
    id: 'v-4',
    name: 'Rajesh Kumar',
    initials: 'RK',
    service: 'Vet Consult',
    status: 'Reviewing',
    avatarBg: 'bg-[#ffedc2] text-[#895100]'
  }
];

export const INITIAL_ADMIN_BOOKINGS: AdminDashboardBooking[] = [
  {
    id: '#B-8492',
    pet: 'Bella (Dog)',
    service: 'Walking',
    amount: 25.0,
    status: 'Confirmed'
  },
  {
    id: '#B-8491',
    pet: 'Max (Cat)',
    service: 'Sitting',
    amount: 40.0,
    status: 'Completed'
  },
  {
    id: '#B-8490',
    pet: 'Luna (Dog)',
    service: 'Grooming',
    amount: 65.0,
    status: 'Pending'
  },
  {
    id: '#B-8489',
    pet: 'Bruno (Dog)',
    service: 'Vet Consult',
    amount: 50.0,
    status: 'Confirmed'
  }
];

export const REVENUE_CHART_DATA_MONTHLY = [
  { name: 'Jan', bookings: 2100, revenue: 82000 },
  { name: 'Feb', bookings: 2400, revenue: 95000 },
  { name: 'Mar', bookings: 2800, revenue: 104000 },
  { name: 'Apr', bookings: 2600, revenue: 98000 },
  { name: 'May', bookings: 3100, revenue: 118000 },
  { name: 'Jun', bookings: 3200, revenue: 124000 }
];

export const REVENUE_CHART_DATA_WEEKLY = [
  { name: 'Mon', bookings: 420, revenue: 16500 },
  { name: 'Tue', bookings: 510, revenue: 19800 },
  { name: 'Wed', bookings: 480, revenue: 18200 },
  { name: 'Thu', bookings: 560, revenue: 21400 },
  { name: 'Fri', bookings: 680, revenue: 27900 },
  { name: 'Sat', bookings: 820, revenue: 34100 },
  { name: 'Sun', bookings: 750, revenue: 31200 }
];
