'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
} from '~/features/categories/categoryApi';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NestedCategoryList from './NestedCategoryList';
import Image from 'next/image';

const sortOptions = ['Phổ Biến', 'Mới Nhất', 'Bán Chạy', 'Giá'];

const CategoryPage = () => {
    const params = useParams();
    const slug = params?.categorySlug as string;

    const { data: categories = [], isLoading: loadingCategories } =
        useGetCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );
    const [sort, setSort] = useState(sortOptions[0]);
    const [page, setPage] = useState(1);

    const { data: products = [], isLoading: loadingProducts } =
        useGetProductsByCategoryQuery(slug);

    const mappedProducts = products.map((p) => {
        const minPrice = Math.min(
            ...p.variantsByCategory.map((v) => Number(v.price)),
        );
        const totalSold = p.variantsByCategory.reduce(
            (acc, v) => acc + v.sold,
            0,
        );

        return {
            productId: p.productId,
            slug: p.slug,
            name: p.name,
            brand: p.brand,
            defaultImage: p.defaultImage,
            defaultPrice: minPrice,
            totalSold,
        };
    });

    if (loadingCategories || loadingProducts) return <p>Đang tải...</p>;

    const category = categories.find((cat) => cat.slug === slug);

    if (!category) return <p>Không tìm thấy danh mục</p>;

    return (
        <div className="w-full flex justify-center bg-gray-50 py-8">
            <div className="bg-white rounded-xl shadow p-6 max-w-7xl w-full flex">
                {/* Sidebar */}
                <div className="w-64 pr-6 border-r">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        Tất Cả Danh Mục
                    </h2>

                    <NestedCategoryList
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                    {/* Bộ lọc (chỉ là giao diện, bạn có thể nối API sau) */}
                    <div className="mt-8 text-4xs text-gray-500 font-semibold uppercase tracking-wider">
                        Bộ lọc tìm kiếm
                    </div>

                    <div className="mt-4 space-y-6 text-sm">
                        <div>
                            <div className="font-semibold mb-2">
                                Thương Hiệu
                            </div>
                            <div className="space-y-1">
                                {['AVOCADO', 'COOLMATE', 'PH', 'JBAGY'].map(
                                    (brand) => (
                                        <label
                                            key={brand}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                className="accent-orange-500"
                                            />
                                            <span>{brand}</span>
                                        </label>
                                    ),
                                )}
                            </div>
                        </div>

                        <hr />

                        <div>
                            <div className="font-semibold mb-2">Khoảng Giá</div>
                            <div className="flex items-center gap-2 mb-2">
                                <input
                                    type="number"
                                    placeholder="₫ TỪ"
                                    className="border rounded px-2 py-1 w-24 text-xs"
                                />
                                <span>–</span>
                                <input
                                    type="number"
                                    placeholder="₫ ĐẾN"
                                    className="border rounded px-2 py-1 w-24 text-xs"
                                />
                            </div>
                            <button className="w-full bg-[#E44358] text-white rounded py-2 font-semibold cursor-pointer hover:bg-[#d0001a] transition-colors duration-200">
                                ÁP DỤNG
                            </button>
                        </div>

                        <hr />

                        <div>
                            <div className="font-semibold mb-2">Loại Shop</div>
                            {[
                                'Shopee Mall',
                                'Shop Yêu thích',
                                'Xử lý đơn hàng bởi Shopee',
                            ].map((type) => (
                                <label
                                    key={type}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        className="accent-orange-500"
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>

                        <hr />

                        <div>
                            <div className="font-semibold mb-2">Tình Trạng</div>
                            {['Đã sử dụng', 'Mới'].map((status) => (
                                <label
                                    key={status}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="checkbox"
                                        className="accent-orange-500"
                                    />
                                    <span>{status}</span>
                                </label>
                            ))}
                        </div>

                        <hr />

                        <div>
                            <div className="font-semibold mb-2">Đánh Giá</div>
                            {[5, 4, 3, 2, 1].map((star) => (
                                <label
                                    key={star}
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="flex">
                                        {Array.from({ length: 5 }).map(
                                            (_, i) => (
                                                <span
                                                    key={i}
                                                    className={
                                                        i < star
                                                            ? 'text-orange-400'
                                                            : 'text-gray-300'
                                                    }
                                                >
                                                    ★
                                                </span>
                                            ),
                                        )}
                                    </span>
                                    <span className="text-xs text-gray-700">
                                        trở lên
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 pl-6">
                    {/* Sorting */}
                    <div className="flex items-center gap-2 mb-4">
                        {sortOptions.map((key) => (
                            <button
                                key={key}
                                className={`px-4 py-2 rounded cursor-pointer border text-sm font-medium ${
                                    sort === key
                                        ? 'bg-red-500 text-white border-red-500'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                                onClick={() => setSort(key)}
                            >
                                {key}
                            </button>
                        ))}
                        <span className="ml-auto text-xs text-gray-500">
                            {page}/8
                        </span>
                        <button
                            className="p-1 border rounded mx-1 cursor-pointer text-black hover:text-red-500"
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            <ArrowBackIcon />
                        </button>
                        <button
                            className="p-1 border rounded mx-1 cursor-pointer text-gray-500 hover:text-red-500"
                            disabled={page === 8}
                            onClick={() => setPage((p) => Math.min(8, p + 1))}
                        >
                            <ArrowForwardIcon />
                        </button>
                    </div>

                    {/* Grid sản phẩm */}
                    <div className="grid grid-cols-5 gap-4">
                        {mappedProducts.map((product) => (
                            <Link
                                key={product.productId}
                                href={`/product-by-slug/${product.slug}`}
                                className="border rounded-lg bg-white flex flex-col p-2 relative cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-orange-100 transition duration-200"
                            >
                                <div className="w-full h-36 flex items-center justify-center mb-2 overflow-hidden">
                                    <Image
                                        src={product.defaultImage}
                                        alt={product.name}
                                        className="w-full h-full object-contain rounded bg-white"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <div className="text-left text-sm">
                                    <div className="font-medium text-xs mb-1 line-clamp-2">
                                        {product.name}
                                    </div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-red-500 font-bold">
                                            ₫
                                            {product.defaultPrice.toLocaleString(
                                                'vi-VN',
                                            )}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Thương hiệu: {product.brand}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Đã bán {product.totalSold}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
