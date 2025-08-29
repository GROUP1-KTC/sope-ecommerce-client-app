import type { CartItem } from '~/app/(customer)/cart/page';
import { apiSlice } from '~/services/api/apiSlice';

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartItem[], void>({
            query: () => 'cart',
            providesTags: ['Cart'],
        }),

        addCart: builder.mutation<void, CartItem>({
            query: (item) => ({
                url: 'cart',
                method: 'POST',
                body: item,
            }),
            invalidatesTags: ['Cart'],
        }),

        deleteItem: builder.mutation<void, number>({
            query: (cartItemId) => ({
                url: `cart/${cartItemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),

        deleteItems: builder.mutation<void, number[]>({
            query: (cartItemIds) => ({
                url: `cart/${cartItemIds}`,
                method: 'DELETE',
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
