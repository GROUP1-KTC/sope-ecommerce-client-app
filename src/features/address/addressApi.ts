// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '~/services/api/apiSlice';
import type { Address, AddressCreateRequest } from '~/types/address';

export const addressApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserAddresses: builder.query<Address[], void>({
            query: () => '/addresses',
            providesTags: ['Address'],
        }),
        addAddress: builder.mutation<Address, AddressCreateRequest>({
            query: (body) => ({
                url: '/addresses',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Address'],
        }),
        setDefaultAddress: builder.mutation<Address, string>({
            query: (addressId) => ({
                url: `/addresses/${addressId}/default`,
                method: 'PUT',
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation<void, string>({
            query: (addressId) => ({
                url: `/addresses/${addressId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Address'],
        }),
    }),
});

export const {
    useGetUserAddressesQuery,
    useAddAddressMutation,
    useSetDefaultAddressMutation,
    useDeleteAddressMutation,
} = addressApi;
