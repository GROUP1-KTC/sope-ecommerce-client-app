// src/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ServerResponse } from '~/types/serverReponse';
import type {
    EmailRequest,
    LoginInput,
    LoginResponse,
    RegisterRequest,
    VerifyEmailRequest,
} from '~/types/auth/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V3,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth?.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ServerResponse<LoginResponse>, LoginInput>({
            query: (body) => {
                const url = '/auth/login';
                return {
                    url,
                    method: 'POST',
                    body,
                };
            },
        }),

        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),

        // send OTP
        sendOtp: builder.mutation<ServerResponse<string>, EmailRequest>({
            query: (body) => ({
                url: '/auth/send-otp',
                method: 'POST',
                body,
            }),
        }),

        // verify OTP
        verifyOtp: builder.mutation<ServerResponse<string>, VerifyEmailRequest>(
            {
                query: (body) => ({
                    url: '/auth/verify-otp',
                    method: 'POST',
                    body,
                }),
            },
        ),

        register: builder.mutation<ServerResponse<string>, RegisterRequest>({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useRegisterMutation,
} = authApi;
