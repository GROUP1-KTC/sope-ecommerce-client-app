'use client';

import { useState } from 'react';
import OrderTabs from '~/components/seller/order/OrderTabs';
import OrderFilters from '~/components/seller/order/OrderFilters';
import OrderList from '~/components/seller/order/OrderList';

export default function AllOrder() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="p-4 sm:p-6 bg-white rounded shadow">
            <div className="text-lg font-semibold mb-4">All order</div>
            <OrderTabs activeTab={activeTab} onChange={setActiveTab} />
            <OrderFilters />
            <OrderList />
        </div>
    );
}
