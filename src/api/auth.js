const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`);
  return data;
}

export async function login(credentials) {
  const res = await fetch(`${BASE}/auth/login`, {
    method:      'POST',
    credentials: 'include',
    headers:     { 'Content-Type': 'application/json' },
    body:        JSON.stringify(credentials),
  });
  return handleResponse(res);
}

export async function register(data) {
  const res = await fetch(`${BASE}/auth/register`, {
    method:      'POST',
    credentials: 'include',
    headers:     { 'Content-Type': 'application/json' },
    body:        JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function logout() {
  const res = await fetch(`${BASE}/auth/logout`, {
    method:      'POST',
    credentials: 'include',
  });
  return handleResponse(res);
}

export async function getMe() {
  const res = await fetch(`${BASE}/auth/me`, {
    method:      'GET',
    credentials: 'include',
  });
  if (res.status === 401) return null;
  return handleResponse(res);
}
