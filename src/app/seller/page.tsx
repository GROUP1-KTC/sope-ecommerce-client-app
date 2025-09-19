'use client';
import TaskSummary from '../../components/seller/dashboad/TaskSummary';
import SalesAnalytics from '../../components/seller/dashboad/SalesAnalytics';
import FilterBar from '~/components/seller/dashboad/FilterBar';
import { useState } from 'react';
import { useGetProductByShopQuery } from '~/features/products/productApi';
import { useGetOrdersByShopQuery } from '~/features/orders/orderApiSlide';

export default function HomeSeller() {
    const [filters, setFilters] = useState<{
        dateRange: { from: Date; to: Date };
        orderType: string;
    }>({
        dateRange: { from: new Date(), to: new Date() },
        orderType: 'ALL',
    });

    const [page, setPage] = useState(0);
    const size = 40;

    const { data: allProduct, isLoading: loadingProducts } =
        useGetProductByShopQuery({ page, size });
    const { data: allOrder, isLoading: loadingOrders } =
        useGetOrdersByShopQuery({ page, size });

    const orders = allOrder?.data?.content || [];
    const products = allProduct?.content || [];

    const filteredOrders = orders.filter((o) => {
        const orderDate = new Date(o.order.createdAt);
        const inDateRange =
            orderDate >= filters.dateRange.from &&
            orderDate <= filters.dateRange.to;

        const matchType =
            filters.orderType === 'ALL' ||
            (filters.orderType === 'PLACED' && o.order.status === 'PENDING') ||
            (filters.orderType === 'PAID' && o.order.paymentStatus === 'PAID');

        return inDateRange && matchType;
    });

    console.log('check allProduct', allProduct);
    console.log('check allOrder', allOrder);

    return (
        <div>
            <TaskSummary orders={orders} products={products} />
            <FilterBar onFilterChange={setFilters} />
            <SalesAnalytics orders={orders} />
        </div>
    );
}
