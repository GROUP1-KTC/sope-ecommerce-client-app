'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddressForm from '~/components/checkout/addressform';

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

export default function Checkout() {
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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const items = searchParams.get('items');
        const voucherData = searchParams.get('voucher');
        console.log('Raw items:', items);
        console.log('Raw voucher:', voucherData);

        if (!items || items.trim() === '') {
            console.error('No valid items parameter');
            setErrorMessage(
                'Dữ liệu giỏ hàng không hợp lệ. Vui lòng chọn sản phẩm.',
            );
            return;
        }

        try {
            const decodedItems = decodeURIComponent(items);
            console.log('Decoded items:', decodedItems);
            const parsedItems = JSON.parse(decodedItems);
            if (Array.isArray(parsedItems) && parsedItems.length > 0) {
                console.log('Validated items:', parsedItems);
                setCartItems(parsedItems);
                setErrorMessage(null);
            } else {
                throw new Error('Dữ liệu giỏ hàng trống hoặc không hợp lệ');
            }

            if (voucherData && voucherData !== 'null') {
                const decodedVoucher = decodeURIComponent(voucherData);
                console.log('Decoded voucher:', decodedVoucher);
                setVoucher(JSON.parse(decodedVoucher));
            }

            router.replace('/checkout', { scroll: false });
        } catch (error: unknown) {
            console.error(
                'Parse error:',
                (error as Error)?.message || 'Unknown error',
            );
            setErrorMessage(
                `Lỗi phân tích dữ liệu: ${(error as Error)?.message || 'Không xác định'}. Vui lòng kiểm tra dữ liệu từ giỏ hàng.`,
            );
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

        if (
            !addressFormData.fullName ||
            !addressFormData.phone ||
            !addressFormData.cityDistrict ||
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

            setCartItems([]);
            setOrderSuccess(true);

            alert('Đặt hàng thành công!');
            router.push('/');
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

    return (
        <div className="bg-gradient-to-b from-gray-200 to-gray-300 min-h-screen py-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 mt-4">
                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <LocationOnIcon className="text-red-500 mr-2 drop-shadow-sm" />
                            <span className="font-semibold drop-shadow-sm">
                                Địa Chỉ Nhận Hàng
                            </span>
                        </div>
                        <button
                            className="text-blue-500 underline hover:text-blue-600 drop-shadow-sm"
                            onClick={() => setShowAddressForm(!showAddressForm)}
                        >
                            Thay Đổi
                        </button>
                    </div>
                    {showAddressForm ? (
                        <AddressForm
                            addressFormData={addressFormData}
                            setAddressFormData={setAddressFormData}
                            setShowAddressForm={setShowAddressForm}
                        />
                    ) : (
                        <p className="mt-2 text-gray-700 drop-shadow-sm">
                            {addressFormData.address}
                        </p>
                    )}
                </div>

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
                                                src={item.image}
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

                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <ConfirmationNumberIcon className="text-red-500 mr-2 drop-shadow-sm" />
                            <span className="font-semibold drop-shadow-sm">
                                Shope Voucher
                            </span>
                        </div>
                        <button
                            className="text-blue-500 underline hover:text-blue-600 drop-shadow-sm"
                            onClick={() =>
                                alert(
                                    'Chức năng chọn voucher chưa được triển khai.',
                                )
                            }
                        >
                            Chọn Voucher
                        </button>
                    </div>
                    {voucher && (
                        <p className="mt-2 text-sm text-gray-700 drop-shadow-sm">
                            Đã áp dụng voucher: ₫
                            {voucher.discount.toLocaleString('vi-VN')}
                        </p>
                    )}
                    <div className="flex items-center mt-2">
                        <MonetizationOnIcon className="text-orange-500 mr-2 drop-shadow-sm" />
                        <span className="drop-shadow-sm">
                            Shope Xu{' '}
                            <span className="text-gray-500">
                                (Không đủ sử dụng Xu)
                            </span>
                        </span>
                        <input
                            type="text"
                            className="ml-2 w-16  rounded px-1 shadow-md bg-gray-50"
                            defaultValue="40"
                            disabled
                        />
                    </div>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2 drop-shadow-sm">
                        Phương thức thanh toán
                    </h3>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === 'cod'}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2 accent-orange-500"
                            />
                            Thanh toán khi nhận hàng
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2 accent-orange-500"
                            />
                            thẻ tín dụng / thẻ ghi nợ
                        </label>

                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="e-wallet"
                                checked={paymentMethod === 'e-wallet'}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2 accent-orange-500"
                            />
                            Ví điện tử
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
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg mt-4 hover:from-orange-600 hover:to-orange-700 disabled:from-orange-300 disabled:to-orange-400 shadow-lg transition-all duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đặt hàng'}
                    </button>
                </div>
            </div>

            <div className="bg-white p-2 mt-4 flex justify-around text-sm text-gray-500 shadow-lg rounded-lg">
                <span className="drop-shadow-sm">Dịch vụ khách hàng</span>
                <span className="drop-shadow-sm">Shope Việt Nam</span>
                <span className="drop-shadow-sm">Thanh toán</span>
                <span className="drop-shadow-sm">Theo dõi Shope</span>
                <span className="drop-shadow-sm">Tải ứng dụng Shope</span>
            </div>
        </div>
    );
}