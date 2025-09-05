import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '~/services/api/apiSlice';
import { authApi } from '~/features/auth/authApi';
import chatReducer from '~/features/chat/chatSlice';
import userReducer from '~/features/user/userSlice';

import authReducer from '~/features/auth/authSlice';

import cartReducer from '~/features/cart/cartSlice';

import checkoutReducer from '~/features/orders/checkoutSlice';
import { addressApi } from '~/features/address/addressApi';

export const appStore = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chat: chatReducer,
        auth: authReducer,
        user: userReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat([
            apiSlice.middleware,
        ]),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
