import { useState } from "react";

type Category = {
  id: string;
  name: string;
};

interface CategoryFilterProps {
  categories: Category[];
  counts: Record<string, number>; // {categoryId: số lượng sản phẩm}
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
}

const formatCount = (count: number) => {
  if (count >= 1_000_000) return `${Math.floor(count / 1_000_000)}tr+`;
  if (count >= 1_000) return `${Math.floor(count / 1_000)}k+`;
  return count.toString();
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  counts,
  selectedCategory,
  setSelectedCategory,
}) => {
  const displayed = categories.slice(0, 15);

  return (
    <div>
      <h3 className="font-semibold mb-2">Theo Danh Mục</h3>
      <ul className="space-y-2">
        {displayed.map((cat) => (
          <li key={cat.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategory === cat.id}
              onChange={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? null : cat.id
                )
              }
              className="mr-2"
            />
            <span
              className={`cursor-pointer text-sm ${selectedCategory === cat.id
                ? "text-red-500 font-semibold"
                : ""
                }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.id ? null : cat.id
                )
              }
            >
              {cat.name} ({formatCount(counts[cat.id] ?? 0)})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;