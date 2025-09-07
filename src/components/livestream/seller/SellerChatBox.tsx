'use client';

import React, { useState } from 'react';
import type { Comment } from '~/types/comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface SellerChatBoxProps {
    comments: Comment[];
    onDelete: (id: number) => void;
    onBlock: (username: string) => void;
}

const SellerChatBox = ({ comments, onDelete, onBlock }: SellerChatBoxProps) => {
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    return (
        <div className="w-full p-2 flex flex-col overflow-y-auto">
            <h3 className="font-bold mb-2">Live Chat</h3>
            <div className="flex flex-col gap-2">
                {comments.map((c) => (
                    <div
                        key={c.id}
                        className="relative flex items-start justify-between "
                    >
                        <div>
                            <span className="font-bold">{c.username}: </span>
                            <span>{c.content}</span>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setOpenMenuId(
                                        openMenuId === c.id ? null : c.id,
                                    )
                                }
                                className="p-1 rounded hover:bg-gray-200"
                            >
                                <MoreVertIcon className="!w-5 !h-5" />
                            </button>
                            {openMenuId === c.id && (
                                <div className="absolute right-0 top-6 w-28 bg-white border rounded shadow-md z-10">
                                    <button
                                        onClick={() => {
                                            onDelete(c.id);
                                            setOpenMenuId(null);
                                        }}
                                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        onClick={() => {
                                            onBlock(c.username);
                                            setOpenMenuId(null);
                                        }}
                                        className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Chặn
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerChatBox;
