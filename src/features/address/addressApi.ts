import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Address, AddressCreateRequest } from "~/types/address";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V3,
    prepareHeaders: (headers) => {
      const storedUser = sessionStorage.getItem("authUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.accessToken) {
          headers.set("Authorization", `Bearer ${parsedUser.accessToken}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getUserAddresses: builder.query<Address[], void>({
      query: () => "/addresses",
      providesTags: ["Address"],
    }),
    addAddress: builder.mutation<Address, AddressCreateRequest>({
      query: (body) => ({
        url: "/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    setDefaultAddress: builder.mutation<Address, string>({
      query: (addressId) => ({
        url: `/addresses/${addressId}/default`,
        method: "PUT",
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: builder.mutation<void, string>({
      query: (addressId) => ({
        url: `/addresses/${addressId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"], 
    }),

  }),
});

export const {
  useGetUserAddressesQuery,
  useAddAddressMutation,
  useSetDefaultAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
