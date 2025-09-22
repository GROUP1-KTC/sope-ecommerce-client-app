import type { CartGroup } from '~/app/(customer)/cart/page';
import type { ShopOrderRequest } from '~/types/orders/order';

export function convertCartGroupsToShopOrderRequests(
    cartGroups: CartGroup[],
    extra?: Record<
        string,
        {
            note?: string;
            discountCodes?: string[];
            shippingCharge?: number;
            shippingRateId: string;
        }
    >,
): ShopOrderRequest[] {
    return cartGroups.map((group) => {
        const extraData = extra?.[group.shop.id];

        if (extraData?.shippingRateId === undefined) {
            throw new Error(
                `Vui lòng chọn phương thức vận chuyển cho ${group.shop.name}`,
            );
        }

        return {
            shopId: group.shop.id,
            items: group.items.map((item) => ({
                productVariantId: item.productVariantId,
                quantity: item.quantity,
            })),
            note: extraData?.note
                ? [group.shop.name, extraData.note].join(' - ')
                : undefined,
            discountCodes: extraData?.discountCodes
                ? Array.from(new Set(extraData.discountCodes))
                : [],
            shippingCharge: extraData?.shippingCharge || 0,
            shippingRateId: extraData?.shippingRateId || 'standard',
        };
    });
}
