/**
 * api/itinerary.js
 *
 * Itinerary endpoints — fetch destinations and manage saved plans.
 *
 * PLACEHOLDER — returns mock data until a real backend exists.
 */

import { request } from './client';

/**
 * Get eco-friendly destination recommendations filtered by preferences.
 * @param {{ city: string, weather: string, maxBudget: number, interests: string[] }} filters
 * @returns {Promise<object[]>}
 */
export async function getRecommendations(filters) {
  // TODO: uncomment when backend is ready
  // return request(`/itinerary/recommendations?${new URLSearchParams(filters)}`);

  console.warn('[api/itinerary] getRecommendations() is using mock data');
  return Promise.resolve([]);
}

/**
 * Get the authenticated user's saved itinerary plan.
 * @returns {Promise<object[]>}
 */
export async function getSavedPlan() {
  // TODO: uncomment when backend is ready
  // return request('/itinerary/plan');

  console.warn('[api/itinerary] getSavedPlan() is using mock data');
  return Promise.resolve([]);
}

/**
 * Add an activity to the saved itinerary plan.
 * @param {{ destinationId: number, plannedDate: string }} data
 * @returns {Promise<object>}
 */
export async function addToPlan(data) {
  // TODO: uncomment when backend is ready
  // return request('/itinerary/plan', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });

  console.warn('[api/itinerary] addToPlan() is using mock data');
  return Promise.resolve(data);
}

/**
 * Remove an activity from the saved itinerary plan.
 * @param {number} planItemId
 * @returns {Promise<null>}
 */
export async function removeFromPlan(planItemId) {
  // TODO: uncomment when backend is ready
  // return request(`/itinerary/plan/${planItemId}`, { method: 'DELETE' });

  console.warn('[api/itinerary] removeFromPlan() is using mock data');
  return Promise.resolve(null);
}
