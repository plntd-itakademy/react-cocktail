import React, { createContext, useContext, useState, useEffect } from "react";
import { getFavorites } from "./utils/favorites";

const FavoritesContext = createContext();

export function useFavoritesContext() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favoritesCount, setFavoritesCount] = useState(getFavorites().length);

  useEffect(() => {
    setFavoritesCount(getFavorites().length);
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoritesCount, setFavoritesCount }}>{children}</FavoritesContext.Provider>
  );
}
