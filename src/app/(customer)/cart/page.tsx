'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import VoucherModal from '~/components/cart/VoucherModal';
import CartHeader from '~/components/cart/CartHeader';
import CartTable from '~/components/cart/CartTable';
import VoucherSection from '~/components/cart/VoucherSection';
import CartActions from '~/components/cart/CartActions';
import RecommendedProducts from '~/components/cart/RecommendedProducts';


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
                <CartHeader />
                <CartTable
                    cartItems={cartItems}
                    selected={selected}
                    handleSelect={handleSelect}
                    handleSelectAll={handleSelectAll}
                    handleDelete={handleDelete}
                    handleQuantityChange={handleQuantityChange}
                />
                <VoucherSection setShowVoucherModal={setShowVoucherModal} />
                <CartActions
                    cartItems={cartItems}
                    selected={selected}
                    total={total}
                    handleSelectAll={handleSelectAll}
                    handleDeleteSelected={handleDeleteSelected}
                    handleSaveToFavorites={handleSaveToFavorites}
                    handleCheckout={handleCheckout}
                />
            </div>
            <VoucherModal
                visible={showVoucherModal}
                onClose={() => setShowVoucherModal(false)}
                onSelect={(v: any) => setVoucher(v)}
                selectedVoucher={voucher}
            />
            <RecommendedProducts products={products} />
        </div>
    );
};

export default Cart;
