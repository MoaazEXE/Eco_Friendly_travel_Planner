import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, logout as apiLogout } from '../api/auth';

const AppContext = createContext(null);

const PLACEHOLDER_FAVOURITES = [
  { id: 1, name: 'Faroe Islands', country: 'Denmark' },
  { id: 2, name: 'Costa Rica', country: 'Central America' },
  { id: 3, name: 'Bhutan', country: 'Himalayas' },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favourites] = useState(PLACEHOLDER_FAVOURITES);

  const [savedPlan, setSavedPlan] = useState(() => {
    try {
      const stored = localStorage.getItem('ecoSavedPlan');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        if (data?.user) setUser(data.user);
      } catch {
        // network error or unexpected response — stay logged out silently
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('ecoSavedPlan', JSON.stringify(savedPlan));
  }, [savedPlan]);

  async function logout() {
    await apiLogout().catch(() => {});
    setUser(null);
  }

  if (isLoading) return null;

  return (
    <AppContext.Provider value={{ user, setUser, logout, favourites, savedPlan, setSavedPlan }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
