/**
 * api/profile.js
 *
 * User profile endpoints — fetch and update profile data.
 * All requests use session cookies via credentials: 'include' (set in client.js).
 */

import { request } from './client';

/**
 * Get the authenticated user's profile.
 * @returns {Promise<object>}
 */
export async function getProfile() {
  return request('/profile');
}

/**
 * Update the authenticated user's profile.
 * @param {{ fullName?: string, location?: string, bio?: string }} profileData
 * @returns {Promise<object>} updated profile
 */
export async function updateProfile(profileData) {
  return request('/profile', {
    method: 'PUT',
    body:   JSON.stringify(profileData),
  });
}

/**
 * Change the authenticated user's password.
 * @param {{ current: string, newPass: string }} data
 * @returns {Promise<{ message: string }>}
 */
export async function changePassword(data) {
  return request('/profile/password', {
    method: 'PUT',
    body:   JSON.stringify(data),
  });
}

/**
 * Delete the authenticated user's account.
 * Backend destroys the session and returns 204 — no response body.
 * @returns {Promise<null>}
 */
export async function deleteAccount() {
  return request('/profile', { method: 'DELETE' });
}
