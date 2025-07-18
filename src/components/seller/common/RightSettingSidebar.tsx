'use client';

import { useState, useEffect } from 'react';
import SidebarPanel from '../sidebar/SidebarPanel';
import NotificationButton from '../sidebar/NotificationButton';
import SupportButton from '../sidebar/SupportButton';
import ChatButton from '../sidebar/ChatButton';

export type PanelType = 'notifications' | 'support' | 'chat' | null;

export default function Sidebar() {
    const [activePanel, setActivePanel] = useState<PanelType>(null);
    const [headerHeight, setHeaderHeight] = useState(64);

    useEffect(() => {
        const header = document.querySelector('header');
        if (header) setHeaderHeight(header.clientHeight);
    }, []);

    const togglePanel = (panel: PanelType) => {
        setActivePanel((prev) => (prev === panel ? null : panel));
    };

    return (
        <>
            {activePanel && (
                <SidebarPanel
                    panel={activePanel}
                    onClose={() => setActivePanel(null)}
                    headerHeight={headerHeight}
                />
            )}

            <div
                className="fixed right-0 w-16 bg-white shadow-lg z-50 flex flex-col gap-4 p-3"
                style={{
                    top: `${headerHeight}px`,
                    height: `calc(100% - ${headerHeight}px)`,
                }}
            >
                <NotificationButton
                    active={activePanel === 'notifications'}
                    onClick={() => togglePanel('notifications')}
                />
                <SupportButton
                    active={activePanel === 'support'}
                    onClick={() => togglePanel('support')}
                />
                <ChatButton
                    active={activePanel === 'chat'}
                    onClick={() => togglePanel('chat')}
                />
            </div>
        </>
    );
}
