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
        headers.set('Authorization', `Bearer eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIiwiU0VMTEVSIl0sInVzZXJJZCI6IjM0ZjI2YzBkLTNjOGUtNDA0ZS1hNDUzLWU4ZDViZjhhOWFlOSIsInN1YiI6InVzZXIiLCJpYXQiOjE3NTY4ODQwMjksImV4cCI6MTc1Njg4NzYyOX0.c7RIL_BBIVhk2cJ2CBNwT4RJjZ5dS0leLZjmROxVA3dhZkYqzdmKbhqgP4E8AxDCfrLa2z-OZ-LP0MV9QTdAGwo0lQaHCWBhPINBLyR_9RaEB5pQaumk7VgFd2eus9c-R3ZNPLjMFMsYaeSRMr0dkN8qjTfDwR3D7y7ejH7fKHZ5mItxI8EH9ImtR2rFtuuJH7Sf0qFAC92KIcjo-pMJfYgkSExjqwBkbFNkmw9meFOq3hH1CWlE0syNjtBzMbKtOMx4dAtQYUeouuECcqW7Cl-9b4Z1aU92JZAxSizAuoE3OW5mrnr2jOkYA1qm8pY2ur2rhY9dDqnGmoPdqLXagg`);


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
