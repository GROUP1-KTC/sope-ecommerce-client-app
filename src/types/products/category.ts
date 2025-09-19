export interface Category {
    id: string;
    name: string;
    slug: string;
    level: number;
    parentId: string | null;
    commissionFeePercent: number;
    imageForParent: string | null;
}
