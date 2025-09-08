import React from 'react';
import type { OrderStatus } from '~/types/orders/order';

interface MenuOrderProps {
    selectedMenu: OrderStatus | 'all';
    setSelectedMenu: (menu: OrderStatus | 'all') => void;
}

const ORDER_STATUS_OPTIONS: { key: OrderStatus | 'all'; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'PENDING', label: 'Chờ thanh toán' },
    { key: 'CONFIRMED', label: 'Đã xác nhận' },
    { key: 'SHIPPING', label: 'Đang giao' },
    { key: 'DELIVERED', label: 'Đã giao' },
    { key: 'CANCELLED', label: 'Đã hủy' },
];

const MenuOrder: React.FC<MenuOrderProps> = ({
    selectedMenu,
    setSelectedMenu,
}) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4 bg-white p-2 rounded-lg shadow-md">
            {ORDER_STATUS_OPTIONS.map((item) => (
                <button
                    key={item.key}
                    className={`px-4 py-2 rounded cursor-pointer transition ${
                        selectedMenu === item.key
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    onClick={() => setSelectedMenu(item.key)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default MenuOrder;
