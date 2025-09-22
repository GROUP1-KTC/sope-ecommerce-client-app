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
        getShopMe: builder.query<any, void>({
            query: () => '/shops/me',
        }),
        updateShop: builder.mutation<any, any>({
            query: (data) => ({
                url: '/shops',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateShopMutation,
    useGetShopByIdQuery,
    useGetShopIdQuery,
    useGetShopMeQuery,
    useUpdateShopMutation,
} = shopApi;
