"use client";

import { createContext, useEffect, useState } from "react";
import { Product } from "../types/product";

type FavouritesContextType = {
  favourites: Product[];
  toggleFavourite: (product: Product) => void;
};

export const FavouritesContext = createContext<FavouritesContextType | null>(
  null
);

export const FavouritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) setFavourites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (product: Product) => {
    setFavourites((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};
