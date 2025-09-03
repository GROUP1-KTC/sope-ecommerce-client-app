import type { CartGroup, CartItem } from '~/app/(customer)/cart/page';
import { apiSlice } from '~/services/api/apiSlice';
import type { AddToCartRequest } from '~/types/cart/AddToCartRequest';

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartGroup[], void>({
            query: () => 'cart',
            transformResponse: (response: { data: CartGroup[] }) => response.data,
            providesTags: ['Cart'],
        }),

        addCart: builder.mutation<void, AddToCartRequest>({
            query: (item) => ({
                url: 'cart',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        deleteItem: builder.mutation<void, string>({
            query: (cartItemId) => ({
                url: `cart/${cartItemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        deleteItems: builder.mutation<void, number[]>({
            query: (cartItemIds) => ({
                url: 'cart',
                method: 'DELETE',
                body: cartItemIds,
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddCartMutation,
    useDeleteItemMutation,
    useDeleteItemsMutation,
} = cartApi;
