'use client';

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import ChatIcon from '@mui/icons-material/Chat';

export default function SettingSidebar() {
    return (
        <div className="fixed right-4 top-20 flex flex-col gap-4 z-50">
            <button
                className="text-blue-500 text-2xl p-2 rounded-full bg-white shadow hover:bg-gray-100"
                title="Notifications"
            >
                <NotificationsNoneOutlinedIcon />
            </button>
            <button
                className="text-blue-500 text-2xl p-2 rounded-full bg-white shadow hover:bg-gray-100"
                title="Support"
            >
                <SupportAgentOutlinedIcon />
            </button>
            <button
                className="text-blue-500 text-2xl p-2 rounded-full bg-white shadow hover:bg-gray-100"
                title="Chat"
            >
                <ChatIcon />
            </button>
        </div>
    );
}
