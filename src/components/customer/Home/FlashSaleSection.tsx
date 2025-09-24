'use client';

import React, { useEffect, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Image from 'next/image';
import { useGetActiveFlashSalesQuery } from '~/features/service-program/serviceprogramApi';

import type { FlashSaleProgramDTO } from '~/types/service-programs/serviceprogram';
import FlashCountdown from './FlashCountdown';

interface FlashSaleSectionProps {
    initialSeconds?: number;
}

const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    // Gọi API lấy danh sách flash sale
    const { data: flashSales = [], isLoading } = useGetActiveFlashSalesQuery();

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

    const formatPrice = (price: number) => `₫${price.toLocaleString('vi-VN')}`;

    if (isLoading) {
        return (
            <div className="w-full flex justify-center py-6">
                <p>Đang tải Flash Sale...</p>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center bg-gray-50 px-6 py-4">
            <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative">
                <div className="flex items-center mb-1 justify-between pb-2">
                    <h2 className="text-xl font-bold flex items-center text-red-500">
                        ⚡FLASH SALES siêu hot
                    </h2>
                </div>
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
                        <div className="flex min-w-max">
                            {flashSales.map((sale: FlashSaleProgramDTO) => {
                                const { variantInfo, discountPercentage } =
                                    sale;
                                const nameWithAttrs = `${variantInfo.productName}${
                                    variantInfo.attributes?.length
                                        ? ' (' +
                                          variantInfo.attributes
                                              .map((a) => a.value)
                                              .join(', ') +
                                          ')'
                                        : ''
                                }`;

                                // Giá sau khi giảm
                                const discountedPrice =
                                    variantInfo.price *
                                    (1 - discountPercentage / 100);

                                // % sold (đơn giản stock+sold)
                                const total =
                                    variantInfo.stock + variantInfo.sold;
                                const soldPercent =
                                    total > 0
                                        ? Math.round(
                                              (variantInfo.sold / total) * 100,
                                          )
                                        : 0;

                                return (
                                    <div
                                        key={sale.id}
                                        className="relative flex flex-col items-center shadow-xl rounded-lg m-2 p-2 w-48 min-w-[12rem] cursor-pointer hover:bg-orange-100 transition-colors duration-200"
                                    >
                                        <FlashCountdown
                                            endDateTime={`${sale.saleDate}T${sale.endTime}`}
                                        />

                                        <div className="w-36 h-36 flex items-center justify-center bg-white mb-2 rounded overflow-hidden">
                                            <Image
                                                width={40}
                                                height={40}
                                                src={variantInfo.imageUrl}
                                                alt={variantInfo.productName}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="text-sm font-semibold text-gray-800 text-center mb-1 line-clamp-2 min-h-[2.5rem]">
                                            {nameWithAttrs}
                                        </div>
                                        <div className="text-lg font-bold text-red-500 mb-1">
                                            {formatPrice(discountedPrice)}
                                        </div>
                                        <div className="flex items-center justify-center mb-1">
                                            <span className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                -{discountPercentage}%
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden mb-1">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-400 to-pink-400"
                                                style={{
                                                    width: `${soldPercent}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
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

export default FlashSaleSection;
