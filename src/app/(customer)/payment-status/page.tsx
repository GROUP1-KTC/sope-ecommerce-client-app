'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentStatusQuery {
    partnerCode?: string;
    orderId?: string;
    requestId?: string;
    amount?: string;
    orderInfo?: string;
    transId?: string;
    resultCode?: string;
    message?: string;
    success?: string;
    method?: string;
}

const PaymentStatusPage = () => {
    const router = useRouter();
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatusQuery>({});
    const [orderSuccess, setOrderSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const query: PaymentStatusQuery = {
            partnerCode: params.get('partnerCode') || undefined,
            orderId: params.get('orderId') || undefined,
            requestId: params.get('requestId') || undefined,
            amount: params.get('amount') || undefined,
            orderInfo: params.get('orderInfo') || undefined,
            transId: params.get('transId') || undefined,
            resultCode: params.get('resultCode') || undefined,
            message: params.get('message') || undefined,
            success: params.get('success') || undefined,
            method: params.get('method') || undefined,
        };

        setPaymentStatus(query);

        if (query.method === 'COD') {
            setOrderSuccess(true);
        } else {
            // E-WALLET → check resultCode
            setOrderSuccess(
                query.resultCode === '0' || query.success === 'true',
            );
        }
    }, []);

    if (orderSuccess === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Đang kiểm tra trạng thái thanh toán...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex flex-col items-center">
                    {/* Icon */}
                    <div
                        className={`rounded-full p-4 mb-4 ${
                            orderSuccess ? 'bg-green-100' : 'bg-red-100'
                        }`}
                    >
                        {orderSuccess ? (
                            <svg
                                className="w-12 h-12 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-12 h-12 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        )}
                    </div>

                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                        {orderSuccess
                            ? paymentStatus.method === 'COD'
                                ? 'Đặt hàng thành công!'
                                : 'Thanh toán thành công!'
                            : 'Thanh toán thất bại!'}
                    </h2>

                    {orderSuccess && (
                        <p className="text-gray-600 mb-6">
                            {paymentStatus.method === 'COD'
                                ? `Cảm ơn bạn đã đặt hàng. Đơn hàng ${paymentStatus.orderId} với tổng số tiền ${Number(paymentStatus.amount || 0).toLocaleString('vi-VN')}₫ sẽ được xử lý và giao trong thời gian sớm nhất.`
                                : `Cảm ơn bạn đã thanh toán. Đơn hàng ${paymentStatus.orderId} với tổng số tiền ${Number(paymentStatus.amount || 0).toLocaleString('vi-VN')}₫ đã được xử lý thành công.`}
                        </p>
                    )}

                    {!orderSuccess && (
                        <p className="text-gray-600 mb-6">
                            Có lỗi xảy ra:{' '}
                            <strong>
                                {paymentStatus.message || 'Không xác định'}
                            </strong>
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200"
                        >
                            Quay lại trang chủ
                        </button>
                        {orderSuccess && (
                            <button
                                onClick={() => router.push('/account/orders')}
                                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-md transition-colors duration-200"
                            >
                                Xem đơn hàng
                            </button>
                        )}
                    </div>

                    {orderSuccess && paymentStatus.transId && (
                        <p className="mt-4 text-sm text-gray-500">
                            Mã giao dịch: {paymentStatus.transId}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentStatusPage;
