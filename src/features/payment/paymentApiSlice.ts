import type { PaymentRequest } from './../../types/payment/payment.d';
import { apiSlice } from '~/services/api/apiSlice';
import type { PaymentResponse } from '~/types/payment/payment';

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        initiatePayment: builder.mutation<PaymentResponse, PaymentRequest>({
            query: (data) => ({
                url: 'payments/initiate',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: { data: PaymentResponse }) =>
                response.data,
            invalidatesTags: ['Order'],
        }),
    }),
});

export const { useInitiatePaymentMutation } = paymentApi;
