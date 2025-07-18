'use client';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const brands = [
    {
        name: 'COOLMATE',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-m02qx1cjpd655f',
    },
    {
        name: 'POLOMANOR',
        img: 'https://down-vn.img.susercontent.com/file/vn-50009109-c600fb68d67e7e5164bc646f0bb1e229',
    },
    {
        name: 'GUZADO',
        img: 'https://down-vn.img.susercontent.com/file/21c730c26e8d3a6fab107a6ea75c057a',
    },
    {
        name: 'LADOS',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c3xr1p6lro11',
    },
    {
        name: '5S FASHION',
        img: 'https://down-vn.img.susercontent.com/file/573699fb35b480bae467c33e237bef2b',
    },
    {
        name: 'PEALO',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c43i4c5n78fb',
    },
    {
        name: 'TORANO',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c2ih4ogjw444',
    },
    {
        name: 'TEELAB',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c3jxhza8j628',
    },
    {
        name: 'JBAGY',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f',
    },
    {
        name: 'ROWAY',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c49exoq6r60f',
    },
    {
        name: 'ONOFF',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c41vh3z644eb',
    },
    {
        name: 'CLOUDY',
        img: 'https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m2c4c82kq6r857',
    },
];

const Mall = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const handleScroll = (side: 'left' | 'right') => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        if (side === 'right') {
            containerRef.current.scrollBy({
                left: width / 2,
                behavior: 'smooth',
            });
        } else {
            containerRef.current.scrollBy({
                left: -width / 2,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        const handleScrollEvent = () => {
            if (!container) return;
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setAtStart(scrollLeft === 0);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };

        handleScrollEvent();
        container?.addEventListener('scroll', handleScrollEvent);
        return () =>
            container?.removeEventListener('scroll', handleScrollEvent);
    }, []);

    return (
        <div className="w-full flex justify-center bg-gray-50 py-8">
            <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative group">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-red-500">
                        SOPE MALL
                    </h2>
                    <a
                        href="#"
                        className="text-sm text-red-500 hover:underline flex items-center"
                    >
                        Xem tất cả <span className="ml-1">{'>'}</span>
                    </a>
                </div>
                <div className="relative">
                    {!atStart && (
                        <button
                            className="absolute -left-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                            onClick={() => handleScroll('left')}
                            aria-label="Scroll left"
                            type="button"
                        >
                            <ArrowBackIosNewIcon className="text-lg text-orange-500" />
                        </button>
                    )}
                    <div
                        ref={containerRef}
                        className="overflow-x-auto"
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        <div className="flex">
                            {brands.map((brand, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col hover"
                                >
                                    <Link href="/mall-detail">
                                        <div className="w-40 h-40 flex items-center justify-center rounded mb-2 border border-gray-200 overflow-hidden hover:bg-orange-100 transition-colors duration-200   ">
                                            <img
                                                src={brand.img}
                                                alt={brand.name}
                                                className="w-full h-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="text-sm text-center text-gray-800 font-semibold leading-tight">
                                                {brand.name}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <style jsx>{`
                        div[ref='containerRef']::-webkit-scrollbar {
                            display: none; /* Chrome, Safari, Opera */
                        }
                    `}</style>
                    {!atEnd && (
                        <button
                            className="absolute -right-11 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 group-hover:scale-110 transition-transform duration-150 flex items-center justify-center cursor-pointer opacity-50 group-hover:opacity-100"
                            onClick={() => handleScroll('right')}
                            aria-label="Scroll right"
                            type="button"
                        >
                            <ArrowForwardIosIcon className="text-lg text-orange-500" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mall;
