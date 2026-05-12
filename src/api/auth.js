// Auth endpoints — mocked until backend is up.

import { request } from './client';

export async function login(credentials) {
  // backend: return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
  return Promise.resolve({
    token: 'mock-jwt-token',
    user: { id: 1, email: credentials.email, fullName: 'Eleanor Vance' },
  });
}

export async function register(data) {
  // backend: return request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
  return Promise.resolve({ message: 'Registration successful' });
}

export async function logout() {
  // backend: return request('/auth/logout', { method: 'POST' });
  localStorage.removeItem('token');
  return Promise.resolve(null);
}
