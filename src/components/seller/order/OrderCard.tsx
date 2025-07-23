'use client';

import Image from 'next/image';

export interface OrderCardProps {
    avatar?: string;
    orderId: string;
    username: string;
    productImage: string;
    quantity: number;
    productName: string;
    variation: string;
    price: string;
    paymentMethod: string;
    status: string;
    statusNote?: string;
    countdown?: string;
    shipping: string;
    shippingNote?: string;
}

export default function OrderCard({
    avatar = '/assets/images/avatar.png',
    orderId,
    username,
    productImage,
    quantity,
    productName,
    variation,
    price,
    paymentMethod,
    status,
    statusNote,
    countdown,
    shipping,
    shippingNote,
}: OrderCardProps) {
    return (
        <div className="mb-4 border rounded-lg shadow bg-white">
            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-t">
                <div className="flex items-center gap-2">
                    <Image
                        src={avatar}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <span className="font-medium">{username}</span>
                </div>
                <div className="text-xs text-gray-500">
                    Mã đơn hàng: {orderId}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 px-4 py-4 items-start text-sm">
                <div className="sm:col-span-2 flex gap-2">
                    <Image
                        src={productImage}
                        alt="product"
                        width={100}
                        height={100}
                        className="object-cover rounded"
                    />
                    <div className="flex-1">
                        <div className="flex justify-between text-xs text-red-400 font-semibold">
                            <span>{quantity} Cancelled</span>
                            <span>x{quantity}</span>
                        </div>
                        <div className="font-semibold">{productName}</div>
                        <div className="text-xs text-gray-500">
                            Variation: {variation}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="font-semibold">{price}</div>
                    <div className="text-xs text-gray-500">{paymentMethod}</div>
                </div>

                <div>
                    <div className="text-red-500 font-semibold">{status}</div>
                    {statusNote && (
                        <div className="text-xs text-gray-500">
                            {statusNote}
                        </div>
                    )}
                </div>

                <div className="text-xs text-gray-500">{countdown || '—'}</div>

                <div>
                    <div>{shipping}</div>
                    {shippingNote && (
                        <div className="text-xs text-gray-500">
                            {shippingNote}
                        </div>
                    )}
                </div>

                <div>
                    <a
                        href="#"
                        className="text-blue-600 hover:underline text-sm"
                    >
                        Xem chi tiết
                    </a>
                </div>
            </div>
        </div>
    );
}
