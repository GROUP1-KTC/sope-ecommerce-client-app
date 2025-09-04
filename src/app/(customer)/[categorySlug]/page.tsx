'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
} from '~/features/categories/categoryApi';
import NestedCategoryList from './NestedCategoryList';
import ProductList from '~/components/product-list/ProductList';
import SelectFilter from '~/components/product-list/SelectFilter';

const CategoryPage = () => {
    const params = useParams();
    const slug = params?.categorySlug as string;

    const { data: categories = [], isLoading: loadingCategories } = useGetCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: products = [], isLoading: loadingProducts } =
        useGetProductsByCategoryQuery(slug);

    const mappedProducts = products.map((p) => {
        const minPrice = Math.min(...p.variantsByCategory.map(v => Number(v.price)));
        const totalSold = p.variantsByCategory.reduce((acc, v) => acc + v.sold, 0);

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
                    <SelectFilter />

                </div>

                {/* Main Content */}
                <ProductList
                    products={mappedProducts}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
