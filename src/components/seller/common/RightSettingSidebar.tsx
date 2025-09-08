'use client';

import { useState, useEffect } from 'react';
import SidebarPanel from '../sidebar/SidebarPanel';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import ChatDialog from '~/components/shared/chat/ChatDialog';
import IconButton from '~/components/shared/button/IconButton';

export type PanelType = 'notifications' | 'support' | 'chat' | null;

export default function Sidebar() {
    const [activePanel, setActivePanel] = useState<PanelType>(null);
    const [headerHeight, setHeaderHeight] = useState(64);

    const panels = [
        {
            key: 'notifications',
            icon: NotificationsNoneOutlinedIcon,
            title: 'Thông báo',
            counter: 5,
        },
        {
            key: 'support',
            icon: SupportAgentOutlinedIcon,
            title: 'Hỗ trợ',
            counter: 2,
        },
        {
            key: 'chat',
            icon: ChatIcon,
            title: 'Nhắn tin',
            counter: 0,
        },
    ];

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) setHeaderHeight(header.clientHeight);
    }, []);

    const togglePanel = (panel: PanelType) => {
        setActivePanel((prev) => (prev === panel ? null : panel));
    };

    return (
        <>
            {activePanel && activePanel !== 'chat' && (
                <SidebarPanel
                    panel={activePanel}
                    onClose={() => setActivePanel(null)}
                    headerHeight={headerHeight}
                />
            )}

            {activePanel === 'chat' && (
                <ChatDialog
                    open={activePanel === 'chat'}
                    onClose={() => setActivePanel(null)}
                />
            )}

            <div
                className="w-12 bg-white shadow-lg flex flex-col gap-4 "
                style={{
                    top: `${headerHeight}px`,
                    height: `calc(100% - ${headerHeight}px)`,
                }}
            >
                {panels.map(({ key, icon: Icon, title, counter }) => (
                    <IconButton
                        key={key}
                        active={activePanel === key}
                        onClick={() => togglePanel(key as PanelType)}
                        Icon={Icon}
                        title={title}
                        counter={counter}
                    />
                ))}
            </div>
        </>
    );
}
