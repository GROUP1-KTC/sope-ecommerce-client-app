'use client';

import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Sidebar: React.FC = () => {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
    const [isAccountOpen, setIsAccountOpen] = useState(true);

    const toggleNotifications = () =>
        setIsNotificationsOpen(!isNotificationsOpen);
    const toggleAccount = () => setIsAccountOpen(!isAccountOpen);

    return (
        <aside className="w-60 bg-gray-50 rounded-lg p-4 my-4 text-sm flex-shrink-0">
            <div
                className="font-semibold mb-2 flex items-center gap-1 text-gray-700 p-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={toggleNotifications}
            >
                <NotificationsIcon fontSize="small" />
                Thông Báo
                <span className="ml-auto">
                    {isNotificationsOpen ? (
                        <ExpandLessIcon fontSize="small" />
                    ) : (
                        <ExpandMoreIcon fontSize="small" />
                    )}
                </span>
            </div>

            <ul
                className={`list-none pl-4 border-l-2 border-orange-300 ml-1 mt-2 leading-relaxed text-gray-600 transition-all duration-300 ease-in-out ${
                    isNotificationsOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <li className="pl-2 mt-2">Khuyến Mãi</li>
                <li className="pl-2 mt-2">Cập Nhật Đơn Hàng</li>
                <li className="pl-2 mt-2">Cập Nhật Ví</li>
                <li className="pl-2 mt-2">Cập Nhật Naver</li>
            </ul>

            <div
                className="font-semibold mt-2 flex items-center gap-1 text-gray-700 p-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={toggleAccount}
            >
                <PersonIcon fontSize="small" />
                Tài Khoản Của Tôi
                <span className="ml-auto">
                    {isAccountOpen ? (
                        <ExpandLessIcon fontSize="small" />
                    ) : (
                        <ExpandMoreIcon fontSize="small" />
                    )}
                </span>
            </div>

            <ul
                className={`list-none pl-4 border-l-2 border-blue-300 ml-1 mt-2 leading-relaxed text-gray-600 transition-all duration-300 ease-in-out ${
                    isAccountOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <li className="pl-2 mt-2">
                    <a href="/account/profile" className="hover:underline">
                        Hồ Sơ
                    </a>
                </li>
                <li className="pl-2 mt-2">
                    <a href="/account/payment" className="hover:underline">
                        Ngân Hàng
                    </a>
                </li>
                <li className="pl-2 mt-2">
                    <a href="/account/address" className="hover:underline">
                        Địa Chỉ
                    </a>
                </li>
                <li className="pl-2 mt-2">
                    <a
                        href="/account/change-password"
                        className="hover:underline"
                    >
                        Đổi Mật Khẩu
                    </a>
                </li>
                <li className="pl-2 mt-2">
                    <a
                        href="/account/notification-settings"
                        className="hover:underline"
                    >
                        Cài Đặt Thông Báo
                    </a>
                </li>
                <li className="pl-2 mt-2">
                    <a
                        href="/account/privacy-settings"
                        className="hover:underline"
                    >
                        Thiết Lập Riêng Tư
                    </a>
                </li>
                <li className="pl-2 mt-2">
                    <a
                        href="/account/personal-info"
                        className="hover:underline"
                    >
                        Thông Tin Cá Nhân
                    </a>
                </li>
            </ul>

            <div className="font-semibold mt-4 flex items-center gap-1 text-gray-600 p-1 rounded">
                <InventoryIcon fontSize="small" />
                <a href="/order">Đơn mua</a>
            </div>

            <div className="font-semibold mt-4 flex items-center gap-1 text-gray-700 p-1 rounded">
                <ConfirmationNumberIcon fontSize="small" />
                <a href="/account/vouchers">Kho Voucher</a>
            </div>

            <div className="font-semibold mt-4 flex items-center gap-1 text-gray-700 p-1 rounded">
                <MonetizationOnIcon fontSize="small" />
                Naver Xu
            </div>
        </aside>
    );
};

export default Sidebar;
