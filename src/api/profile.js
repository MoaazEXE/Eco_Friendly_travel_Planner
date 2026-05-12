// Profile endpoints — mocked until backend is up.

import { request } from './client';

export async function getProfile() {
  // backend: return request('/profile');
  return Promise.resolve({
    fullName: 'Moaaz Khamis',
    email:    'traveller@example.com',
    phone:    '+62 123-4567',
    location: 'Kuala Lumpur, Malaysia',
    bio:      'Passionate about sustainable travel and discovering eco-friendly experiences around the world.',
    stats:    { carbonSaved: '120 kg CO₂', tripsTaken: 14 },
    ecoScore: 78,
  });
}

export async function updateProfile(profileData) {
  // backend: return request('/profile', { method: 'PUT', body: JSON.stringify(profileData) });
  return Promise.resolve(profileData);
}

export async function changePassword(data) {
  // backend: return request('/profile/password', { method: 'PUT', body: JSON.stringify(data) });
  return Promise.resolve({ message: 'Password updated successfully' });
}

export async function deleteAccount() {
  // backend: return request('/profile', { method: 'DELETE' });
  return Promise.resolve(null);
}
