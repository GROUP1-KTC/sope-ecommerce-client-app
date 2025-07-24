'use client';

import React, { useEffect, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ProductCard from '~/components/product-detail/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  sold: string;
}

interface MostSearchProps {
  products: Product[];
  title?: string;
}

const MostSearch: React.FC<MostSearchProps> = ({
  products,
  title ,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleScroll = (dir: 'left' | 'right') => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    containerRef.current.scrollBy({
      left: dir === 'right' ? width / 2 : -width / 2,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = containerRef.current;
    const onScroll = () => {
      if (!el) return;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft === 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };
    onScroll();
    el?.addEventListener('scroll', onScroll);
    return () => el?.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="w-full flex justify-center bg-gray-50 py-4">
      <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative">
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <a href="#" className="text-sm text-orange-500 hover:underline">
            Xem tất cả {'>'}
          </a>
        </div>
        <div className="relative group">
          {!atStart && (
            <button
              className="absolute -left-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 opacity-50 group-hover:opacity-100 cursor-pointer"
              onClick={() => handleScroll('left')}
            >
              <ArrowBackIosNewIcon className="text-lg text-orange-500" />
            </button>
          )}
          <div
            ref={containerRef}
            className="px-8 hide-scrollbar"
            style={{
              scrollBehavior: 'smooth',
              overflowX: 'auto',
            }}
          >
            <div className="flex gap-4 min-w-max">
              {products.map((product) => (
                <div key={product.id} className="w-48 min-w-[12rem]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          {!atEnd && (
            <button
              className="absolute -right-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 opacity-50 group-hover:opacity-100 cursor-pointer"
              onClick={() => handleScroll('right')}
            >
              <ArrowForwardIosIcon className="text-lg text-orange-500" />
            </button>
          )}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MostSearch;
