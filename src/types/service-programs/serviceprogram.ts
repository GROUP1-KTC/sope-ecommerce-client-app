import { Attribute, ProductAdsDTO } from '../products';

export interface AdsRequest {
    productId: string;
    startDate: string;
    durationDays: number;
}

export interface AdsProgramDTO {
    id: string;
    productInfo: ProductAdsDTO;
    dailyFee: string;
    startDate: string;
    endDate: string;
    status: string;
    active: boolean;
}

export interface FlashSaleRequest {
    productVariantId: string;
    saleDate: string;
    startTime: string;
    endTime: string;
    discountPercentage: number;
}

export interface FlashSaleProgramDTO {
    id: string;
    variantInfo: VariantInfo;
    discountPercentage: number;
    platformFeePercentage: number;
    status: string;
    saleDate: string;
    startTime: string;
    endTime: string;
    active: boolean;
}

export interface VariantInfo {
    productVariantId: string;
    imageUrl: string;
    productName: string;
    price: number;
    stock: number;
    sold: number;
    attributes: Attribute[];
}
