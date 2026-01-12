"use client";

import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used inside provider");
  return ctx;
};
