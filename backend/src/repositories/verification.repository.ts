import { BaseRepository } from './base.repository';
import { ProviderVerification } from '../models/verification.model';
import { VerificationStatus } from '../constants/roles';

class VerificationRepository extends BaseRepository<ProviderVerification> {
  findByStatus(status: VerificationStatus): ProviderVerification[] {
    return this.findWhere(v => v.status === status);
  }

  findPending(): ProviderVerification[] {
    return this.findWhere(v => v.status === 'Pending' || v.status === 'Reviewing');
  }
}

export const verificationRepository = new VerificationRepository();
