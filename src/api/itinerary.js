import { request } from './client';
import { ECO_OPTIONS } from '../data/ecoOptions';

function toDisplayStop(stop) {
  const eco = ECO_OPTIONS.find(o => o.id === stop.ecoOptionId);
  if (!eco) return null;
  return { ...eco, _id: stop._id, plannedDate: stop.plannedDate, notes: stop.notes };
}

export async function getItinerary() {
  const stops = await request('/itinerary');
  return stops.map(toDisplayStop).filter(Boolean);
}

export async function addStop({ ecoOptionId, plannedDate, notes = '' }) {
  const stop = await request('/itinerary', {
    method: 'POST',
    body: JSON.stringify({ ecoOptionId, plannedDate, notes }),
  });
  return toDisplayStop(stop);
}

export async function updateStop(_id, { notes, plannedDate }) {
  const stop = await request(`/itinerary/${_id}`, {
    method: 'PUT',
    body: JSON.stringify({ notes, plannedDate }),
  });
  return toDisplayStop(stop);
}

export async function deleteStop(_id) {
  return request(`/itinerary/${_id}`, { method: 'DELETE' });
}
