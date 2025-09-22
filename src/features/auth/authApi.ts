// src/features/auth/authApi.ts
import { apiSlice } from '~/services/api/apiSlice';
import type { ServerResponse } from '~/types/serverReponse';
import type {
    ChangePasswordRequest,
    EmailRequest,
    LoginInput,
    LoginResponse,
    RegisterRequest,
    ResetPasswordRequest,
    VerifyEmailRequest,
} from '~/types/auth/auth';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ServerResponse<LoginResponse>, LoginInput>({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),

        logout: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        sendOtp: builder.mutation<ServerResponse<string>, EmailRequest>({
            query: (body) => ({
                url: '/auth/send-otp',
                method: 'POST',
                body,
            }),
        }),

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

        changePassword: builder.mutation<
            ServerResponse<string>,
            ChangePasswordRequest
        >({
            query: (body) => ({
                url: '/auth/change-password',
                method: 'POST',
                body,
            }),
        }),
        sendForgotPasswordOtp: builder.mutation<
            ServerResponse<string>,
            EmailRequest
        >({
            query: (body) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),

        resetPassword: builder.mutation<
            ServerResponse<string>,
            ResetPasswordRequest
        >({
            query: (body) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSendOtpMutation,
    useVerifyOtpMutation,
    useRegisterMutation,
    useChangePasswordMutation,
    useSendForgotPasswordOtpMutation,
    useResetPasswordMutation,
} = authApi;
