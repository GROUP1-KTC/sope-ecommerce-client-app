'use client';

import React, { useState } from 'react';
import ChatDialog from './ChatDialog';
import { Badge, Fab } from '@mui/material';
import { colors } from '~/constants/color.constant';
import MessageIcon from '@mui/icons-material/Message';
import { usePathname } from 'next/navigation';

const ChatFloatButton = () => {
    const [openChat, setOpenChat] = useState(false);
    const pathname = usePathname();

    const hiddenFabPaths = ['/admin/login', '/admin/settings'];
    const isFabHidden = hiddenFabPaths.includes(pathname);

    const handleFabClick = () => {
        setOpenChat(true);
    };

    return (
        <>
            {!isFabHidden && (
                <Badge
                    color="error"
                    badgeContent={5}
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{
                        position: 'fixed',
                        bottom: 60,
                        right: 32,
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
                                backgroundColor: colors.primary.backgroundHover,
                            },
                        }}
                    >
                        <MessageIcon />
                    </Fab>
                </Badge>
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
