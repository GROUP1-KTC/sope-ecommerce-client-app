// chatSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '~/types/chat';

interface ChatState {
    conversations: Conversation[];
    messagesByConversationId: Record<string, Message[]>;
    selectedConversationId: string | null;
    status: 'idle' | 'sending' | 'error';
}

export const BOT_CONVERSATION_ID = 'chatbot';

const botIntroMessage: Message = {
    id: 'welcome',
    content: 'Xin chào 👋, mình là Chatbot AI! Bạn đang quan tâm đến sản phẩm nào nhỉ ?',
    senderId: 'bot',
    sentAt: Date.now().toString(),
    type: 'BOT',
};

const initialBotConversation: Conversation = {
    conversationId: BOT_CONVERSATION_ID,
    name: 'Sope Chatbot',
    avatar: '/bot-avatar.png',
    lastMessage: botIntroMessage,
};

const initialState: ChatState = {
    conversations: [initialBotConversation],
    messagesByConversationId: {
        [BOT_CONVERSATION_ID]: [botIntroMessage],  
    },
    selectedConversationId: BOT_CONVERSATION_ID,
    status: 'idle',
};


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setConversations(state, action: PayloadAction<Conversation[]>) {
            const others = action.payload.filter(
                c => c.conversationId !== BOT_CONVERSATION_ID
            );
            state.conversations = [initialBotConversation, ...others];

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

        resetAllMessages(state) {
            // clear hết nhưng giữ lại bot conv
            state.messagesByConversationId = {
                [BOT_CONVERSATION_ID]: [],
            };
            state.conversations = [initialBotConversation];
            state.selectedConversationId = BOT_CONVERSATION_ID;
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
    resetAllMessages,
    setSelectedConversationId,
    setStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
