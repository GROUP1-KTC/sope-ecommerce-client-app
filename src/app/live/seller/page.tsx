'use client';
import React, { useState } from 'react';
import SellerLiveLayout from './layout';
import LeftPanel from '~/components/livestream/seller/LeftPannel';
import CenterPanel from '~/components/livestream/seller/CenterPannel';
import RightPanel from '~/components/livestream/seller/RightPannel';
import type { SellerLiveProduct } from '~/types/products';
import type { Comment } from '~/types/comment';

// Mock data
const mockComments: Comment[] = [
    { id: 1, username: 'User123', content: 'Deal hôm nay giảm giá mạnh!' },
    { id: 2, username: 'User456', content: 'Shop uy tín quá!' },
    { id: 3, username: 'User789', content: 'Mình order liền nè!' },
];

const mockProducts: SellerLiveProduct[] = [
    {
        id: 1,
        name: 'Áo thun hot',
        originalPrice: 299000,
        price: 199000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        sold: 150,
        stock: 50,
        onPin: false,
    },
    {
        id: 2,
        name: 'Giày sneaker',
        originalPrice: 999000,
        price: 799000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        sold: 200,
        stock: 30,
        onPin: false,
    },
    {
        id: 3,
        name: 'Mũ lưỡi trai',
        originalPrice: 199000,
        price: 149000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        sold: 100,
        stock: 20,
        onPin: false,
    },
];

export default function ShopLivePage() {
    const [liveActive, setLiveActive] = useState(false);

    return (
        <SellerLiveLayout>
            {/* HEADER LIVE */}
            <div className="flex items-center justify-between px-4 py-2 bg-white shadow sticky top-0 z-10">
                <h2 className="font-bold text-lg">Amazing Shop Live</h2>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <LeftPanel liveActive={liveActive} />
                <CenterPanel products={mockProducts} />
                <RightPanel comments={mockComments} />
            </div>
        </SellerLiveLayout>
    );
}
