import { useState } from 'react';
import Link from 'next/link';

const NestedCategoryList = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}: {
    categories: any[];
    selectedCategory: string | null;
    setSelectedCategory: (slug: string) => void;
}) => {
    const [openCategories, setOpenCategories] = useState<
        Record<string, boolean>
    >({});

    const getChildren = (parentId: string) =>
        categories.filter((cat) => cat.parent?.id === parentId);

    const toggleOpen = (id: string) => {
        setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <ul className="space-y-1">
            {categories
                .filter((cat) => cat.parent === null)
                .map((parent) => {
                    const children = getChildren(parent.id);
                    return (
                        <li key={parent.id}>
                            <div className="flex justify-between items-center">
                                {/* Phần bấm để chọn danh mục */}
                                <Link
                                    key={parent.id}
                                    href={`/${parent.slug}`}
                                    className="block"
                                >
                                    <div
                                        className={`py-1 px-2 cursor-pointer rounded text-sm ${
                                            selectedCategory === parent.slug
                                                ? 'text-red-500 font-semibold bg-red-50 p-2'
                                                : 'hover:bg-gray-100'
                                        }`}
                                        onClick={() =>
                                            setSelectedCategory(parent.slug)
                                        }
                                    >
                                        <span>{parent.name}</span>
                                    </div>
                                </Link>

                                {/* Phần bấm để toggle mở/đóng danh mục con */}
                                {children.length > 0 && (
                                    <button
                                        className="text-xs text-gray-800 px-2 focus:outline-none"
                                        onClick={() => toggleOpen(parent.id)}
                                    >
                                        {openCategories[parent.id] ? '-' : '+'}
                                    </button>
                                )}
                            </div>

                            {/* Children cấp 1 */}
                            {openCategories[parent.id] &&
                                children.length > 0 && (
                                    <ul className="ml-4 mt-1 space-y-1">
                                        {children.map((child) => {
                                            const subChildren = getChildren(
                                                child.id,
                                            );
                                            return (
                                                <li key={child.id}>
                                                    <div className="flex justify-between items-center">
                                                        {/* Click tên danh mục => chuyển trang */}
                                                        <Link
                                                            href={`/${child.slug}`}
                                                            className={`flex-1 block rounded text-sm p-1 cursor-pointer ${
                                                                selectedCategory ===
                                                                child.slug
                                                                    ? 'text-red-500 font-semibold bg-red-50'
                                                                    : 'hover:bg-gray-100'
                                                            }`}
                                                            onClick={() =>
                                                                setSelectedCategory(
                                                                    child.slug,
                                                                )
                                                            }
                                                        >
                                                            <span>
                                                                {child.name}
                                                            </span>
                                                        </Link>

                                                        {/* Dấu + / - toggle con */}
                                                        {subChildren.length >
                                                            0 && (
                                                            <span
                                                                className="text-xs text-gray-800 px-2 cursor-pointer select-none"
                                                                onClick={() =>
                                                                    toggleOpen(
                                                                        child.id,
                                                                    )
                                                                }
                                                            >
                                                                {openCategories[
                                                                    child.id
                                                                ]
                                                                    ? '-'
                                                                    : '+'}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Children cấp 2 */}
                                                    {openCategories[child.id] &&
                                                        subChildren.length >
                                                            0 && (
                                                            <ul className="ml-4 mt-1 space-y-1">
                                                                {subChildren.map(
                                                                    (grand) => (
                                                                        <li
                                                                            key={
                                                                                grand.id
                                                                            }
                                                                            className={`py-1 px-2 cursor-pointer rounded text-sm ${
                                                                                selectedCategory ===
                                                                                grand.slug
                                                                                    ? 'text-red-500 font-semibold bg-red-50'
                                                                                    : 'hover:bg-gray-100'
                                                                            }`}
                                                                            onClick={() =>
                                                                                setSelectedCategory(
                                                                                    grand.slug,
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                grand.name
                                                                            }
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                        </li>
                    );
                })}
        </ul>
    );
};

export default NestedCategoryList;
