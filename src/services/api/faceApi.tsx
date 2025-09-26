// src/features/face/faceApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const faceApi = createApi({
    reducerPath: 'faceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_AI_SERVICE_URL,
    }),
    tagTypes: ['FaceAuth'],
    endpoints: (builder) => ({
        captureFrame: builder.mutation<
            { success: boolean },
            { angle: string; frame: string; username: string }
        >({
            query: (body) => ({
                url: '/face/capture',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FaceAuth'],
        }),
        saveFace: builder.mutation<{ idObject: string }, { username: string }>({
            query: (body) => ({
                url: '/face/save',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FaceAuth'],
        }),
        updateFaceAuth: builder.mutation<
            { success: boolean },
            { id: string; idObject: string }
        >({
            query: (body) => ({
                url: '/user/update-face-auth',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FaceAuth'],
        }),
        verifyFace: builder.mutation<
            { match_found: boolean; face_auth_token?: string },
            FormData
        >({
            query: (formData) => ({
                url: '/verify',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const {
    useCaptureFrameMutation,
    useSaveFaceMutation,
    useUpdateFaceAuthMutation,
    useVerifyFaceMutation,
} = faceApi;
