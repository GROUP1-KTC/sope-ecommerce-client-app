import type { Category } from '~/types/products';

export function buildCategoryPath(
    categories: Category[],
    categoryId: string,
): Category[] {
    const map = new Map(categories.map((c) => [c.id, c]));
    const path: Category[] = [];

    let current = map.get(categoryId);
    while (current) {
        path.unshift(current);
        if (!current.parentId) break;
        current = map.get(current.parentId);
    }

    return path;
}

export function getCategoryPathName(
    categories: Category[],
    categoryId: string,
): string {
    const path = buildCategoryPath(categories, categoryId);
    return path.map((c) => c.name).join(' > ');
}
