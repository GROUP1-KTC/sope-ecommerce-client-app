'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AddressSection from '~/components/checkout/AddressSection';
import ProductList from '~/components/checkout/ProductList';
import VoucherSection from '~/components/checkout/VoucherSection';
import PaymentMethodSection from '~/components/checkout/PaymentMethodSection';
import TotalSummary from '~/components/checkout/TotalSummary';

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

type AddressFormData = {
    fullName: string;
    phone: string;
    cityDistrict: string;
    address: string;
    type: string;
};

type Voucher = {
    discount: number;
    code?: string;
};

export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [addressFormData, setAddressFormData] = useState<AddressFormData>({
        fullName: '',
        phone: '',
        cityDistrict: '',
        address:
            'Phạm Thiện Cõ (+84) 852150879, 167/14, Đường Nguyễn Văn Thường, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh',
        type: 'Nhà Riêng',
    });
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('cod');
    const [isLoading, setIsLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Parse query parameters
    useEffect(() => {
        const items = searchParams.get('items');
        const voucherData = searchParams.get('voucher');
        try {
            if (items) {
                const parsedItems = JSON.parse(decodeURIComponent(items));
                if (Array.isArray(parsedItems) && parsedItems.length > 0) {
                    setCartItems(parsedItems);
                } else {
                    throw new Error('Invalid or empty cart items');
                }
            } else {
                throw new Error('No cart items provided');
            }
            if (voucherData && voucherData !== 'null') {
                setVoucher(JSON.parse(decodeURIComponent(voucherData)));
            }
        } catch (error) {
            console.error('Error parsing query parameters:', error);
            alert('Dữ liệu giỏ hàng không hợp lệ. Vui lòng quay lại giỏ hàng.');
            router.push('/cart');
        }
    }, [searchParams, router]);

    // Calculate totals
    const total = useMemo(
        () =>
            cartItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
            ),
        [cartItems],
    );
    const shippingFee = 1000;
    const discount = voucher?.discount || 0;
    const finalTotal = Math.max(0, total + shippingFee - discount);

    // Handle order submission
    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!cartItems.length) {
            alert('Giỏ hàng trống. Vui lòng chọn sản phẩm.');
            router.push('/cart');
            return;
        }
        if (
            !addressFormData.fullName ||
            !addressFormData.phone ||
            !addressFormData.cityDistrict ||
            !addressFormData.address
        ) {
            alert('Vui lòng cập nhật thông tin địa chỉ.');
            setShowAddressForm(true);
            return;
        }
        if (!paymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        setIsLoading(true);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            // In a real app, you would save this order data to your state management or local storage
            const orderData = {
                cartItems,
                voucher,
                address: addressFormData,
                paymentMethod,
                total: finalTotal,
                orderDate: new Date().toISOString(),
                orderId: Math.floor(Math.random() * 1000000).toString(),
            };

            console.log('Order submitted:', orderData); // For debugging

            // Clear cart after successful order
            setCartItems([]);
            setOrderSuccess(true);

            alert('Đặt hàng thành công!');
            router.push('/');
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="bg-gray-200 min-h-screen py-4">
                <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 mt-4 text-center">
                    <h2 className="text-2xl font-bold text-green-500 mb-4">
                        Đặt hàng thành công!
                    </h2>
                    <p className="mb-4">
                        Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử
                        lý.
                    </p>
                    <button
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        onClick={() => router.push('/')}
                    >
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        );
    }

    if (!cartItems.length && !searchParams.get('items')) {
        return (
            <div className="bg-gray-200 min-h-screen py-4">
                <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 mt-4 text-center">
                    <p className="text-gray-500">
                        Giỏ hàng của bạn đang trống.
                    </p>
                    <button
                        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                        onClick={() => router.push('/cart')}
                    >
                        Quay lại giỏ hàng
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-200 min-h-screen py-4">
            {/* Header */}
            <div className="bg-orange-500 text-white p-2 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-xl font-bold">
                        Shope | Thanh Toán
                    </span>
                </div>
                <div className="text-sm">Thoát | Hỗ trợ | Tiếng Việt</div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded shadow p-6 mt-4">
                <AddressSection
                    addressFormData={addressFormData}
                    setAddressFormData={setAddressFormData}
                    showAddressForm={showAddressForm}
                    setShowAddressForm={setShowAddressForm}
                />
                <ProductList cartItems={cartItems} />
                <VoucherSection voucher={voucher} />
                <PaymentMethodSection
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
                <TotalSummary
                    total={total}
                    shippingFee={shippingFee}
                    discount={discount}
                    finalTotal={finalTotal}
                    isLoading={isLoading}
                    handleSubmitOrder={handleSubmitOrder}
                />
            </div>

            <div className="bg-white p-2 mt-4 flex justify-around text-sm text-gray-500">
                <span>Dịch vụ khách hàng</span>
                <span>Shope Việt Nam</span>
                <span>Thanh toán</span>
                <span>Theo dõi Shope</span>
                <span>Tải ứng dụng Shope</span>
            </div>
        </div>
    );
}
