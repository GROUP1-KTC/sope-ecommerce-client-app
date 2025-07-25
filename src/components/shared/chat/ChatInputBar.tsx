import { Box, IconButton, Input, Popover, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import type { Conversation } from '~/types/chat';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import stompClient from '~/services/socket/socket.service';

interface ChatInputBarProps {
    selected: Conversation | null;
}

const ChatInputBar = ({ selected }: ChatInputBarProps) => {
    const [input, setInput] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseEmojiPicker = () => {
        setAnchorEl(null);
    };

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    };

    const handleEmojiSelect = (emoji: { native: string }) => {
        setInput((prev) => prev + emoji.native);
        handleCloseEmojiPicker();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0 && selected) {
            const file = e.target.files[0];
            const fileUrl = URL.createObjectURL(file);

            try {
                stompClient.publish({
                    destination: '/app/message',
                    body: JSON.stringify({
                        sender: 'Me',
                        content: input,
                        conversationId: selected.id,
                        file: {
                            name: file.name,
                            type: file.type,
                            url: fileUrl,
                        },
                    }),
                });

                setInput('');
            } catch (error) {
                console.error('Failed to upload file:', error);
            }
        }
    };

    const handleSend = async () => {
        if (!input.trim() || !selected) return;

        try {
            stompClient.publish({
                destination: '/app/message',
                body: JSON.stringify({
                    sender: 'Me',
                    content: input,
                    conversationId: selected.id,
                }),
            });

            setInput('');
        } catch (error) {
            console.error('Failed to send message:', error);
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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
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
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
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
                        '& .MuiInputBase-root': {
                            borderRadius: 2,
                            pr: 1,
                        },
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
