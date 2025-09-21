'use client';

import { useRef, useState, useEffect } from 'react';
import type { ProductSummary } from '~/types/products';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductListLine = ({
    title,
    products,
}: {
    title: string;
    products: ProductSummary[];
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const { clientWidth } = scrollRef.current;
        const scrollAmount =
            direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    useEffect(() => {
        const el = scrollRef.current;
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
        <div className="w-[95%] mx-auto flex justify-center py-4">
            <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative overflow-visible">
                <div className="flex items-center mb-1 justify-between pb-2">
                    <h2 className="uppercase text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                </div>
                <hr className="mb-4 border-gray-300" />

                <div className="relative group">
                    <button
                        className={`absolute -left-11 top-1/2 -translate-y-1/2 z-10 
                                   bg-white rounded-full shadow p-2 transition-all duration-200
                                   group-hover:scale-110 group-hover:bg-orange-100
                                   ${atStart ? 'opacity-0 pointer-events-none' : 'opacity-50 group-hover:opacity-100 cursor-pointer'}`}
                        onClick={() => scroll('left')}
                    >
                        <ChevronLeft className="w-5 h-5 text-orange-500" />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto scroll-smooth 
                                   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                    >
                        {products.map((product) => (
                            <div
                                key={product.productId}
                                className="flex-shrink-0 w-[200px]"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    <button
                        className={`absolute -right-11 top-1/2 -translate-y-1/2 z-10 
                                   bg-white rounded-full shadow p-2 transition-all duration-200
                                   group-hover:scale-110 group-hover:bg-orange-100
                                   ${atEnd ? 'opacity-0 pointer-events-none' : 'opacity-50 group-hover:opacity-100 cursor-pointer'}`}
                        onClick={() => scroll('right')}
                    >
                        <ChevronRight className="w-5 h-5 text-orange-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductListLine;
