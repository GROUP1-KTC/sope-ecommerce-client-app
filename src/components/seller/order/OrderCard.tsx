'use client';

import Image from 'next/image';
import { statusColors } from '~/components/order/OrderItem';
import { OrderGroupShop } from '~/types/orders/order';
import Link from "next/link";

const shippingProviders: Record<string, string> = {
    "MTJfMTdfMTU1OQ==": "GIAO HÀNG TIẾT KIỆM (tiết kiệm)",
    "MTNfN18xNjE4": "GIAO HÀNG NHANH (nhanh)",
    "MTFfN18xMTk1": "GIAO HÀNG TIẾT KIỆM (nhanh)",
};

export default function OrderCard({ order }: { order: OrderGroupShop }) {
    const o = order.order;

    const formatMoney = (v?: number) =>
        (v ?? 0).toLocaleString('vi-VN') + '₫';

    console.log('check order', order)

    return (
        <div className="mb-4  shadow bg-white">
            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-t">
                <div className="flex items-center gap-2">
                    <Image
                        src={o.shopInfo.avatarUrl || '/assets/images/avatar.png'}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <span className="font-medium">{o.shopInfo.name}</span>
                </div>
                <div className="text-xs text-gray-500">
                    Mã đơn hàng: {o.orderNumber}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 px-4 py-4 items-start text-sm">
                <div className="sm:col-span-2">
                    {o.items.map((item) => (
                        <div
                            key={item.productVariantId}
                            className="flex gap-3 py-2 "
                        >
                            <div className="w-20 h-20 flex-shrink-0">
                                <Image
                                    src={item.imageUrl || '/assets/images/no-image.png'}
                                    alt={item.productName}
                                    width={80}
                                    height={80}
                                    className="object-cover rounded"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm">
                                    {item.productName}
                                </div>

                                <div className="text-xs text-gray-500 ">
                                    Variantion: {item.attributes?.map((a) => `${a.value}`).join(' ')}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col justify-center">
                    <div className="font-semibold">{formatMoney(o.totalAmount)}</div>
                    <div className="text-xs text-gray-500">
                        {o.paymentMethod}
                        {o.paymentProvider ? ` • ${o.paymentProvider}` : ''}
                    </div>
                </div>

                <div className="flex flex-col justify-center">
                    <div className={`font-semibold ${statusColors[o.status]}`}>
                        {o.status}
                    </div>
                    {o.cancelReason && (
                        <div className="text-xs text-gray-500">{o.cancelReason}</div>
                    )}
                </div>

                <div className="text-xs text-gray-500 flex items-center">
                    —
                </div>

                <div className="flex flex-col justify-center text-sm">
                    <div>{shippingProviders[o.shippingRateId] || "—"}</div>
                    <div className="text-xs text-gray-500">
                        {order.shippingAddress.city}, {order.shippingAddress.district}
                    </div>
                </div>

                {/* QUA ORDER DETAIL */}
                <div className="flex flex-col justify-center items-end gap-2">
                    <Link href={`/seller/orders/${o.orderNumber}`} className="text-blue-600 hover:underline text-sm">
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
}
