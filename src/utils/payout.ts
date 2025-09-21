import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import type { OrderGroupShop, OrderDetail } from '~/types/orders/order';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);

export function getShopRevenue(order: OrderDetail): number {
    const itemsTotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const shopDiscount = order.orderDiscounts
        .filter((d) => d.scope === 'SHOP')
        .reduce((sum, d) => sum + d.discountAmount, 0);

    const commissionFee = order.items.reduce(
        (sum, item) =>
            sum +
            (item.price * item.quantity * (item.commissionFeePercent ?? 0)) /
                100,
        0,
    );

    return itemsTotal - shopDiscount - commissionFee;
}

export function calculatePayoutSummary(orders: OrderGroupShop[]) {
    const now = dayjs();

    const weekStart = now.startOf('isoWeek');
    const weekEnd = now.endOf('isoWeek');

    const monthStart = now.startOf('month');
    const monthEnd = now.endOf('month');

    let unpaid = 0;
    let week = 0;
    let month = 0;
    let total = 0;

    orders.forEach((og) => {
        const o = og.order;
        const revenue = getShopRevenue(o);

        if (o.status === 'CONFIRMED') {
            unpaid += revenue;
        }

        if (o.status === 'DELIVERED') {
            total += revenue;

            const deliveredAt = o.statusHistory.find(
                (h) => h.status === 'DELIVERED',
            )?.timestamp;

            if (deliveredAt) {
                const d = dayjs(deliveredAt);

                if (d.isBetween(weekStart, weekEnd, 'day', '[]')) {
                    week += revenue;
                }

                if (d.isBetween(monthStart, monthEnd, 'day', '[]')) {
                    month += revenue;
                }
            }
        }
    });

    return {
        unpaid,
        week,
        month,
        total,
    };
}
