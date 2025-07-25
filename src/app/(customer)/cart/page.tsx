'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import CartTable from '~/components/cart/CartTable';
import CartSummary from '~/components/cart/CartSummary';
import ProductSuggestions from '~/components/cart/ProductSuggestions';
import VoucherSection from '~/components/cart/VoucherSection';
import VoucherModal, { type Voucher } from '~/components/cart/VoucherModal';

export interface CartItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

const mockCartItems: CartItem[] = [
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
];

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
        image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn=RN4fZLY68H9tW_5H0U56PLyrrQDnPI_OdCnnrwoZMUpPqF5fhFiz_VkUho0vUWiF3qYYMpF0bI7JcniGIkXER15S5JtfpyTr9909e76ui9lLpStKqDwAsrzYDybhMpy7B3Rn5Glw',
        price: 22900,
    },
    {
        id: 104,
        name: 'Ốp lưng viền vuông iPhone',
        image: 'https://lh5.googleusercontent.com/proxy/anOm5cTCWfO5wDbMJp-mFxBSJ73jasabf3WKBxVQmlNBHDRZavndHwtLJWE2SuaX7MDYt-ZPJ20vy0qunLXBHJZQPRhqI5ei-YF7Iw4sqWqf9dScAM7Mgb1qWllvFwPPKySJXhWaYIRc7AM2Zi9d3kYf7R6wQ_YOWPoovivAVtfLHUi1xAn8SRRleb79Ef5x-6xCv1m7heP0CBE',
        price: 5000,
    },
    {
        id: 105,
        name: 'Bộ 3 quần lót nam',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0cgbhue08od57@resize_w160_nl.webp',
        price: 15000,
    },
    {
        id: 106,
        name: 'Bộ 3 quần lót nam',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0cgbhue08od57@resize_w160_nl.webp',
        price: 15000,
    },
    {
        id: 107,
        name: 'Bộ 3 quần lót nam',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0cgbhue08od57@resize_w160_nl.webp',
        price: 15000,
    },
    {
        id: 108,
        name: 'Bộ 3 quần lót nam',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0cgbhue08od57@resize_w160_nl.webp',
        price: 15000,
    },
    {
        id: 109,
        name: 'Bộ 3 quần lót nam',
        image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-m0cgbhue08od57@resize_w160_nl.webp',
        price: 15000,
    },
];

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
    const [selected, setSelected] = useState<number[]>([]);
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [showVoucherModal, setShowVoucherModal] = useState(false);

    const handleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const handleSelectAll = () => {
        setSelected(
            selected.length === cartItems.length
                ? []
                : cartItems.map((item) => item.id),
        );
    };

    const handleDelete = (id: number) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setSelected((prev) => prev.filter((item) => item !== id));
    };

    const handleIncrease = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            ),
        );
    };

    const handleDecrease = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
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
        const items = cartItems.filter((item) => selected.includes(item.id));
        const detail = items
            .map((item) => `- ${item.name} x${item.quantity}`)
            .join('\n');
        alert(
            `Bạn đã đặt mua:\n${detail}\nTổng tiền: ₫${total.toLocaleString('vi-VN')}`,
        );
    };

    const total = cartItems
        .filter((item) => selected.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h5" fontWeight="bold" mb={3}>
                        Giỏ Hàng
                    </Typography>
                    <CartTable
                        cartItems={cartItems}
                        selected={selected}
                        handleSelect={handleSelect}
                        handleSelectAll={handleSelectAll}
                        handleDelete={handleDelete}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                        handleQuantityChange={(id, quantity) =>
                            setCartItems((prev) =>
                                prev.map((item) =>
                                    item.id === id
                                        ? { ...item, quantity }
                                        : item,
                                ),
                            )
                        }
                    />
                    <VoucherSection
                        onSelectVoucher={() => setShowVoucherModal(true)}
                        voucher={voucher}
                    />
                    <CartSummary
                        cartItems={cartItems}
                        selected={selected}
                        total={total}
                        handleSelectAll={handleSelectAll}
                        handleDeleteSelected={handleDeleteSelected}
                        handleSaveToFavorites={handleSaveToFavorites}
                        handleCheckout={handleCheckout}
                    />
                </Paper>
                <ProductSuggestions products={products} />

                <VoucherModal
                    visible={showVoucherModal}
                    onClose={() => setShowVoucherModal(false)}
                    onSelect={(v) => setVoucher(v)}
                    selectedVoucher={voucher}
                />
            </Container>
        </Box>
    );
};

export default Cart;
