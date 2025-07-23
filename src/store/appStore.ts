import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '~/services/api/apiSlice';
import chatReducer from '~/features/chat/chatSlice';

export const appStore = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        chat: chatReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }).concat([apiSlice.middleware,]),
    devTools: process.env.NODE_ENV !== 'production',
});


export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;