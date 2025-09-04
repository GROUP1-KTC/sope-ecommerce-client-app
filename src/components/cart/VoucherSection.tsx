import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

interface Voucher {
    discount: number;
}

interface Props {
    voucher?: Voucher | null;
    userCoins: number;
    useCoin: boolean;
    setUseCoin: (value: boolean) => void;
    onSelectVoucher: () => void;
}

const VoucherSection: React.FC<Props> = ({
    voucher,
    userCoins,
    useCoin,
    setUseCoin,
    onSelectVoucher,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                my: 4,
                p: 2,
                border: '1px dashed',
                borderColor: 'grey.400',
                borderRadius: 1,
            }}
        >
            {/* Voucher section */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <DiscountIcon color="error" />
                    <Typography fontWeight="medium">Shopee Voucher</Typography>
                </Box>
                <Button
                    // variant="outlined"
                    color="primary"
                    onClick={onSelectVoucher}
                >
                    Chọn hoặc nhập mã
                </Button>
            </Box>

            {voucher && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    className="drop-shadow-sm"
                >
                    Đã áp dụng voucher: ₫
                    {voucher.discount.toLocaleString('vi-VN')}
                </Typography>
            )}

            {/* Coin section */}
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <MonetizationOnIcon className="text-red-600 drop-shadow-sm" />
                    <Typography>Dùng {userCoins} Xu</Typography>
                </Box>

                {/* Custom Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={useCoin}
                        onChange={() => setUseCoin(!useCoin)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300 ease-in-out" />
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out peer-checked:translate-x-5" />
                </label>
            </Box>
        </Box>
    );
};

export default VoucherSection;
