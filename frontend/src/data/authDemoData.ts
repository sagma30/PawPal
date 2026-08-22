import { UserProfile, UserRole } from '../types';

export const DEMO_USERS: Record<string, { user: UserProfile; passwordHint: string }> = {
  PET_PARENT: {
    user: {
      id: 'usr-parent-demo',
      name: 'Rohan Deshmukh',
      email: 'parent@zooby.demo',
      phone: '+91 98201 23456',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
      location: 'Bandra West, Mumbai',
      role: 'PET_PARENT',
      joinedDate: 'January 2025'
    },
    passwordHint: 'parent123'
  },
  PROVIDER: {
    user: {
      id: 'usr-provider-demo',
      name: 'Dr. Aarav Mehta',
      email: 'provider@zooby.demo',
      phone: '+91 98330 44556',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=240',
      location: 'Khar West, Mumbai',
      role: 'PROVIDER',
      businessName: 'Paws & Claws Veterinary Wellness Clinic',
      serviceCategory: 'vet_consult',
      isVerified: true,
      rating: 4.95,
      joinedDate: 'March 2024'
    },
    passwordHint: 'provider123'
  },
  ADMIN: {
    user: {
      id: 'usr-admin-demo',
      name: 'Priya Sharma (Super Admin)',
      email: 'admin@zooby.demo',
      phone: '+91 98000 11223',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240',
      location: 'Zooby Mumbai HQ',
      role: 'ADMIN',
      joinedDate: 'November 2023'
    },
    passwordHint: 'admin123'
  }
};

/**
 * Finds user profile and role by email or phone.
 * Checks known pre-seeded accounts and localStorage registered users.
 */
export function findUserByCredentials(emailOrPhone: string): UserProfile | null {
  const normalized = emailOrPhone.trim().toLowerCase();

  // 1. Check pre-seeded demo accounts
  for (const key of Object.keys(DEMO_USERS)) {
    const candidate = DEMO_USERS[key].user;
    if (
      candidate.email.toLowerCase() === normalized ||
      candidate.phone?.toLowerCase() === normalized ||
      (normalized.includes('parent') && key === 'PET_PARENT') ||
      (normalized.includes('provider') && key === 'PROVIDER') ||
      (normalized.includes('admin') && key === 'ADMIN')
    ) {
      return candidate;
    }
  }

  // 2. Check localStorage custom registered accounts
  try {
    const stored = localStorage.getItem('zooby_registered_accounts');
    if (stored) {
      const accounts: UserProfile[] = JSON.parse(stored);
      const found = accounts.find(
        (a) =>
          a.email.toLowerCase() === normalized ||
          (a.phone && a.phone.toLowerCase() === normalized)
      );
      if (found) {
        return found;
      }
    }
  } catch (err) {
    console.error('Error reading registered accounts:', err);
  }

  // 3. Fallback heuristic for ad-hoc emails
  if (normalized.includes('admin')) {
    return DEMO_USERS.ADMIN.user;
  }
  if (normalized.includes('provider') || normalized.includes('dr.') || normalized.includes('vet')) {
    return DEMO_USERS.PROVIDER.user;
  }

  // Standard user default is PET_PARENT
  return {
    id: `usr-parent-${Date.now()}`,
    name: normalized.includes('@') ? normalized.split('@')[0].replace('.', ' ') : 'Zooby Parent',
    email: normalized.includes('@') ? normalized : `${normalized}@zooby.app`,
    phone: !normalized.includes('@') ? normalized : '+91 98201 23456',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
    location: 'Mumbai, MH',
    role: 'PET_PARENT',
    joinedDate: 'Today'
  };
}

