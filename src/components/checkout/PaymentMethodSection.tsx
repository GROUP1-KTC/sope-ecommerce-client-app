import type { Dispatch, SetStateAction } from 'react';
import React from 'react';

interface PaymentMethodSectionProps {
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
}

export default function PaymentMethodSection({
    paymentMethod,
    setPaymentMethod,
}: PaymentMethodSectionProps) {
    return (
        <div className="mb-6 p-4 border rounded">
            <h3 className="text-lg font-semibold mb-2">
                Phương thức thanh toán
            </h3>
            <div className="flex space-x-4">
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                    />
                    Thanh toán khi nhận hàng
                </label>
                <label className="flex items-center">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                    />
                    Thẻ tín dụng/ghi nợ
                </label>
            </div>
        </div>
    );
}
