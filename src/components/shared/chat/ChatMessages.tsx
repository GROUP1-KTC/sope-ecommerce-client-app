import ChatInputBar from './ChatInputBar';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import MessageTypeFile from './MessageTypeFile';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { formatMessageTimestamp } from '~/utils/date.utils';
import { useEffect, useRef } from 'react';
import type { Conversation } from '~/types/chat';
import type { StompSubscription } from '@stomp/stompjs';
import { connectSocket } from '~/services/socket/socket.service';
import { useAppDispatch } from '~/hooks/useTypes';
import { OnNewMessage } from '~/services/socket/events/message';

interface ChatMessagesProps {
    selected: Conversation | null;
    handleBack: () => void;
    onClose: () => void;
    isMobile: boolean;
}

const ChatMessages = ({
    selected,
    handleBack,
    onClose,
    isMobile,
}: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (selected) {
            scrollToBottom();
        }
    }, [selected]);

    useEffect(() => {
        let subscription: StompSubscription | null = null;

        const setupSubscription = async () => {
            if (selected) {
                try {
                    await connectSocket();

                    subscription = OnNewMessage({
                        conversationId: selected.id,
                        dispatch,
                    });
                } catch (error) {
                    console.error('Failed to connect or subscribe:', error);
                }
            }
        };

        setupSubscription();

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [selected, dispatch]);

    return (
        <Box
            sx={{
                flex: 1,
                display: { xs: selected ? 'flex' : 'none', md: 'flex' },
                flexDirection: 'column',
                bgcolor: '#fafafa',
                transition: 'all 0.3s ease-in-out',
            }}
        >
            {selected ? (
                <>
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: '1px solid #e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: 'background.paper',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                            }}
                        >
                            {isMobile && (
                                <ArrowBackIosIcon
                                    fontSize="medium"
                                    onClick={handleBack}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'text.primary',
                                    }}
                                />
                            )}
                            <Avatar
                                src={selected.avatar}
                                sx={{ width: 40, height: 40 }}
                            />
                            <Typography variant="h6" fontWeight="bold" noWrap>
                                {selected.name}
                            </Typography>
                        </Box>
                        <IconButton onClick={onClose} sx={{ p: 1.5 }}>
                            <CloseIcon fontSize="medium" />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            p: 3,
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            bgcolor: '#f5f7fa',
                        }}
                    >
                        {selected.messages.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    alignSelf:
                                        msg.sender === 'Me'
                                            ? 'flex-end'
                                            : 'flex-start',
                                    maxWidth: '75%',
                                    ...(msg.file
                                        ? {}
                                        : {
                                              bgcolor:
                                                  msg.sender === 'Me'
                                                      ? 'primary.main'
                                                      : 'white',
                                              color:
                                                  msg.sender === 'Me'
                                                      ? 'white'
                                                      : 'text.primary',
                                              px: 2.5,
                                              py: 1.5,
                                              borderRadius: 2,
                                              boxShadow:
                                                  '0 1px 3px rgba(0,0,0,0.1)',
                                          }),
                                }}
                            >
                                {msg.file ? (
                                    <MessageTypeFile {...msg} />
                                ) : (
                                    <Typography variant="body1">
                                        {msg.content}
                                    </Typography>
                                )}
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 0.5,
                                        opacity: 0.7,
                                        display: 'block',
                                        textAlign:
                                            msg.sender === 'Me'
                                                ? 'right'
                                                : 'left',
                                    }}
                                >
                                    {formatMessageTimestamp(msg.timestamp)}
                                </Typography>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    <ChatInputBar selected={selected} />
                </>
            ) : (
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#fafafa',
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        Choose a conversation to start chatting
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ChatMessages;
