import type { Review } from '../../types/products';

import { apiSlice } from '~/services/api/apiSlice';

export const reviewApi = apiSlice.injectEndpoints({
    overrideExisting: process.env.NODE_ENV === 'development',
    endpoints: (builder) => ({
        getReviewByProduct: builder.query<Review[], string>({
            query: (productId) => ({
                url: `v1/review/${productId}`,
                credentials: 'omit',
            }),
            providesTags: ['Review'],
        }),
        createReview: builder.mutation<Review, FormData>({
            query: (data) => ({
                url: `v1/review`,
                method: 'POST',
                body: data,
                credentials: 'omit',
            }),
            invalidatesTags: ['Review'],
            onQueryStarted: async (_arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('✅ API createReview thành công:', data);
                } catch (err) {
                    console.error('❌ API createReview thất bại:', err);
                }
            },
        }),
    }),
});

export const { useGetReviewByProductQuery, useCreateReviewMutation } =
    reviewApi;
