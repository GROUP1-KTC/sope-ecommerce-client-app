import { ShopInfo } from '~/app/(customer)/cart/page';
import { Address } from '~/types/address';

export type PaymentMethod =
    | 'COD'
    | 'CREDIT_CARD'
    | 'E_WALLET'
    | 'BANK_TRANSFER';

export type PaymentProvider =
    | 'MOMO'
    | 'VNPAY'
    | 'ZALO_PAY'
    | 'PAYPAL'
    | 'STRIPE'
    | 'BANK';

export type OrderStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'SHIPPING'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'RETURNED';

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
export type OrderCreateRequest =
    | UserOrderCreateRequest
    | GuestOrderCreateRequest;

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

export interface OrderItemProduct {
    productVariantId: string;
    quantity: number;
    price: number;
    imageUrl: string;
    productName: string;
    attributes?: Attribute[];
    commissionFeePercent: number;
}

export interface OrderStatusHistory {
    status: string;
    timestamp: string;
}

export interface OrderDetail {
    shopInfo: ShopInfo;
    orderId: string;
    orderNumber: string;
    shippingCharges: number;
    shippingRateId: string;
    subTotal: number | null;
    totalAmount: number;
    status: OrderStatus;
    cancelReason: string | null;
    note: string | null;
    orderDiscounts: any[];
    items: OrderItemProduct[];
    paymentMethod: string;
    paymentProvider: string | null;
    paymentStatus: string;
    statusHistory: OrderStatusHistory[];
    createdAt: string | null;
}

export interface OrderGroupShop {
    paymentId: string;
    shippingAddress: Address;
    order: OrderDetail;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors: any;
    statusCode: number;
    timestamp: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}

export interface PayoutSummaryResult {
    unpaid: number;
    week: number;
    month: number;
    total: number;
}
