import { Dialog, DialogContent, useMediaQuery, useTheme } from '@mui/material';

import React, { useEffect, useState } from 'react';

import { useGetConversationsQuery } from '~/features/chat/conversation/ConversationApi';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import { setConversations } from '~/features/chat/chatSlice';

import ChatMessages from './ChatMessages';
import ConversationListBar from './ConversationListBar';
import type { Conversation } from '~/types/chat';

const ChatDialog: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');

    const { data: ConversationsData } = useGetConversationsQuery();
    const conversations = useAppSelector((state) => state.chat.conversations);

    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selected =
        conversations?.find((conv: Conversation) => conv.id === selectedId) ||
        null;

    const filteredConversations = conversations?.filter((c: Conversation) =>
        c.name.toLowerCase().includes(search.toLowerCase()),
    );

    const handleBack = () => {
        setSelectedId(null);
    };

    useEffect(() => {
        if (ConversationsData) {
            dispatch(setConversations(ConversationsData));
        }
    }, [ConversationsData, dispatch]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={isMobile}
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    height: { xs: '100%', md: '80vh' },
                    maxHeight: { md: '600px' },
                    borderRadius: { xs: 0, md: 2 },
                    overflow: 'hidden',
                },
            }}
        >
            <DialogContent sx={{ p: 0, display: 'flex', overflow: 'hidden' }}>
                <ConversationListBar
                    onClose={onClose}
                    search={search}
                    setSearch={setSearch}
                    filteredConversations={filteredConversations}
                    setSelectedId={setSelectedId}
                    selected={selected}
                />

                <ChatMessages
                    selected={selected}
                    handleBack={handleBack}
                    onClose={onClose}
                    isMobile={isMobile}
                />
            </DialogContent>
        </Dialog>
    );
};

export default ChatDialog;
