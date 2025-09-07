'use client';

import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import type { Comment } from '~/types/comment';

interface ChatBoxProps {
    comments: Comment[];
}

const ChatBox = ({ comments }: ChatBoxProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Tạm thời  log, sau này connect websocket
        if (input.trim()) console.log('Comment sent:', input);
        setInput('');
    };

    return (
        <div className="w-80 bg-gray-50 border-l border-gray-300 p-4 pb-2 flex flex-col overflow-y-auto">
            <h2 className="font-bold mb-2">Live Chat</h2>
            <div className="flex flex-col gap-2">
                {comments.map((c) => (
                    <div key={c.id} className="mb-1">
                        <span className="font-bold">{c.username}: </span>
                        <span>{c.content}</span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 mt-auto">
                <input
                    type="text"
                    placeholder="Nhập comment..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="text-red-500 px-2 py-1 rounded cursor-pointer hover:scale-110 transition"
                >
                    <SendIcon className="!w-5 !h-5" />
                </button>
            </form>
        </div>
    );
};

export default ChatBox;
