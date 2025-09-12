import { Box, IconButton, Input, Popover, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import stompClient from '~/services/socket/socket.service';
import { useAppSelector } from '~/hooks/useTypes';
import { loadAuthUser } from '~/utils/authCookie';

const ChatInputBar = () => {
    const [input, setInput] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = loadAuthUser();
        if (storedUser) {
            setCurrentUserId(storedUser.id);
        }
    }, []);

    const handleCloseEmojiPicker = () => setAnchorEl(null);

    const handleEmojiSelect = (emoji: { native: string }) => {
        setInput((prev) => prev + emoji.native);
        handleCloseEmojiPicker();
    };

    const handleAttachClick = () => fileInputRef.current?.click();

    const selectedConversationId = useAppSelector(
        (state) => state.chat.selectedConversationId,
    );

    const handleSend = async () => {
        if (!input.trim() || !selectedConversationId || !currentUserId) return;

        try {
            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify({
                    conversationId: selectedConversationId,
                    senderId: currentUserId,
                    receiverId: null, // hoặc tùy logic của bạn
                    type: 'TEXT', // bắt buộc
                    content: input,
                    imageUrl: null,
                    width: null,
                    height: null,
                    fileUrl: null,
                    fileName: null,
                    fileType: null,
                    fileSize: null,
                }),
            });
            setInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (
            !e.target.files ||
            e.target.files.length === 0 ||
            !selectedConversationId ||
            !currentUserId
        )
            return;

        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file);

        try {
            stompClient.publish({
                destination: '/app/chat',
                body: JSON.stringify({
                    conversationId: selectedConversationId,
                    senderId: currentUserId,
                    receiverId: null,
                    type: 'FILE',
                    content: input || '',
                    imageUrl: file.type.startsWith('image/') ? fileUrl : null,
                    width: null,
                    height: null,
                    fileUrl: fileUrl,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: file.size,
                }),
            });
            setInput('');
        } catch (error) {
            console.error('Failed to upload file:', error);
        }
    };

    return (
        <Box
            sx={{
                p: 2,
                borderTop: '1px solid #e0e0e0',
                bgcolor: 'background.paper',
                boxShadow: '0 -2px 4px rgba(0,0,0,0.05)',
                position: 'sticky',
                bottom: 0,
                zIndex: 1,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box flex={1} sx={{ display: 'flex', gap: 0.4 }}>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={handleOpenEmojiPicker}
                    >
                        <EmojiEmotionsIcon />
                    </IconButton>
                    <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleCloseEmojiPicker}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    </Popover>

                    <IconButton
                        color="primary"
                        size="small"
                        onClick={handleAttachClick}
                    >
                        <AttachFileIcon />
                    </IconButton>
                    <Input
                        inputRef={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        sx={{ display: 'none' }}
                    />
                </Box>

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Enter a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                    sx={{
                        bgcolor: 'white',
                        borderRadius: 2,
                        '& .MuiInputBase-root': { borderRadius: 2, pr: 1 },
                    }}
                />

                <IconButton
                    onClick={handleSend}
                    disabled={!input.trim()}
                    sx={{
                        bgcolor: input.trim() ? 'primary.main' : 'grey.300',
                        color: 'white',
                        p: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                            bgcolor: input.trim() ? 'primary.dark' : 'grey.400',
                        },
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatInputBar;
