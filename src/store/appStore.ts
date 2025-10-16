import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '~/services/api/apiSlice';
import chatReducer from '~/features/chat/chatSlice';
import userReducer from '~/features/user/userSlice';

import authReducer from '~/features/auth/authSlice';

import cartReducer from '~/features/cart/cartSlice';

import checkoutReducer from '~/features/orders/checkoutSlice';

import tempAddressReducer from '~/features/address/tempAddressSlice';
import { elasticApi } from '~/features/products/elasticApi';

export const appStore = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [elasticApi.reducerPath]: elasticApi.reducer,
        chat: chatReducer,
        auth: authReducer,
        user: userReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        tempAddress: tempAddressReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat([
            apiSlice.middleware,
            elasticApi.middleware,
        ]),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
