import { useState } from 'react';
import { useParams } from 'next/navigation';
import type { Category } from '~/types/products';
import { Plus, Minus } from 'lucide-react';
import CustomLink from '~/components/shared/loading/CustomLink';

const CategoryNode = ({
    category,
    categories,
    selectedCategory,
    setSelectedCategory,
    openCategories,
    toggleOpen,
}: {
    category: Category;
    categories: Category[];
    selectedCategory: string | null;
    setSelectedCategory: (slug: string) => void;
    openCategories: Record<string, boolean>;
    toggleOpen: (id: string) => void;
}) => {
    const children = categories.filter((cat) => cat.parentId === category.id);

    const params = useParams();
    const currentSlug = params?.categorySlug;

    return (
        <li key={category.id}>
            <div className="flex justify-between items-center">
                <CustomLink
                    href={`/${category.slug}`}
                    className={`flex-1 block rounded text-sm px-2 py-1 cursor-pointer ${
                        currentSlug === category.slug
                            ? 'border border-red-500 text-red-500 font-semibold bg-red-50'
                            : 'hover:bg-gray-100'
                    }`}
                >
                    {category.name}
                </CustomLink>

                {children.length > 0 && (
                    <button
                        className="cursor-pointer  text-xs text-gray-800 px-2 focus:outline-none"
                        onClick={() => toggleOpen(category.id)}
                    >
                        {openCategories[category.id] ? (
                            <Minus size={18} className="text-gray-600" />
                        ) : (
                            <Plus size={18} className="text-gray-600" />
                        )}
                    </button>
                )}
            </div>

            {openCategories[category.id] && children.length > 0 && (
                <ul className="ml-4 mt-1 space-y-1">
                    {children.map((child) => (
                        <CategoryNode
                            key={child.id}
                            category={child}
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            openCategories={openCategories}
                            toggleOpen={toggleOpen}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const NestedCategoryList = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}: {
    categories: Category[];
    selectedCategory: string | null;
    setSelectedCategory: (slug: string) => void;
}) => {
    const [openCategories, setOpenCategories] = useState<
        Record<string, boolean>
    >({});

    const toggleOpen = (id: string) => {
        setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const rootCategories = categories.filter((cat) => cat.parentId === null);

    return (
        <ul className="space-y-1">
            {rootCategories.map((cat) => (
                <CategoryNode
                    key={cat.id}
                    category={cat}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    openCategories={openCategories}
                    toggleOpen={toggleOpen}
                />
            ))}
        </ul>
    );
};

export default NestedCategoryList;
