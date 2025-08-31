export interface Category {
    id: string;
    name: string;
    slug: string;
    level: number;
    parent?: {
        id: string;
        name: string;
    } | null;
    parentId: string | null;
    commissionFeePercent: number;
}
