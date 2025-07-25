
import type { Product } from '../../types/products';

import { apiSlice } from '~/services/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductBySlug: builder.query<Product, string>({
            query: (slug) => `products/by-slug/${slug}`,
            providesTags: ['Product'],
        }),
        getAllProducts: builder.query<Product[], void>({
            query: () => 'products',
            providesTags: ['Product'],
        }),
    }),
});

export const { useGetProductBySlugQuery, useGetAllProductsQuery } = productApi;
