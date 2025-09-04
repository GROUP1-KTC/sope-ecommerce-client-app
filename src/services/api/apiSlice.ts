import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { clearCredentials, setCredentials } from '~/features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V3,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const storedUser = sessionStorage.getItem('authUser');

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.accessToken) {
                    headers.set('Authorization', `Bearer ${parsedUser.accessToken}`);
                }
            } catch (e) {
                console.error('Lỗi parse sessionStorage authUser:', e);
            }
        }
        headers.set('Authorization', `Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIiwiU0VMTEVSIl0sInVzZXJJZCI6IjM0ZjI2YzBkLTNjOGUtNDA0ZS1hNDUzLWU4ZDViZjhhOWFlOSIsInN1YiI6InVzZXIiLCJpYXQiOjE3NTY5NTg5MTksImV4cCI6MTc1Njk2MjUxOX0.upF6sLHwDI0iDSM32oZUH_Scv7_BvZeH-qQqR6rhxXNPtxfnH3E5suYUOU1UrNqfkcbOY6Ox2Au3Jlj1VFGgRrpAq2Vc1Erz4zIBKPst9yntzZXsJyqDw8v8CJm7vnfx4v8CoOyyw9J3SUDpzqoVA6flcUGC6GUxM3Pf3NH3fg8fNK8uJKdvTakHjJAIY0B2R2cEFTBWuakPhtBUpivJLBfJKzo78TZLw_26WrgSlfj0kRXT7sLHdVbxiDSbA7wdmB7z66wETMP62oFKbFA1jBeDPM-hIHxo76-UEn9t3F8PM2wRbmf8XH9AkPWY0LexB8zSwA9WelHTlbiHsTvmmg`);


        return headers;
    },

});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery(
            {
                url: '/refresh-token',
                method: 'POST',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as {
                accessToken: string;
            };

            // Thử lại request ban đầu
            result = await baseQuery(args, api, extraOptions);
        } else {
            // Hết hạn cả refreshToken => đăng xuất
            api.dispatch(clearCredentials());
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
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
        'Cart',
        'PaymentCard',
    ],
    endpoints: () => ({}),
});