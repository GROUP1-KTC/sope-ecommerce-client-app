export enum PaymentMethod {
    COD = 'cod',
    CARD = 'card',
    E_WALLET = 'e-wallet',
    BANK_ACCOUNT = 'bank-account',
}

export enum PaymentProvider {
    VN_PAY = 'vn-pay',
    MOMO = 'momo',
    PAYPAL = 'paypal',
}

// types.ts
export interface ShopOrderRequest {
    shopId: string;
    items: {
        productVariantId: string;
        quantity: number;
    }[];
    note?: string;
    discountCodes?: string[];
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