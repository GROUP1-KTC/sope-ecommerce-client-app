import ChatInputBar from './ChatInputBar';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import MessageTypeFile from './MessageTypeFile';
import { formatMessageTimestamp } from '~/utils/date.utils';
import { useEffect, useRef, useState } from 'react';
import type { StompSubscription } from '@stomp/stompjs';
import { connectSocket } from '~/services/socket/socket.service';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import { OnNewMessage } from '~/services/socket/events/message';
import { useGetConversationByIdQuery } from '~/features/chat/conversation/ConversationApi';
import { Message } from '~/types/chat';

interface ChatMessagesProps {
    conversationId: string | null;
    name: string;
    avatar: string;
    handleBack: () => void;
    onClose: () => void;
    isMobile: boolean;
}

const ChatMessages = ({
    conversationId,
    name,
    avatar,
    handleBack,
    onClose,
    isMobile,
}: ChatMessagesProps) => {
    const dispatch = useAppDispatch();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('authUser');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setCurrentUserId(parsedUser.id);
        }
    }, []);

    const { data: oldMessages = [], isLoading } = useGetConversationByIdQuery(conversationId!, {
        skip: !conversationId,
    });

    const newMessages = useAppSelector(
        state => conversationId ? state.chat.messagesByConversationId[conversationId] || [] : []
    );

    const messages: Message[] = [...oldMessages, ...newMessages];

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => scrollToBottom(), [messages]);

    useEffect(() => {
        if (!conversationId) return;
        let subscription: StompSubscription | null = null;

        const setupSocket = async () => {
            try {
                await connectSocket();
                subscription = OnNewMessage({ conversationId, dispatch });
            } catch (err) {
                console.error('Socket connection failed:', err);
            }
        };

        setupSocket();

        return () => subscription?.unsubscribe();
    }, [conversationId, dispatch]);

    if (!conversationId) return null;

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
            {/* Messages */}
            <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#f5f7fa' }}>
                {messages.length === 0 ? (
                    <Typography>No messages yet</Typography>
                ) : (
                    messages.map((msg) => {
                        const isMine = msg.senderId === currentUserId;
                        console.log(isMine + ' - ' + msg.senderId + ' - ' + currentUserId);
                        return (
                            <Box
                                key={msg.id}
                                sx={{
                                    alignSelf: isMine ? 'flex-end' : 'flex-start',
                                    maxWidth: '75%',
                                    ...(msg.fileUrl
                                        ? {}
                                        : {
                                            bgcolor: isMine ? 'primary.main' : 'white',
                                            color: isMine ? 'white' : 'text.primary',
                                            px: 2.5,
                                            py: 1.5,
                                            borderRadius: 2,
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        }),
                                }}
                            >
                                {msg.fileUrl ? <MessageTypeFile {...msg} /> : <Typography>{msg.content}</Typography>}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 0.5,
                                        opacity: 0.7,
                                        display: 'block',
                                        textAlign: isMine ? 'right' : 'left',
                                    }}
                                >
                                    {formatMessageTimestamp(msg.sentAt)}
                                </Typography>
                            </Box>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </Box>

            <ChatInputBar />
        </Box>
    );
};

export default ChatMessages;
