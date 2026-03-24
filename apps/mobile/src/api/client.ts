import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const BASE_URL =
  Constants.expoConfig?.extra?.apiUrl ?? 'http://localhost:3001/api/v1';

const TOKEN_KEY = 'mba_lite_auth_token';

// ─── Token storage ────────────────────────────────────────────────────────────

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function getToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// ─── Axios instance ───────────────────────────────────────────────────────────

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      await clearToken();
    }
    return Promise.reject(error);
  }
);

// ─── Typed API functions ──────────────────────────────────────────────────────

export const authApi = {
  register: (data: { email: string; password: string; name: string; timezone: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  me: () => api.get('/auth/me'),
};

export const todayApi = {
  getToday: () => api.get('/today'),
};

export const modulesApi = {
  getModules: () => api.get('/modules'),
  getModuleLessons: (id: string) => api.get(`/modules/${id}/lessons`),
};

export const lessonsApi = {
  getLesson: (id: string) => api.get(`/lessons/${id}`),
  completeLesson: (id: string, data: {
    knowledgeCheckScore: number;
    knowledgeCheckTotal: number;
    timeSpentSeconds: number;
  }) => api.post(`/lessons/${id}/complete`, data),
};

export const libraryApi = {
  search: (params: {
    q?: string;
    geography?: string;
    industry?: string;
    framework?: string;
    difficulty?: string;
    page?: number;
    per_page?: number;
  }) => api.get('/library/search', { params }),
  getCaseStudy: (id: string) => api.get(`/library/${id}`),
};

export const reviewApi = {
  submit: (cardId: string, confidence: 'easy' | 'medium' | 'hard') =>
    api.post('/review/submit', { cardId, confidence }),
};

export const progressApi = {
  getStats: () => api.get('/progress/stats'),
};

export const tutorApi = {
  getHistory: (params?: { page?: number; conversation_id?: string }) =>
    api.get('/tutor/history', { params }),
};
