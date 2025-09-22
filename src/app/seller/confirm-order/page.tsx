'use client';

import { useState } from 'react';
import OrderList from '~/components/seller/order/OrderList';
import { useGetPendingOrdersByShopQuery } from '~/features/orders/orderApiSlide';

export default function ConfirmOrderPage() {
    const shopId = '8696366f-9402-48f9-84a2-9cd2599e72a0'; // mặc định

    const [page, setPage] = useState(0);
    const size = 10;

    const {
        data: allOrder,
        isLoading,
        isError,
    } = useGetPendingOrdersByShopQuery({ shopId, page, size });

    return (
        <div className="p-4 sm:p-6 bg-white rounded shadow">
            <div className="text-lg font-semibold mb-4">All order</div>

            <OrderList
                allOrder={{
                    ...allOrder?.data,
                    content: allOrder?.data?.content ?? [],
                }}
                isLoading={isLoading}
                isFromPendingOrder={true}
                isError={isError}
                page={page}
                setPage={setPage}
            />
        </div>
    );
}
