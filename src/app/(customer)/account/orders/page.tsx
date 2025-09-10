'use client';
import React, { useState } from 'react';
import MenuOrder from '~/components/order/MenuOrder';
import OrderItem from '~/components/order/OrderItem';
import SearchBar from '~/components/order/SearchBar';
import { useGetOrdersQuery } from '~/features/orders/orderApiSlide';
import type { OrderStatus } from '~/types/orders/order';

const OrderPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMenu, setSelectedMenu] = useState<OrderStatus | 'all'>(
        'all',
    );

    const { data: orders = [], refetch } = useGetOrdersQuery();

    const filteredOrders = orders.filter((o) => {
        const order = o.order;

        if (selectedMenu !== 'all' && order.status !== selectedMenu) {
            return false;
        }

        return (
            order.orderId.includes(searchTerm) ||
            order.orderNumber.includes(searchTerm) ||
            (order.shopInfo?.name || '')
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    });

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
                                {filteredOrders.map((group) => (
                                    <OrderItem
                                        key={group.order.orderId}
                                        orderGroup={group}
                                        refetchOrders={refetch}
                                    />
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
