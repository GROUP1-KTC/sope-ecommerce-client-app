import type { Conversation, Message } from '~/types/chat';
import { apiSlice } from '~/services/api/apiSlice';

export const ConversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<Conversation[], void>({
            query: () => '/conversations',
            providesTags: ['Conversation'],
        }),
        getConversationById: builder.query<Message[], string>({
            query: (id) => `/messages/${id}`,
        }),
        updatedConversation: builder.mutation<
            Conversation,
            Partial<Conversation> & { id: string }
        >({
            query: ({ id, ...patch }) => ({
                url: `/conversations/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Conversation'],
        }),
        createConversationWithShop: builder.mutation<
            Conversation,
            { shopId: string }
        >({
            query: (data) => ({
                url: 'conversations/with-shop',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Conversation'],
        }),
        deleteConversation: builder.mutation<void, string>({
            query: (id) => ({
                url: `conversations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Conversation'],
        }),
    }),
});

export const {
    useGetConversationsQuery,
    useGetConversationByIdQuery,
    useUpdatedConversationMutation,
    useDeleteConversationMutation,
    useCreateConversationWithShopMutation,
} = ConversationsApi;
