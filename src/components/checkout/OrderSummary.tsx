'use client';

import React from 'react';

interface OrderSummaryProps {
    total: number;
    shippingFee: number;
    discount: number;
    shippingDiscount: number;
    finalTotal: number;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    total,
    shippingFee,
    discount,
    shippingDiscount,
    finalTotal,
    isLoading,
    onSubmit,
}) => {
    return (
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 shadow-md rounded-lg">
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Tổng tiền hàng</span>
                    <span>₫{total.toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tổng tiền phí vận chuyển</span>
                    <span>₫{shippingFee.toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between text-red-500">
                    <span>Combo khuyến mãi</span>
                    <span>-₫{discount.toLocaleString('vi-VN')}</span>
                </div>

                <div className="flex justify-between text-red-500">
                    <span>Giảm giá vận chuyển</span>
                    <span>-₫{shippingDiscount.toLocaleString('vi-VN')}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                    <span>Tổng thanh toán</span>
                    <span>₫{finalTotal.toLocaleString('vi-VN')}</span>
                </div>
            </div>
            <button
                onClick={onSubmit}
                className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg mt-4 hover:from-red-700 hover:to-red-700 disabled:from-red-700 disabled:to-red-700 shadow-lg transition-all duration-300 cursor-pointer"
                disabled={isLoading}
            >
                {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
            </button>
        </div>
    );
};

export default OrderSummary;
