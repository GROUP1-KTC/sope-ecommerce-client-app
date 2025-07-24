import type { Product } from './product';

export interface ProductDetail {
    productDetailId: string;
    label: string;
    data: string;
    priority: number;
    product?: Product;
}
