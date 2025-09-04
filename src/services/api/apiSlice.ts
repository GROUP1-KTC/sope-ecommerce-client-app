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