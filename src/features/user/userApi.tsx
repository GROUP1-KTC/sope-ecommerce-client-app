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
    updateProfile: builder.mutation<any, { id: string; body: Partial<any> }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
