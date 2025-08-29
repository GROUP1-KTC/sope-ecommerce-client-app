import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '~/services/api/apiSlice';
import { authApi } from '~/features/auth/authApi';
import chatReducer from '~/features/chat/chatSlice';
import userReducer from '~/features/user/userSlice';

import authReducer from '~/features/auth/authSlice';
import { userApi } from '~/features/user/userApi';

import cartReducer from '~/features/cart/cartSlice';

import checkoutReducer from '~/features/orders/checkoutSlice';

export const appStore = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
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
            authApi.middleware,
            userApi.middleware,
        ]),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
