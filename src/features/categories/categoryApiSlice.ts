import type { Category } from '../../types/products';
import type { Product } from '../../types/products';
import { apiSlice } from '~/services/api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query<Category[], void>({
            query: () => 'categories',
            providesTags: ['Category'],
        }),
        getProductByCategory: builder.query<Product[], string>({
            query: (slug) => `products/by-category/${slug}`,
            providesTags: (slug) => [{ type: 'Category', slug }],
        }),
    }),
});

export const { useGetCategoryQuery, useGetProductByCategoryQuery } =
    categoryApi;
