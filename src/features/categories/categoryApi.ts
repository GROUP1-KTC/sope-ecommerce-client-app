import type { Category, ProductResponseByCategory } from '../../types/products';
import { apiSlice } from '~/services/api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: 'v1/categories',
                credentials: 'omit',
            }),
            providesTags: ['Category'],
        }),
        getProductsByCategory: builder.query<
            ProductResponseByCategory[],
            string
        >({
            query: (slug) => ({
                url: `v1/products/by-category/slug/${slug}`,
                credentials: 'omit',
            }),
            providesTags: (slug) => [{ type: 'Category', slug }],
        }),
        getBreadcrumbCategory: builder.query<Category[], string>({
            query: (id) => ({
                url: `v1/categories/${id}/breadcrumb`,
                credentials: 'omit',
            }),
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetBreadcrumbCategoryQuery,
} = categoryApi;
