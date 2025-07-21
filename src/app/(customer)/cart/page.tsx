'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoucherModal from '~/components/cart/VoucherModal';

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
};

const Cart = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Thẻ nhớ tải nhạc 2gb 4gb,8gb',
            image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQe42ZXWwPudaJhV7R_FllhgDf3grwZ9QnVKFZ3vq9mgITZCuaYwUkTnTEpWqK1oxdHHMrVlWLzvAjgRdhH0MXRw3n1qHD3HpGNEOiZTrLapkQPc-jMt0Wv',
            price: 30000,
            quantity: 1,
        },
        {
            id: 2,
            name: 'Thẻ nhớ tải nhạc 2gb 4gb,8gb',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0cgbhue08od57@resize_w160_nl.webp',
            price: 28000,
            quantity: 3,
        },
    ]);

    const [selected, setSelected] = useState<number[]>([]);
    const [voucher, setVoucher] = useState<any>(null);
    const [showVoucherModal, setShowVoucherModal] = useState(false);

    const products: Product[] = [
        {
            id: 101,
            name: 'Dép lỗ đi trong nhà tắm',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0cgbhue08od57@resize_w160_nl.webp',
            price: 20900,
        },
        {
            id: 102,
            name: 'Thẻ Nhớ Micro 16GB',
            image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQe42ZXWwPudaJhV7R_FllhgDf3grwZ9QnVKFZ3vq9mgITZCuaYwUkTnTEpWqK1oxdHHMrVlWLzvAjgRdhH0MXRw3n1qHD3HpGNEOiZTrLapkQPc-jMt0Wv',
            price: 19779,
        },
        {
            id: 103,
            name: 'Sữa Rửa Mặt Senka Perfect Whip',
            image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRN4fZLY68H9tW_5H0U56PLyrrQDnPI_OdCnnrwoZMUpPqF5fhFiz_VkUho0vUWiF3qYYMpF0bI7JcniGIkXER15S5JtfpyTr9909e76ui9lLpStKqDwAsrzYDybhMpy7B3Rn5Glw&usqp=CAc',
            price: 22900,
        },
        {
            id: 104,
            name: 'Ốp lưng viền vuông iPhone',
            image: 'https://lh5.googleusercontent.com/proxy/anOm5cTCWfO5wDbMJp-mFxBSJ73jasabf3WKBxVQmlNBHDRZavndHwtLJWE2SuaX7MDYt-ZPJ20vy0qunLXBHJZQPRhqI5ei-YF7Iw4sqWqf9dScAM7Mgb1qWllvFwPPKySJXhWaYIRc7AM2Zi9d3kYf7R6wQ_YOWPoovivAVtfLHUi1xAn8SRRleb79Ef5x-6xCv1m7heP0CBE',
            price: 5000,
        },
    ];

    const handleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const handleSelectAll = () => {
        setSelected((prev) =>
            prev.length === cartItems.length
                ? []
                : cartItems.map((item) => item.id),
        );
    };

    const handleDelete = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setSelected((prev) => prev.filter((item) => item !== id));
    };

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item,
            ),
        );
    };

    const handleDeleteSelected = () => {
        if (selected.length === 0) {
            alert('Vui lòng chọn sản phẩm để xóa.');
            return;
        }
        setCartItems((prev) =>
            prev.filter((item) => !selected.includes(item.id)),
        );
        setSelected([]);
    };

    const handleSaveToFavorites = () => {
        if (selected.length === 0) {
            alert('Vui lòng chọn sản phẩm để lưu vào mục Đã thích.');
            return;
        }
        const favorites = cartItems
            .filter((item) => selected.includes(item.id))
            .map((item) => item.name)
            .join(', ');
        alert(`Đã lưu các sản phẩm sau vào mục yêu thích:\n${favorites}`);
    };

    const handleCheckout = () => {
        if (selected.length === 0) {
            alert('Vui lòng chọn ít nhất một sản phẩm để mua.');
            return;
        }
        const selectedItems = cartItems.filter((item) =>
            selected.includes(item.id),
        );
        // Pass voucher along with items to checkout
        router.push(
            `/checkout?items=${encodeURIComponent(JSON.stringify(selectedItems))}&voucher=${encodeURIComponent(JSON.stringify(voucher || null))}`,
        );
    };

    const total = cartItems
        .filter((item) => selected.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-[#fafafa] min-h-screen py-8">
            <div className="max-w-5xl mx-auto bg-white rounded shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">Giỏ Hàng</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-t">
                        <thead>
                            <tr className="border-b text-gray-500 text-sm">
                                <th className="py-10">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selected.length ===
                                                cartItems.length &&
                                            cartItems.length > 0
                                        }
                                        onChange={handleSelectAll}
                                        className="h-5 w-5"
                                    />
                                </th>
                                <th className="py-2">Sản Phẩm</th>
                                <th className="py-2">Đơn Giá</th>
                                <th className="py-2">Số Lượng</th>
                                <th className="py-2">Số Tiền</th>
                                <th className="py-2">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-2">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(item.id)}
                                            onChange={() =>
                                                handleSelect(item.id)
                                            }
                                            className="h-5 w-5"
                                        />
                                    </td>
                                    <td className="flex items-center gap-3 py-2">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-28 h-28 m-2 object-cover border rounded"
                                            loading="lazy"
                                        />
                                        <div className="font-medium line-clamp-2 max-w-xs">
                                            {item.name}
                                        </div>
                                    </td>
                                    <td className="py-2">
                                        ₫{item.price.toLocaleString('vi-VN')}
                                    </td>
                                    <td className="py-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="border px-2"
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="border px-2"
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-2 text-red-500 font-semibold">
                                        ₫
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString('vi-VN')}
                                    </td>
                                    <td className="py-2">
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mt-6 mb-4 px-2 py-3 border border-dashed rounded text-sm">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <span className="text-red-500 text-lg">🎫</span>
                        Shopee Voucher
                    </div>
                    <button
                        className="text-blue-600 font-medium hover:underline"
                        onClick={() => setShowVoucherModal(true)}
                    >
                        Chọn hoặc nhập mã
                    </button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4 gap-4">
                    <div className="flex items-center flex-wrap gap-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    selected.length === cartItems.length &&
                                    cartItems.length > 0
                                }
                                onChange={handleSelectAll}
                                className="h-5 w-5"
                            />
                            <span className="ml-2">
                                Chọn Tất Cả ({cartItems.length})
                            </span>
                        </div>
                        <button
                            className="text-gray-500 hover:underline"
                            onClick={handleDeleteSelected}
                        >
                            Xóa
                        </button>
                        <button
                            className="bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 whitespace-nowrap"
                            onClick={handleSaveToFavorites}
                        >
                            Lưu vào mục Đã thích
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="text-right">
                            <span className="text-gray-600">
                                Tổng cộng ({selected.length} Sản phẩm):
                            </span>
                            <span className="text-2xl text-red-500 font-bold block md:inline md:ml-2">
                                ₫{total.toLocaleString('vi-VN')}
                            </span>
                        </div>
                        <button
                            className="bg-orange-500 text-white px-8 py-2 rounded font-semibold hover:bg-orange-600 w-full md:w-auto"
                            onClick={handleCheckout}
                        >
                            Mua Hàng
                        </button>
                    </div>
                </div>
            </div>

            <VoucherModal
                visible={showVoucherModal}
                onClose={() => setShowVoucherModal(false)}
                onSelect={(v: any) => setVoucher(v)}
                selectedVoucher={voucher}
            />

            <div className="max-w-5xl mx-auto mt-10">
                <h3 className="text-xl font-semibold mb-4">
                    Có thể bạn cũng thích
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {products.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded shadow p-3 flex flex-col items-center hover:shadow-lg transition"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 md:w-28 md:h-28 object-cover mb-2 rounded"
                                loading="lazy"
                            />
                            <div className="font-medium text-center line-clamp-2 mb-1 text-sm md:text-base">
                                {item.name}
                            </div>
                            <div className="text-red-500 font-semibold mb-2 text-sm md:text-base">
                                ₫{item.price.toLocaleString('vi-VN')}
                            </div>
                            <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-xs md:text-sm">
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cart;
