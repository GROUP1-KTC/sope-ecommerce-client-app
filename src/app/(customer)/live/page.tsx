'use client';

import React, { useState } from 'react';
import { streams } from '~/mock/mockProductData';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import type { CollapseProduct } from '~/types/products';
import type { Comment } from '~/types/comment';
import ChatBox from '~/components/livestream/ChatBox';
import CartModal from '~/components/livestream/CartModal';

// Mock comments
const mockComments: Comment[] = [
    {
        id: 1,
        username: 'User123',
        content: 'Wow! Deal hôm nay giảm giá cực mạnh!',
    },
    { id: 2, username: 'User456', content: 'Shop uy tín quá!' },
    { id: 3, username: 'User789', content: 'Mình đang order liền nè!' },
];

// Mock products
const mockProducts: CollapseProduct[] = [
    {
        id: 1,
        name: 'Áo thun hot',
        originalPrice: 299000,
        price: 199000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        rating: 4.5,
        sold: 150,
    },
    {
        id: 2,
        name: 'Giày sneaker',
        originalPrice: 999000,
        price: 799000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        rating: 4.0,
        sold: 200,
    },
    {
        id: 3,
        name: 'Mũ lưỡi trai',
        originalPrice: 199000,
        price: 149000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        rating: 4.2,
        sold: 100,
    },
    {
        id: 4,
        name: 'Quần jeans',
        originalPrice: 399000,
        price: 299000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        rating: 4.8,
        sold: 80,
    },
    {
        id: 5,
        name: 'Đồng hồ thời trang',
        originalPrice: 1599000,
        price: 1299000,
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/SIG_Pro_by_Augustas_Didzgalvis.jpg',
        rating: 4.6,
        sold: 60,
    },
];

const LiveStreamPage = () => {
    const [showCart, setShowCart] = useState(false);

    return (
        <div className="w-full bg-gray-100 flex flex-col">
            <div className="flex-1 flex relative">
                <div className="relative w-full h-screen bg-black overflow-hidden">
                    <img
                        src={streams[0].thumbnail}
                        alt="Live Stream"
                        className="w-full h-full object-cover"
                    />

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
                        className="absolute bottom-4 left-6 bg-red-600 text-white p-3 rounded-lg shadow-lg hover:bg-red-700 transition cursor-pointer"
                    >
                        <ShoppingBagIcon className="!w-6 !h-6" />
                    </button>
                </div>

                <ChatBox comments={mockComments} />
            </div>

            {showCart && (
                <CartModal
                    products={mockProducts}
                    onClose={() => setShowCart(false)}
                />
            )}
        </div>
    );
};

export default LiveStreamPage;
