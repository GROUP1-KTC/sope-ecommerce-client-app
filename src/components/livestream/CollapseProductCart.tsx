'use client';

import React from 'react';
import type { ProductSummary } from '~/types/products/product';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';

interface CollapseProductCardProps {
    product: ProductSummary & { rating?: number; sold?: number };
    onAddToCart?: (product: ProductSummary) => void;
}

const CollapseProductCard = ({
    product,
    onAddToCart,
}: CollapseProductCardProps) => {
    const handleAdd = () => onAddToCart?.(product);

    return (
        <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <Image
                        width={80}
                        height={80}
                        src={product.defaultImage}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded ml-2"
                    />
                    <div className="flex flex-col ml-4">
                        <span className="font-normal text-gray-800">
                            {product.name}
                        </span>
                        <span className="text-xs bg-red-200 p-1 text-black rounded">
                            Chỉ có trên LIVE
                        </span>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            {product.rating && (
                                <div className="flex items-center gap-0.5">
                                    <StarIcon className="!w-4 !h-4 text-yellow-400" />
                                    <span>{product.rating.toFixed(1)}</span>
                                </div>
                            )}
                            <span className="border-l border-gray-300 h-4"></span>
                            {product.sold !== undefined && (
                                <span>
                                    Đã bán {product.sold.toLocaleString()}
                                </span>
                            )}
                        </div>

                        <span className="text-sm font-semibold text-black-500">
                            {product.minPrice.toLocaleString()}₫{' '}
                            <span className="text-xs ml-2 text-red-500 line-through">
                                {product.minPrice.toLocaleString()}₫
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={handleAdd}
                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition flex items-center justify-center mr-2 cursor-pointer"
                title="Thêm vào giỏ"
            >
                <AddShoppingCartIcon className="!w-5 !h-5" />
            </button>
        </div>
    );
};

export default CollapseProductCard;
