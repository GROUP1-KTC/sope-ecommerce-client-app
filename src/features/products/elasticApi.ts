import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    ElasticSearchProduct,
    ElasticSearchProductDetail,
    ElasticSearchResponse,
} from '~/types/products';

console.log('ElasticSearch Base URL:', process.env.NEXT_PUBLIC_ELASTIC_SEARCH);

export const elasticApi = createApi({
    reducerPath: 'elasticApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_ELASTIC_SEARCH,
        credentials: 'omit',
    }),
    endpoints: (builder) => ({
        searchSuggest: builder.query<ElasticSearchProduct[], unknown>({
            query: (body) => ({
                url: `/products_index/_search`,
                method: 'POST',
                body,
            }),
            transformResponse: (
                response: ElasticSearchResponse<ElasticSearchProduct>,
            ) => response.hits.hits.map((hit) => hit._source),
        }),
        searchProducts: builder.query<ElasticSearchProductDetail[], unknown>({
            query: (body) => ({
                url: `/products_index/_search`,
                method: 'POST',
                body,
            }),
            transformResponse: (
                response: ElasticSearchResponse<ElasticSearchProductDetail>,
            ) => response.hits.hits.map((hit) => hit._source),
        }),
        logProductClick: builder.mutation<
            any,
            { product_id: string; keyword: string; timestamp: string }
        >({
            query: (body) => ({
                url: `/product_click_logs/_doc`,
                method: 'POST',
                body,
            }),
        }),
        getMostSearchedProducts: builder.query<
            { productId: string; count: number }[],
            void
        >({
            query: () => ({
                url: `/product_click_logs/_search`,
                method: 'POST',
                body: {
                    size: 0,
                    aggs: {
                        most_searched_products: {
                            terms: {
                                field: 'product_id',
                                size: 10,
                                order: { _count: 'desc' },
                            },
                        },
                    },
                },
            }),
            transformResponse: (response: any) =>
                response.aggregations.most_searched_products.buckets.map(
                    (bucket: any) => ({
                        productId: bucket.key,
                        count: bucket.doc_count,
                    }),
                ),
        }),
    }),
});

export const {
    useSearchSuggestQuery,
    useSearchProductsQuery,
    useLogProductClickMutation,
    useGetMostSearchedProductsQuery,
} = elasticApi;
