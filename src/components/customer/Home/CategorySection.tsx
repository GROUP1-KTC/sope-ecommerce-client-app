'use client';

import React, { useRef, useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Image from 'next/image';

interface Category {
    name: string;
    img: string;
}

interface CategorySectionProps {
    categories: Category[];
    itemsPerRow?: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    categories,
    itemsPerRow = 10,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const rows = [
        categories.slice(0, itemsPerRow),
        categories.slice(itemsPerRow, itemsPerRow * 2),
    ];

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
        const handleScroll = () => {
            if (!el) return;
            const { scrollLeft, scrollWidth, clientWidth } = el;
            setAtStart(scrollLeft === 0);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };
        handleScroll();
        el?.addEventListener('scroll', handleScroll);
        return () => el?.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="w-full flex justify-center bg-gray-50 py-4">
            <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative">
                <h2 className="text-xl font-bold mb-1 pb-2">DANH MỤC</h2>
                <hr className="mb-4 border-gray-300" />
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
                        className="px-8"
                        style={{
                            scrollBehavior: 'smooth',
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <div className="min-w-max">
                            {rows.map((row, idx) => (
                                <div key={idx} className="flex flex-row mb-2">
                                    {row.map((cat) => (
                                        <a
                                            href="/product"
                                            key={cat.name}
                                            className="flex flex-col items-center mx-2 cursor-pointer w-24"
                                        >
                                            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 hover:bg-orange-100 mb-2 border border-gray-200 overflow-hidden">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src={cat.img}
                                                    alt={cat.name}
                                                    className="w-18 h-18 object-contain"
                                                />
                                            </div>
                                            <span className="text-xs text-center text-gray-700 font-medium leading-tight">
                                                {cat.name}
                                            </span>
                                        </a>
                                    ))}
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
        </div>
    );
};

export default CategorySection;
