'use client';

import React, { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import type { Comment } from '~/types/comment';

interface ChatBoxProps {
    comments: Comment[];
    onSendMessage: (message: string) => void;
    isMobile?: boolean;
    onClose?: () => void;
}

const ChatBox = ({
    comments,
    onSendMessage,
    isMobile,
    onClose,
}: ChatBoxProps) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div
            className={`${
                isMobile
                    ? 'h-full flex flex-col p-4' // Mobile: chiếm hết chiều cao container cha (ViewerPage set max-h)
                    : 'w-80 h-[calc(100vh-4rem)] flex flex-col bg-gray-50 border-l border-gray-300 p-4 pb-2'
            }`}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-2 shrink-0">
                <h2 className="font-bold">Khung Chat</h2>
                {isMobile && onClose && (
                    <button
                        onClick={onClose}
                        className="text-red-500 cursor-pointer hover:scale-110 transition"
                    >
                        <CloseIcon />
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto pr-2 border rounded-lg bg-white p-3 space-y-2">
                {comments.map((c) => (
                    <div
                        key={c.id}
                        className="bg-gray-100 px-3 py-2 rounded-md shadow-sm break-words"
                    >
                        <span className="font-bold text-blue-600">
                            {c.username}:{' '}
                        </span>
                        <span className="text-gray-800">{c.content}</span>
                    </div>
                ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2 shrink-0">
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
