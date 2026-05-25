/**
 * api/client.js
 *
 * Central fetch wrapper. Uses session cookies (credentials: "include") —
 * no JWT header needed.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message ?? `HTTP ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}
