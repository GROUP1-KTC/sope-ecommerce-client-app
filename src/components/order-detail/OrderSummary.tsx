'use client';

import React from 'react';

interface OrderSummaryProps {
    subtotal: number;
    shippingCost: number;
    discount: number;
    paymentMethod: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    shippingCost,
    discount,
    paymentMethod,
}) => {
    const total = subtotal + shippingCost - discount;

    return (
        <div className="p-2 rounded-lg bg-white">
            <div className="flex justify-end">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Tổng Quan Đơn Hàng
                </h2>
            </div>
            <hr className="mb-2 border-gray-300" />
            <div className="space-y-3">
                <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-600">Tổng tiền hàng:</p>
                        <p className="text-gray-800">
                            {subtotal.toLocaleString('vi-VN')}đ
                        </p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-600">Chi phí vận chuyển:</p>
                        <p className="text-gray-800">
                            {shippingCost.toLocaleString('vi-VN')}đ
                        </p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-600">Giảm giá:</p>
                        <p className="text-red-600">
                            -{discount.toLocaleString('vi-VN')}đ
                        </p>
                    </div>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex justify-end items-center">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-600 font-semibold">
                            Thành tiền:
                        </p>
                        <p className="font-semibold text-red-500 text-2xl">
                            {total.toLocaleString('vi-VN')}đ
                        </p>
                    </div>
                </div>
                <hr className="my-4 border-t border-gray-300" />
                <div className="flex justify-end items-center">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-600 font-semibold">
                            Phương thức thanh toán:
                        </p>
                        <p className="text-gray-800">{paymentMethod}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
