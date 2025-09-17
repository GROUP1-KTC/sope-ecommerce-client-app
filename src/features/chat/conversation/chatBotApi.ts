// chatBotApi.ts
import { apiSlice } from '~/services/api/apiSlice';

export const chatBotApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendMessageToBot: builder.mutation<
            {
                data: string;
                reply: string;
            },
            { message: string }
        >({
            query: (body) => ({
                url: '/messages/chatbot',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useSendMessageToBotMutation } = chatBotApi;
