import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe, logout as apiLogout } from '../api/auth';
import {
  getFavourites,
  addFavourite as apiAddFavourite,
  removeFavourite as apiRemoveFavourite,
} from '../api/favourites';
import {
  getItinerary,
  addStop as apiAddStop,
  updateStop as apiUpdateStop,
  deleteStop as apiDeleteStop,
} from '../api/itinerary';

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

  // On mount — restore session and load favourites
  useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        if (data?.user) {
          setUser(data.user);
          const favs = await getFavourites().catch(() => []);
          setFavourites(favs);
          const plan = await getItinerary().catch(() => null);
          if (plan) setSavedPlan(plan);
        }
      } catch {
        // network error — stay logged out silently
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Keep localStorage in sync as a fallback
  useEffect(() => {
    localStorage.setItem('ecoSavedPlan', JSON.stringify(savedPlan));
  }, [savedPlan]);

  async function logout() {
    await apiLogout().catch(() => {});
    setUser(null);
    setFavourites([]);
  }

  // Favourites
  const addFavourite = useCallback(async (ecoOptionId) => {
    const saved = await apiAddFavourite(ecoOptionId);
    setFavourites((prev) => [...prev, saved]);
  }, []);

  const removeFavourite = useCallback(async (id) => {
    await apiRemoveFavourite(id);
    setFavourites((prev) => prev.filter((f) => f._id !== id));
  }, []);

  // Itinerary
  const loadPlan = useCallback(async () => {
    const plan = await getItinerary().catch(() => null);
    if (plan) setSavedPlan(plan);
  }, []);

  const addStop = useCallback(async (stopData) => {
    const newStop = await apiAddStop(stopData);
    setSavedPlan((prev) => [...prev, newStop]);
    return newStop;
  }, []);

  const removeStop = useCallback(async (id) => {
    await apiDeleteStop(id);
    setSavedPlan((prev) => prev.filter((s) => s._id !== id));
  }, []);

  const updateStop = useCallback(async (id, updates) => {
    const updated = await apiUpdateStop(id, updates);
    setSavedPlan((prev) => prev.map((s) => (s._id === id ? updated : s)));
  }, []);

  if (isLoading) return null;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        logout,
        favourites,
        addFavourite,
        removeFavourite,
        savedPlan,
        setSavedPlan,
        loadPlan,
        addStop,
        removeStop,
        updateStop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}