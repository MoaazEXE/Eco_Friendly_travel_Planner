/**
 * api/auth.js
 *
 * Authentication endpoints — login, register, logout.
 *
 * PLACEHOLDER — functions return mock data until a real backend exists.
 * When the backend is ready: remove the mock blocks and uncomment the
 * `request(...)` calls below each one.
 */

import { request } from './client';

/**
 * Log in an existing user.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function login(credentials) {
  // TODO: uncomment when backend is ready
  // return request('/auth/login', {
  //   method: 'POST',
  //   body: JSON.stringify(credentials),
  // });

  // ── Mock response ──────────────────────────────
  return Promise.resolve({
    token: 'mock-jwt-token',
    user: { id: 1, email: credentials.email, fullName: 'Eleanor Vance' },
  });
}

/**
 * Register a new user.
 * @param {{ fullName: string, email: string, password: string }} data
 * @returns {Promise<{ message: string }>}
 */
export async function register(data) {
  // TODO: uncomment when backend is ready
  // return request('/auth/register', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });

  // ── Mock response ──────────────────────────────
  return Promise.resolve({ message: 'Registration successful' });
}

/**
 * Log out the current user (invalidate server-side session if applicable).
 * @returns {Promise<null>}
 */
export async function logout() {
  // TODO: uncomment when backend is ready
  // return request('/auth/logout', { method: 'POST' });

  // ── Mock response ──────────────────────────────
  localStorage.removeItem('token');
  return Promise.resolve(null);
}
