'use client';
import TaskSummary from '../../components/seller/dashboad/TaskSummary';
import SalesAnalytics from '../../components/seller/dashboad/SalesAnalytics';
import FilterBar from '~/components/seller/dashboad/FilterBar';
import { useState } from 'react';
import { useGetProductByShopQuery } from '~/features/products/productApi';
import { useGetOrdersByShopQuery } from '~/features/orders/orderApiSlide';

export default function HomeSeller() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filters, setFilters] = useState<{
        dateRange: { from: Date; to: Date };
        orderType: string;
    }>({
        dateRange: { from: new Date(), to: new Date() },
        orderType: 'ALL',
    });

    const [page] = useState(0);
    const size = 40;

    const { data: allProduct } = useGetProductByShopQuery({ page, size });
    const { data: allOrder } = useGetOrdersByShopQuery({ page, size });

    const orders = allOrder?.data?.content || [];
    const products = allProduct?.content || [];

    return (
        <div>
            <TaskSummary orders={orders} products={products} />
            <FilterBar onFilterChange={setFilters} />
            <SalesAnalytics orders={orders} />
        </div>
    );
}
