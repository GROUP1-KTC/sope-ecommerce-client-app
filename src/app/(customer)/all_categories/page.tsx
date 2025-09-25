'use client';

import Image from 'next/image';
import CustomLink from '~/components/shared/loading/CustomLink';
import { useGetCategoriesQuery } from '~/features/categories/categoryApi';
import type { Category } from '~/types/products';

// Helper: group categories by first letter
const groupByFirstLetter = (cats: Category[]): Record<string, Category[]> => {
    const groups: Record<string, Category[]> = {};
    cats.forEach((cat) => {
        const first = cat.name.trim()[0].toUpperCase();
        if (!groups[first]) groups[first] = [];
        groups[first].push(cat);
    });
    return groups;
};

const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
);

const AllCategories = () => {
    const { data: categories = [] } = useGetCategoriesQuery();

    const groups = groupByFirstLetter(categories);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 sm:py-8">
            <div className="w-full max-w-[95%] md:max-w-4/5">
                {/* Breadcrumb */}

                <div className="text-xs sm:text-sm text-gray-500 mb-4">
                    Trang chủ &gt; Tất cả Danh mục
                </div>

                {/* Alphabet navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto sm:justify-center select-none scrollbar-hide">
                    {alphabet.map((ch) =>
                        groups[ch] ? (
                            <a
                                key={ch}
                                href={`#cat-${ch}`}
                                className="text-red-500 font-semibold px-2 sm:px-3 cursor-pointer hover:underline whitespace-nowrap"
                            >
                                {ch}
                            </a>
                        ) : (
                            <span
                                key={ch}
                                className="text-gray-300 px-2 sm:px-3 cursor-not-allowed whitespace-nowrap"
                            >
                                {ch}
                            </span>
                        ),
                    )}
                </div>

                {/* Category groups by letter */}
                {alphabet.map(
                    (ch) =>
                        groups[ch] && (
                            <div
                                key={ch}
                                id={`cat-${ch}`}
                                className="mb-10 sm:mb-12"
                            >
                                <div className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
                                    {ch}
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-xl shadow">
                                    {groups[ch].map((cat) => (
                                        <CustomLink
                                            href={`/${cat.slug}`}
                                            key={cat.id}
                                            className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover:bg-gray-100 transition group"
                                        >
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2">
                                                <Image
                                                    src={
                                                        cat.imageForParent ||
                                                        '/placeholder.png'
                                                    }
                                                    alt={cat.name}
                                                    width={64}
                                                    height={64}
                                                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full border border-gray-200 bg-white group-hover:scale-105 transition"
                                                />
                                            </div>
                                            <div className="text-center text-xs sm:text-sm font-medium text-gray-700 group-hover:text-green-600">
                                                {cat.name}
                                            </div>
                                        </CustomLink>
                                    ))}
                                </div>
                            </div>
                        ),
                )}
            </div>
        </div>
    );
};

export default AllCategories;
