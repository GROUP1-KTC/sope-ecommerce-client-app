// components/live/LiveStreamCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CustomLink from '../shared/loading/CustomLink';

interface LiveStreamCardProps {
    title: string;
    streamer: string;
    description: string;
    viewers: number;
    thumbnail: string;
    link: string;
}

const LiveStreamCard: React.FC<LiveStreamCardProps> = ({
    title,
    streamer,
    description,
    viewers,
    thumbnail,
    link,
}) => {
    return (
        <CustomLink
            href={link}
            className="flex flex-col items-center mx-4 cursor-pointer w-60"
        >
            <div className="w-60 h-80 relative rounded-lg overflow-hidden border border-gray-200 shadow">
                <div className="w-full h-full transition-transform duration-150 hover:scale-105">
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-1 rounded">
                    LIVE
                </span>
                <span className="absolute top-2 right-2 bg-white text-red-600 text-xs px-1 rounded flex items-center gap-1">
                    {viewers}
                    <VisibilityIcon className="!w-4 !h-4" />
                </span>

                <div
                    className="absolute bottom-0 w-full px-2 py-1 flex flex-col"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <span className="font-medium text-sm text-white truncate">
                        {title}
                    </span>
                    <span className="truncate mt-1 text-white">{streamer}</span>
                    <span className="text-xs mt-1 text-white w-full truncate">
                        {description}
                    </span>
                </div>
            </div>
        </CustomLink>
    );
};

export default LiveStreamCard;
