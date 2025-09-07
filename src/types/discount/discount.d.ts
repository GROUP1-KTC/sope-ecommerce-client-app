type DiscountScope = 'FREESHIP' | 'COIN_BACK' | 'PLATFORM' | 'SHOP';
type DiscountStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
type VoucherDiscountType = 'PERCENTAGE' | 'FIXED_AMOUNT';

export interface Discount {
    id: string,
    code: string,
    description: string,
    value: number,
    minOrderValue: number,
    maxDiscountValue: number,
    discountType: VoucherDiscountType,
    maxUsage: number,
    currentUsage: number,
    startDate: date,
    endDate: date | null,
    scope: DiscountScope,
    maxCoins: number,
    status: DiscountStatus
}