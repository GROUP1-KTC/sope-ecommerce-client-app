import { apiSlice } from '~/services/api/apiSlice';
import type { AddPaymentCardRequest, PaymentCard } from '~/types/payment';

export const paymentCardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCards: builder.query<PaymentCard[], void>({
            query: () => ({
                url: '/payment-cards',
                method: 'GET',
            }),
            providesTags: ['PaymentCard'],
        }),

        addCard: builder.mutation<PaymentCard, AddPaymentCardRequest>({
            query: (card) => ({
                url: '/payment-cards',
                method: 'POST',
                body: card,
            }),
            invalidatesTags: ['PaymentCard'],
        }),

        deleteCard: builder.mutation<void, string>({
            query: (id) => ({
                url: `/payment-cards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PaymentCard'],
        }),

        setDefaultCard: builder.mutation<PaymentCard, string>({
            query: (id) => ({
                url: `/payment-cards/${id}/default`,
                method: 'PUT',
            }),
            invalidatesTags: ['PaymentCard'],
        }),
    }),
});

export const {
    useGetCardsQuery,
    useAddCardMutation,
    useDeleteCardMutation,
    useSetDefaultCardMutation,
} = paymentCardApi;
