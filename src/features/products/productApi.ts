import type {
    PageResponse,
    ProductResponse,
    ProductSummary,
} from '../../types/products';

import { apiSlice } from '~/services/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProductBySlug: builder.query<ProductResponse, string>({
            query: (slug) => ({
                url: `products/slug/${slug}`,
                credentials: 'omit',
            }),
            providesTags: ['Product'],
        }),
        createProduct: builder.mutation<ProductResponse, FormData>({
            query: (data) => ({
                url: `products`,
                method: 'POST',
                body: data,
                credentials: 'omit',
            }),
            invalidatesTags: ['Product'],
            onQueryStarted: async (_arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('API createProduct thành công:', data);
                } catch (err) {
                    console.log('check err', err);
                }
            },
        }),
        updateProduct: builder.mutation<
            ProductResponse,
            { slug: string; data: FormData }
        >({
            query: ({ slug, data }) => ({
                url: `products/${slug}`,
                method: 'PATCH',
                body: data,
                credentials: 'omit',
            }),
            invalidatesTags: ['Product'],
            onQueryStarted: async (_arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('API updateProduct thành công:', data);
                } catch (err) {
                    console.error('API updateProduct thất bại:', err);
                }
            },
        }),
        getProductByShop: builder.query<
            PageResponse<ProductResponse>,
            { page?: number; size?: number }
        >({
            query: ({ page = 0, size = 12 }) => ({
                url: `products/shop?page=${page}&size=${size}`,
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: ['Product'],
        }),
        getApprovedProductsByShop: builder.query<
            PageResponse<ProductSummary>,
            { shopId: string; page?: number; size?: number }
        >({
            query: ({ shopId, page = 0, size = 12 }) => ({
                url: `products/shop/${shopId}/approved?page=${page}&size=${size}`,
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: ['Product'],
        }),
        getInitProducts: builder.query<ProductSummary[], void>({
            query: () => ({
                url: 'products/init',
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: ['Product'],
        }),
        getSuggestedProducts: builder.query<
            ProductSummary[],
            { productId: string; limit?: number }
        >({
            query: ({ productId, limit = 10 }) =>
                `products/suggested/${productId}?limit=${limit}`,
            providesTags: ['Product'],
        }),

        getSimilarProducts: builder.query<
            ProductSummary[],
            { productId: string; limit?: number }
        >({
            query: ({ productId, limit = 5 }) =>
                `products/similar/${productId}?limit=${limit}`,
            providesTags: ['Product'],
        }),

        getInitProductsForGuest: builder.query<ProductSummary[], void>({
            query: () => ({
                url: 'products/initforguest',
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: ['Product'],
        }),
        searchProductsByImage: builder.mutation<ProductSummary[], FormData>({
            query: (formData) => ({
                url: `products/search-by-image?limit=10`,
                method: 'POST',
                body: formData,
            }),
        }),
    }), 
});

export const {
    useCreateProductMutation,
    useGetProductBySlugQuery,
    useGetProductByShopQuery,
    useUpdateProductMutation,
    useGetInitProductsQuery,
    useGetSuggestedProductsQuery,
    useGetSimilarProductsQuery,
    useGetInitProductsForGuestQuery,
    useGetApprovedProductsByShopQuery,
    useSearchProductsByImageMutation,
} = productApi;
