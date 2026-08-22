import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { UserRole } from '../constants/roles';

export interface JwtPayload {
  userId: string;
  role: UserRole;
  email: string;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.jwtSecret);
  return decoded as JwtPayload;
}
