import type { Product } from './product';

export interface Image {
    imageId: number;
    priority: number;
    url: string;
    product?: Product;
}
