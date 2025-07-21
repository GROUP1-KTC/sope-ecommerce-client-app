'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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

    // Handle address form changes
    const handleAddressChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setAddressFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validate and submit address
    const handleSubmitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        const { fullName, phone, cityDistrict, address } = addressFormData;
        if (!fullName || !phone || !cityDistrict || !address) {
            alert('Vui lòng điền đầy đủ thông tin địa chỉ.');
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            alert('Số điện thoại phải có 10 chữ số.');
            return;
        }
        setShowAddressForm(false);
    };

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
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartItems,
                    voucher,
                    address: addressFormData,
                    paymentMethod,
                    total: finalTotal,
                }),
            });
            if (response.ok) {
                alert('Đặt hàng thành công!');
                router.push('/');
            } else {
                const errorData = await response.json();
                alert(
                    `Đặt hàng thất bại: ${errorData.message || 'Vui lòng thử lại.'}`,
                );
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle empty cart
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
                {/* Address Section */}
                <div className="mb-6 p-4 border rounded">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <LocationOnIcon className="text-red-500 mr-2" />
                            <span className="font-semibold">
                                Địa Chỉ Nhận Hàng
                            </span>
                        </div>
                        <button
                            className="text-blue-500 underline"
                            onClick={() => setShowAddressForm(!showAddressForm)}
                        >
                            Thay Đổi
                        </button>
                    </div>
                    {showAddressForm ? (
                        <form
                            onSubmit={handleSubmitAddress}
                            className="mt-4 space-y-4"
                        >
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={addressFormData.fullName}
                                    onChange={handleAddressChange}
                                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Họ và tên"
                                    required
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={addressFormData.phone}
                                    onChange={handleAddressChange}
                                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Số điện thoại"
                                    required
                                />
                            </div>
                            <select
                                name="cityDistrict"
                                value={addressFormData.cityDistrict}
                                onChange={handleAddressChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            >
                                <option value="">
                                    Tỉnh/Thành phố, Quận/Huyện, Phường/Xã
                                </option>
                                <option value="HCM">
                                    TP. Hồ Chí Minh, Quận Bình Thạnh, Phường 25
                                </option>
                            </select>
                            <input
                                type="text"
                                name="address"
                                value={addressFormData.address}
                                onChange={handleAddressChange}
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Địa chỉ cụ thể"
                                required
                            />
                            <div className="flex space-x-4">
                                <select
                                    name="type"
                                    value={addressFormData.type}
                                    onChange={handleAddressChange}
                                    className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="Nhà Riêng">Nhà Riêng</option>
                                    <option value="Văn Phòng">Văn Phòng</option>
                                </select>
                                <button
                                    type="button"
                                    className="w-1/2 bg-gray-200 border rounded px-3 py-2"
                                >
                                    + Thêm vị trí
                                </button>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="bg-gray-200 px-4 py-2 rounded"
                                    onClick={() => setShowAddressForm(false)}
                                >
                                    Trở Lại
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                >
                                    Hoàn tất
                                </button>
                            </div>
                        </form>
                    ) : (
                        <p className="mt-2">{addressFormData.address}</p>
                    )}
                </div>

                {/* Product List */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Sản phẩm</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-t">
                            <thead>
                                <tr className="border-b text-gray-500 text-sm">
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
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="flex items-center gap-3 py-2">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover border rounded"
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

                {/* Voucher Section */}
                <div className="mb-6 p-4 border rounded">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <ConfirmationNumberIcon className="text-red-500 mr-2" />
                            <span className="font-semibold">Shope Voucher</span>
                        </div>
                        <button
                            className="text-blue-500 underline"
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
                        <p className="mt-2 text-sm">
                            Đã áp dụng voucher: -₫
                            {voucher.discount.toLocaleString('vi-VN')}
                        </p>
                    )}
                    <div className="flex items-center mt-2">
                        <MonetizationOnIcon className="text-orange-500 mr-2" />
                        <span>
                            Shope Xu{' '}
                            <span className="text-gray-500">
                                (Không đủ sử dụng Xu)
                            </span>
                        </span>
                        <input
                            type="text"
                            className="ml-2 w-16 border rounded px-1"
                            defaultValue="-40"
                            disabled
                        />
                    </div>
                </div>

                {/* Payment Method Section */}
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
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
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
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                                className="mr-2"
                            />
                            Thẻ tín dụng/ghi nợ
                        </label>
                    </div>
                </div>

                {/* Total Summary */}
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
