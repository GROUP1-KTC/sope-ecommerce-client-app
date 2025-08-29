'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import CartTable from '~/components/cart/CartTable';
import CartSummary from '~/components/cart/CartSummary';
import ProductSuggestions from '~/components/cart/ProductSuggestions';
import VoucherSection from '~/components/cart/VoucherSection';
import VoucherModal, { type Voucher } from '~/components/cart/VoucherModal';
import {
    useDeleteItemsMutation,
    useDeleteItemMutation,
    useGetCartQuery,
} from '~/features/cart/cartApiSlice';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import { removeItem, removeItems } from '~/features/cart/cartSlice';
import { setCheckoutItems } from '~/features/orders/checkoutSlice';
import { useRouter } from 'next/navigation';

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
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);

    const { data: cartItemFromApi = [], isLoading } = useGetCartQuery(
        undefined,
        {
            skip: !token,
        },
    );

    const [deleteItemApi] = useDeleteItemMutation();
    const [deleteItemsApi] = useDeleteItemsMutation();

    const dispatch = useAppDispatch();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return [];
        if (token) return [];

        const stored = localStorage.getItem('cart');

        return stored ? JSON.parse(stored) || [] : [];
    });

    useEffect(() => {
        if (token && cartItemFromApi.length) {
            setCartItems(cartItemFromApi);
        }
    }, [cartItemFromApi, token]);

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
        if (token) {
            deleteItemApi(id);
        } else {
            const stored = localStorage.getItem('cart');
            const cart: CartItem[] = stored ? JSON.parse(stored) : [];
            const newCart = cart.filter((item) => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
        dispatch(removeItem(id));
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

    const handleDeleteSelected = async () => {
        if (selected.length === 0) {
            alert('Vui lòng chọn sản phẩm để xóa.');
            return;
        }

        // 1️⃣ Xóa state global

        // 2️⃣ Xóa backend nếu login
        if (token) {
            try {
                await deleteItemsApi(selected).unwrap();
            } catch (err) {
                console.error(err);
            }
        } else {
            // 3️⃣ Sync localStorage nếu chưa login
            const stored = localStorage.getItem('cart');
            let cart: CartItem[] = stored ? JSON.parse(stored) : [];
            cart = cart.filter((i) => !selected.includes(i.id));
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        dispatch(removeItems(selected));

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
        dispatch(setCheckoutItems(items));

        router.push('/checkout');
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
                    {token && (
                        <VoucherSection
                            onSelectVoucher={() => setShowVoucherModal(true)}
                            voucher={voucher}
                        />
                    )}
                    {cartItems.length > 0 ? (
                        <CartSummary
                            cartItems={cartItems}
                            selected={selected}
                            total={total}
                            handleSelectAll={handleSelectAll}
                            handleDeleteSelected={handleDeleteSelected}
                            handleSaveToFavorites={handleSaveToFavorites}
                            handleCheckout={handleCheckout}
                        />
                    ) : (
                        <Box
                            sx={{
                                py: 6,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h6" mb={2}>
                                Giỏ hàng trống
                            </Typography>
                            <Typography variant="body2">
                                Bạn chưa có sản phẩm nào trong giỏ hàng.
                            </Typography>
                        </Box>
                    )}
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
