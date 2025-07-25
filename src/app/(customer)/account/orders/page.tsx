'use client';
import React, { useState } from 'react';
import MenuOrder from '~/components/order/MenuOrder';
import OrderItem from '~/components/order/OrderItem';
import SearchBar from '~/components/order/SearchBar';

const OrderPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMenu, setSelectedMenu] = useState<
        'all' | 'delivered' | 'processing' | 'canceled'
    >('all');

    const orders = [
        {
            id: 1,
            customer: 'Nguyễn Văn A',
            date: '2025-07-18',
            status: 'Đã giao',
            total: '1,500,000 VNĐ',
            productName: 'Áo thun nam',
            category: 'Thời trang',
            quantity: 2,
            originalPrice: 900000,
            discountPrice: 750000,
            received: true,
            shop: { id: 101, name: 'Shop A', address: '123 Đường A, Quận 1' },
            product: {
                name: 'Áo thun nam',
                quantity: 2,
                imageUrl:
                    'https://product.hstatic.net/200000404243/product/a3mn190r2-vnma004-2407-n__1__ab15bfa4aa9c411587cde37dd35ec659_grande.jpg',
            },
        },
        {
            id: 2,
            customer: 'Trần Thị B',
            date: '2025-07-17',
            status: 'Đang xử lý',
            total: '2,000,000 VNĐ',
            productName: 'Giày thể thao nữ',
            category: 'Giày dép',
            quantity: 1,
            originalPrice: 2200000,
            discountPrice: 2000000,
            received: false,
            shop: { id: 102, name: 'Shop B', address: '456 Đường B, Quận 2' },
            product: {
                name: 'Giày thể thao nữ',
                quantity: 1,
                imageUrl:
                    'https://product.hstatic.net/200000404243/product/a3mn190r2-vnma004-2407-n__1__ab15bfa4aa9c411587cde37dd35ec659_grande.jpg',
            },
        },
        {
            id: 3,
            customer: 'Lê Văn C',
            date: '2025-07-16',
            status: 'Đã hủy',
            total: '800,000 VNĐ',
            productName: 'Balo laptop',
            category: 'Phụ kiện',
            quantity: 1,
            originalPrice: 900000,
            discountPrice: 800000,
            received: false,
            shop: { id: 103, name: 'Shop C', address: '789 Đường C, Quận 3' },
            product: {
                name: 'Balo laptop',
                quantity: 1,
                imageUrl:
                    'https://product.hstatic.net/200000404243/product/a3mn190r2-vnma004-2407-n__1__ab15bfa4aa9c411587cde37dd35ec659_grande.jpg',
            },
        },
    ];

    const filteredOrders = orders.filter(
        (order) =>
            order.id.toString().includes(searchTerm) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className="order-page">
            <div className="flex flex-col min-h-screen bg-gray-50 px-12 ">
                <div className="flex flex-1">
                    <div className="flex-1 p-6">
                        <div className="bg-gray-50 rounded-lg px-12">
                            <div className="mb-6">
                                <MenuOrder
                                    selectedMenu={selectedMenu}
                                    setSelectedMenu={setSelectedMenu}
                                />
                                <SearchBar
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                />
                            </div>
                            <div>
                                {filteredOrders.map((order) => (
                                    <OrderItem key={order.id} order={order} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
