// import type { Category } from './category';
import type {
    ProductVariantFormData,
    ProductVariantResponse,
} from './product_variant';
import type { Shop } from '../users/shop';
import type { ProductDetail } from './product_detail';
import type { Image } from './image';

export type StatusProduct = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface BaseProduct {
    name: string;
    brand?: string;
    description: string;
    hidden: boolean;
    categoryId: string;
    shopId: string;
    // productDetails?: ProductDetail[];
}

// Product for form data (with File objects for uploads)
export interface ProductFormData extends BaseProduct {
    defaultImage: File | null;
    defaultVideoIntro: File | null;
    imagesList: File[];
    variants?: ProductVariantFormData[];
}

// Product for API response (with string URLs and full objects)
export interface ProductResponse extends BaseProduct {
    productId: string;
    defaultImage: string;
    defaultVideoIntro: string;
    imagesList: Image[];
    category?: {
        id: string;
        name: string;
        slug: string;
    };
    status: StatusProduct;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
    shop?: Shop;
    variants?: ProductVariantResponse[];
}

export interface ProductVariantByCategory {
    price: number;
    sold: number;
}

export interface ProductResponseByCategory {
    productId: string;
    slug: string;
    name: string;
    brand: string;
    defaultImage: string;
    variantsByCategory: ProductVariantByCategory[];
}

// Legacy Product type for backward compatibility
export type Product = ProductFormData;

// Collapse for livestream cart
export interface CollapseProduct {
    id: number;
    name: string;
    originalPrice: number;
    price: number;
    image: string;
    rating: number;
    sold: number | string;
}

export type SellerLiveProduct = {
    id: number;
    name: string;
    image: string;
    originalPrice: number;
    price: number;
    sold: number;
    onPin?: boolean;
    flashSaleActive?: boolean;
    highlightActive?: boolean;
    stock: number;
};
