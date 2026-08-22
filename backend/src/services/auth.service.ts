import { userRepository } from '../repositories/user.repository';
import { User, PublicUser } from '../models/user.model';
import { ROLES, UserRole, ServiceCategory } from '../constants/roles';
import { signToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { generateId } from '../utils/idGenerator';
import { ApiError } from '../utils/apiResponse';
import { env } from '../config/env';

export class AuthService {
  private toPublicUser(user: User): PublicUser {
    const { passwordHash: _, ...publicUser } = user;
    return publicUser;
  }

  async login(emailOrPhone: string, password?: string): Promise<{ user: PublicUser; accessToken: string; expiresIn: number }> {
    const normalized = emailOrPhone.trim().toLowerCase();
    const user = userRepository.findByEmailOrPhone(normalized);

    if (!user) {
      throw ApiError.notFound('Account not found. Please register or check credentials.');
    }

    if (user.status === 'Suspended') {
      throw ApiError.accountSuspended();
    }

    // Verify password if user has passwordHash and password is provided
    if (user.passwordHash && password) {
      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        throw ApiError.unauthorized('Invalid password entered.');
      }
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
      email: user.email
    });

    return {
      user: this.toPublicUser(user),
      accessToken: token,
      expiresIn: env.jwtExpiresIn
    };
  }

  async demoLogin(role: UserRole): Promise<{ user: PublicUser; accessToken: string; expiresIn: number }> {
    const demoIdMap: Record<UserRole, string> = {
      PET_PARENT: 'usr-parent-demo',
      PROVIDER: 'usr-provider-demo',
      ADMIN: 'usr-admin-demo'
    };

    const targetId = demoIdMap[role];
    let user = userRepository.findById(targetId);

    if (!user) {
      user = userRepository.findByRole(role)[0];
    }

    if (!user) {
      throw ApiError.notFound(`Demo account for ${role} not found.`);
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
      email: user.email
    });

    return {
      user: this.toPublicUser(user),
      accessToken: token,
      expiresIn: env.jwtExpiresIn
    };
  }

  async googleAuth(profile?: { name?: string; email?: string }): Promise<{ user: PublicUser; accessToken: string; expiresIn: number }> {
    const email = profile?.email || 'rohan.deshmukh@gmail.com';
    let user = userRepository.findByEmail(email);

    if (!user) {
      const newUser: User = {
        id: generateId('usr-google'),
        name: profile?.name || 'Rohan Deshmukh',
        email,
        phone: '+91 98201 23456',
        role: ROLES.PET_PARENT,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
        location: 'Bandra West, Mumbai',
        status: 'Active',
        isVerified: true,
        joinedDate: 'Today via Google',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      user = userRepository.save(newUser);
    }

    const token = signToken({
      userId: user.id,
      role: user.role,
      email: user.email
    });

    return {
      user: this.toPublicUser(user),
      accessToken: token,
      expiresIn: env.jwtExpiresIn
    };
  }

  async signup(data: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    role: 'PET_PARENT' | 'PROVIDER';
    businessName?: string;
    serviceCategory?: ServiceCategory;
  }): Promise<{ user: PublicUser; accessToken: string; expiresIn: number }> {
    const existing = userRepository.findByEmail(data.email);
    if (existing) {
      throw ApiError.conflict('An account with this email address already exists.');
    }

    const assignedRole: UserRole = data.role === 'PROVIDER' ? ROLES.PROVIDER : ROLES.PET_PARENT;
    const passwordHash = data.password ? await hashPassword(data.password) : undefined;

    const newUser: User = {
      id: generateId(`usr-${assignedRole.toLowerCase()}`),
      name: data.name,
      email: data.email.trim().toLowerCase(),
      phone: data.phone || '+91 98000 00000',
      passwordHash,
      role: assignedRole,
      avatarUrl:
        assignedRole === ROLES.PROVIDER
          ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=240'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
      location: 'Mumbai, MH',
      status: 'Active',
      businessName: data.businessName,
      serviceCategory: data.serviceCategory,
      isVerified: assignedRole === ROLES.PROVIDER ? false : true,
      joinedDate: 'Today',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = userRepository.save(newUser);
    const token = signToken({
      userId: saved.id,
      role: saved.role,
      email: saved.email
    });

    return {
      user: this.toPublicUser(saved),
      accessToken: token,
      expiresIn: env.jwtExpiresIn
    };
  }

  async getMe(userId: string): Promise<PublicUser> {
    const user = userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User record not found.');
    }
    return this.toPublicUser(user);
  }
}

export const authService = new AuthService();
