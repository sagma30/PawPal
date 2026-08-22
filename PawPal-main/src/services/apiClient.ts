/**
 * Zooby Frontend API Client
 * Connects frontend to the production backend with JWT token injection and standard response unwrapping.
 */

const API_BASE_URL =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) ||
  'http://localhost:3001/api/v1';

const AUTH_STORAGE_KEY = 'zooby_auth_session_v3';
const TOKEN_STORAGE_KEY = 'zooby_access_token';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  code?: string;
  errors?: Array<{ field: string; message: string }>;
}

class ApiClient {
  private getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }

  public setAccessToken(token: string | null): void {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }

  private async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { requiresAuth = true, headers = {}, ...rest } = options;

    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>)
    };

    if (requiresAuth) {
      const token = this.getAccessToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const res = await fetch(url, {
        headers: requestHeaders,
        ...rest
      });

      const json: ApiResponse<T> = await res.json();

      if (!res.ok || !json.success) {
        const errorMsg = json.message || `Request failed with status ${res.status}`;
        const error = new Error(errorMsg) as Error & { code?: string; errors?: any[] };
        error.code = json.code;
        error.errors = json.errors;
        throw error;
      }

      return json.data;
    } catch (err: any) {
      // If network fails (e.g. backend server not yet booted in preview), propagate cleanly
      throw err;
    }
  }

  // ── Auth APIs ─────────────────────────────────────────────────────────────
  async login(emailOrPhone: string, password?: string) {
    const data = await this.request<{ user: any; accessToken: string; expiresIn: number }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailOrPhone, password }),
      requiresAuth: false
    });
    this.setAccessToken(data.accessToken);
    return data;
  }

  async demoLogin(role: string) {
    const data = await this.request<{ user: any; accessToken: string; expiresIn: number }>('/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ role }),
      requiresAuth: false
    });
    this.setAccessToken(data.accessToken);
    return data;
  }

  async googleAuth(profile?: { name?: string; email?: string }) {
    const data = await this.request<{ user: any; accessToken: string; expiresIn: number }>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ profile }),
      requiresAuth: false
    });
    this.setAccessToken(data.accessToken);
    return data;
  }

  async signup(details: any) {
    const data = await this.request<{ user: any; accessToken: string; expiresIn: number }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(details),
      requiresAuth: false
    });
    this.setAccessToken(data.accessToken);
    return data;
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // ── Pet APIs ──────────────────────────────────────────────────────────────
  async getPets() {
    return this.request<any[]>('/pets');
  }

  async getPetById(id: string) {
    return this.request<any>(`/pets/${id}`);
  }

  async createPet(petData: any) {
    return this.request<any>('/pets', {
      method: 'POST',
      body: JSON.stringify(petData)
    });
  }

  async updatePet(id: string, petData: any) {
    return this.request<any>(`/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(petData)
    });
  }

  async deletePet(id: string) {
    return this.request<any>(`/pets/${id}`, {
      method: 'DELETE'
    });
  }

  // ── Health Events ─────────────────────────────────────────────────────────
  async getHealthEvents(petId: string) {
    return this.request<any[]>(`/health-events?petId=${petId}`);
  }

  async createHealthEvent(eventData: any) {
    return this.request<any>('/health-events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  }

  // ── Providers ─────────────────────────────────────────────────────────────
  async getProviders(filter?: any) {
    const query = filter ? '?' + new URLSearchParams(filter).toString() : '';
    return this.request<any[]>(`/providers${query}`, { requiresAuth: false });
  }

  // ── Bookings ──────────────────────────────────────────────────────────────
  async getBookings() {
    return this.request<any[]>('/bookings');
  }

  async createBooking(bookingData: any) {
    return this.request<any>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    });
  }

  async updateBookingStatus(id: string, status: string) {
    return this.request<any>(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  // ── Notifications & Agenda ────────────────────────────────────────────────
  async getNotifications() {
    return this.request<any[]>('/notifications');
  }

  async markAllNotificationsRead() {
    return this.request<any>('/notifications/mark-all-read', {
      method: 'POST'
    });
  }

  async getAgenda() {
    return this.request<any[]>('/notifications/agenda');
  }

  // ── Admin APIs ────────────────────────────────────────────────────────────
  async getAdminUsers() {
    return this.request<any[]>('/admin/users');
  }

  async updateAdminUserStatus(id: string, status: string) {
    return this.request<any>(`/admin/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  async getAdminVerifications() {
    return this.request<any[]>('/admin/verifications');
  }

  async reviewVerification(id: string, status: string, notes?: string) {
    return this.request<any>(`/admin/verifications/${id}/review`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes })
    });
  }

  async getAdminAnalytics() {
    return this.request<any>('/admin/analytics');
  }

  // ── AI Consultation ───────────────────────────────────────────────────────
  async consultAi(prompt: string, petId?: string, context?: any) {
    return this.request<{ advice: string; recommendedAction: string; urgency: string }>('/ai/consult', {
      method: 'POST',
      body: JSON.stringify({ prompt, petId, context })
    });
  }
}

export const apiClient = new ApiClient();
