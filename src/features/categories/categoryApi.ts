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
                url: 'v1/categories',
                credentials: 'omit',
            }),
            providesTags: ['Category'],
            async onQueryStarted(_, { queryFulfilled }) {
                console.log(
                    '🚀 Fetching categories from URL:',
                    `${process.env.NEXT_PUBLIC_API_URL}/v1/categories`,
                );
                try {
                    const { data } = await queryFulfilled;
                    console.log('✅ categoriesData:', data);
                } catch (err) {
                    console.error('❌ Failed to fetch categories:', err);
                }
            },
        }),
        getProductsByCategory: builder.query<
            PageResponse<ProductSummary>,
            { slug: string; page?: number; size?: number }
        >({
            query: ({ slug, page = 0, size = 12 }) => ({
                url: `v1/products/by-category/slug/${slug}?page=${page}&size=${size}`,
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: (result, error, { slug }) => [
                { type: 'Category', id: slug },
            ],
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
