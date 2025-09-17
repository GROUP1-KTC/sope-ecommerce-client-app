'use client';

import Link from 'next/link';
import React from 'react';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import type { Category } from '~/types/products';

const CategoryList = () => {
    const { data: categories = [] } = useGetCategoriesQuery();

    console.log('Categories:', categories);

    const level1 = categories.filter((cat) => cat.level === 1);

    return (
        <div className="mx-80 p-20 border-t border-red-400">
            <div className="grid grid-cols-5 gap-6 text-sm mt-4 text-gray-800">
                {level1.map((parent: Category) => {
                    const children = categories.filter(
                        (cat) => cat.level === 2 && cat.parentId === parent.id,
                    );

                    return (
                        <div key={parent.id}>
                            <Link
                                href={`/${parent.slug}`}
                                className="hover:underline"
                            >
                                <h3 className="font-bold mb-2 uppercase">
                                    {parent.name}
                                </h3>
                            </Link>

                            <ul className="space-y-1">
                                {children.map((child: Category) => (
                                    <li key={child.id}>
                                        <Link
                                            href={`/${child.slug}`}
                                            className="hover:underline"
                                        >
                                            {child.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;
