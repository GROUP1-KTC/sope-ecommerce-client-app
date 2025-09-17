'use client';

import { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import type { OrderGroupShop } from '~/types/orders/order';

export interface OrderListProps {
    allOrder: {
        content: OrderGroupShop[];
        totalElements?: number;
        totalPages?: number;
        number?: number;
        size?: number;
        first?: boolean;
        last?: boolean;
    };
    isFromPendingOrder?: boolean;
    isLoading: boolean;
    isError: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function OrderList({
    allOrder,
    isLoading,
    isError,
    page,
    isFromPendingOrder,
    setPage,
}: OrderListProps) {
    const [orders, setOrders] = useState<OrderGroupShop[]>([]);

    useEffect(() => {
        setOrders(allOrder?.content ?? []);
    }, [allOrder]);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !allOrder) return <div>Error loading orders</div>;

    const handleConfirm = (orderId: string) => {
        setOrders((prev) => prev.filter((o) => o.order.orderId !== orderId));
    };

    return (
        <div>
            <div className="mb-2 text-lg font-semibold">
                {orders.length} Đơn hàng
            </div>

            <div className="hidden sm:grid grid-cols-7 gap-2 bg-gray-100 px-4 py-3 rounded-t mb-3 text-sm font-medium text-gray-700">
                <div className="col-span-2">Sản phẩm</div>
                <div>Tổng Đơn hàng</div>
                <div>Trạng thái</div>
                <div>Đếm ngược</div>
                <div>Đơn vị vận chuyển</div>
                <div>Thao tác</div>
            </div>

            {allOrder?.content?.map((group) => (
                <OrderCard
                    key={group.paymentId}
                    order={group}
                    isFromPendingOrder={isFromPendingOrder}
                    onConfirm={handleConfirm}
                />
            ))}

            <div className="flex justify-center text-center items-center gap-2 mt-4">
                <button
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-2">
                    Page {allOrder.number! + 1} / {allOrder.totalPages}
                </span>
                <button
                    disabled={allOrder.last}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
