import { apiSlice } from '~/services/api/apiSlice';
import type { ApiResponse } from '~/types/api';
import type { Discount } from '~/types/discount/discount';
import type { PageResponse } from '~/types/products';

export const discountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlatformDiscount: builder.query<Discount[], void>({
            query: () => 'discounts/platform/active',
            transformResponse: (response: { data: Discount[] }) =>
                response.data,
            providesTags: ['Discount'],
        }),
        getShopActiveDiscount: builder.query<Discount[], { shopId: string }>({
            query: ({ shopId }) => `discounts/shop/${shopId}/active`,
            transformResponse: (response: { data: Discount[] }) =>
                response.data,
            providesTags: ['Discount'],
        }),

        getShopDiscount: builder.query<
            ApiResponse<PageResponse<Discount>>,
            { page?: number; size?: number }
        >({
            query: ({ page = 0, size = 20 }) => ({
                url: `discounts/shop?page=${page}&size=${size}`,
            }),
            providesTags: ['Discount'],
        }),

        createDiscount: builder.mutation<Discount, Partial<Discount>>({
            query: (body) => ({
                url: 'discounts',
                method: 'POST',
                body,
            }),
            transformResponse: (response: {
                status: number;
                message: string;
                data: Discount;
            }) => response.data,

            invalidatesTags: ['Discount'],
        }),
        updateDiscount: builder.mutation<
            Discount,
            Partial<Discount> & { id: string }
        >({
            query: ({ id, ...patch }) => ({
                url: `discounts/${id}`,
                method: 'PUT',
                body: patch,
            }),

            transformResponse: (response: {
                status: number;
                message: string;
                data: Discount;
            }) => response.data,

            invalidatesTags: (_result, _error, { id }) => [
                { type: 'Discount', id },
            ],
        }),
    }),
});

export const {
    useGetPlatformDiscountQuery,
    useGetShopActiveDiscountQuery,
    useGetShopDiscountQuery,
    useCreateDiscountMutation,
    useUpdateDiscountMutation,
} = discountApi;
