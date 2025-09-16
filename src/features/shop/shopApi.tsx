// ~/services/api/shopApi.ts

import { apiSlice } from '~/services/api/apiSlice';

export const shopApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createShop: builder.mutation<any, FormData>({
            query: (formData) => ({
                url: '/shops',
                method: 'POST',
                body: formData,
            }),
        }),
        getShopById: builder.query<any, string>({
            query: (shopId) => `/shops/${shopId}`,
        }),
        getShopId: builder.query<string, void>({
            query: () => '/shops/get-shop-id',
        }),
    }),
});

export const { useCreateShopMutation, useGetShopByIdQuery, useGetShopIdQuery } =
    shopApi;
