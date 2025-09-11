import type { Attribute } from './attribute';

export interface ProductVariantFormData {
    price: number;
    stock: number;
    attributes?: Attribute[];
    dimension?: Dimension;
    weight?: number;
}

export type ProductVariant = Omit<ProductVariantFormData, 'imageVariant'> & {
    imageVariant?: File | string | null;
    sold?: number;
    productVariantId?: string;
};

export interface Dimension {
    length?: number;
    width?: number;
    height?: number;
}

export interface ProductVariantResponse {
    productVariantId: string;
    price: number;
    stock: number;
    sold: number;
    createdAt?: string;
    updatedAt?: string;
    imageVariant?: string;
    attributes?: Attribute[];
    dimension?: Dimension;
    weight?: number;
}
