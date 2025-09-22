'use client';

import React, { useState, useMemo } from 'react';
import { useSearchProductsQuery } from '~/features/products/elasticApi';
import { skipToken } from '@reduxjs/toolkit/query';

import { useParams } from 'next/navigation';
// import SelectFilter from '~/components/product-list/SelectFilter';
import ProductList from '~/components/product-list/ProductList';
import CategoryFilter from '~/components/product-list/CategoryFilter';

const SearchPage = () => {
    const params = useParams();
    const { keyword } = params;

    const [page, setPage] = useState(0);
    const size = 40;

    const { data: products = [], isLoading } = useSearchProductsQuery(
        keyword
            ? {
                  _source: [
                      'product_id',
                      'slug',
                      'name',
                      'default_image',
                      'rating_score',
                      'review_count',
                      'min_price',
                      'total_sold',
                      'category_id',
                      'category_name',
                  ],
                  query: {
                      function_score: {
                          query: {
                              bool: {
                                  should: [
                                      {
                                          match_phrase: {
                                              name: {
                                                  query: keyword,
                                                  boost: 5,
                                              },
                                          },
                                      },
                                      {
                                          match_phrase_prefix: {
                                              name: {
                                                  query: keyword,
                                                  boost: 4,
                                              },
                                          },
                                      },
                                      {
                                          match: {
                                              name: {
                                                  query: keyword,
                                                  fuzziness: 'AUTO',
                                                  boost: 2,
                                              },
                                          },
                                      },
                                      {
                                          match: {
                                              slug: {
                                                  query: keyword,
                                                  boost: 1,
                                              },
                                          },
                                      },
                                  ],
                              },
                          },
                          boost_mode: 'sum',
                      },
                  },
                  from: page * size,
                  size,
                  sort: [{ _score: 'desc' }],
              }
            : skipToken,
    );

    const total = products.length;
    const totalPages = Math.ceil(total / size);

    const mappedProducts = products.map((p: any) => ({
        productId: p.product_id,
        slug: p.slug,
        defaultImage: p.default_image,
        name: p.name,
        minPrice: p.min_price,
        brand: p.category_name,
        totalStock: p.total_stock ?? 0,
        totalSold: p.total_sold,
        createdAt: p.unix_ts_in_secs
            ? new Date(p.unix_ts_in_secs * 1000).toISOString()
            : undefined,
        categoryId: p.category_id,
        averageRating: p.rating_score,
    }));

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const p of products) {
            counts[p.category_id] = (counts[p.category_id] ?? 0) + 1;
        }
        return counts;
    }, [products]);

    const categories = useMemo(() => {
        const map = new Map<string, string>();
        for (const p of products) {
            if (!map.has(p.category_id)) {
                map.set(p.category_id, p.category_name);
            }
        }
        return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (!selectedCategory) return mappedProducts;
        return mappedProducts.filter((p) => p.categoryId === selectedCategory);
    }, [mappedProducts, selectedCategory]);

    if (isLoading) return <div className="p-6">Đang tìm kiếm...</div>;

    return (
        <div className="w-full flex justify-center bg-gray-50 py-8">
            <div className="bg-white rounded-xl shadow p-6 max-w-7xl w-full flex">
                {/* Sidebar */}
                <div className="w-64 pr-4 border-r border-gray-400 ">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        Tất Cả Danh Mục
                    </h2>

                    <CategoryFilter
                        categories={categories}
                        counts={categoryCounts}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                    {/* <SelectFilter /> */}
                </div>

                <ProductList
                    products={filteredProducts}
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default SearchPage;
