import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe, logout as apiLogout } from '../api/auth';
import {
  getFavourites,
  addFavourite as apiAddFavourite,
  removeFavourite as apiRemoveFavourite,
} from '../api/favourites';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);

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
        if (data?.user) {
          setUser(data.user);
          const favs = await getFavourites().catch(() => []);
          setFavourites(favs);
        }
      } catch {
        // network error — stay logged out silently
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
    setFavourites([]);
  }

  const addFavourite = useCallback(async (ecoOptionId) => {
    const saved = await apiAddFavourite(ecoOptionId);
    setFavourites((prev) => [...prev, saved]);
  }, []);

  const removeFavourite = useCallback(async (id) => {
    await apiRemoveFavourite(id);
    setFavourites((prev) => prev.filter((f) => f._id !== id));
  }, []);

  if (isLoading) return null;

  return (
    <AppContext.Provider
      value={{ user, setUser, logout, favourites, addFavourite, removeFavourite, savedPlan, setSavedPlan }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
