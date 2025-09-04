'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddressForm from '~/components/checkout/addressform';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import { clearCheckoutItems } from '~/features/orders/checkoutSlice';
import { Box, Button, Switch, Typography } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import VoucherSection from '../cart/VoucherSection';
import AddressSection from './AddressSection';

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
    district: string;
    city: string;
    ward: string;
    address: string;
    type: string;
};

type Voucher = {
    discount: number;
    code?: string;
};

export default function Checkout() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.checkout.items);

    const userCoins = 12;

    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [addressFormData, setAddressFormData] = useState<AddressFormData>({
        fullName: '',
        phone: '',
        district: '',
        city: '',
        ward: '',
        address:
            'Phạm Thiện Cõ (+84) 852150879, 167/14, Đường Nguyễn Văn Thường, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh',
        type: 'Nhà Riêng',
    });
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('cod');
    const [isLoading, setIsLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [useCoin, setUseCoin] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (cartItems.length === 0 && !orderSuccess) {
            router.push('/cart');
        }
    }, []);

    // useEffect(() => {
    //     return () => {
    //         console.log('Clearing checkout items');
    //         dispatch(clearCheckoutItems());
    //     };
    // }, [router]);

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

        if (
            !addressFormData.fullName ||
            !addressFormData.phone ||
            !addressFormData.district ||
            !addressFormData.city ||
            !addressFormData.ward ||
            !addressFormData.address
        ) {
            setErrorMessage('Vui lòng cập nhật thông tin địa chỉ.');
            setShowAddressForm(true);
            return;
        }

        if (!paymentMethod) {
            setErrorMessage('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            const orderData = {
                cartItems,
                voucher,
                address: addressFormData,
                paymentMethod,
                total: finalTotal,
                orderDate: new Date().toLocaleString('vi-VN', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                }),
                orderId: Math.floor(Math.random() * 1000000).toString(),
            };

            console.log('Order submitted:', orderData);

            dispatch(clearCheckoutItems());
            setOrderSuccess(true);

            alert('Đặt hàng thành công!');
        } catch (error: unknown) {
            console.error(
                'Order error:',
                (error as Error)?.message || 'Unknown error',
            );
            setErrorMessage(
                `Có lỗi xảy ra: ${(error as Error)?.message || 'Không xác định'}. Vui lòng thử lại.`,
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="bg-gray-50  flex items-center justify-center py-12 px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                        {/* Icon success */}
                        <div className="bg-green-100 rounded-full p-4 mb-4">
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
                        </div>

                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Đặt hàng thành công!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.
                            Đơn hàng của bạn đang được xử lý và sẽ sớm được vận
                            chuyển.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => router.push('/')}
                                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-200"
                            >
                                Quay lại trang chủ
                            </button>
                            <button
                                onClick={() => router.push('/orders')}
                                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-md transition-colors duration-200"
                            >
                                Xem đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-200 to-gray-50 min-h-screen py-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 mt-4">
                <AddressSection
                    addressFormData={addressFormData}
                    setAddressFormData={setAddressFormData}
                    showAddressForm={showAddressForm}
                    setShowAddressForm={setShowAddressForm}
                />

                <div className="mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left  bg-white rounded-lg shadow-md">
                            <thead>
                                <tr className=" text-gray-500 text-sm">
                                    <th className="py-2">Sản Phẩm</th>
                                    <th className="py-2">Đơn giá</th>
                                    <th className="py-2">Số lượng</th>
                                    <th className="py-2">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className=" hover:bg-gray-50"
                                    >
                                        <td className="flex items-center gap-3 py-2">
                                            <img
                                                src={
                                                    item.image ||
                                                    '/placeholder.png'
                                                }
                                                alt={item.name}
                                                className="w-16 h-16 object-cover  rounded shadow-md"
                                                loading="lazy"
                                            />
                                            <div className="font-medium line-clamp-2">
                                                {item.name}
                                            </div>
                                        </td>
                                        <td className="py-2">
                                            ₫
                                            {item.price.toLocaleString('vi-VN')}
                                        </td>
                                        <td className="py-2">
                                            {item.quantity}
                                        </td>
                                        <td className="py-2 text-red-500 font-semibold">
                                            ₫
                                            {(
                                                item.price * item.quantity
                                            ).toLocaleString('vi-VN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <VoucherSection
                    voucher={voucher}
                    userCoins={userCoins}
                    useCoin={useCoin}
                    setUseCoin={setUseCoin}
                    onSelectVoucher={() => {
                        // mở dialog chọn voucher
                    }}
                />

                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2 drop-shadow-sm">
                        Phương thức thanh toán
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2 accent-red-500"
                            />
                            Thanh toán khi nhận hàng
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2 accent-red-500"
                            />
                            Thẻ tín dụng / thẻ ghi nợ
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="e-wallet"
                                checked={paymentMethod === 'e-wallet'}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2 accent-red-500"
                            />
                            Ví điện tử
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bank-account"
                                checked={paymentMethod === 'bank-account'}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2 accent-red-500"
                            />
                            Tài khoản ngân hàng
                        </label>
                    </div>
                </div>

                <div className="mb-6 p-4  bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
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
                        <div className="flex justify-between font-semibold text-lg  pt-2">
                            <span>Tổng thanh toán</span>
                            <span>₫{finalTotal.toLocaleString('vi-VN')}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmitOrder}
                        className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg mt-4 hover:from-red-700 hover:to-red-700 disabled:from-red-700 disabled:to-red-700 shadow-lg transition-all duration-300 cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
                    </button>
                </div>
            </div>
        </div>
    );
}
