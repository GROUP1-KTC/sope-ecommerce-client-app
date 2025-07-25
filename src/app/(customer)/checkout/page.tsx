'use client';

import { Suspense } from 'react';
import Checkout from '~/components/checkout/checkout';

export default function CheckoutPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-[80vh] flex-col">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-400 border-t-transparent mb-4"></div>
                    <p className="text-lg text-gray-600">
                        Đang tải trang thanh toán...
                    </p>
                </div>
            }
        >
            <Checkout />
        </Suspense>
    );
}
