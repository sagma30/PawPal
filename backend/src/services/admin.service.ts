import { userRepository } from '../repositories/user.repository';
import { petRepository } from '../repositories/pet.repository';
import { bookingRepository } from '../repositories/booking.repository';
import { verificationRepository } from '../repositories/verification.repository';
import { User, PublicUser } from '../models/user.model';
import { ProviderVerification } from '../models/verification.model';
import { UserStatus, VerificationStatus, ROLES } from '../constants/roles';
import { generateId } from '../utils/idGenerator';
import { hashPassword } from '../utils/password';
import { ApiError } from '../utils/apiResponse';

export class AdminService {
  private toPublicUser(user: User): PublicUser {
    const { passwordHash: _, ...publicUser } = user;
    return publicUser;
  }

  async getAllUsers(): Promise<any[]> {
    const users = userRepository.findAll();
    return users.map((u) => {
      const pets = petRepository.findByOwner(u.id);
      const recentBookings = bookingRepository.findByCustomer(u.id);
      return {
        ...this.toPublicUser(u),
        pets,
        recentBookings
      };
    });
  }

  async createAdminUser(data: Partial<User>): Promise<PublicUser> {
    const existing = userRepository.findByEmail(data.email!);
    if (existing) {
      throw ApiError.conflict('User with this email already exists.');
    }

    const passwordHash = data.passwordHash ? await hashPassword(data.passwordHash) : undefined;

    const newUser: User = {
      id: generateId('usr-admin-created'),
      name: data.name || 'New User',
      email: data.email!.trim().toLowerCase(),
      phone: data.phone || '+91 98000 00000',
      passwordHash,
      role: data.role || ROLES.PET_PARENT,
      avatarUrl:
        data.avatarUrl ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=240',
      location: data.location || 'Mumbai',
      primaryAddress: data.primaryAddress || 'Mumbai, India',
      status: data.status || 'Active',
      isVerified: true,
      joinedDate: 'Just now',
      paymentMethod: data.paymentMethod || { brand: 'Visa', last4: '1234', expiry: '12/28' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = userRepository.save(newUser);
    return this.toPublicUser(saved);
  }

  async updateUserStatus(userId: string, newStatus: UserStatus): Promise<PublicUser> {
    const updated = userRepository.update(userId, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });

    if (!updated) {
      throw ApiError.notFound('User not found.');
    }

    return this.toPublicUser(updated);
  }

  async getVerifications(): Promise<ProviderVerification[]> {
    return verificationRepository.findAll();
  }

  async reviewVerification(
    id: string,
    status: VerificationStatus,
    notes?: string
  ): Promise<ProviderVerification> {
    const updated = verificationRepository.update(id, {
      status,
      reviewNotes: notes,
      reviewedAt: new Date().toISOString()
    });

    if (!updated) {
      throw ApiError.notFound('Provider verification record not found.');
    }

    return updated;
  }

  async getPlatformAnalytics(): Promise<any> {
    const totalUsers = userRepository.count();
    const totalPets = petRepository.count();
    const totalBookings = bookingRepository.count();
    const bookings = bookingRepository.findAll();
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

    return {
      overview: {
        totalUsers,
        totalPets,
        totalBookings,
        totalRevenue
      },
      monthlyRevenue: [
        { name: 'Jan', bookings: 2100, revenue: 82000 },
        { name: 'Feb', bookings: 2400, revenue: 95000 },
        { name: 'Mar', bookings: 2800, revenue: 104000 },
        { name: 'Apr', bookings: 2600, revenue: 98000 },
        { name: 'May', bookings: 3100, revenue: 118000 },
        { name: 'Jun', bookings: 3200, revenue: 124000 }
      ],
      weeklyRevenue: [
        { name: 'Mon', bookings: 420, revenue: 16500 },
        { name: 'Tue', bookings: 510, revenue: 19800 },
        { name: 'Wed', bookings: 480, revenue: 18200 },
        { name: 'Thu', bookings: 560, revenue: 21400 },
        { name: 'Fri', bookings: 680, revenue: 27900 },
        { name: 'Sat', bookings: 820, revenue: 34100 },
        { name: 'Sun', bookings: 750, revenue: 31200 }
      ]
    };
  }
}

export const adminService = new AdminService();
