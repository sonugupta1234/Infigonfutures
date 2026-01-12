"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { apiRequest } from "../lib/apiRequest";
import { Product } from "../types/product";
import Sidebar from "../components/Sidebar";
import { useDebounce } from "../hooks/useDebounce";
import { useFavourites } from "../hooks/useFavourites";

const Navbar = dynamic(() => import("../components/navbar"));
const ProductCard = dynamic(() => import("../components/productcard"));

export default function ProductsPage() {
  const searchparams = useSearchParams();
  const { favourites } = useFavourites();
  const urlCategories = searchparams.getAll("category");
  const [showFavouritesOnly, setShowFavouritesOnly] = useState<boolean>(
    searchparams.get("favourites") === "all" ? true : false
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    urlCategories || []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiRequest("get", "/products");
      setProducts(res);
      setFiltered(res);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];

    if (showFavouritesOnly) {
      const favouriteIds = new Set(favourites.map((f) => f.id));
      filteredProducts = filteredProducts.filter((p) => favouriteIds.has(p.id));
    }

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    if (debouncedSearch.trim()) {
      filteredProducts = filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    setFiltered(filteredProducts);
  }, [
    products,
    selectedCategories,
    debouncedSearch,
    showFavouritesOnly,
    favourites,
  ]);

  return (
    <div>
      <Navbar />
      <div className="flex w-full min-h-screen p-6">
        <div className="w-64">
          <Sidebar
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            setShowFavouritesOnly={setShowFavouritesOnly}
            showFavouritesOnly={showFavouritesOnly}
          />
        </div>

        <div className="w-full ml-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>

          <input
            type="text"
            placeholder="Search products by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse border rounded-lg p-4">
                  <div className="h-40 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="h-[60vh] flex items-center justify-center">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
