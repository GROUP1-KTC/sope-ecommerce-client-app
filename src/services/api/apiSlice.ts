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
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as { auth?: { token?: string } }).auth?.token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
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
        // Gọi refresh token (cookie HttpOnly sẽ tự gửi)
        const refreshResult = await baseQuery(
            {
                url: '/api/refresh-token',
                method: 'POST',
            },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as {
                accessToken: string;
            };

            // Lưu accessToken vào Redux
            api.dispatch(setCredentials({ token: accessToken }));

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
    ],
    endpoints: () => ({}),
});
