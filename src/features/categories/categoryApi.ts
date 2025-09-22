import type {
    Category,
    PageResponse,
    ProductSummary,
} from '../../types/products';
import { apiSlice } from '~/services/api/apiSlice';

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => ({
                url: '/categories',
                credentials: 'omit',
            }),
            providesTags: ['Category'],
        }),
        getProductsByCategory: builder.query<
            PageResponse<ProductSummary>,
            { slug: string; page?: number; size?: number }
        >({
            query: ({ slug, page = 0, size = 12 }) => ({
                url: `/products/by-category/slug/${slug}?page=${page}&size=${size}`,
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: (result, error, { slug }) => [
                { type: 'Category', id: slug },
            ],
        }),
        getBreadcrumbCategory: builder.query<Category[], string>({
            query: (id) => ({
                url: `/categories/${id}/breadcrumb`,
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
