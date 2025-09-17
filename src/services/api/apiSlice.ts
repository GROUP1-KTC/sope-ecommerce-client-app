import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { clearCredentials, setCredentials } from '~/features/auth/authSlice';
import { loadAuthUser, saveAuthUser } from '~/utils/authCookie';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V3,
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
            const { accessToken, id, username, roles } = refreshResult.data as {
                accessToken: string;
                id: string;
                username: string;
                roles: string[];
            };

            const newUser = { id, username, roles, accessToken };

            api.dispatch(setCredentials(newUser));
            saveAuthUser(newUser); 

            result = await baseQuery(args, api, extraOptions);

            console.log('Re-authenticated successfully');
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
