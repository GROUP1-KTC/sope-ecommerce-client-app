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
        const firstLevel = categories.filter((c) => !c.parentId);
        if (firstLevel.length > 0) result.push(firstLevel);

        selected.forEach((cat) => {
            const children = categories.filter((c) => c.parentId === cat.id);
            if (children.length > 0) result.push(children);
        });

        return result;
    }, [categories, selected]);

    const handleSelect = (category: Category, level: number) => {
        const newSelected = [...selected.slice(0, level), category];
        onSelect(newSelected);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
            {/* Modal content */}
            <div className="w-[90vw] max-w-screen-lg bg-white border-2 border-red-500 rounded-lg shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">Chọn ngành hàng</h2>
                    <button
                        onClick={onClose}
                        className="px-2 py-1 text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                {/* Body scrollable */}
                <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
                    <div className="flex space-x-4 overflow-x-auto">
                        {levels.map((group, level) => (
                            <div
                                key={level}
                                className="flex flex-col space-y-2 min-w-[180px] max-h-[60vh] overflow-y-auto border-r pr-2"
                            >
                                {group.map((cat) => {
                                    const isSelected = selected[level]?.id === cat.id;
                                    return (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleSelect(cat, level)}
                                            className={`px-3 py-2 border rounded text-left hover:bg-gray-100 ${isSelected
                                                    ? "bg-blue-100 border-blue-400"
                                                    : "bg-white border-gray-300"
                                                }`}
                                        >
                                            {cat.name}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end space-x-2 px-6 py-4 border-t">
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
    );

};


export default CategorySelector;
