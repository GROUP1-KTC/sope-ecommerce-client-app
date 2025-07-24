import { API_PREFIX } from '~/constants/apiConstanst';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../../types/products';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PREFIX,
        prepareHeaders: (headers) => {
            console.log('✅ Gọi tới base URL:', API_PREFIX); // thêm để chắc chắn
            return headers;
        },
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        // Get product by slug
        getProductBySlug: builder.query<Product, string>({
            query: (slug) => `products/by-slug/${slug}`,
            providesTags: ['Product'],
        }),
    }),
});

export const { useGetProductBySlugQuery } = productApi;
