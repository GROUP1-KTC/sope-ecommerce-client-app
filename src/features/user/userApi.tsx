  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL_V3,
      prepareHeaders: (headers) => {
        const storedUser = sessionStorage.getItem("authUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.accessToken) {
            headers.set("Authorization", `Bearer ${parsedUser.accessToken}`);
          }
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      getProfile: builder.query<any, void>({
        query: () => "/users/me"
      }),
      updateProfile: builder.mutation<any, Partial<any>>({
        query: (body) => ({
          url: "/user/profile",
          method: "PUT",
          body,
        }),
      }), 
    }),
  });

  export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
