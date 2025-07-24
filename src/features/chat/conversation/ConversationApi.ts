import type { Conversation } from '~/types/chat';
import { apiSlice } from '~/services/api/apiSlice';

export const ConversationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query<Conversation[], void>({
            query: () => 'conversations',
            providesTags: ['Conversation'],
        }),
        getConversationById: builder.query<Conversation, string>({
            query: (id) => `conversations/${id}`,
        }),
        updatedConversation: builder.mutation<
            Conversation,
            Partial<Conversation> & { id: string }
        >({
            query: ({ id, ...patch }) => ({
                url: `conversations/${id}`,
                method: 'PUT',
                body: patch,
            }),
            invalidatesTags: ['Conversation'],
        }),
        createConversation: builder.mutation<
            Conversation,
            Partial<Conversation>
        >({
            query: (data) => ({
                url: 'conversations',
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
    useCreateConversationMutation,
    useUpdatedConversationMutation,
    useDeleteConversationMutation,
} = ConversationsApi;
