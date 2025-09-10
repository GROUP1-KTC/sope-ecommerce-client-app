import type { ProductVariant } from './product_variant';
import type { Shop } from '../users/shop';
import type { ProductDetail } from './product_detail';
import type { Image } from './image';
import { MediaItem } from '~/components/add-edit-product/RightSideBar';
import { StatusProduct } from './enum/StatusProduct';

export interface BaseProduct {
    name: string;
    brand: string;
    description: string;
    hidden: boolean;
    categoryId: string;
    shopId: string;
    productDetails?: ProductDetail[];
}

export interface ProductFormData extends BaseProduct {
    defaultImage: File | null;
    defaultVideoIntro?: File | null;
    imagesList?: File[];
    variants: ProductVariant[];
}

export interface ProductUpdateData {
    description: string;
    hidden: boolean;
    categoryId: string;
    variants: ProductVariant[];
    defaultImage: MediaItem | null;
    defaultVideoIntro?: MediaItem | null;
    imagesList: MediaItem[];
    productDetails: ProductDetail[];
}

export interface ProductResponse extends BaseProduct {
    productId: string;
    defaultImage: string;
    defaultVideoIntro?: string;
    imagesList: Image[];
    category: {
        id: string;
        name: string;
        slug: string;
    };
    status: StatusProduct;
    slug: string;
    createdAt: string;
    updatedAt?: string;
    shop: Shop;
    variants: ProductVariant[];
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

export interface ElasticSearchProductDetail {
    default_image: string;
    slug: string;
    rating_score: number;
    product_id: string;
    min_price: number;
    total_sold: number;
    name: string;
    review_count: number;
    category_id: string;
    category_name: string;
}

export interface ElasticSearchProduct {
    productId: string;
    slug: string;
    name: string;
    default_image: string;
}

export interface ElasticSearchHit<T> {
    _index: string;
    _id: string;
    _score: number;
    _source: T;
}

export interface ElasticSearchResponse<T> {
    hits: {
        total: { value: number; relation: string };
        max_score: number;
        hits: ElasticSearchHit<T>[];
    };
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number; // current page
    size: number; // page size
}

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
