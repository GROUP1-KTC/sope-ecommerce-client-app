'use client';

import React, { useMemo, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ChevronDown } from 'lucide-react';
import type { ProductSummary } from '~/types/products';
import ProductCard from '../product-detail/ProductCard';

interface ProductListProps {
    products: ProductSummary[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    page,
    totalPages,
    onPageChange,
}) => {
    const [sort, setSort] = useState<string>('default');

    const sortedProducts = useMemo(() => {
        const sorted = [...products];

        if (sort === 'price_asc') {
            sorted.sort((a, b) => a.minPrice - b.minPrice);
        } else if (sort === 'price_desc') {
            sorted.sort((a, b) => b.minPrice - a.minPrice);
        } else if (sort === 'bestseller') {
            sorted.sort((a, b) => b.totalSold - a.totalSold);
        }

        return sorted;
    }, [products, sort]);

    return (
        <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                {/* Sort buttons */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        className={`px-4 py-2 cursor-pointer rounded-lg border text-sm font-medium transition ${
                            sort === 'default'
                                ? 'bg-red-500 text-white border-red-500 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => setSort('default')}
                    >
                        Mặc định
                    </button>

                    <button
                        className={`px-4 py-2 cursor-pointer rounded-lg border text-sm font-medium transition ${
                            sort === 'bestseller'
                                ? 'bg-red-500 text-white border-red-500 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => setSort('bestseller')}
                    >
                        Bán chạy
                    </button>

                    {/* Dropdown giá */}
                    <div className="relative group">
                        <button
                            className={`px-4 py-2 cursor-pointer rounded-lg border text-sm font-medium min-w-[150px] flex items-center justify-between transition ${
                                sort.includes('price')
                                    ? 'bg-red-500 text-white border-red-500 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            <span>Giá</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="absolute left-0 top-full  hidden group-hover:block bg-white border rounded-lg shadow-md z-10 min-w-[150px]">
                            <button
                                className={`block w-full cursor-pointer text-left px-4 py-2 text-sm rounded-t-md ${
                                    sort === 'price_asc'
                                        ? 'bg-red-100 text-red-600 font-medium'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setSort('price_asc')}
                            >
                                Thấp đến cao
                            </button>
                            <button
                                className={`block w-full cursor-pointer text-left px-4 py-2 text-sm rounded-b-md ${
                                    sort === 'price_desc'
                                        ? 'bg-red-100 text-red-600 font-medium'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => setSort('price_desc')}
                            >
                                Cao đến thấp
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end gap-2 text-sm">
                    <span className="text-gray-500">
                        {page + 1}/{totalPages}
                    </span>
                    <button
                        className="p-1.5 border rounded-md cursor-pointer transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={page === 0}
                        onClick={() => onPageChange(page - 1)}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </button>
                    <button
                        className="p-1.5 border rounded-md cursor-pointer transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={page + 1 >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                    >
                        <ArrowForwardIcon fontSize="small" />
                    </button>
                </div>
            </div>

            {/* Grid sản phẩm */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
