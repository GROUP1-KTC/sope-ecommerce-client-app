'use client';

import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { colors } from '~/constants/color.constant';
import Link from 'next/link';

type SidebarItem = {
    title: string;
    icon: React.ReactNode;
    items?: { label: string; href?: string }[];
    borderColor?: string;
    href?: string;
};

const Sidebar: React.FC = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        'Thông Báo': true,
        'Tài Khoản Của Tôi': true,
    });

    const [selectedItem, setSelectedItem] = useState<string>('');

    const toggleSection = (title: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const sections: SidebarItem[] = [
        {
            title: 'Thông Báo',
            icon: <NotificationsIcon fontSize="small" />,
            borderColor: 'border-orange-300',
            items: [
                { label: 'Khuyến Mãi' },
                { label: 'Cập Nhật Đơn Hàng' },
                { label: 'Cập Nhật Ví' },
                { label: 'Cập Nhật Naver' },
            ],
        },
        {
            title: 'Tài Khoản Của Tôi',
            icon: <PersonIcon fontSize="small" />,
            borderColor: 'border-blue-300',
            items: [
                { label: 'Hồ Sơ', href: '/account/profile' },
                { label: 'Ngân Hàng', href: '/account/payment' },
                { label: 'Địa Chỉ', href: '/account/address' },
                { label: 'Đổi Mật Khẩu', href: '/account/change-password' },
                {
                    label: 'Cài Đặt Thông Báo',
                    href: '/account/notification-settings',
                },
                {
                    label: 'Thiết Lập Riêng Tư',
                    href: '/account/privacy-settings',
                },
                { label: 'Thông Tin Cá Nhân', href: '/account/personal-info' },
            ],
        },
        {
            title: 'Đơn Mua',
            icon: <InventoryIcon fontSize="small" />,
            borderColor: 'border-green-300',
            href: '/account/orders',
        },
        {
            title: 'Kho Voucher',
            icon: <ConfirmationNumberIcon fontSize="small" />,
            borderColor: 'border-purple-300',
            href: '/account/vouchers',
        },
        {
            title: 'Naver Xu',
            icon: <MonetizationOnIcon fontSize="small" />,
            href: '/account/coin',
        },
    ];

    return (
        <aside className="w-60 bg-gray-50 rounded-lg p-4 my-4 text-sm flex-shrink-0">
            {sections.map(
                ({
                    title,
                    icon,
                    items,
                    borderColor = 'border-gray-300',
                    href,
                }) => {
                    const isOpen = openSections[title] ?? false;
                    const hasChildren = !!items?.length;

                    return (
                        <div key={title}>
                            <div className="flex items-center">
                                {href ? (
                                    <Link
                                        href={href}
                                        className={`font-semibold mt-2 flex-1 flex items-center gap-1 text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors`}
                                    >
                                        {icon}
                                        {title}
                                    </Link>
                                ) : (
                                    <div
                                        onClick={() =>
                                            hasChildren && toggleSection(title)
                                        }
                                        className={`font-semibold mt-2 flex-1 flex items-center gap-1 text-gray-700 p-1 rounded cursor-pointer ${
                                            hasChildren
                                                ? 'hover:bg-gray-200'
                                                : ''
                                        } transition-colors`}
                                    >
                                        {icon}
                                        {title}
                                    </div>
                                )}

                                {hasChildren && (
                                    <button
                                        onClick={() => toggleSection(title)}
                                        className="ml-2 p-1 rounded hover:bg-gray-200"
                                    >
                                        {isOpen ? (
                                            <ExpandLessIcon fontSize="small" />
                                        ) : (
                                            <ExpandMoreIcon fontSize="small" />
                                        )}
                                    </button>
                                )}
                            </div>

                            {hasChildren && (
                                <ul
                                    className={`list-none pl-4 border-l-2 ${borderColor}  ml-1 mt-2 leading-relaxed text-gray-600 transition-all duration-300 ease-in-out ${
                                        isOpen
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0 overflow-hidden'
                                    } `}
                                >
                                    {items.map(({ label, href }) => {
                                        const isActive = selectedItem === label;
                                        return (
                                            <li
                                                key={label}
                                                className="pl-2 mt-2 cursor-pointer transition-colors duration-200"
                                                onClick={() =>
                                                    setSelectedItem(label)
                                                }
                                            >
                                                {href ? (
                                                    <Link
                                                        href={href}
                                                        className="hover:underline"
                                                        style={
                                                            isActive
                                                                ? {
                                                                      color: colors
                                                                          .primary
                                                                          .background,
                                                                      fontWeight:
                                                                          '500',
                                                                  }
                                                                : {}
                                                        }
                                                    >
                                                        {label}
                                                    </Link>
                                                ) : (
                                                    <span>{label}</span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                },
            )}
        </aside>
    );
};

export default Sidebar;
