'use client';

import Link from 'next/link';
import React from 'react';
import { useGetCategoryQuery } from '~/features/categories/categoryApiSlice';
import type { Category } from '~/types/products';

const CategoryList = () => {
    const { data: categories = [], isLoading } = useGetCategoryQuery();

    if (isLoading) return <div>Đang tải danh mục...</div>;

    // Group categories by parentId
    const categoryMap = categories.reduce(
        (acc: Record<string, Category[]>, cat) => {
            const parentId = cat.parent?.id ?? '__ROOT__'; // 👈 dùng "__ROOT__" thay cho null
            if (!acc[parentId]) acc[parentId] = [];
            acc[parentId].push(cat);
            return acc;
        },
        {},
    );

    return (
        <div className="mx-80 p-20s  border-red-400 border-t">
            <div className="grid grid-cols-5 gap-6 text-sm mt-4 text-gray-800">
                {(categoryMap['__ROOT__'] || []).map((parent: Category) => (
                    <div key={parent.id}>
                        <Link
                            key={parent.slug}
                            href={`/category/${parent.slug}`}
                            className="hover:underline"
                        >
                            <h3 className="font-bold mb-2 uppercase">
                                {parent.name}
                            </h3>
                        </Link>

                        <ul className="space-y-1">
                            {(categoryMap[parent.id] || []).map(
                                (child: Category) => (
                                    <li key={child.id}>
                                        <a
                                            href={parent.slug}
                                            className="hover:underline"
                                        >
                                            {child.name}
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
