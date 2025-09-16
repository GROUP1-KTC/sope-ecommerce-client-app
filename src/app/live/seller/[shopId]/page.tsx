'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    Room,
    RemoteTrack,
    RemoteTrackPublication,
    joinLiveKitRoom,
} from '~/utils/livekit';
import { RoomEvent } from 'livekit-client';
import LeftPanel from '~/components/livestream/seller/LeftPannel';
import CenterPanel from '~/components/livestream/seller/CenterPannel';
import RightPanel from '~/components/livestream/seller/RightPannel';
import SellerLiveLayout from './layout';
import type { Comment } from '~/types/comment';
import { useAlertStore } from '~/store/zustand/alertStore';
import { useGetApprovedProductsByShopQuery } from '~/features/products/productApi';
import { ProductSummary, SellerLiveProduct } from '~/types/products';

function mapToSellerLiveProduct(summary: ProductSummary): SellerLiveProduct {
    return {
        id: summary.productId, 
        name: summary.name,
        image: summary.defaultImage,
        originalPrice: summary.minPrice, 
        price: summary.minPrice,
        sold: summary.totalSold,
        stock: summary.totalStock,
        onPin: false,
        flashSaleActive: false,
        highlightActive: false,
    };
}

export default function SellerPage() {
    const { shopId } = useParams<{ shopId: string }>();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [room, setRoom] = useState<Room | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [chat, setChat] = useState<Comment[]>([]);

    const { data } = useGetApprovedProductsByShopQuery({
        shopId,
        page: 0,
        size: 12,
    });

    const products: SellerLiveProduct[] = data?.content.map(mapToSellerLiveProduct) ?? [];


    const startPreview = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Preview failed:', err);
            setErrorMessage('Không thể mở camera preview');
        }
    };

    useEffect(() => {
        startPreview();

        return () => {
            if (videoRef.current?.srcObject) {
                (videoRef.current.srcObject as MediaStream)
                    .getTracks()
                    .forEach((t) => t.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (errorMessage) {
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: errorMessage,
            });
            setErrorMessage(null);
        }
    }, [errorMessage]);

    const handleStartLive = async (data: {
        title: string;
        description: string;
        thumbnail: string;
    }) => {
        try {
            const token = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/livekit/token?room=${shopId}&identity=seller&isPublisher=true`,
            ).then((r) => r.text());

            const r = await joinLiveKitRoom(
                process.env.NEXT_PUBLIC_LIVEKIT_WS_URL || 'ws://localhost:7881',
                token,
            );

            setRoom(r);
            setIsConnected(true);

            // Publish camera + mic
            const tracks = await r.localParticipant.createTracks({
                audio: true,
                video: true,
            });

            for (const t of tracks) {
                if (t.kind === 'video' && videoRef.current) {
                    t.attach(videoRef.current);
                }
                await r.localParticipant.publishTrack(t);
            }

            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/livestream/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    shopId,
                    title: data.title,
                    description: data.description,
                    thumbnail: data.thumbnail,
                }),
            });
        } catch (err) {
            console.error(err);
            setErrorMessage('Không thể bắt đầu livestream');
        }
    };

    const handleEndLive = async () => {
        if (room) {
            room.disconnect();
            setRoom(null);
        }
        setIsConnected(false);

        // Reset preview lại
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            });

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/livestream/end`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shopId }),
        }).catch(() =>
            setErrorMessage('Không thể cập nhật trạng thái end live'),
        );
    };

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

    return (
        <SellerLiveLayout>
            {/* HEADER LIVE */}
            <div className="flex items-center justify-between px-4 py-2 bg-white shadow sticky top-0 z-10">
                <h2 className="font-bold text-lg">Amazing Shop Live</h2>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <LeftPanel
                    liveActive={isConnected}
                    onStart={handleStartLive}
                    onEnd={handleEndLive}
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover rounded"
                    />
                </LeftPanel>
                <CenterPanel products={products} />
                <RightPanel comments={chat} />
            </div>
        </SellerLiveLayout>
    );
}
