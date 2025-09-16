'use client';

import { error } from 'console';
import { useState } from 'react';
import {
    useGetOrdersForShipperQuery,
    useUpdateOrderStatusMutation,
} from '~/features/orders/orderApiSlide';
import type { OrderStatus, OrderGroupShop } from '~/types/orders/order';
import type { PageResponse } from '~/types/products';

const statusColors: Record<OrderStatus, string> = {
    PENDING: 'bg-gray-100 text-gray-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    SHIPPING: 'bg-yellow-100 text-yellow-800',
    DELIVERED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    RETURNED: 'bg-purple-100 text-purple-800',
};

const nextStatus = (status: OrderStatus): OrderStatus => {
    switch (status) {
        case 'CONFIRMED':
            return 'SHIPPING';
        case 'SHIPPING':
            return 'DELIVERED';
        default:
            return status;
    }
};

export default function ShipperDashboard() {
    const [tab, setTab] = useState<'CONFIRMED' | 'SHIPPING' | 'DELIVERED'>(
        'CONFIRMED',
    );
    const [page, setPage] = useState(0);
    const size = 5;

    const { data, isLoading, refetch, error } = useGetOrdersForShipperQuery({
        status: tab,
        page,
        size,
    });

    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const [localOrders, setLocalOrders] = useState<OrderGroupShop[]>([]);

    const ordersPage: PageResponse<OrderGroupShop> | undefined = data;
    let orders =
        localOrders.length > 0 ? localOrders : (ordersPage?.content ?? []);

    if (error) {
        orders = [];
    }

    const handleStatusChange = async (
        orderId: string,
        currentStatus: OrderStatus,
    ) => {
        const newStatus = nextStatus(currentStatus);

        // Optimistic update: xoá đơn khỏi tab hiện tại
        setLocalOrders((prev) =>
            prev.filter((g) => g.order.orderId !== orderId),
        );

        try {
            await updateOrderStatus({ orderId, status: newStatus }).unwrap();
            refetch();
        } catch (error) {
            // Nếu fail → rollback
            if (ordersPage?.content) {
                setLocalOrders(ordersPage.content);
            }
        }
    };

    if (isLoading && orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Shipper Dashboard
            </h1>

            {/* Tabs */}
            <div className="flex justify-center mb-6 gap-4">
                {[
                    { key: 'CONFIRMED', label: 'Chờ lấy hàng' },
                    { key: 'SHIPPING', label: 'Đang giao' },
                    { key: 'DELIVERED', label: 'Đã giao' },
                ].map((t) => (
                    <button
                        key={t.key}
                        onClick={() => {
                            setTab(
                                t.key as 'CONFIRMED' | 'SHIPPING' | 'DELIVERED',
                            );
                            setPage(0);
                            setLocalOrders([]); // reset local state khi đổi tab
                        }}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                            tab === t.key
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Danh sách đơn hàng */}
            <div className="flex flex-col gap-4">
                {orders.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border">
                        Không có đơn hàng nào
                    </div>
                ) : (
                    orders.map((group) => {
                        const order = group.order;
                        return (
                            <div
                                key={order.orderId}
                                className="relative border border-gray-200 rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                <span
                                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold uppercase shadow ${statusColors[order.status]}`}
                                >
                                    {order.status}
                                </span>

                                {/* Địa chỉ */}
                                <div className="mb-3">
                                    <p className="text-gray-700">
                                        <span className="font-semibold">
                                            Người gửi:
                                        </span>{' '}
                                        {order.shopInfo.name} –{' '}
                                        {order.shopInfo.address.street},{' '}
                                        {order.shopInfo.address.ward},{' '}
                                        {order.shopInfo.address.city}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-semibold">
                                            Người nhận:
                                        </span>{' '}
                                        {group.shippingAddress.recipientName} –{' '}
                                        {group.shippingAddress.phoneNumber} –{' '}
                                        {group.shippingAddress.street},{' '}
                                        {group.shippingAddress.ward},{' '}
                                        {group.shippingAddress.district},{' '}
                                        {group.shippingAddress.city}
                                    </p>
                                </div>

                                {/* Sản phẩm */}
                                <div className="mt-2">
                                    <p className="font-semibold mb-2">
                                        Sản phẩm:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1">
                                        {order.items.map((item, idx) => (
                                            <li key={idx}>
                                                {item.productName} x
                                                {item.quantity} (
                                                {item.price.toLocaleString(
                                                    'vi-VN',
                                                )}
                                                đ)
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Tổng tiền */}
                                <div className="mt-3 font-bold text-lg">
                                    Tổng:{' '}
                                    {order.totalAmount.toLocaleString('vi-VN')}đ
                                </div>

                                {/* Nút thao tác */}
                                {tab !== 'DELIVERED' && (
                                    <div className="mt-4 flex flex-col gap-3">
                                        {order.status !== 'DELIVERED' &&
                                            order.status !== 'CANCELLED' && (
                                                <button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            order.orderId,
                                                            order.status,
                                                        )
                                                    }
                                                    className={`py-2 px-4 rounded-lg font-semibold cursor-pointer ${statusColors[order.status]}`}
                                                >
                                                    {order.status ===
                                                    'CONFIRMED'
                                                        ? 'Đã lấy hàng'
                                                        : 'Đã giao hàng'}
                                                </button>
                                            )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {ordersPage && ordersPage.totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                        Trước
                    </button>
                    <span className="px-3 py-1">
                        Trang {page + 1} / {ordersPage.totalPages}
                    </span>
                    <button
                        disabled={page + 1 >= ordersPage.totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            )}
        </div>
    );
}
