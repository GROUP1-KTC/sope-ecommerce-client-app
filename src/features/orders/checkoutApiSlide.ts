import type { CartGroup, CartItem } from '~/app/(customer)/cart/page';
import { apiSlice } from '~/services/api/apiSlice';
import type { AddToCartRequest } from '~/types/cart/AddToCartRequest';
import type { UpdateCartItemRequest } from '~/types/cart/UpdateCartItemReques';

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkout: builder.mutation<
            void,
            { cartItems: CartItem[]; address: string; paymentMethod: string }
        >({
            query: (data) => ({
                url: 'orders',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useCheckoutMutation } = orderApi;
