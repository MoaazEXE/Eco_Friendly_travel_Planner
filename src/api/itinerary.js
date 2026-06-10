import { request } from './client';
import { getEcoOptions } from './ecoOptions';

function enrichStop(stop, ecoOptions) {
  const eco = ecoOptions.find(o => o.id === stop.ecoOptionId);
  if (!eco) return null;
  return { ...eco, _id: stop._id, plannedDate: stop.plannedDate, notes: stop.notes };
}

export async function getItinerary() {
  const [stops, ecoOptions] = await Promise.all([
    request('/itinerary'),
    getEcoOptions(),
  ]);
  return stops.map(stop => enrichStop(stop, ecoOptions)).filter(Boolean);
}

export async function addStop({ ecoOptionId, plannedDate, notes = '' }) {
  const [stop, ecoOptions] = await Promise.all([
    request('/itinerary', {
      method: 'POST',
      body: JSON.stringify({ ecoOptionId, plannedDate, notes }),
    }),
    getEcoOptions(),
  ]);
  return enrichStop(stop, ecoOptions);
}

export async function updateStop(_id, { notes, plannedDate }) {
  const [stop, ecoOptions] = await Promise.all([
    request(`/itinerary/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({ notes, plannedDate }),
    }),
    getEcoOptions(),
  ]);
  return enrichStop(stop, ecoOptions);
}

export async function deleteStop(_id) {
  return request(`/itinerary/${_id}`, { method: 'DELETE' });
}
