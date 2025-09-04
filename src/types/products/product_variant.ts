import type { Attribute } from './attribute';

export interface ProductVariantFormData {
    price: number;
    stock: number;
    imageVariant?: File | null;
    attributes?: Attribute[];
    dimension?: Dimension;
    weight?: number;
}

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
