import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '~/services/api/apiSlice';
import chatReducer from '~/features/chat/chatSlice';

import authReducer from '~/features/auth/authSlice';

import { categoryApi } from '../features/categories/categoryApiSlice';
import { productApi } from '../features/products/productApiSlice';

export const appStore = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        chat: chatReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        })
            .concat([apiSlice.middleware])
            .concat(categoryApi.middleware)
            .concat(productApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
