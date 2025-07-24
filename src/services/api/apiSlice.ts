import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V3,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as { auth?: { token?: string } };
            const token =
                state.auth?.token ||
                localStorage.getItem('authToken') ||
                sessionStorage.getItem('authToken');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: [
        'User',
        'Post',
        'Category',
        'Order',
        'Product',
        'Review',
        'Discount',
        'Business',
        'ShippingUnit',
        'Complaint',
        'Conversation',
        'Message',
    ],
    endpoints: () => ({}),
});
