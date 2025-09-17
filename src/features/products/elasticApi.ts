import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    ElasticSearchProduct,
    ElasticSearchProductDetail,
    ElasticSearchResponse,
} from '~/types/products';

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
                url: `/products_index_new/_search`,
                method: 'POST',
                body,
            }),
            transformResponse: (
                response: ElasticSearchResponse<ElasticSearchProductDetail>,
            ) => response.hits.hits.map((hit) => hit._source),
        }),
    }),
});

export const { useSearchSuggestQuery, useSearchProductsQuery } = elasticApi;
