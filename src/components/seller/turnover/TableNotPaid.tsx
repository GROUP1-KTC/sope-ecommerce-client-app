'use client';

import dayjs from 'dayjs';
import type { OrderGroupShop } from '~/types/orders/order';
import { getShopRevenue } from '~/utils/payout';

export default function TableNotPaid({
    orders = [],
}: {
    orders?: OrderGroupShop[];
}) {
    const list = orders ?? [];
    const nf = new Intl.NumberFormat('vi-VN');

    if (!list.length) {
        return (
            <div className="overflow-x-auto border-y text-sm">
                <table className="min-w-full">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="px-4 py-2 font-medium">Đơn hàng</th>
                            <th className="px-4 py-2 font-medium">
                                Ngày thanh toán dự kiến
                            </th>
                            <th className="px-4 py-2 font-medium">Trạng thái</th>
                            <th className="px-4 py-2 font-medium">
                                Phương thức thanh toán
                            </th>
                            <th className="px-4 py-2 font-medium">Số tiền nhận được</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center text-gray-500">
                            <td colSpan={5} className="py-6">
                                Không có dữ liệu
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    const getPaymentLabel = (
        method?: string | null,
        provider?: string | null,
    ) => {
        if (method === 'COD') return 'Thanh toán khi nhận hàng';
        if (method === 'E_WALLET') return provider ?? 'Ví điện tử';
        return method ?? '-';
    };

    return (
        <div className="overflow-x-auto border rounded text-sm">
            <table className="min-w-full">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="px-4 py-2">Đơn hàng</th>
                        <th className="px-4 py-2">Ngày thanh toán dự kiến</th>
                        <th className="px-4 py-2">Trạng thái</th>
                        <th className="px-4 py-2">Phương thức thanh toán</th>
                        <th className="px-4 py-2">Số tiền nhận được</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((o) => {
                        const confirmedEntry = o.order.statusHistory?.find(
                            (h) => h.status === 'CONFIRMED',
                        );
                        const confirmedDate = confirmedEntry?.timestamp
                            ? dayjs(confirmedEntry.timestamp).format(
                                  'DD/MM/YYYY',
                              )
                            : '-';
                        return (
                            <tr key={o.order.orderId} className="border-t">
                                <td className="px-4 py-2">
                                    <div className="font-medium">
                                        {o.order.orderNumber}
                                    </div>
                                    <div className="text-gray-500 text-xs">
                                        Người mua:{' '}
                                        {o.shippingAddress?.recipientName ??
                                            '-'}
                                    </div>
                                </td>
                                <td className="px-4 py-2">{confirmedDate}</td>
                                <td className="px-4 py-2 text-orange-500">
                                    Chưa thanh toán
                                </td>
                                <td className="px-4 py-2">
                                    {getPaymentLabel(
                                        o.order.paymentMethod,
                                        o.order.paymentProvider,
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    ₫{nf.format(getShopRevenue(o.order))}
                                </td>{' '}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
