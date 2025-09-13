import { apiSlice } from '~/services/api/apiSlice';
import type {
    ApiResponse,
    OrderCreateRequest,
    OrderCreateResponse,
    OrderGroupShop,
    PageResponse,
} from '~/types/orders/order';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkout: builder.mutation<OrderCreateResponse[], OrderCreateRequest>({
            query: (data) => ({
                url: 'orders',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: { data: OrderCreateResponse[] }) =>
                response.data,
        }),
        getOrdersByShop: builder.query<
            ApiResponse<PageResponse<OrderGroupShop>>,
            { shopId: string; page?: number; size?: number }
        >({
            query: ({ shopId, page = 0, size = 20 }) => ({
                url: `orders/shop/${shopId}?page=${page}&size=${size}`,
                credentials: 'omit',
            }),
            providesTags: ['Order'],
        }),
        getRevenueByShop: builder.query<
            ApiResponse<OrderGroupShop[]>,
            { shopId: string }
        >({
            query: ({ shopId }) => ({
                url: `orders/revenue/${shopId}`,
                credentials: 'omit',
            }),
            providesTags: ['Order'],
        }),
        getOrderDetail: builder.query<ApiResponse<OrderGroupShop>, string>({
            query: (orderNumber) => ({
                url: `orders/${orderNumber}`,
                credentials: 'omit',
            }),
            providesTags: ['Order'],
        }),
        getOrders: builder.query<OrderGroupShop[], void>({
            query: () => ({
                url: 'orders/user',
                method: 'GET',
            }),
            transformResponse: (response: { data: OrderGroupShop[] }) =>
                response.data,
        }),
        cancelOrder: builder.mutation<
            void,
            { orderId: string; reason: string }
        >({
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
    useGetOrdersByShopQuery,
    useGetRevenueByShopQuery,
    useGetOrderDetailQuery,
    useCancelOrderMutation,
} = orderApi;
