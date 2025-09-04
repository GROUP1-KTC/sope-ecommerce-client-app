'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
    useUpdateCartMutation,
} from '~/features/cart/cartApiSlice';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import {
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    removeItems,
    setCart,
    updateQuantity,
} from '~/features/cart/cartSlice';
import { setCheckoutItems } from '~/features/orders/checkoutSlice';
import { useRouter } from 'next/navigation';
import { useAlertStore } from '~/store/zustand/alertStore';

export interface CartItem {
    id: string;
    productVariantId: string;
    name: string;
    image: string | null;
    price: number;
    quantity: number;
}

export interface CartGroup {
    shop: {
        id: string;
        name: string;
        avatarUrl: string;
    };
    items: CartItem[];
}

export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

const products: Product[] = [];

const Cart: React.FC = () => {
    const router = useRouter();
    // const token = useAppSelector((state) => state.auth.accessToken);
    const token = 'znb';

    const { groups: cartGroups } = useAppSelector((state) => state.cart);

    const { data: cartItemsFromApi, isLoading } = useGetCartQuery(undefined, {
        skip: !token,
    });
    const [deleteItemApi] = useDeleteItemMutation();
    const [deleteItemsApi] = useDeleteItemsMutation();

    const [updateCartApi] = useUpdateCartMutation();
    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState<string[]>([]);
    const [voucher, setVoucher] = useState<Voucher | null>(null);
    const [showVoucherModal, setShowVoucherModal] = useState(false);

    // Memoize grouped cart from API
    const groupedCart = useMemo(() => {
        if (!token || !cartItemsFromApi?.length) return null;

        console.log('Cart items from API:', cartItemsFromApi);

        return cartItemsFromApi;
    }, [cartItemsFromApi, token]);

    // Sync Redux store with API or localStorage
    useEffect(() => {
        if (token && groupedCart) {
            dispatch(setCart(groupedCart));
        } else if (!token && typeof window !== 'undefined') {
            const stored = localStorage.getItem('cart');
            const localCart = stored ? JSON.parse(stored) || [] : [];
            dispatch(setCart(localCart));
        }
    }, [groupedCart, token, dispatch]);

    const handleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const handleSelectGroup = (shopId: string) => {
        const shopItems =
            cartGroups.find((g) => g.shop.id === shopId)?.items || [];
        const shopItemIds = shopItems.map((item) => item.id);
        const allSelected = shopItemIds.every((id) => selected.includes(id));
        setSelected((prev) =>
            allSelected
                ? prev.filter((id) => !shopItemIds.includes(id))
                : [...prev, ...shopItemIds.filter((id) => !prev.includes(id))],
        );
    };

    const handleSelectAll = () => {
        const allItems = cartGroups.flatMap((g) =>
            g.items.map((item) => item.id),
        );
        const allSelected = allItems.every((id) => selected.includes(id));
        setSelected(allSelected ? [] : allItems);
    };

    const handleDelete = async (id: string) => {
        try {
            if (token) {
                await deleteItemApi(id).unwrap();
            }
            if (!token) {
                const newCartGroups = cartGroups
                    .map((group) => ({
                        ...group,
                        items: group.items.filter((item) => item.id !== id),
                    }))
                    .filter((group) => group.items.length > 0);

                localStorage.setItem('cart', JSON.stringify(newCartGroups));
            }
            dispatch(removeItem(id));

            useAlertStore.getState().showAlert({
                severity: 'success',
                message: 'Xóa sản phẩm thành công!',
            });
            setSelected((prev) => prev.filter((item) => item !== id));
        } catch (err) {
            console.error('Failed to delete item:', err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'Xóa sản phẩm thất bại!',
            });
        }
    };

    const handleDeleteSelected = async () => {
        if (selected.length === 0) {
            alert('Vui lòng chọn sản phẩm để xóa.');
            return;
        }
        try {
            if (token) {
                await deleteItemsApi(selected).unwrap();
            }
            if (!token) {
                const newCartGroups = cartGroups
                    .map((group) => ({
                        ...group,
                        items: group.items.filter(
                            (item) => !selected.includes(item.id),
                        ),
                    }))
                    .filter((group) => group.items.length > 0);
                localStorage.setItem('cart', JSON.stringify(newCartGroups));
            }
            dispatch(removeItems(selected));
            useAlertStore.getState().showAlert({
                severity: 'success',
                message: 'Xóa các sản phẩm thành công!',
            });
            setSelected([]);
        } catch (err) {
            console.error('Failed to delete selected items:', err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'Xóa các sản phẩm thất bại!',
            });
        }
    };

    const handleIncrease = async (id: string) => {
        if (!token) {
            const newCartGroups = cartGroups
                .map((group) => ({
                    ...group,
                    items: group.items.map((item) =>
                        item.id === id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    ),
                }))
                .filter((group) => group.items.length > 0);
            localStorage.setItem('cart', JSON.stringify(newCartGroups));
            dispatch(increaseQuantity(id));

            return;
        }
        const item = cartGroups
            .flatMap((group) => group.items)
            .find((item) => item.id === id);
        if (!item) return;

        try {
            await updateCartApi({
                id,
                newVariantId: null,
                quantity: item.quantity + 1,
            }).unwrap();

            console.log('Cart updated successfully');

            dispatch(increaseQuantity(id));
        } catch (err: any) {
            console.error('Failed to update cart:', err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: err.data?.errors[0] || 'Cập nhật giỏ hàng thất bại!',
            });
        }
    };

    const handleDecrease = async (id: string) => {
        if (!token) {
            const newCartGroups = cartGroups
                .map((group) => ({
                    ...group,
                    items: group.items.map((item) =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item,
                    ),
                }))
                .filter((group) => group.items.length > 0);
            localStorage.setItem('cart', JSON.stringify(newCartGroups));
            dispatch(decreaseQuantity(id));
            return;
        }
        const item = cartGroups
            .flatMap((group) => group.items)
            .find((item) => item.id === id);
        if (!item) return;

        try {
            await updateCartApi({
                id,
                newVariantId: null,
                quantity: item.quantity - 1,
            }).unwrap();

            dispatch(decreaseQuantity(id));
        } catch (err: any) {
            console.error('Failed to update cart:', err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: err.data?.errors[0] || 'Cập nhật giỏ hàng thất bại!',
            });
        }
    };

    const handleQuantityChange = async (id: string, quantity: number) => {
        if (quantity < 1) return;
        if (!token) {
            const newCartGroups = cartGroups
                .map((group) => ({
                    ...group,
                    items: group.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item,
                    ),
                }))
                .filter((group) => group.items.length > 0);
            localStorage.setItem('cart', JSON.stringify(newCartGroups));
            dispatch(updateQuantity({ id, quantity }));
        } else {
            try {
                await updateCartApi({
                    id,
                    newVariantId: null,
                    quantity,
                }).unwrap();

                dispatch(updateQuantity({ id, quantity }));
            } catch (err: any) {
                console.error('Failed to update cart:', err);
                useAlertStore.getState().showAlert({
                    severity: 'error',
                    message:
                        err.data?.errors[0] || 'Cập nhật giỏ hàng thất bại!',
                });
            }
        }
    };

    const handleSaveToFavorites = () => {
        if (selected.length === 0) {
            alert('Vui lòng chọn sản phẩm để lưu vào mục Đã thích.');
            return;
        }
        const favorites = cartGroups
            .flatMap((g) => g.items)
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
        const items = cartGroups
            .flatMap((g) => g.items)
            .filter((item) => selected.includes(item.id));
        dispatch(setCheckoutItems(items));
        router.push('/checkout');
    };

    const total = cartGroups
        .flatMap((g) => g.items)
        .filter((item) => selected.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                        Giỏ Hàng
                    </Typography>
                    {isLoading ? (
                        <Typography>Loading...</Typography>
                    ) : cartGroups.length === 0 ? (
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
                    ) : (
                        <>
                            {cartGroups.map((group) => (
                                <Box key={group.shop.id} sx={{ mb: 4 }}>
                                    <CartTable
                                        cartGroups={[group]}
                                        selected={selected}
                                        handleSelect={handleSelect}
                                        handleSelectGroup={handleSelectGroup}
                                        handleDelete={handleDelete}
                                        handleIncrease={handleIncrease}
                                        handleDecrease={handleDecrease}
                                        handleQuantityChange={
                                            handleQuantityChange
                                        }
                                    />
                                </Box>
                            ))}

                            <CartSummary
                                cartGroups={cartGroups}
                                selected={selected}
                                handleSelectAll={handleSelectAll}
                                handleDeleteSelected={handleDeleteSelected}
                                handleSaveToFavorites={handleSaveToFavorites}
                                handleCheckout={handleCheckout}
                                total={total}
                            />
                        </>
                    )}
                </Paper>
                <ProductSuggestions products={products} />
            </Container>
        </Box>
    );
};

export default Cart;
