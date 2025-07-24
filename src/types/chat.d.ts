export interface Message {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    conversationId?: string;
    file?: {
        url: string;

        name: string;
        type: string;
    };
}

export interface Conversation {
    id: string;
    name: string;
    lastMessage: string;
    messages: Message[];
    avatar: string;
}
