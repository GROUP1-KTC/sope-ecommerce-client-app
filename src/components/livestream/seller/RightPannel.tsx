'use client';
import React from 'react';
import type { Comment } from '~/types/comment';
import SellerChatBox from './SellerChatBox';

type RightPanelProps = {
    comments: Comment[];
};

export default function RightPanel({ comments }: RightPanelProps) {
    return (
        <div className="w-1/4 flex flex-col p-2 overflow-y-hidden">
            <div className="flex-1 overflow-y-auto mb-2">
                <SellerChatBox
                    comments={comments}
                    onDelete={(id: number) => console.log('Delete comment', id)}
                    onBlock={(username: string) =>
                        console.log('Block user', username)
                    }
                />
            </div>
        </div>
    );
}
