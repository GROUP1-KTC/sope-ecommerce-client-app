import { apiSlice } from '~/services/api/apiSlice';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<any, void>({
            query: () => ({
                url: '/users/me',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        updateProfile: builder.mutation<
            any,
            { id: string; body: Partial<any> }
        >({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        uploadAvatar: builder.mutation<any, { id: string; file: File }>({
            query: ({ id, file }) => {
                const formData = new FormData();
                formData.append('file', file);

                return {
                    url: `/users/${id}/avatar`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['User'],
        }),
        updateFaceAuth: builder.mutation<any, { id: string; idObject: string }>(
            {
                query: ({ id, idObject }) => ({
                    url: `/users/${id}/face-auth`,
                    method: 'POST',
                    body: { idObject },
                }),
                invalidatesTags: ['User'],
            },
        ),
        getFaceAuthStatus: builder.query<boolean, void>({
            query: () => ({
                url: '/users/face-auth',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        disableFaceAuth: builder.mutation<boolean, void>({
            query: () => ({
                url: '/users/face-auth',
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadAvatarMutation,
    useUpdateFaceAuthMutation,
    useGetFaceAuthStatusQuery,
    useDisableFaceAuthMutation,
} = userApi;
