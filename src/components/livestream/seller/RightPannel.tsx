'use client';
import React from 'react';
import { Comment } from '~/types/comment';
import LiveStats from './LiveStat';
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
          onBlock={(username: string) => console.log('Block user', username)}
        />
      </div>

      <div className="border-t border-gray-300 my-2"></div>

      <div className="flex-1 overflow-y-auto">
        <LiveStats orders={10} revenue={100000} viewers={200} liveTime={'00:45:12'} />
      </div>
    </div>
  );
}
