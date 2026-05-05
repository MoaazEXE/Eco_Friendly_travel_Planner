import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

const PLACEHOLDER_USER = {
  firstName: 'Moaaz',
  lastName: 'Khamis',
  email: 'mouazm364@gmail.com',
  avatarUrl: null,
  carbonSaved: 142,
};

const PLACEHOLDER_FAVOURITES = [
  { id: 1, name: 'Faroe Islands', country: 'Denmark' },
  { id: 2, name: 'Costa Rica', country: 'Central America' },
  { id: 3, name: 'Bhutan', country: 'Himalayas' },
];

export function AppProvider({ children }) {
  const [user] = useState(PLACEHOLDER_USER);
  const [favourites] = useState(PLACEHOLDER_FAVOURITES);

  // savedPlan is shared across Dashboard and ItineraryPage, persisted in localStorage
  const [savedPlan, setSavedPlan] = useState(() => {
    try {
      const stored = localStorage.getItem('ecoSavedPlan');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('ecoSavedPlan', JSON.stringify(savedPlan));
  }, [savedPlan]);

  return (
    <AppContext.Provider value={{ user, favourites, savedPlan, setSavedPlan }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
