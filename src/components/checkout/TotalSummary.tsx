import React from 'react';

interface TotalSummaryProps {
    total: number;
    shippingFee: number;
    discount: number;
    finalTotal: number;
    isLoading: boolean;
    handleSubmitOrder: (e: React.FormEvent) => void;
}

export default function TotalSummary({
    total,
    shippingFee,
    discount,
    finalTotal,
    isLoading,
    handleSubmitOrder,
}: TotalSummaryProps) {
    return (
        <div className="mb-6 p-4 border-t">
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
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Tổng thanh toán</span>
                    <span>₫{finalTotal.toLocaleString('vi-VN')}</span>
                </div>
            </div>
            <button
                onClick={handleSubmitOrder}
                className="w-full bg-orange-500 text-white py-3 rounded mt-4 hover:bg-orange-600 disabled:bg-orange-300"
                disabled={isLoading}
            >
                {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
            </button>
        </div>
    );
}
