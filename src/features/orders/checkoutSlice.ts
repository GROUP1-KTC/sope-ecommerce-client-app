import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartItem } from '~/app/(customer)/cart/page';

interface CheckoutState {
    items: CartItem[];
}

const initialState: CheckoutState = {
    items: [],
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckoutItems(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
        clearCheckoutItems(state) {
            state.items = [];
        },
    },
});

export const { setCheckoutItems, clearCheckoutItems } = checkoutSlice.actions;
export default checkoutSlice.reducer;
