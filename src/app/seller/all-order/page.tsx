'use client';

import { useState, useMemo } from 'react';
import OrderTabs from '~/components/seller/order/OrderTabs';
import OrderFilters from '~/components/seller/order/OrderFilters';
import OrderList from '~/components/seller/order/OrderList';
import { useGetOrdersByShopQuery } from '~/features/orders/orderApiSlide';

interface AllOrderProps {
    shopId: string;
}

type Filters = {
    status: string | null;
    shippingRateId: string | null;
    orderNumber: string;
};
export default function AllOrder({ shopIdProp }: { shopIdProp?: string }) {

    const [activeTab, setActiveTab] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;

    const [filters, setFilters] = useState<Filters>({
        status: '',
        shippingRateId: '',
        orderNumber: '',
    });

    const {
        data: allOrder,
        isLoading,
        isError,
    } = useGetOrdersByShopQuery({
        page,
        size,
    });

    console.log('check allOrder', allOrder)

    const filteredOrders = useMemo(() => {
        if (!allOrder?.data?.content) return [];

        return allOrder.data.content.filter((group) => {
            const matchStatus =
                !filters.status || group.order.status === filters.status;
            const matchShipping =
                !filters.shippingRateId ||
                group.order.shippingRateId === filters.shippingRateId;
            const matchOrderNumber =
                !filters.orderNumber ||
                group.order.orderNumber
                    ?.toLowerCase()
                    .includes(filters.orderNumber.toLowerCase());

            return matchStatus && matchShipping && matchOrderNumber;
        });
    }, [allOrder, filters]);

    const counts: Record<string, number> = {
        ALL: allOrder?.data?.totalElements ?? 0,
        PENDING:
            allOrder?.data?.content?.filter((o) => o.order.status === 'PENDING')
                .length ?? 0,
        CONFIRMED:
            allOrder?.data?.content?.filter(
                (o) => o.order.status === 'CONFIRMED',
            ).length ?? 0,
        DELIVERED:
            allOrder?.data?.content?.filter(
                (o) => o.order.status === 'DELIVERED',
            ).length ?? 0,
        CANCELLED:
            allOrder?.data?.content?.filter(
                (o) => o.order.status === 'CANCELLED',
            ).length ?? 0,
    };

    return (
        <div className="p-4 sm:p-6 bg-white rounded shadow">
            <div className="text-lg font-semibold mb-4">All order</div>
            <OrderTabs
                activeTab={activeTab}
                counts={counts}
                onChange={(index, status) => {
                    setActiveTab(index);
                    setFilters((prev) => ({ ...prev, status }));
                    setPage(0);
                }}
            />

            <OrderFilters
                filters={filters}
                onFilterChange={(next) => {
                    setFilters(next);
                    setPage(0);
                }}
            />

            <OrderList
                allOrder={{
                    ...allOrder?.data,
                    content: filteredOrders,
                }}
                isLoading={isLoading}
                isError={isError}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}
