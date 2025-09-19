import { apiSlice } from '~/services/api/apiSlice';
import type { ShippingRate } from '~/types/shipping/shipping';

export const shippingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShippingRates: builder.mutation<ShippingRate[], any>({
            query: (data) => ({
                url: 'shipping/rates',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response: {
                data: { data: ShippingRate[] };
            }) => {
                return response.data.data;
            },
            invalidatesTags: ['ShippingUnit'],
        }),
    }),
});

export const { useGetShippingRatesMutation } = shippingApi;
