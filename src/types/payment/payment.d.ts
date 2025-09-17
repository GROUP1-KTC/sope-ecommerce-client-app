import type { PaymentMethod, PaymentProvider } from '../orders/order';

export interface PaymentRequest {
    paymentId: string;
    requestId: string;
    amount: number;
    method: PaymentMethod;
    provider: PaymentProvider;
    orderInfo: string;
}

export interface PaymentResponse {
    payUrl: string;
}
