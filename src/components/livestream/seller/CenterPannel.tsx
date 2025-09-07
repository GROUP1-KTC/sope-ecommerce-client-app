'use client';
import React, { useState, useMemo } from 'react';
import { SellerLiveProduct } from '~/types/products';
import { ProductLiveCard } from './ProductLiveCard';

type CenterPanelProps = {
  products: SellerLiveProduct[];
};

export default function CenterPanel({ products }: CenterPanelProps) {
  const [query, setQuery] = useState('');
  const [pinnedId, setPinnedId] = useState<number | null>(null);

  // filter sản phẩm theo tên (trừ sản phẩm đang ghim)
  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.id !== pinnedId && p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query, pinnedId]);

  const handlePin = (id: number) => {
    setPinnedId((prev) => (prev === id ? null : id)); // toggle pin
  };

  const pinnedProduct = products.find((p) => p.id === pinnedId) || null;

  return (
    <div className="w-1/2 flex flex-col p-2 overflow-y-auto border-r border-gray-300">
      <h3 className="font-bold mb-2">Products Live</h3>
      <div className="relative mb-3">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            ></path>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>


      {/* Pinned Product */}
      {pinnedProduct && (
        <div className="mb-2">
          <h4 className="text-sm font-semibold text-blue-600 mb-1">
            Sản phẩm đang ghim
          </h4>
          <ProductLiveCard
            key={pinnedProduct.id}
            product={pinnedProduct}
            pinnedId={pinnedId || undefined}
            onPinAction={handlePin}
          />
          <hr className="my-2 border-gray-300" />
        </div>
      )}

      {/* Other products */}
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-blue-600 mb-1">
          Danh sách sản phẩm
        </h4>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductLiveCard
              key={p.id}
              product={p}
              pinnedId={pinnedId || undefined}
              onPinAction={handlePin}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No products found</p>
        )}
      </div>
    </div>
  );
}
