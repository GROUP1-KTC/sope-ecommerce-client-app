import React, { useMemo } from 'react';
import type { Category } from '~/types/products';

interface CategorySelectorProps {
    categories: Category[];
    selected: Category[];
    onSelect: (path: Category[]) => void;
    onClose: () => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
    categories,
    selected,
    onSelect,
    onClose,
}) => {
    const levels = useMemo(() => {
        const result: Category[][] = [];
        const firstLevel = categories.filter((c) => !c.parent);
        if (firstLevel.length > 0) result.push(firstLevel);

        selected.forEach((cat) => {
            const children = categories.filter((c) => c.parent?.id === cat.id);
            if (children.length > 0) result.push(children);
        });

        return result;
    }, [categories, selected]);

    const handleSelect = (category: Category, level: number) => {
        const newSelected = [...selected.slice(0, level), category];
        onSelect(newSelected);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-40">
            <div className="fixed inset-0 z-50 flex items-center ml-100">
                <div className="w-[90vw] max-w-screen-lg bg-white border-2 border-red-500 p-10 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">
                            Chọn ngành hàng
                        </h2>
                    </div>

                    <div
                        className="flex space-x-4 overflow-x-auto"
                        style={{ willChange: 'transform', contain: 'layout' }}
                    >
                        {levels.map((group, level) => (
                            <div
                                key={level}
                                className="flex flex-col space-y-2 min-w-[150px]"
                            >
                                {group.map((cat) => {
                                    const isSelected =
                                        selected[level]?.id === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() =>
                                                handleSelect(cat, level)
                                            }
                                            className={`px-3 py-2 border rounded text-left hover:bg-gray-100 ${isSelected ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6 space-x-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-600 hover:text-gray-800"
                        >
                            Đóng
                        </button>
                        <button
                            onClick={() => {
                                onSelect(selected);
                                onClose();
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Thêm danh mục
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySelector;
