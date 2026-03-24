import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// Attach token from localStorage on client side
if (typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('mba_lite_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) localStorage.removeItem('mba_lite_token');
      return Promise.reject(err);
    }
  );
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem('mba_lite_token', token);
}

export function removeToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('mba_lite_token');
}
