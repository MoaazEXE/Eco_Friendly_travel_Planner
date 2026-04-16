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

  console.warn('[api/profile] getProfile() is using mock data');
  return Promise.resolve({
    fullName: 'Eleanor Vance',
    email:    'eleanor.vance@example.com',
    phone:    '+1 (555) 123-4567',
    location: 'Portland, USA',
    bio:      'Passionate about sustainable travel and discovering eco-friendly experiences around the world.',
    stats:    { carbonSaved: '120 kg CO₂', tripsTaken: 14 },
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

  console.warn('[api/profile] updateProfile() is using mock data');
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

  console.warn('[api/profile] changePassword() is using mock data');
  return Promise.resolve({ message: 'Password updated successfully' });
}

/**
 * Delete the authenticated user's account.
 * @returns {Promise<null>}
 */
export async function deleteAccount() {
  // TODO: uncomment when backend is ready
  // return request('/profile', { method: 'DELETE' });

  console.warn('[api/profile] deleteAccount() is using mock data');
  return Promise.resolve(null);
}
