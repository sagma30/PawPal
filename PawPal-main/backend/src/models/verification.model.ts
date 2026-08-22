import { VerificationStatus } from '../constants/roles';

export interface ProviderVerification {
  id: string;
  providerId?: string;
  name: string;
  initials: string;
  service: string;
  status: VerificationStatus;
  avatarBg: string;
  reviewedAt?: string;
  reviewNotes?: string;
}
