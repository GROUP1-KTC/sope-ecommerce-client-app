import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '~/types/chat';

interface ChatState {
    conversations: Conversation[];
    messagesByConversationId: Record<string, Message[]>;
    selectedConversationId: string | null;
    status: 'idle' | 'sending' | 'error';
}

const initialState: ChatState = {
    conversations: [],
    messagesByConversationId: {},
    selectedConversationId: null,
    status: 'idle',
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations(state, action: PayloadAction<Conversation[]>) {
            state.conversations = action.payload;
            action.payload.forEach(conv => {
                if (!state.messagesByConversationId[conv.conversationId]) {
                    state.messagesByConversationId[conv.conversationId] = [];
                }
            });
        },

        addMessage(
            state,
            action: PayloadAction<{ conversationId: string; message: Message }>
        ) {
            const { conversationId, message } = action.payload;

            if (!state.messagesByConversationId[conversationId]) {
                state.messagesByConversationId[conversationId] = [];
            }
            state.messagesByConversationId[conversationId].push(message);

            const conversation = state.conversations.find(
                conv => conv.conversationId === conversationId
            );
            if (conversation) {
                conversation.lastMessage = message;
            }
        },

        clearMessages(state, action: PayloadAction<string>) {
            state.messagesByConversationId[action.payload] = [];
        },

        setSelectedConversationId(state, action: PayloadAction<string | null>) {
            state.selectedConversationId = action.payload;
        },

        setStatus(state, action: PayloadAction<'idle' | 'sending' | 'error'>) {
            state.status = action.payload;
        },
    },
});

export const {
    setConversations,
    addMessage,
    clearMessages,
    setSelectedConversationId,
    setStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
