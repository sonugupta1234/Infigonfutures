"use client";

import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { useFavourites } from "../hooks/useFavourites";

export default function Navbar() {
  const { favourites } = useFavourites();

  return (
    <nav className="w-full fixed z-50 top-0 bg-cyan-500 shadow-sm">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link href="/products" className="text-xl font-bold text-white">
          IndiaMart
        </Link>

        <div className="relative group">
          <button
            aria-label="Favourites"
            className="relative p-2 rounded-full bg-red-50 transition hover:cursor-pointer"
          >
            <CiHeart className="w-6 h-6 text-red-500" />

            {favourites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                {favourites.length}
              </span>
            )}
          </button>

          {/* 🔽 Dropdown */}
          {favourites.length > 0 && (
            <div className="absolute z-50 right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-3 border-b font-semibold text-gray-700">
                Favourites
              </div>

              <ul className="max-h-80 overflow-auto">
                {favourites.map((item) => (
                  <li key={item.id} className="flex gap-3 p-3 hover:bg-gray-50">
                    <Link href={`/products/${item.id}`}>
                      <div className="relative w-12 h-12 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </Link>

                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-green-600 font-semibold text-sm">
                        ${item.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
