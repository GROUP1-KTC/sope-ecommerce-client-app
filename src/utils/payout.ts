import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import type { OrderGroupShop, OrderDetail } from '~/types/orders/order';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);
/**
 * Tính doanh thu cho shop (chỉ tính discount của SHOP)
 */
export function getShopRevenue(order: OrderDetail): number {
    // Tổng tiền sản phẩm
    const itemsTotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    // Discount của shop
    const shopDiscount = order.orderDiscounts
        .filter((d) => d.scope === 'SHOP')
        .reduce((sum, d) => sum + d.discountAmount, 0);

    // Phí hoa hồng
    const commissionFee = order.items.reduce(
        (sum, item) =>
            sum +
            (item.price * item.quantity * (item.commissionFeePercent ?? 0)) /
                100,
        0,
    );

    // Doanh thu cuối cùng
    return itemsTotal - shopDiscount - commissionFee;
}

/**
 * Tóm tắt doanh thu payouts cho shop
 */
export function calculatePayoutSummary(orders: OrderGroupShop[]) {
    const now = dayjs();

    // Tuần hiện tại (thứ 2 → chủ nhật)
    const weekStart = now.startOf('isoWeek');
    const weekEnd = now.endOf('isoWeek');

    // Tháng hiện tại
    const monthStart = now.startOf('month');
    const monthEnd = now.endOf('month');

    let unpaid = 0;
    let week = 0;
    let month = 0;
    let total = 0;

    orders.forEach((og) => {
        const o = og.order; // Lấy OrderDetail
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
