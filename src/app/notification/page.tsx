'use client';

import { useState } from 'react';
import Link from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const notifications = [
    {
        id: 1,
        title: 'CƠ HỘI CUỐI CHỐT DEAL GIẢM 50%',
        content:
            'Tại Ngày hội Thương hiệu LIXIBOX. Cùng mã giảm độc quyền đến 600K. Mở bán độc quyền: bàn chải điện...',
        time: '13:46 16-07-2025',
    },
    {
        id: 2,
        title: 'Giảm đậm hơn 20%',
        content:
            '8479_phmthinc ơi! Đừng bỏ lỡ khuyến mãi của sản phẩm bạn yêu thích!',
        time: '12:03 16-07-2025',
    },
    {
        id: 3,
        title: 'Giỏ hàng đang chờ bạn chốt đơn',
        content:
            'Hàng còn trong giỏ, nhớ nhấn chốt đơn nhé! Miễn phí ship 0Đ đã nằm sẵn trong ví.',
        time: '14:16 15-07-2025',
    },
];

export default function NotificationPage() {
    const [isGroupOpen, setIsGroupOpen] = useState(true);

    const toggleGroup = () => {
        setIsGroupOpen((prev) => !prev);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-6xl mx-auto mt-6 px-4 flex gap-6">
                {/* Sidebar */}
                <aside className="w-60 bg-white rounded shadow-sm p-4 text-sm">
                    <p className="font-semibold mb-2 flex items-center gap-1 text-gray-800">
                        <NotificationsIcon fontSize="small" />
                        Thông Báo
                    </p>

                    {/* Group Toggle */}
                    <div
                        className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-1 rounded"
                        onClick={toggleGroup}
                    >
                        <span className="font-semibold text-orange-600 flex items-center gap-2">
                            <LocalOfferIcon fontSize="small" />
                            Nhóm Thông Báo
                        </span>
                        {isGroupOpen ? (
                            <ExpandLessIcon fontSize="small" />
                        ) : (
                            <ExpandMoreIcon fontSize="small" />
                        )}
                    </div>

                    {/* Group Items */}
                    {isGroupOpen && (
                        <ul className="space-y-2 text-gray-700 mt-2">
                            <li className="text-orange-600 flex items-center gap-2 font-medium">
                                <LocalOfferIcon fontSize="small" />
                                Khuyến Mãi
                            </li>
                            <li className="flex items-center gap-2 hover:text-black">
                                <ListAltIcon fontSize="small" />
                                Cập Nhật Đơn Hàng
                            </li>
                            <li className="flex items-center gap-2 hover:text-black">
                                <WalletIcon fontSize="small" />
                                Cập Nhật Ví
                            </li>
                            <li className="flex items-center gap-2 hover:text-black">
                                <InfoIcon fontSize="small" />
                                Cập Nhật Naver
                            </li>
                        </ul>
                    )}

                    <div className="mt-6 border-t pt-4 space-y-2 text-gray-700">
                        <div className="flex items-center gap-2 hover:text-black cursor-pointer">
                            <PersonIcon fontSize="small" color="primary" />
                            Tài Khoản Của Tôi
                        </div>
                        <div className="flex items-center gap-2 hover:text-black cursor-pointer text-red-500">
                            <InventoryIcon fontSize="small" />
                            Đơn Mua
                        </div>
                        <div className="flex items-center gap-2 hover:text-black cursor-pointer">
                            <Link href="/VoucherPage">
                                <ConfirmationNumberIcon
                                    fontSize="small"
                                    color="error"
                                />
                                Kho Voucher
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 hover:text-black cursor-pointer text-yellow-600">
                            <MonetizationOnIcon fontSize="small" />
                            Naver Xu
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <section className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-lg font-bold text-gray-700 flex items-center gap-2">
                            <LocalOfferIcon fontSize="medium" />
                            Khuyến Mãi
                        </h1>
                        <button className="text-sm text-blue-600 hover:underline">
                            Đánh dấu Đã đọc tất cả
                        </button>
                    </div>

                    {notifications.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-3 rounded border border-gray-200 flex justify-between items-start hover:shadow-sm transition"
                        >
                            <div>
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-700">
                                    {item.content}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <AccessTimeIcon
                                        fontSize="small"
                                        className="mr-1"
                                    />
                                    {item.time}
                                </div>
                            </div>
                            <Link
                                href="#"
                                className="text-sm text-blue-600 border border-blue-500 px-2 py-1 rounded hover:bg-blue-50"
                            >
                                Xem Chi Tiết
                            </Link>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}
