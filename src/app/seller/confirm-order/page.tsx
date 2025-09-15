'use client';

import { useState } from 'react';
import OrderList from '~/components/seller/order/OrderList';
import {
    useGetOrdersByShopQuery,
    useGetPendingOrdersByShopQuery,
} from '~/features/orders/orderApiSlide';

export default function ConfirmOrder({ shopIdProp }: { shopIdProp?: string }) {
    const shopId = shopIdProp ?? '190e754a-20d1-42e9-81ce-fa1bc282caa9';

    const [page, setPage] = useState(0);
    const size = 10;

    const {
        data: allOrder,
        isLoading,
        isError,
    } = useGetPendingOrdersByShopQuery({
        shopId,
        page,
        size,
    });

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
