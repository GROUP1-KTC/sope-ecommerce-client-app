// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '~/app/(customer)/cart/page';


interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existing = state.items.find(i => i.id === action.payload.id);
            if (existing) existing.quantity += action.payload.quantity;
            else state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        removeItems: (state, action: PayloadAction<number[]>) => {
            state.items = state.items.filter(i => !action.payload.includes(i.id));
        },
        updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
        },
    },
});

export const { setCart, addItem, removeItem, removeItems, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
