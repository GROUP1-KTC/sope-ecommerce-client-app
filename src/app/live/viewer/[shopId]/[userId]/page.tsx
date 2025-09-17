'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import type {
    Room,
    RemoteTrack,
    RemoteTrackPublication,
} from '~/utils/livekit';
import { joinLiveKitRoom } from '~/utils/livekit';
import { RoomEvent, type Participant } from 'livekit-client';
import ChatBox from '~/components/livestream/ChatBox';
import CartModal from '~/components/livestream/CartModal';
import type { Comment } from '~/types/comment';
import { ShoppingBagIcon } from 'lucide-react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useAppDispatch } from '~/hooks/useTypes';
import { useAlertStore } from '~/store/zustand/alertStore';
import { useGetApprovedProductsByShopQuery } from '~/features/products/productApi';

export default function ViewerPage() {
    const { shopId, userId } = useParams<{ shopId: string; userId: string }>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [room, setRoom] = useState<Room | null>(null);
    const [showCart, setShowCart] = useState(false);
    const dispatch = useAppDispatch();

    const { data, isLoading, error } = useGetApprovedProductsByShopQuery({
        shopId,
        page: 0,
        size: 12,
    });

    const products = data?.content ?? [];

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [chat, setChat] = useState<Comment[]>([]);

    useEffect(() => {
        if (errorMessage) {
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: errorMessage,
            });
            setErrorMessage(null);
        }
    }, [errorMessage]);

    const attachTracks = (participant: Participant) => {
        if (!videoRef.current) return;
        participant.trackPublications.forEach((publication) => {
            const remotePub = publication as RemoteTrackPublication;
            const track = remotePub.track;
            if (!track || !remotePub.isSubscribed) return;

            try {
                if (track.kind === 'video') {
                    track.detach();
                    track.attach(videoRef.current!);
                }
                if (track.kind === 'audio') {
                    track.detach();
                    track.attach(audioRef.current!);
                }
            } catch (err) {
                console.warn('Attach track failed:', err);
            }
        });
    };

    useEffect(() => {
        let mounted = true;
        const connect = async () => {
            try {
                const token = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/livekit/token?room=${shopId}&identity=${userId}&isPublisher=false`,
                ).then((r) => {
                    if (!r.ok) throw new Error('Failed to fetch token');
                    return r.text();
                });

                const r = await joinLiveKitRoom(
                    process.env.NEXT_PUBLIC_LIVEKIT_WS_URL ||
                        'ws://localhost:7881',
                    token,
                );
                if (!mounted) return r.disconnect();

                setRoom(r);

                r.remoteParticipants.forEach((p) => attachTracks(p));

                r.on(RoomEvent.ParticipantConnected, attachTracks);

                // Attach remote video
                r.on(
                    RoomEvent.TrackSubscribed,
                    (
                        track: RemoteTrack,
                        pub: RemoteTrackPublication,
                        participant: Participant,
                    ) => {
                        attachTracks(participant);
                    },
                );
            } catch (err) {
                setErrorMessage('Failed to connect livestream');
            }
        };
        connect();

        return () => {
            mounted = false;
            room?.disconnect();
        };
    }, [shopId, userId]);

    useEffect(() => {
        if (!room) return;

        room.on(RoomEvent.DataReceived, (payload, participant) => {
            const text = new TextDecoder().decode(payload);
            const newMsg: Comment = {
                id: Date.now(),
                username: participant?.identity ?? 'unknown',
                content: text,
            };
            setChat((prev) => [...prev, newMsg]);
        });
    }, [room]);

    const sendMessage = async (msg: string) => {
        if (!room || !msg.trim()) return;
        if (msg.length > 500) {
            setErrorMessage('Message too long');
            return;
        }

        try {
            await room.localParticipant.publishData(
                new TextEncoder().encode(msg),
                {
                    reliable: true,
                },
            );

            const newMsg: Comment = {
                id: Date.now(),
                username: 'me',
                content: msg,
            };
            setChat((prev) => [...prev, newMsg]);
        } catch (error) {
            setErrorMessage('Failed to send message');
        }
    };

    return (
        <div className="w-full bg-gray-100 flex flex-col">
            <div className="flex-1 flex ">
                <div className="relative w-full h-screen bg-black overflow-hidden">
                    <video
                        ref={videoRef}
                        title="Live Stream"
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    <audio ref={audioRef} autoPlay playsInline />

                    <div
                        className="absolute top-0 w-full px-2 py-2 flex items-center justify-between text-white"
                        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                    >
                        <button className="p-1 hover:bg-gray-700 rounded-md transition cursor-pointer ml-2">
                            <ArrowBackIosNewIcon className="!w-8 !h-8" />
                        </button>

                        <div className="flex items-center gap-2">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="Streamer Avatar"
                                className="w-10 h-10 rounded-full object-cover mr-1 cursor-pointer"
                            />
                            <div className="flex flex-col text-right mr-4">
                                <div className="font-bold text-lg">
                                    Amazing Shop
                                </div>
                                <div className="text-sm">PhucPham</div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowCart(true)}
                        className="absolute bottom-4 left-6 bg-red-600 text-white p-3 rounded-lg shadow-lg hover:bg-red-700"
                    >
                        <ShoppingBagIcon className="!w-6 !h-6" />
                    </button>
                </div>
                <ChatBox comments={chat} onSendMessage={sendMessage} />
            </div>

            {showCart && (
                <CartModal
                    products={products}
                    onClose={() => setShowCart(false)}
                />
            )}
        </div>
    );
}
