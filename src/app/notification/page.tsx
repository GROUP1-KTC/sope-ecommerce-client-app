'use client';

import React, { useState } from 'react';

// 1. Định nghĩa kiểu dữ liệu
type NotificationItem = {
    id: number;
    title: string;
    time: string;
    image?: string;
};

// 2. Dữ liệu giả lập (const + readonly)
const mockNotifications = {
    'Cập Nhật Đơn Hàng': [
        {
            id: 1,
            title: 'Đơn hàng đã được giao thành công',
            time: '2 giờ trước',
        },
        {
            id: 2,
            title: 'Đơn hàng đang được giao đến bạn',
            time: 'Hôm qua',
        },
    ],
    'Khuyến Mãi': [
        {
            id: 3,
            title: 'Giảm giá 50% cho sản phẩm yêu thích!',
            time: '1 ngày trước',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134401-7ras8-m3khi0az4c2p81_tn',
        },
    ],
    'Tài Khoản Của Tôi': [],
} as const;

// 3. Lấy kiểu tên tab
type NotificationType = keyof typeof mockNotifications;

// 4. Cấu trúc menu sidebar
const menuGroups = [
    {
        title: 'Thông Báo',
        items: [
            { label: 'Thông Báo', icon: '🔔' },
            { label: 'Cập Nhật Đơn Hàng', icon: '📦' },
            { label: 'Khuyến Mãi', icon: '🎁' },
            { label: 'Cập Nhật Ví', icon: '💰' },
            { label: 'Cập Nhật Naver', icon: '📣' },
        ],
    },
    {
        title: 'Tài Khoản',
        items: [
            { label: 'Tài Khoản Của Tôi', icon: '👤' },
            { label: 'Đơn Mua', icon: '📄' },
            { label: 'Kho Voucher', icon: '🎫' },
            { label: 'Shopee Xu', icon: '🪙' },
        ],
    },
];

const NotificationPage = () => {
    const [activeType, setActiveType] =
        useState<NotificationType>('Cập Nhật Đơn Hàng');

    // ✅ An toàn với mọi trạng thái
    const currentData =
        activeType in mockNotifications
            ? mockNotifications[activeType as NotificationType]
            : [];

    return (
        <div className="flex flex-col sm:flex-row min-h-[500px] bg-white shadow-md rounded-md overflow-hidden">
            {/* Sidebar */}
            <aside className="w-full sm:w-64 bg-white border-r p-4 space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center space-y-1">
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-2xl">
                        👤
                    </div>
                    <p className="font-semibold text-sm">User</p>
                    <button className="text-gray-500 text-xs hover:underline">
                        ✏️ Sửa Hồ Sơ
                    </button>
                </div>

                <hr />

                {/* Menu nhóm */}
                {menuGroups.map((group, groupIndex) => (
                    <ul key={groupIndex} className="space-y-2">
                        {group.items.map((item) => (
                            <li
                                key={item.label}
                                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${
                                    activeType === item.label
                                        ? 'text-red-500 font-semibold'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                onClick={() => {
                                    if (
                                        (item.label as NotificationType) in
                                        mockNotifications
                                    ) {
                                        setActiveType(
                                            item.label as NotificationType,
                                        );
                                    }
                                }}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </li>
                        ))}
                    </ul>
                ))}
            </aside>

            {/* Nội dung */}
            <div className="flex-1 p-6">
                {currentData.length > 0 ? (
                    <div className="space-y-4">
                        {currentData.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-200 p-4 rounded-md shadow-sm hover:bg-gray-50 flex items-start gap-4"
                            >
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                )}
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 text-center">
                        <img
                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/f2641127a1ad2410.png"
                            alt="No Notification"
                            className="w-28 h-auto mb-4"
                        />
                        <p className="text-gray-500 text-lg">
                            Chưa có cập nhật nào
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationPage;
