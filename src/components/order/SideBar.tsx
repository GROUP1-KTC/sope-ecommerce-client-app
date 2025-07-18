'use client';

import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-60 bg-gray-50 rounded-lg p-4 text-sm flex-shrink-0">
            <div className="font-semibold mb-2 flex items-center gap-1 text-gray-700 p-1 rounded">
                <NotificationsIcon fontSize="small" />
                Thông Báo
                <span className="ml-auto">
                    <ExpandLessIcon fontSize="small" />
                </span>
            </div>

            <ul className="list-none pl-4 border-l-2 border-orange-300 ml-1 mt-2 leading-relaxed text-gray-600">
                <li className="pl-2 text-orange-600 font-medium">
                    Khuyến Mãi
                </li>
                <li className="pl-2">
                    Cập Nhật Đơn Hàng
                </li>
                <li className="pl-2">
                    Cập Nhật Ví
                </li>
                <li className="pl-2">
                    Cập Nhật Naver
                </li>
            </ul>

            <div className="font-semibold mt-6 flex items-center gap-1 text-gray-700 p-1 rounded">
                <PersonIcon fontSize="small" />
                Tài Khoản Của Tôi
                <span className="ml-auto">
                    <ExpandLessIcon fontSize="small" />
                </span>
            </div>

            <ul className="list-none pl-4 border-l-2 border-blue-300 ml-1 mt-2 leading-relaxed text-gray-600">
                <li className="pl-2">
                    Hồ Sơ
                </li>
                <li className="pl-2">
                    Ngân Hàng
                </li>
                <li className="pl-2">
                    Địa Chỉ
                </li>
                <li className="pl-2">
                    Đổi Mật Khẩu
                </li>
                <li className="pl-2">
                    Cài Đặt Thông Báo
                </li>
                <li className="pl-2">
                    Thiết Lập Riêng
                </li>
                <li className="pl-2">
                    Thông Tin Cá Nhân
                </li>
            </ul>

            <div className="font-semibold mt-6 flex items-center gap-1 text-blue-600 p-1 rounded">
                <InventoryIcon fontSize="small" />
                Đơn Mua
            </div>

            <div className="font-semibold mt-4 flex items-center gap-1 text-gray-700 p-1 rounded">
                <ConfirmationNumberIcon fontSize="small" />
                Kho Voucher
            </div>

            <div className="font-semibold mt-4 flex items-center gap-1 text-gray-700 p-1 rounded">
                <MonetizationOnIcon fontSize="small" />
                Naver Xu
            </div>
        </aside>
    );
};

export default Sidebar;