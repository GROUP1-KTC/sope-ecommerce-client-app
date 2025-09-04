import type { ProductResponse } from '../../types/products';

import { apiSlice } from '~/services/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductBySlug: builder.query<ProductResponse, string>({
            query: (slug) => ({
                url: `v1/products/slug/${slug}`,
                credentials: 'omit',
            }),
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<ProductResponse, FormData>({
            query: (data) => ({
                url: `v1/products`,
                method: 'POST',
                body: data,
                credentials: 'omit',
            }),
            invalidatesTags: ['Product'],
            onQueryStarted: async (_arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('✅ API createProduct thành công:', data);
                } catch (err) {
                    console.error('❌ API createProduct thất bại:', err);
                }
            },
        }),
        getProductByShopId: builder.query<ProductResponse[], string>({
            query: (shopId) => ({
                url: `products/by-shop/${shopId}`,
                method: 'GET',
                credentials: 'omit',
                headers: {},
            }),
            providesTags: ['Product'],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductBySlugQuery,
    useGetProductByShopIdQuery,
} = productApi;
