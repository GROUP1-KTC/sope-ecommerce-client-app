import { apiSlice } from '~/services/api/apiSlice';
import type { OrderCreateRequest, OrderCreateResponse } from '~/types/orders/order';

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
    }),
});

export const {
    useCheckoutMutation,
} = orderApi;
