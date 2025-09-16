import { apiSlice } from '~/services/api/apiSlice';
import {
    AdsProgramDTO,
    AdsRequest,
    FlashSaleRequest,
    FlashSaleProgramDTO,
} from '~/types/service-programs/serviceprogram';

export const ServiceProgramApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createAdsForProduct: builder.mutation<AdsProgramDTO, AdsRequest>({
            query: (data) => ({
                url: `/service-programs/ads`,
                body: data,
                method: 'POST',
                credentials: 'omit',
            }),
            invalidatesTags: ['ServiceProgram'],
            onQueryStarted: async (_arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('✅ API createAdsForProduct thành công:', data);
                } catch (err) {
                    console.error('❌ API createAdsForProduct thất bại:', err);
                }
            },
        }),
        getActiveAds: builder.query<AdsProgramDTO[], void>({
            query: () => ({
                url: `/service-programs/ads/active`,
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: ['ServiceProgram'],
        }),

        createFlashSale: builder.mutation<
            FlashSaleProgramDTO,
            FlashSaleRequest
        >({
            query: (data) => ({
                url: `/service-programs/flash`,
                body: data,
                method: 'POST',
                credentials: 'omit',
            }),
            invalidatesTags: ['ServiceProgram'],
            onQueryStarted: async (_arg, { queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    console.log('✅ API createFlashSale thành công:', data);
                } catch (err) {
                    console.error('❌ API createFlashSale thất bại:', err);
                }
            },
        }),
        getActiveFlashSales: builder.query<FlashSaleProgramDTO[], void>({
            query: () => ({
                url: `/service-programs/flash/active`,
                method: 'GET',
                credentials: 'omit',
            }),
            providesTags: ['ServiceProgram'],
        }),
    }),
});

export const {
    useCreateAdsForProductMutation,
    useGetActiveAdsQuery,
    useCreateFlashSaleMutation,
    useGetActiveFlashSalesQuery,
} = ServiceProgramApi;
