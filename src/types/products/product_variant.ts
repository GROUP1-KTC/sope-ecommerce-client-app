import type { Attribute } from './attribute';

export interface ProductVariantFormData {
    price: number;
    stock: number;
    imageVariant?: File | null;
    attributes: Attribute[];
}

// For API response
export interface ProductVariantResponse {
    productVariantId: string;
    price: number;
    stock: number;
    sold: number;
    createdAt?: string;
    updatedAt?: string;
    imageVariant?: string; // Optional - independent for each variant
    attributes?: Attribute[];
}
