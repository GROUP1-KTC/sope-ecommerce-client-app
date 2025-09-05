import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartItem, CartGroup } from '~/app/(customer)/cart/page';

interface CartState {
    groups: CartGroup[];
}

const initialState: CartState = {
    groups: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Set the entire cart with grouped items
        setCart: (state, action: PayloadAction<CartGroup[]>) => {
            state.groups = action.payload;
        },
        // Add a new item to the appropriate shop group
        addItem: (
            state,
            action: PayloadAction<
                CartItem & {
                    shopId: string;
                    shopName: string;
                    shopAvatar?: string;
                }
            >,
        ) => {
            const { shopId, shopName, shopAvatar, ...item } = action.payload;
            const shopIndex = state.groups.findIndex(
                (g) => g.shop.id === shopId,
            );
            const cartItem = { ...item, name: item.name || 'Unknown Product' };

            if (shopIndex === -1) {
                // Create new shop group if it doesn't exist
                state.groups.push({
                    shop: {
                        id: shopId,
                        name: shopName || `Shop ${shopId}`,
                        avatarUrl: shopAvatar || '/default-shop-avatar.png',
                    },
                    items: [cartItem],
                });
            } else {
                // Add or update item in existing shop group
                const existingItem = state.groups[shopIndex].items.find(
                    (i) => i.id === item.id,
                );
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    state.groups[shopIndex].items.push(cartItem);
                }
            }
        },
        // Remove a single item by ID
        removeItem: (state, action: PayloadAction<string>) => {
            state.groups = state.groups
                .map((group) => ({
                    ...group,
                    items: group.items.filter(
                        (item) => item.id !== action.payload,
                    ),
                }))
                .filter((group) => group.items.length > 0); // Remove empty groups
        },
        // Remove multiple items by IDs
        removeItems: (state, action: PayloadAction<string[]>) => {
            state.groups = state.groups
                .map((group) => ({
                    ...group,
                    items: group.items.filter(
                        (item) => !action.payload.includes(item.id),
                    ),
                }))
                .filter((group) => group.items.length > 0); // Remove empty groups
        },
        // Update quantity of a specific item
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>,
        ) => {
            const { id, quantity } = action.payload;
            if (quantity < 1) return; // Prevent invalid quantities
            for (const group of state.groups) {
                const item = group.items.find((i) => i.id === id);
                if (item) {
                    item.quantity = quantity;
                    break;
                }
            }
        },
        // Increase quantity of a specific item
        increaseQuantity: (state, action: PayloadAction<string>) => {
            for (const group of state.groups) {
                const item = group.items.find((i) => i.id === action.payload);
                if (item) {
                    item.quantity += 1;
                    break;
                }
            }
        },
        // Decrease quantity of a specific item (prevent going below 1)
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            for (const group of state.groups) {
                const item = group.items.find((i) => i.id === action.payload);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    break;
                }
            }
        },
    },
});

export const {
    setCart,
    addItem,
    removeItem,
    removeItems,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
