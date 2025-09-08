import React, { useMemo, useState } from 'react';
import type { Category } from '~/types/products';
import { getCategoryPathName, buildCategoryPath } from '~/utils/buildCategoryPath';

interface CategorySelectorProps {
    categories: Category[];
    selected: Category[];
    onSelect: (path: Category[]) => void;
    onClose: () => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, selected, onSelect, onClose }) => {

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

    const [searchTerm, setSearchTerm] = useState("");

    const leafCategories = useMemo(() => {
        return categories.filter(
            (cat) => !categories.some((c) => c.parentId === cat.id)
        );
    }, [categories]);

    const searchResults = useMemo(() => {
        if (searchTerm.trim().length < 1) return [];
        return leafCategories.filter((cat) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [leafCategories, searchTerm]);

    const isLeafCategory = (cat: Category) => {
        return !categories.some((c) => c.parentId === cat.id);
    };

    const lastSelected = selected[selected.length - 1];
    const isValidSelection = lastSelected ? isLeafCategory(lastSelected) : false;

    return (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-6 pt-[15vh]">
            {/* Modal content */}
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl flex flex-col max-h-[85vh] overflow-hidden">

                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 ">
                    <h2 className="text-lg font-semibold">Chọn ngành hàng</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Search box */}
                <div className="px-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="🔍 Nhập từ khóa để tìm..."
                        className="w-120 border rounded-full px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                </div>

                {/* Body */}
                <div className="flex-1 px-6 py-4 overflow-y-auto">
                    {searchTerm.trim().length > 0 ? (
                        <div className="space-y-2">
                            {searchResults.length > 0 ? (
                                searchResults.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => onSelect(buildCategoryPath(categories, cat.id))}
                                        className="w-120 text-left px-4 py-2 border rounded-lg hover:bg-gray-50"
                                    >
                                        {getCategoryPathName(categories, cat.id)}
                                    </button>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Không tìm thấy kết quả</p>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 border border-gray-200 rounded-lg overflow-hidden">
                            {levels.map((group, level) => (
                                <div
                                    key={level}
                                    className={`flex flex-col space-y-1 max-h-[60vh] overflow-y-auto p-2 
                                        ${level < levels.length - 1 ? "border-r border-gray-200" : ""}`}
                                >
                                    {group.map((cat) => {
                                        const isSelected = selected[level]?.id === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => handleSelect(cat, level)}
                                                className={`px-3 py-2 text-left rounded-md border text-sm transition cursor-pointer ${isSelected
                                                    ? "bg-orange-50 border-orange-500 text-orange-600 font-medium"
                                                    : "bg-white border-transparent hover:bg-gray-50"
                                                    }`}
                                            >
                                                {cat.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
                    <div className="text-sm text-gray-600">
                        {isValidSelection
                            ? `Đã chọn: ${getCategoryPathName(categories, lastSelected.id)}`
                            : "Vui lòng chọn đến ngành hàng cuối cùng"}
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => {
                                onSelect([]);
                                onClose();
                            }}
                            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                            Đóng
                        </button>
                        <button
                            onClick={() => {
                                if (isValidSelection) {
                                    onSelect(selected);
                                    onClose();
                                }
                            }}
                            disabled={!isValidSelection}
                            className={`px-4 py-2 rounded-lg text-white ${isValidSelection
                                ? "bg-orange-500 hover:bg-orange-600"
                                : "bg-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Thêm danh mục
                        </button>
                    </div>
                </div>
            </div>
        </div >

    );

};


export default CategorySelector;
