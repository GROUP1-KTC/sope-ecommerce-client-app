import { API_PREFIX } from '~/constants/apiConstanst';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Category } from '../../types/products';
import type { Product } from '../../types/products';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_PREFIX,
        prepareHeaders: (headers) => {
            console.log('✅ Gọi tới base URL:', API_PREFIX); // thêm để chắc chắn
            return headers;
        },
    }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategory: builder.query<Category[], void>({
            query: () => 'categories',
            providesTags: ['Category'],
        }),
        getProductByCategory: builder.query<Product[], string>({
            query: (slug) => `products/by-category/${slug}`,
            providesTags: (result, error, slug) => [{ type: 'Category', slug }],
        }),
    }),
});

export const { useGetCategoryQuery, useGetProductByCategoryQuery } =
    categoryApi;
