'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
} from '~/features/categories/categoryApi';
import NestedCategoryList from './NestedCategoryList';
import ProductList from '~/components/product-list/ProductList';

const CategoryPage = () => {
    const params = useParams();
    const slug = (params.categorySlug as string) ?? '';

    const { data: categories = [] } = useGetCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const [page, setPage] = useState(0);
    const [showSidebar, setShowSidebar] = useState(false);

    const { data: productsByCategory, isLoading: loadingProducts } =
        useGetProductsByCategoryQuery(
            { slug, page, size: 20 },
            { skip: !slug },
        );

    if (loadingProducts) return <p>Đang tải sản phẩm...</p>;

    return (
        <div className="w-full flex justify-center bg-gray-50 py-8">
            <div className="bg-white rounded-xl shadow p-6 max-w-7xl w-full flex flex-col md:flex-row relative">
                {/* Sidebar cho desktop */}
                <div className="hidden md:block w-64 pr-6">
                    <h2 className="text-lg font-bold mb-4">Tất Cả Danh Mục</h2>
                    <NestedCategoryList
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                </div>

                {/* Nút mở sidebar trên mobile */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg font-medium shadow hover:bg-red-600 transition"
                    >
                        Chọn danh mục
                    </button>
                </div>

                {/* Drawer sidebar trên mobile */}
                {showSidebar && (
                    <div className="fixed inset-0 z-50 flex">
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-black opacity-20"
                            onClick={() => setShowSidebar(false)}
                        />
                        {/* Sidebar */}
                        <div className="relative w-64 bg-white p-4 overflow-y-auto shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">
                                    Tất Cả Danh Mục
                                </h2>
                                <button
                                    onClick={() => setShowSidebar(false)}
                                    className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                            <NestedCategoryList
                                categories={categories}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={(cat) => {
                                    setSelectedCategory(cat);
                                    setShowSidebar(false); // đóng khi chọn
                                    const productSection =
                                        document.getElementById('all-products');
                                    if (productSection) {
                                        productSection.scrollIntoView({
                                            behavior: 'smooth',
                                        });
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* MAIN CONTENT */}
                <div className="flex-1">
                    <div
                        id="all-products"
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
                    >
                        <h2 className="font-semibold text-lg text-gray-800 mb-5">
                            Tất cả sản phẩm
                        </h2>
                        <ProductList
                            products={productsByCategory?.content || []}
                            page={page}
                            totalPages={productsByCategory?.totalPages || 1}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
