import type { Review } from '../../types/products';

import { apiSlice } from '~/services/api/apiSlice';

export const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewByProduct: builder.query<Review[], string>({
            query: (productId) => ({
                url: `v1/review/${productId}`,
                credentials: 'omit',
            }),
            providesTags: ['Review'],
        }),
    }),
});

export const { useGetReviewByProductQuery } = reviewApi;
