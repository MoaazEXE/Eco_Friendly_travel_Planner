/**
 * api/client.js
 *
 * Central Fetch wrapper for all backend requests.
 * Every API module imports `request()` from here so the base URL
 * and default headers are configured in one place.
 *
 * PLACEHOLDER — wire up a real backend by setting VITE_API_BASE_URL in .env
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

/**
 * @param {string} endpoint  - e.g. '/auth/login'
 * @param {RequestInit} options - standard fetch options
 * @returns {Promise<any>}
 */
export async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Attach JWT token stored in localStorage when present
    ...(localStorage.getItem('token') && {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }),
  };

  const response = await fetch(url, {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }

  // 204 No Content — return null instead of trying to parse JSON
  if (response.status === 204) return null;

  return response.json();
}
