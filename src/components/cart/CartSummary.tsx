import React from 'react';
import { Box, Checkbox, Typography, Button } from '@mui/material';
import type { CartItem } from '~/app/(customer)/cart/page';
import { colors } from '~/constants/color.constant';

interface CartSummaryProps {
    cartItems: CartItem[];
    selected: number[];
    total: number;
    handleSelectAll: () => void;
    handleDeleteSelected: () => void;
    handleSaveToFavorites: () => void;
    handleCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
    cartItems,
    selected,
    total,
    handleSelectAll,
    handleDeleteSelected,
    handleSaveToFavorites,
    handleCheckout,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', md: 'center' },
                mt: 4,
                pt: 2,
                borderTop: 1,
                borderColor: 'grey.300',
                gap: { xs: 2, md: 0 },
            }}
        >
            {/* Left Side */}
            <Box
                display="flex"
                alignItems="center"
                gap={1}
                flexWrap="wrap"
                sx={{ width: { xs: '100%', md: 'auto' } }}
            >
                <Checkbox
                    checked={
                        selected.length === cartItems.length &&
                        cartItems.length > 0
                    }
                    onChange={handleSelectAll}
                />
                <Typography>Chọn Tất Cả ({cartItems.length})</Typography>

                {selected.length > 0 && (
                    <>
                        <Button
                            color="error"
                            sx={{ fontWeight: 'bold' }}
                            onClick={handleDeleteSelected}
                        >
                            Xóa
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveToFavorites}
                            sx={{
                                maxWidth: 180,
                                borderRadius: 1,
                                textTransform: 'none',

                                background: colors.primary.background,
                                ':hover': {
                                    background: colors.primary.backgroundHover,
                                },
                            }}
                        >
                            Lưu vào mục Đã thích
                        </Button>
                    </>
                )}
            </Box>

            {/* Right Side */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent={{ xs: 'flex-end', md: 'flex-end' }}
                flexWrap="wrap"
                gap={2}
                sx={{ width: { xs: '100%', md: 'auto' }, mt: { xs: 2, md: 0 } }}
            >
                <Typography>Tổng cộng ({selected.length} Sản phẩm):</Typography>
                <Typography variant="h6" color="error.main" fontWeight="bold">
                    {total.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleCheckout}
                    disabled={selected.length === 0}
                    sx={{
                        borderRadius: 1,
                        px: 4,
                        background: colors.primary.background,
                        ':hover': {
                            background: colors.primary.backgroundHover,
                        },
                    }}
                >
                    Mua Hàng
                </Button>
            </Box>
        </Box>
    );
};

export default CartSummary;
