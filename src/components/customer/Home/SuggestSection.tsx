'use client';

import React, { useState } from 'react';
import ProductCard from '~/components/product-detail/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  sold: string;
}

interface SuggestSectionProps {
  products: Product[];
  title?: string;
}

const SuggestSection: React.FC<SuggestSectionProps> = ({
  products,
  title = 'GỢI Ý HÔM NAY',
}) => {
  const columns = 5;
  const rowsPerPage = 3;
  const itemsPerPage = columns * rowsPerPage;

  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <div className="w-full flex justify-center bg-gray-50 py-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full">
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer"
              onClick={handleLoadMore}
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestSection;
