import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { clearCredentials, setCredentials } from '~/features/auth/authSlice';
import { loadAuthUser } from '~/utils/authCookie';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const storedUser = loadAuthUser();

        if (storedUser && storedUser.accessToken) {
            headers.set('Authorization', `Bearer ${storedUser.accessToken}`);
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
                url: '/auth/refresh-token',
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
        'Address',
        'Shop',
        'Revenue',
        'ServiceProgram',
    ],
    endpoints: () => ({}),
});
