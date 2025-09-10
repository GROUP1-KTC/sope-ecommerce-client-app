import { update } from 'lodash';
import { apiSlice } from '~/services/api/apiSlice';
import type { OrderCreateRequest, OrderCreateResponse, OrderGroupShop } from '~/types/orders/order';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkout: builder.mutation<OrderCreateResponse[], OrderCreateRequest>({
            query: (data) => ({
                url: 'orders',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: { data: OrderCreateResponse[] }) => response.data,

        }),
        getOrders: builder.query<OrderGroupShop[], void>({
            query: () => ({
                url: 'orders/user',
                method: 'GET',
            }),
            transformResponse: (response: { data: OrderGroupShop[] }) => response.data

        }),
        cancelOrder: builder.mutation<void, { orderId: string; reason: string }>({
            query: ({ orderId, reason }) => ({
                url: `orders/cancel/${orderId}`,
                method: 'PATCH',
                body: { reason },
            }),

        }),
    }),
});

export const {
    useCheckoutMutation,
    useGetOrdersQuery,
    useCancelOrderMutation,
} = orderApi;
