import type { Category } from './category';
import type { ProductVariant } from './product_variant';
// import { Review } from "./review";
// import { Wishlist } from "./wishlist";
import type { Shop } from '../users/shop';
import type { ProductDetail } from './product_detail';

export type StatusProduct = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Product {
    productId: string;
    name: string;
    defaultPrice: number;
    brand?: string;
    description?: string;
    defaultImage: string;
    hidden: boolean;
    status: StatusProduct;
    slug: string;
    createdAt?: string; // ISO format timeDate
    updatedAt?: string;

    category: Category;
    shop: Shop;

    variants: ProductVariant[];
    //   reviews?: Review[];
    //   wishlists?: Wishlist[];
    productDetails?: ProductDetail[];
}
