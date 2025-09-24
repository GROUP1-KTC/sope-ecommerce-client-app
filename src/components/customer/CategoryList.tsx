'use client';

import React from 'react';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import type { Category } from '~/types/products';
import CustomLink from '../shared/loading/CustomLink';

const CategoryList = () => {
    const { data: categories = [] } = useGetCategoriesQuery();

    const level1 = categories.filter((cat) => cat.level === 1);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 text-gray-700">
                {level1.map((parent: Category) => {
                    const children = categories.filter(
                        (cat) => cat.level === 2 && cat.parentId === parent.id,
                    );

                    return (
                        <div key={parent.id}>
                            <CustomLink
                                href={`/${parent.slug}`}
                                className="hover:text-red-600 transition-colors"
                            >
                                <h3 className="font-semibold text-base mb-3 uppercase tracking-wide">
                                    {parent.name}
                                </h3>
                            </CustomLink>

                            <ul className="space-y-2">
                                {children.map((child: Category) => (
                                    <li key={child.id}>
                                        <CustomLink
                                            href={`/${child.slug}`}
                                            className="hover:text-red-500 transition-colors text-sm"
                                        >
                                            {child.name}
                                        </CustomLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default CategoryList;
