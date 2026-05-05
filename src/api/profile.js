/**
 * api/profile.js
 *
 * User profile endpoints — fetch and update profile data.
 *
 * PLACEHOLDER — returns mock data until a real backend exists.
 */

import { request } from './client';

/**
 * Get the authenticated user's profile.
 * @returns {Promise<object>}
 */
export async function getProfile() {
  // TODO: uncomment when backend is ready
  // return request('/profile');

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

/**
 * Update the authenticated user's profile.
 * @param {object} profileData
 * @returns {Promise<object>} updated profile
 */
export async function updateProfile(profileData) {
  // TODO: uncomment when backend is ready
  // return request('/profile', {
  //   method: 'PUT',
  //   body: JSON.stringify(profileData),
  // });

  return Promise.resolve(profileData);
}

/**
 * Change the authenticated user's password.
 * @param {{ currentPassword: string, newPassword: string }} data
 * @returns {Promise<{ message: string }>}
 */
export async function changePassword(data) {
  // TODO: uncomment when backend is ready
  // return request('/profile/password', {
  //   method: 'PUT',
  //   body: JSON.stringify(data),
  // });

  return Promise.resolve({ message: 'Password updated successfully' });
}

/**
 * Delete the authenticated user's account.
 * @returns {Promise<null>}
 */
export async function deleteAccount() {
  // TODO: uncomment when backend is ready
  // return request('/profile', { method: 'DELETE' });

  return Promise.resolve(null);
}
