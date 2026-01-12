"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiFilter } from "react-icons/fi";
import { X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category]
    );
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-red-600 text-white p-4 rounded-full shadow-lg"
      >
        <FiFilter size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-50 bg-cyan-500 p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:block
        `}
      >
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h1 className="text-lg font-bold">Filters</h1>
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <h2 className="text-lg font-semibold mb-4">Favourites</h2>

        <label className="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={showFavouritesOnly}
            onChange={handleFavourite}
            className="accent-red-600 w-5 h-5"
          />
          <span className="text-lg">All Favourites</span>
        </label>

        <h2 className="text-lg font-semibold mb-4">Categories</h2>

        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="accent-red-600 w-5 h-5"
              />
              <span className="capitalize text-lg">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
