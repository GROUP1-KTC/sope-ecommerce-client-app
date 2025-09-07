export type PaymentMethod = 'COD' | 'CREDIT_CARD' | 'E_WALLET' | 'BANK_TRANSFER';

export type PaymentProvider = 'MOMO' | 'VNPAY' | 'ZALO_PAY' | 'PAYPAL' | 'STRIPE' | 'BANK';

// types.ts
export interface ShopOrderRequest {
    shopId: string;
    items: {
        productVariantId: string;
        quantity: number;
    }[];
    note?: string;
    discountCodes?: string[];
    shippingCharge?: number;
    shippingRateId: string;
}

// Guest information
export interface GuestInfo {
    fullName: string;
    email: string;
    phone: string;
    shippingAddress: string;
    city: string;
    district: string;
    ward: string;
}

// Base interface
export interface BaseOrderCreateRequest {
    idempotencyKey: string;
    paymentMethod: PaymentMethod;
    paymentProvider: PaymentProvider;
    shopOrders: ShopOrderRequest[];
}

// Discriminated union
export interface UserOrderCreateRequest extends BaseOrderCreateRequest {
    orderType: 'user';
    shippingAddressId: string;
    isOrderedFromCart: boolean;
}

export interface GuestOrderCreateRequest extends BaseOrderCreateRequest {
    orderType: 'guest';
    guestInfo: GuestInfo;
}

// Union type
export type OrderCreateRequest = UserOrderCreateRequest | GuestOrderCreateRequest;



export interface ShopOrderResponse {
    orderId: string;
    orderNumber: string;
    totalAmount: number;
    paymentMethod: PaymentMethod;
    paymentProvider: PaymentProvider;
}



export interface OrderCreateResponse {
    paymentId: string;
    order: ShopOrderResponse;
}
