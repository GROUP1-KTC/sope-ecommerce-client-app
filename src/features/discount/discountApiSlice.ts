import { apiSlice } from '~/services/api/apiSlice';
import type { Discount } from '~/types/discount/discount';

export const discountApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPlatformDiscount: builder.query<Discount[], void>({
            query: () => 'discounts/platform/active',
            transformResponse: (response: { data: Discount[] }) => response.data,
            providesTags: ['Discount'],

        }),
    }),
});

export const {
    useGetPlatformDiscountQuery,
} = discountApi;
