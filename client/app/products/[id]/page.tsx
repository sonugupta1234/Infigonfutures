"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "../../types/product";
import { apiRequest } from "../../lib/apiRequest";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../../components/navbar"));

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await apiRequest("get", `/products/${id}`);
        setProduct(res);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="h-[70vh] flex items-center justify-center">
          <p className="text-lg font-semibold">Loading product...</p>
        </div>
      ) : error ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-6">
          <button
            onClick={() => router.back()}
            className="mb-6 text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative w-full h-[400px] bg-white border rounded-lg p-6">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-3">{product.title}</h1>

              <p className="text-gray-500 mb-2 capitalize">
                Category: {product.category}
              </p>

              <p className="text-3xl font-bold text-green-600 mb-4">
                ${product.price}
              </p>

              <button className="bg-red-600 text-white cursor-pointer px-6 py-3 rounded-md hover:bg-red-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
