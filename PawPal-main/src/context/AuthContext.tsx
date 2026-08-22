import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceCategory, UserProfile, UserRole } from '../types';
import { apiClient } from '../services/apiClient';
import { DEMO_USERS, findUserByCredentials } from '../data/authDemoData';

interface AuthContextType {
  user: UserProfile | null;
  userId: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<UserProfile>;
  loginWithGoogle: () => Promise<UserProfile>;
  loginDemo: (role: UserRole) => Promise<UserProfile>;
  signup: (details: {
    name: string;
    email: string;
    phone?: string;
    role: 'PET_PARENT' | 'PROVIDER';
    businessName?: string;
    serviceCategory?: ServiceCategory;
  }) => Promise<UserProfile>;
  logout: (redirectPath?: string) => void;
  updateUserProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'zooby_auth_session_v3';
const REGISTERED_ACCOUNTS_KEY = 'zooby_registered_accounts';

export const AuthProvider: React.FC<{ children: React.ReactNode; onNavigate?: (path: string) => void }> = ({
  children,
  onNavigate
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Restore session from localStorage immediately, then silently revalidate with backend
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          if (parsed && parsed.role) {
            // Restore immediately — never block render on a network call
            setUser(parsed);
            // Silently revalidate in background
            try {
              const freshUser = await apiClient.getMe();
              saveSession(mapApiUser(freshUser));
            } catch (err: any) {
              // Only clear session on explicit auth rejection — not network errors
              const isAuthError =
                err?.code === 'UNAUTHORIZED' ||
                err?.code === 'TOKEN_EXPIRED' ||
                err?.code === 'TOKEN_INVALID';
              if (isAuthError) {
                saveSession(null);
              }
            }
          }
        }
      } catch (e) {
        console.error('Failed to restore auth session:', e);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const mapApiUser = (apiUser: any): UserProfile => ({
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    phone: apiUser.phone,
    avatarUrl: apiUser.avatarUrl,
    location: apiUser.location || 'Mumbai',
    role: apiUser.role as UserRole,
    businessName: apiUser.businessName,
    serviceCategory: apiUser.serviceCategory,
    isVerified: apiUser.isVerified,
    rating: apiUser.rating,
    joinedDate: apiUser.joinedDate,
  });

  const saveSession = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      apiClient.setAccessToken(null);
    }
  };

  const isNetworkError = (err: any): boolean =>
    !err?.code ||
    err?.message?.toLowerCase().includes('fetch') ||
    err?.message?.toLowerCase().includes('network') ||
    err?.message?.toLowerCase().includes('failed to fetch') ||
    err?.message?.toLowerCase().includes('load failed');

  /**
   * Login — tries backend first, falls back to local demo data when backend is unreachable.
   */
  const login = async (emailOrPhone: string, password?: string): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const data = await apiClient.login(emailOrPhone, password);
      const profile = mapApiUser(data.user);
      saveSession(profile);
      return profile;
    } catch (err: any) {
      if (!isNetworkError(err)) {
        // Real auth error (wrong password, account suspended) — surface it
        throw err;
      }
      // Backend offline — fall back to local demo credentials
      const resolvedUser = findUserByCredentials(emailOrPhone);
      if (!resolvedUser) {
        throw new Error('User not found. Please check your credentials or register.');
      }
      saveSession(resolvedUser);
      return resolvedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const data = await apiClient.googleAuth({ name: 'Rohan Deshmukh', email: 'rohan.deshmukh@gmail.com' });
      const profile = mapApiUser(data.user);
      saveSession(profile);
      return profile;
    } catch {
      // Backend offline — use local Google demo user
      const googleUser: UserProfile = {
        id: `usr-google-${Date.now()}`,
        name: 'Rohan Deshmukh',
        email: 'rohan.deshmukh@gmail.com',
        phone: '+91 98201 23456',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
        location: 'Bandra West, Mumbai',
        role: 'PET_PARENT',
        joinedDate: 'Today via Google',
      };
      saveSession(googleUser);
      return googleUser;
    } finally {
      setIsLoading(false);
    }
  };

  const loginDemo = async (targetRole: UserRole): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const data = await apiClient.demoLogin(targetRole);
      const profile = mapApiUser(data.user);
      saveSession(profile);
      return profile;
    } catch {
      // Backend offline — use local demo data
      const demo = DEMO_USERS[targetRole].user;
      saveSession(demo);
      return demo;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (details: {
    name: string;
    email: string;
    phone?: string;
    role: 'PET_PARENT' | 'PROVIDER';
    businessName?: string;
    serviceCategory?: ServiceCategory;
  }): Promise<UserProfile> => {
    setIsLoading(true);
    try {
      const data = await apiClient.signup(details);
      const profile = mapApiUser(data.user);
      saveSession(profile);
      return profile;
    } catch (err: any) {
      if (!isNetworkError(err)) {
        throw err;
      }
      // Backend offline — create local profile
      const assignedRole: UserRole = details.role === 'PROVIDER' ? 'PROVIDER' : 'PET_PARENT';
      const newUser: UserProfile = {
        id: `usr-${assignedRole.toLowerCase()}-${Date.now()}`,
        name: details.name,
        email: details.email,
        phone: details.phone || '+91 98201 00000',
        avatarUrl: assignedRole === 'PROVIDER'
          ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=240'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=160',
        location: 'Mumbai, MH',
        role: assignedRole,
        businessName: details.businessName,
        serviceCategory: details.serviceCategory,
        isVerified: assignedRole !== 'PROVIDER',
        joinedDate: 'Today',
      };
      try {
        const stored = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
        const accounts: UserProfile[] = stored ? JSON.parse(stored) : [];
        accounts.push(newUser);
        localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(accounts));
      } catch { /* ignore storage errors */ }
      saveSession(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (redirectPath?: string) => {
    saveSession(null);
    if (onNavigate && redirectPath) {
      onNavigate(redirectPath);
    } else if (onNavigate) {
      onNavigate('/');
    }
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    saveSession({ ...user, ...updated });
  };

  const value: AuthContextType = {
    user,
    userId: user?.id || null,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    loginDemo,
    signup,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
