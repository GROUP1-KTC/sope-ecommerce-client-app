'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
} from '~/features/categories/categoryApi';
import NestedCategoryList from './NestedCategoryList';
import ProductList from '~/components/product-list/ProductList';
// import SelectFilter from '~/components/product-list/SelectFilter';

const CategoryPage = () => {
    const params = useParams();
    const slug = (params.categorySlug as string) ?? '';

    console.log('check slug', slug);

    const { data: categories = [] } = useGetCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const [page, setPage] = useState(0);

    const { data: productsByCategory, isLoading: loadingProducts } =
        useGetProductsByCategoryQuery(
            { slug, page, size: 20 },
            { skip: !slug },
        );

    console.log('check productsByCategory', productsByCategory?.content);

    if (loadingProducts) return <p>Đang tải sản phẩm...</p>;

    return (
        <div className="w-full flex justify-center bg-gray-50 py-8">
            <div className="bg-white rounded-xl shadow p-6 max-w-7xl w-full flex">
                {/* Sidebar */}
                <div className="w-64 pr-6 ">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        Tất Cả Danh Mục
                    </h2>

                    <NestedCategoryList
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                    {/* <SelectFilter /> */}
                </div>

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
