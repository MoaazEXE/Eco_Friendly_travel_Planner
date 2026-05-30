import { request } from './client';

export const getFavourites = () =>
  request('/eco-options/favourites');

export const addFavourite = (ecoOptionId) =>
  request('/eco-options/favourites', {
    method: 'POST',
    body: JSON.stringify({ ecoOptionId }),
  });

export const removeFavourite = (id) =>
  request(`/eco-options/favourites/${id}`, { method: 'DELETE' });
