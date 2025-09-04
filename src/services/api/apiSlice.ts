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
        const token = (getState() as { auth?: { accessToken?: string } }).auth?.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Authorization', `Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIiwiU0VMTEVSIl0sInVzZXJJZCI6IjM0ZjI2YzBkLTNjOGUtNDA0ZS1hNDUzLWU4ZDViZjhhOWFlOSIsInN1YiI6InVzZXIiLCJpYXQiOjE3NTY4OTEzNjcsImV4cCI6MTc1Njg5NDk2N30.FbyGY2_Lp2XkqffaOs5bqMmjDlONyUtHghinDko-RZkauEeQuvppTzluBbVVRwpFmRGEMWemqFHmLU5gcur9Rn0g5ORtq_6oWmCH-Wbda1nF_k9sFuH_E9hu1DbsBAEYP3Ia3VxXKVzxCMQRuEIffTtL1PjOZxsN7Ov-XvFl-tom8znMlXHr5w-E4UTdh76NOM1lV3R2FZWZnkouH_lyhXBzVjFpbAWgUmBdC4gche26kyF-uTdA7N4Qj_7f4WMmOoJ7sXe3hFJUXb6yufnAAqk6jZSiziDQy37fNMUQTaUI4Bb5kSLPPIYVxWKb5rLJS5FEKttrH82z0w7RlGrdKw`);


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
    ],
    endpoints: () => ({}),
});
