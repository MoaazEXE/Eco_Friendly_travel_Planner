import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

// Placeholder data — replace once all pages are finalized and backend is wired up
const PLACEHOLDER_USER = {
  firstName: 'Moaaz',
  lastName: 'Khamis',
  email: 'mouazm364@gmail.com',
  avatarUrl: null,
  carbonSaved: 142,
};

const PLACEHOLDER_ITINERARIES = [
  {
    id: 1,
    city: 'Kyoto',
    country: 'Japan',
    date: '2025-08-15',
    imageUrl: 'https://images.unsplash.com/photo-1700474896901-6afb362d2f8c?w=800&q=75',
    ecoScore: 5,
    carbonKg: 52,
  },
];

const PLACEHOLDER_FAVOURITES = [
  { id: 1, name: 'Faroe Islands', country: 'Denmark' },
  { id: 2, name: 'Costa Rica', country: 'Central America' },
  { id: 3, name: 'Bhutan', country: 'Himalayas' },
];

export function AppProvider({ children }) {
  const [user] = useState(PLACEHOLDER_USER);
  const [itineraries] = useState(PLACEHOLDER_ITINERARIES);
  const [favourites] = useState(PLACEHOLDER_FAVOURITES);

  return (
    <AppContext.Provider value={{ user, itineraries, favourites }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
