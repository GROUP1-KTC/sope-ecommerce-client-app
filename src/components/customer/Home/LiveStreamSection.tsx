'use client';

import React, { useRef, useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LiveStreamCard from '~/components/livestream/LiveStreamCard';
import stompClient, {
    connectSocket,
    disconnectSocket,
} from '~/services/socket/socket.service';

export interface LiveStream {
    id: number;
    shopId: number;
    title: string;
    streamer: string;
    description?: string;
    viewers: number;
    thumbnail: string;
    link: string;
}

interface LiveStreamSectionProps {}

const LiveStreamSection: React.FC<LiveStreamSectionProps> = () => {
    const [streams, setStreams] = useState<LiveStream[]>([]);

    const [userId] = useState(`viewer-${Math.floor(Math.random() * 1000)}`);

    useEffect(() => {
        let subscription: any;

        const initData = async () => {
            try {
                // 1. Gọi API lấy danh sách livestream đang active
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}livestream/active`,
                );
                if (res.ok) {
                    const json = await res.json();
                    
                    console.log('📺 Active streams response:', json);
                    const activeStreams: LiveStream[] = json.data;

                    console.log('📺 Active streams:', activeStreams);

                    setStreams(
                        activeStreams.map((s) => ({
                            id: s.id,
                            shopId: s.shopId,
                            title: s.title,
                            streamer: s.streamer ?? 'Unknown',
                            description: s.description,
                            thumbnail: s.thumbnail,
                            viewers: s.viewers ?? 0,
                            link: `/live/viewer/${s.shopId}/${userId}`,
                        })),
                    );
                }

                // 2. Kết nối socket
                await connectSocket();

                subscription = stompClient.subscribe(
                    '/topic/livestreams',
                    (message) => {
                        if (message.body) {
                            const event = JSON.parse(message.body);
                            const stream = event.payload;

                            setStreams((prev) => {
                                if (event.type === 'LIVE_STARTED') {
                                    // Thêm hoặc update

                                    console.log('📺 New live stream:', stream);

                                    const updated = prev.filter(
                                        (s) => s.id !== stream.id,
                                    );
                                    return [
                                        ...updated,
                                        {
                                            id: stream.id,
                                            shopId: stream.shopId,
                                            title: stream.title,
                                            streamer: stream.streamer,
                                            thumbnail: stream.thumbnail,
                                            viewers: stream.viewers ?? 0,
                                            description: stream.description,
                                            link: `/live/viewer/${stream.shopId}/${userId}`,
                                        },
                                    ];
                                } else if (event.type === 'LIVE_ENDED') {
                                    // Xóa khỏi danh sách
                                    console.log(
                                        '📺 Ended live stream:',
                                        stream,
                                    );
                                    return prev.filter(
                                        (s) => s.id !== stream.id,
                                    );
                                }
                                return prev;
                            });
                        }
                    },
                );
            } catch (error) {
                console.error(
                    '❌ Failed to load livestreams or connect WebSocket',
                    error,
                );
            }
        };

        initData();

        return () => {
            subscription?.unsubscribe();
            disconnectSocket();
        };
    }, [userId]);

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
