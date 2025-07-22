'use client';
import React, { useState } from 'react';
import OrdersSection from '~/components/notifiaction/OrdersSection';
import PromotionsSection from '~/components/notifiaction/PromotionsSection';

import Sidebar from '~/components/notifiaction/Sidebar';

interface Promotion {
    id: number;
    iconType: 'discount' | 'cart' | 'gift' | 'shopee';
    title: string;
    description: string;
    timestamp: string;
    titleColor: string;
    images: string[];
}

interface Order {
    id: string;
    date: string;
    status: 'completed' | 'cancelled' | 'processing';
    items: number;
    total: number;
}

const Notification: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('promotions');

    const promotions: Promotion[] = [
        {
            id: 1,
            iconType: 'shopee',
            title: 'CƠ HỘI CUỐI CHỐT DEAL GIẢM 50%',
            description:
                'Tại Ngày hội Thương hiệu LIXIBOX 📦 Cũng mà giảm độc quyền đến 600K 💎 Mở bán độc quyền: bàn chải điện, máy triệt lông 💡 Quà tặng mọi đơn 🎉 Freeship toàn quốc',
            timestamp: '13:46 16-07-2025',
            titleColor: '#ff5722',
            images: [],
        },
        {
            id: 2,
            iconType: 'discount',
            title: 'Giảm đậm hơn 20% 🎉',
            description:
                '8479_phmthinc ơi! Đừng bỏ lỡ khuyến mãi của sản phẩm bạn yêu thích! 🏃‍♀️',
            timestamp: '12:03 16-07-2025',
            titleColor: '#ff3b30',
            images: [
                'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbrvsy68cnl656',
                'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m8vrng76gv473b',
                'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-mbq7huohazca48',
            ],
        },
        {
            id: 3,
            iconType: 'cart',
            title: 'Giỏ hàng đang chờ bạn chốt đơn 🛒',
            description:
                'Hàng còn trong giỏ, nói nhỏ với 8479_phmthinc 🤫 Mà Freeship 0Đ đã nằm chỗ sẵn trong ví. Xài ngay nhé! ✨',
            timestamp: '14:16 15-07-2025',
            titleColor: '#007aff',
            images: [],
        },
        {
            id: 4,
            iconType: 'gift',
            title: 'Hộp Cam Bi Ẩn - Mua 1 được 10 🔥',
            description:
                "Chỉ 50k có ngay 10 đơn hàng ngẫu nhiên ❤️ 'Đập hộp' vui lai có đồ hời 🥳 Hàng hot hết nhanh - Tranh ngay kẻo lỡ!",
            timestamp: '18:02 10-07-2025',
            titleColor: '#8e24aa',
            images: [],
        },
    ];

    const orders: Order[] = [
        {
            id: 'DH-20230615-123',
            date: '15/06/2023',
            status: 'completed',
            items: 3,
            total: 750000,
        },
        {
            id: 'DH-20230620-456',
            date: '20/06/2023',
            status: 'cancelled',
            items: 2,
            total: 320000,
        },
        {
            id: 'DH-20230625-789',
            date: '25/06/2023',
            status: 'processing',
            items: 1,
            total: 150000,
        },
    ];

    return (
        <div
            style={{
                display: 'flex',
                backgroundColor: '#f0f2f5',
                padding: '16px',
                minHeight: '100vh',
            }}
        >
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main
                style={{
                    flex: '1',
                    marginLeft: '24px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    padding: '24px',
                }}
            >
                {activeTab === 'promotions' ? (
                    <PromotionsSection promotions={promotions} />
                ) : (
                    <OrdersSection orders={orders} />
                )}
            </main>
        </div>
    );
};

export default Notification;
