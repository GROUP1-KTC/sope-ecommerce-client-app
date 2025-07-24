export interface Category {
    id: string;
    name: string;
    slug: string;
    parent?: {
        id: string;
        name: string;
    } | null;
}
