'use client';

import React, { useState } from 'react';
import { useGetProductByShopQuery } from '~/features/products/productApi';
import ProductTable from '~/components/seller/product-table/ProductTable';
import { ChevronLeft, ChevronRight, List, Grid, Plus } from 'lucide-react';
import type { ProductResponse, Category } from '~/types/products';
import CategorySelector from '~/components/add-edit-product/CategorySelector';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import {
    getCategoryPathName,
    buildCategoryPath,
} from '~/utils/buildCategoryPath';
import CustomLink from '~/components/shared/loading/CustomLink';

const AllProductsByShop = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
    const [activeTab, setActiveTab] = useState('all');
    const { data, isLoading, isError } = useGetProductByShopQuery({
        page: currentPage,
        size: 20,
    });

    const [searchText, setSearchText] = useState('');
    const [showCategorySelector, setShowCategorySelector] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );

    const products = data?.content ?? [];

    const { data: categories = [] } = useGetCategoriesQuery();

    console.log('products variants', products);

    const tabs = [
        {
            key: 'all',
            label: 'Tất cả',
            count: data?.totalElements ?? 0,
            filter: (p: ProductResponse) => true,
        },
        {
            key: 'active',
            label: 'Đang hoạt động',
            count: products.filter((p) => !p.hidden && p.status === 'APPROVED')
                .length,
            filter: (p: ProductResponse) =>
                !p.hidden && p.status === 'APPROVED',
        },
        {
            key: 'lowStock',
            label: 'Cần bổ sung hàng',
            count: products.filter((p) => p.variants?.some((v) => v.stock < 10))
                .length,
            filter: (p: ProductResponse) =>
                p.variants?.some((v) => v.stock < 10),
        },
        {
            key: 'rejected',
            label: 'Từ chối bởi Sope',
            count: products.filter((p) => p.status === 'REJECTED').length,
            filter: (p: ProductResponse) => p.status === 'REJECTED',
        },
        {
            key: 'pending',
            label: 'Chờ duyệt bởi Sope',
            count: products.filter((p) => p.status === 'PENDING').length,
            filter: (p: ProductResponse) => p.status === 'PENDING',
        },
        {
            key: 'hidden',
            label: 'Ẩn hoạt động',
            count: products.filter((p) => p.hidden && p.status === 'APPROVED')
                .length,
            filter: (p: ProductResponse) => p.hidden && p.status === 'APPROVED',
        },
    ];

    let filteredProducts: ProductResponse[] =
        activeTab === 'all'
            ? products
            : activeTab === 'lowStock'
              ? products
                    .map((p) => ({
                        ...p,
                        variants: p.variants.filter((v) => v.stock < 10),
                    }))
                    .filter((p) => p.variants.length > 0)
              : products.filter(
                    tabs.find((t) => t.key === activeTab)?.filter ??
                        (() => true),
                );

    if (searchText.trim()) {
        filteredProducts = filteredProducts.filter((p) =>
            p.name.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    if (selectedCategory) {
        filteredProducts = filteredProducts.filter((p) => {
            const path = buildCategoryPath(categories, p.categoryId);
            return path.some((c) => c.id === selectedCategory.id);
        });
    }

    if (isLoading) return <div className="p-6">Đang tải sản phẩm...</div>;
    if (isError)
        return <div className="p-6 text-red-600">Lỗi khi tải sản phẩm.</div>;

    return (
        <div className="mb-10">
            <div className="text-lg font-semibold mb-6 flex items-center justify-between  gap-2">
                <div>PRODUCTS</div>
                <div className="flex gap-2 p-2 items-center">
                    <CustomLink
                        target="_blank"
                        rel="noopener noreferrer"
                        href="/seller/add-product"
                        className="bg-orange-500 text-white flex items-center px-3 py-1.5 rounded text-sm font-medium hover:bg-orange-600 transition"
                    >
                        <Plus size={18} />
                        Thêm 1 sản phẩm mới
                    </CustomLink>
                </div>
            </div>

            <div className="flex gap-4 mb-6 px-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`pb-2 font-medium cursor-pointer ${
                            activeTab === tab.key
                                ? 'text-orange-600 border-b-2 border-orange-600'
                                : 'text-gray-600 hover:text-orange-600'
                        }`}
                    >
                        {tab.label} ({tab.count})
                    </button>
                ))}
            </div>

            <div className="flex justify-between flex-wrap gap-3 items-center mb-3 px-4 text-sm">
                <div className="flex gap-3">
                    <input
                        className="border border-gray-300 rounded px-3 py-1.5 w-80 focus:outline-none focus:ring-1 focus:ring-orange-400"
                        placeholder="Tìm theo tên sản phẩm"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />

                    <button
                        onClick={() => setShowCategorySelector(true)}
                        className="border border-gray-300 rounded px-2 py-1.5 w-60 text-left text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400"
                    >
                        {selectedCategory
                            ? getCategoryPathName(
                                  categories,
                                  selectedCategory.id,
                              )
                            : 'Loại Sản phẩm'}
                    </button>

                    <select className="border border-gray-300 rounded px-2 py-1.5 w-60 text-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-400">
                        <option>Chương trình Sope</option>
                        <option>Flash Sale</option>
                        <option>Miễn phí vận chuyển</option>
                        <option>Khuyến mãi khác</option>
                        <option>Ads Sope</option>
                    </select>

                    <button
                        onClick={() => {
                            setSearchText('');
                            setSelectedCategory(null);
                        }}
                        className="border cursor-pointer border-gray-300 px-6 py-1.5 rounded hover:bg-gray-100 transition text-sm"
                    >
                        Đặt lại
                    </button>
                </div>
            </div>

            <div></div>
            {showCategorySelector && (
                <CategorySelector
                    categories={categories}
                    selected={
                        selectedCategory
                            ? buildCategoryPath(categories, selectedCategory.id)
                            : []
                    }
                    onSelect={(path) => {
                        setSelectedCategory(path[path.length - 1]); // lấy leaf category
                        setShowCategorySelector(false);
                    }}
                    onClose={() => setShowCategorySelector(false)}
                />
            )}

            <div className="mb-3 text-gray-700 text-sm px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-semibold">
                            {data?.totalElements ?? 0} Sản Phẩm
                        </span>
                        <span className="ml-2">Hạn mức đăng bán: 5000</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg  px-1">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 cursor-pointer rounded-lg ${
                                viewMode === 'list'
                                    ? 'bg-gray-200 text-red-600'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 cursor-pointer rounded-lg ${
                                viewMode === 'grid'
                                    ? 'bg-gray-200 text-red-600'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            <Grid size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <ProductTable products={filteredProducts} viewMode={viewMode} />

            <div className="flex items-center justify-center gap-4 mt-4">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1  disabled:opacity-50"
                >
                    <ChevronLeft size={28} strokeWidth={2.5} />
                </button>

                <span>
                    {(data?.number ?? 0) + 1} / {data?.totalPages ?? 0}
                </span>

                <button
                    disabled={data && currentPage >= data.totalPages - 1}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1  disabled:opacity-50"
                >
                    <ChevronRight size={28} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
};

export default AllProductsByShop;
