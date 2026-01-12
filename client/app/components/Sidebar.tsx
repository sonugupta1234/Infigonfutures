"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (selectedCategories: string[]) => void;
  showFavouritesOnly: boolean;
  setShowFavouritesOnly: (value: boolean) => void;
};

export default function Sidebar({
  categories,
  selectedCategories,
  setSelectedCategories,
  setShowFavouritesOnly,
  showFavouritesOnly,
}: Props) {
  const router = useRouter();

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleFavourite = () => {
    setShowFavouritesOnly(!showFavouritesOnly);
  };

  useEffect(() => {
    const params = new URLSearchParams();

    selectedCategories.forEach((cat) => params.append("category", cat));

    if (showFavouritesOnly) {
      params.append("favourites", "all");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedCategories, showFavouritesOnly, router]);

  return (
    <div className="fixed top-16 left-0 w-64  h-[calc(100vh-4rem)] z-40  bg-cyan-500 p-4">
      <h1 className="text-lg font-bold border-b mb-4">Filter By:</h1>

      <h2 className="text-lg font-semibold mb-4 mt-4">Favourites</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={showFavouritesOnly == true}
            onChange={handleFavourite}
            className="accent-red-600 w-6 h-6 hover:cursor-pointer"
          />
          <span className="text-lg">All Favourites</span>
        </label>
      </div>

      <h2 className="text-lg font-semibold mb-4 mt-4">Categories</h2>

      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2 cursor-pointer text-sm"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="accent-red-600 w-6 h-6 hover:cursor-pointer"
            />
            <span className="capitalize text-lg">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
