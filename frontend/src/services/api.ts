const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export class ApiService {
  private getAuthHeader() {
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    userGroup: string;
    language?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Registration failed');
    return result.data;
  }

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Login failed');
    return result.data;
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getAuthHeader()
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch profile');
    return result.data;
  }

  async getProgress() {
    const response = await fetch(`${API_BASE_URL}/users/progress`, {
      headers: this.getAuthHeader()
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch progress');
    return result.data;
  }

  async getScenarios(userGroup?: string, theme?: string) {
    const params = new URLSearchParams();
    if (userGroup) params.append('userGroup', userGroup);
    if (theme) params.append('theme', theme);

    const response = await fetch(`${API_BASE_URL}/scenarios?${params}`, {
      headers: this.getAuthHeader()
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch scenarios');
    return result.data;
  }

  async submitDecision(decision: {
    scenarioId: string;
    choiceId: string;
    clientEventId: string;
    timestamp: string;
    timeSpent?: number;
  }) {
    const response = await fetch(`${API_BASE_URL}/decisions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader()
      },
      body: JSON.stringify(decision)
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to submit decision');
    return result.data;
  }

  async getPeerStats(scenarioId: string) {
    const response = await fetch(`${API_BASE_URL}/decisions/peer-stats/${scenarioId}`, {
      headers: this.getAuthHeader()
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch peer stats');
    return result.data;
  }

  async getCachedRules(userGroup?: string) {
    const params = new URLSearchParams();
    if (userGroup) params.append('userGroup', userGroup);

    const response = await fetch(`${API_BASE_URL}/rules/cached?${params}`, {
      headers: this.getAuthHeader()
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || 'Failed to fetch rules');
    return result.data;
  }
}

export const apiService = new ApiService();
