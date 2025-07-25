import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '~/types/chat';

interface ChatState {
    conversations: Conversation[];
    selectedConversationId: string | null;
    status: 'idle' | 'sending' | 'error';
}

const initialState: ChatState = {
    conversations: [],
    selectedConversationId: null,
    status: 'idle',
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations(state, action: PayloadAction<Conversation[]>) {
            state.conversations = action.payload;
        },
        addMessage(
            state,
            action: PayloadAction<{ conversationId: string; message: Message }>,
        ) {
            const { conversationId, message } = action.payload;
            const conversation = state.conversations.find(
                (conv) => conv.id === conversationId,
            );
            if (conversation) {
                conversation.messages.push(message);
                conversation.lastMessage = message.content;

                console.log('Message added:', message);
                console.log('Updated conversation:', conversation);
            }
        },
        setSelectedConversationId(state, action: PayloadAction<string | null>) {
            state.selectedConversationId = action.payload;
        },
        setStatus(state, action: PayloadAction<'idle' | 'sending' | 'error'>) {
            state.status = action.payload;
        },
        clearMessages(state, action: PayloadAction<string>) {
            const conversation = state.conversations.find(
                (conv) => conv.id === action.payload,
            );
            if (conversation) {
                conversation.messages = [];
            }
        },
    },
});

export const {
    setConversations,
    addMessage,
    setSelectedConversationId,
    setStatus,
    clearMessages,
} = chatSlice.actions;
export default chatSlice.reducer;
