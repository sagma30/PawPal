import { BaseRepository } from './base.repository';
import { User } from '../models/user.model';

class UserRepository extends BaseRepository<User> {
  findByEmail(email: string): User | undefined {
    return this.findOneWhere(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findByPhone(phone: string): User | undefined {
    return this.findOneWhere(u => !!u.phone && u.phone === phone);
  }

  findByEmailOrPhone(emailOrPhone: string): User | undefined {
    const normalized = emailOrPhone.trim().toLowerCase();
    return this.findOneWhere(
      u =>
        u.email.toLowerCase() === normalized ||
        (!!u.phone && u.phone.toLowerCase() === normalized)
    );
  }

  findByRole(role: string): User[] {
    return this.findWhere(u => u.role === role);
  }
}

export const userRepository = new UserRepository();
