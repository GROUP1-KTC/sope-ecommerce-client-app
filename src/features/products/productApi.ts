import type { PageResponse, ProductResponse } from '../../types/products';

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
                }
            },
        }),
        updateProduct: builder.mutation<
            ProductResponse,
            { slug: string; data: FormData }
        >({
            query: ({ slug, data }) => ({
                url: `v1/products/${slug}`,
                method: 'PATCH',
                body: data,
                credentials: 'omit',
            }),
            invalidatesTags: ['Product'],
            onQueryStarted: async (_arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('✅ API updateProduct thành công:', data);
                } catch (err) {
                    console.error('❌ API updateProduct thất bại:', err);
                }
            },
        }),
        getProductByShop: builder.query<
            PageResponse<ProductResponse>,
            { shopId: string; page?: number; size?: number }
        >({
            query: ({ shopId, page = 0, size = 12 }) => ({
                url: `v1/products/shop/${shopId}?page=${page}&size=${size}`,
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: ['Product'],
        }),
    }),
});

export const {
    useCreateProductMutation,
    useGetProductBySlugQuery,
    useGetProductByShopQuery,
    useUpdateProductMutation,
} = productApi;
