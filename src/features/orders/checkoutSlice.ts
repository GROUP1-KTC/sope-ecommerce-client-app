import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartGroup, CartItem } from '~/app/(customer)/cart/page';

interface CheckoutState {
    shopOrders: CartGroup[];
}

const initialState: CheckoutState = {
    shopOrders: [],
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckoutItems(state, action: PayloadAction<CartGroup[]>) {
            state.shopOrders = action.payload;
        },
        clearCheckoutItems(state) {
            state.shopOrders = [];
        },
    },
});

export const { setCheckoutItems, clearCheckoutItems } = checkoutSlice.actions;
export default checkoutSlice.reducer;
