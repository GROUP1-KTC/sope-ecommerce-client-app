'use client';

import React, { useRef, useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LiveStreamCard from '~/components/livestream/LiveStreamCard';

interface LiveStream {
    title: string;
    streamer: string;
    description?: string;
    viewers: number;
    thumbnail: string;
    link: string;
}

interface LiveStreamSectionProps {
    streams: LiveStream[];
}

const LiveStreamSection: React.FC<LiveStreamSectionProps> = ({ streams }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    const handleScroll = (dir: 'left' | 'right') => {
        if (!containerRef.current) return;
        const width = containerRef.current.offsetWidth;
        containerRef.current.scrollBy({
            left: dir === 'right' ? width / 2 : -width / 2,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const el = containerRef.current;
        const handleScrollEvent = () => {
            if (!el) return;
            const { scrollLeft, scrollWidth, clientWidth } = el;
            setAtStart(scrollLeft === 0);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
        };
        handleScrollEvent();
        el?.addEventListener('scroll', handleScrollEvent);
        return () => el?.removeEventListener('scroll', handleScrollEvent);
    }, []);

    return (
        <div className="w-full flex justify-center bg-gray-50 py-6">
            <div className="bg-white rounded-xl shadow p-6 max-w-6xl w-full relative">
                <h2 className="text-xl font-bold mb-4">LIVE STREAMS</h2>
                <div className="relative group">
                    {!atStart && (
                        <button
                            className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 transition-transform duration-150 opacity-50 group-hover:opacity-100 cursor-pointer"
                            onClick={() => handleScroll('left')}
                        >
                            <ArrowBackIosNewIcon className="text-lg text-orange-500" />
                        </button>
                    )}
                    <div
                        ref={containerRef}
                        className="flex overflow-x-auto px-4"
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {streams.map((stream) => (
                            <LiveStreamCard
                                key={stream.title}
                                {...stream}
                                description={stream.description ?? ''}
                            />
                        ))}
                    </div>
                    {!atEnd && (
                        <button
                            className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 group-hover:bg-orange-100 transition-transform duration-150 opacity-50 group-hover:opacity-100 cursor-pointer"
                            onClick={() => handleScroll('right')}
                        >
                            <ArrowForwardIosIcon className="text-lg text-orange-500" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LiveStreamSection;
