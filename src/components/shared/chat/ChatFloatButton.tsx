'use client';

import React, { useState, useEffect } from 'react';
import ChatDialog from './ChatDialog';
import { Badge, Fab, Paper, Box, Fade } from '@mui/material';
import { colors } from '~/constants/color.constant';
import MessageIcon from '@mui/icons-material/Message';
import { usePathname } from 'next/navigation';

const ChatFloatButton = () => {
    const [openChat, setOpenChat] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const pathname = usePathname();

    const hiddenFabPaths = ['/admin/login', '/admin/settings'];
    const isFabHidden = hiddenFabPaths.includes(pathname);

    const handleFabClick = () => {
        setOpenChat(true);
        setShowHint(false);
    };

    useEffect(() => {
        if (!isFabHidden) {
            const timer = setTimeout(() => setShowHint(true), 2000);

            const interval = setInterval(() => {
                setShowHint(true);
                setTimeout(() => setShowHint(false), 4000);
            }, 10000);

            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [isFabHidden]);

    return (
        <>
            {!isFabHidden && (
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: 60,
                        right: 32,
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Fade in={showHint}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 1,
                                width: 220,
                                fontSize: 14,
                                background: colors.primary.background,
                                color: colors.primary.contrastText,
                                borderRadius: '16px',
                                position: 'absolute',
                                bottom: '100%',
                                right: '50%',
                                mb: 1,
                                mr: 1,
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -8,
                                    right: 16,
                                    width: 0,
                                    height: 0,
                                    borderLeft: '8px solid transparent',
                                    borderRight: '8px solid transparent',
                                    borderTop: `8px solid ${colors.primary.background}`,
                                },
                            }}
                        >
                            Tư vấn với chatbot AI ngay nhé!
                        </Paper>
                    </Fade>

                    <Badge
                        color="error"
                        badgeContent={5}
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            '& .MuiBadge-badge': {
                                zIndex: 10000,
                                color: colors.primary.contrastText,
                                border: `1px solid ${colors.primary.contrastText}`,
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        <Fab
                            aria-label="add"
                            onClick={handleFabClick}
                            sx={{
                                zIndex: 9999,
                                backgroundColor: colors.primary.background,
                                color: colors.primary.contrastText,
                                '&:hover': {
                                    backgroundColor:
                                        colors.primary.backgroundHover,
                                },
                            }}
                        >
                            <MessageIcon />
                        </Fab>
                    </Badge>
                </Box>
            )}

            {openChat && (
                <ChatDialog
                    open={openChat}
                    onClose={() => setOpenChat(false)}
                />
            )}
        </>
    );
};

export default ChatFloatButton;
