'use client';

import { Card } from '~/components/seller/common/Card';
import PayoutDetails from '~/components/seller/turnover/PayoutDetails';
import PayoutSummary from '~/components/seller/turnover/PayoutSummary';
import { useGetRevenueByShopQuery } from '~/features/orders/orderApiSlide';
import { calculatePayoutSummary } from '~/utils/payout';
import { OrderGroupShop, PayoutSummaryResult } from '~/types/orders/order';

export default function PayoutsPage() {
    const shopId = '4d3bb71f-860c-48cf-b96e-984b55b21822';

    const { data: allOrder, isLoading, isError } = useGetRevenueByShopQuery({ shopId });

    let summary: PayoutSummaryResult | null = null;
    let orders: OrderGroupShop[] = [];

    if (allOrder?.data) {
        summary = calculatePayoutSummary(allOrder.data);
        orders = allOrder.data;
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <Card>
                <PayoutSummary summary={summary} isLoading={isLoading} isError={isError} />
            </Card>
            <Card>
                <PayoutDetails orders={orders} />
            </Card>
        </div>
    );
}
