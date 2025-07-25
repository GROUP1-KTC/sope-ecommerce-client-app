import type { ProductVariant } from './product_variant';

export interface Image {
    imageId: number;
    priority: number;
    url: string;
    productVariant?: ProductVariant;
}
