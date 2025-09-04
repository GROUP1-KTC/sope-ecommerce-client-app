import { User } from '../users';
import { ProductVariantResponse } from './product_variant';
import { ReviewMedia } from './review_media';

export interface Review {
    reviewId: string;
    productVariant: ProductVariantResponse;
    user: User;
    rating: number;
    content?: string;
    mediaList?: ReviewMedia[];
    videoReviewUrl?: string;
    createdAt: string;
    updatedAt?: string;
}
