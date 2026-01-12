"use client";

import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Product } from "../types/product";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFavourites } from "../hooks/useFavourites";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [fav, setFav] = useState(false);
  const { favourites, toggleFavourite } = useFavourites();

  useEffect(() => {
    const isFav = favourites.some((f) => f.id === product.id);
    setFav(isFav);
  }, [product.id]);

  const handleFavourite = () => {
    toggleFavourite(product);
    setFav((prev) => !prev);
    toast.success("Added to Favourites");
  };
  return (
    <div className="bg-white border  rounded-lg p-4 hover:shadow-md transition relative">
      <button
        onClick={handleFavourite}
        aria-label="Add to favourites"
        className="
        absolute top-3 right-3 
        z-40
        w-10 h-10 
        flex items-center justify-center
        rounded-full
        bg-white/90
        hover:bg-white cursor-pointer
        shadow
        text-red-600
        transition"
      >
        {fav ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
      </button>

      <Link href={`/products/${product.id}`}>
        <div className="relative h-40 mb-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      </Link>

      <h2 className="text-sm font-semibold line-clamp-2">{product.title}</h2>

      <p className="text-gray-500 text-sm capitalize mt-1">
        {product.category}
      </p>

      <p className="text-lg font-bold text-green-600 mt-2">${product.price}</p>
    </div>
  );
}
