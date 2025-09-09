import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartGroup, CartItem } from '~/app/(customer)/cart/page';

interface CheckoutState {
    shopOrders: CartGroup[];
    isFormCart: boolean | null;
}

const initialState: CheckoutState = {
    shopOrders: [],
    isFormCart: null,
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCheckoutItems(state, action: PayloadAction<CartGroup[]>) {
            state.shopOrders = action.payload;
        },
        setIsFormCart(state, action: PayloadAction<boolean | null>) {
            state.isFormCart = action.payload;
        },
        clearCheckoutItems(state) {
            state.shopOrders = [];
            state.isFormCart = null;
        },
    },
});

export const { setCheckoutItems, clearCheckoutItems, setIsFormCart } = checkoutSlice.actions;
export default checkoutSlice.reducer;
