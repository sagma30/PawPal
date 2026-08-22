import { userRepository } from '../repositories/user.repository';
import { User, PublicUser } from '../models/user.model';
import { ApiError } from '../utils/apiResponse';

export class UserService {
  private toPublicUser(user: User): PublicUser {
    const { passwordHash: _, ...publicUser } = user;
    return publicUser;
  }

  async getProfile(userId: string): Promise<PublicUser> {
    const user = userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('User profile not found.');
    }
    return this.toPublicUser(user);
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<PublicUser> {
    // Prohibit overriding critical identity properties directly
    delete updates.id;
    delete updates.role;
    delete updates.passwordHash;

    const updated = userRepository.update(userId, {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    if (!updated) {
      throw ApiError.notFound('User not found.');
    }

    return this.toPublicUser(updated);
  }
}

export const userService = new UserService();
