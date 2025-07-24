import type { Product } from './product';
import type { Attribute } from './attribute';
import type { Image } from './image';

export interface ProductVariant {
    productVariantId: string;
    price: number;
    stock: number;
    sold: number;
    hidden: boolean;
    slug: string;
    createdAt?: string;
    updatedAt?: string;

    product: Product;
    attributes: Attribute[];
    images: Image[];
}
