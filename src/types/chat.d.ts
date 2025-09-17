export interface Message {
    id: string;
    senderId: string;
    type: string;
    content: string;
    imageUrl?: string | null;
    width?: number | null;
    height?: number | null;
    fileUrl?: string | null;
    fileName?: string | null;
    fileType?: string | null;
    fileSize?: number | null;
    sentAt: string;
}

export interface Conversation {
    conversationId: string;
    name: string;
    lastMessage: Message;
    avatar: string;
}
