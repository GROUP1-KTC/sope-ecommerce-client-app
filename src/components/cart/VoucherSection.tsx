import React, { useState } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import VoucherModal from '../checkout/VoucherModal';
import type { Discount, DiscountScope } from '~/types/discount/discount';

interface Props {
    vouchers: Discount[];
    userCoins: number;
    total: number;
    useCoin: boolean;
    setUseCoin: (value: boolean) => void;
    onApplyVouchers: (codes: string[]) => void;
}

type AppliedVoucherMap = {
    PLATFORM: string | null;
    FREESHIP: string | null;
    COIN_BACK: string | null;
};

const VoucherSection: React.FC<Props> = ({
    vouchers,
    userCoins,
    total,
    useCoin,
    setUseCoin,
    onApplyVouchers,
}) => {
    const [isVoucherOpen, setIsVoucherOpen] = useState(false);
    const [appliedVouchers, setAppliedVouchers] = useState<AppliedVoucherMap>({
        PLATFORM: null,
        FREESHIP: null,
        COIN_BACK: null,
    });

    const handleApply = (selected: AppliedVoucherMap) => {
        setAppliedVouchers(selected);

        const codes = Object.values(selected).filter((c): c is string => !!c);
        onApplyVouchers(codes);
        setIsVoucherOpen(false);
    };

    const discountValue = (d: Discount) => {
        let discountValue = 0;

        if (d.discountType === 'PERCENTAGE') {
            discountValue = (total * (d.value || 0)) / 100;
        }

        if (d.discountType === 'FIXED_AMOUNT') {
            discountValue = d.value || 0;
        }

        if (d.maxDiscountValue && discountValue > d.maxDiscountValue) {
            discountValue = d.maxDiscountValue;
        }

        return discountValue;
    };

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
                <Button color="primary" onClick={() => setIsVoucherOpen(true)}>
                    Chọn hoặc nhập mã
                </Button>
            </Box>

            {/* Hiển thị voucher đã chọn */}
            {Object.values(appliedVouchers).some((c) => !!c) && (
                <Box display="flex" flexWrap="wrap" gap={1}>
                    {Object.entries(appliedVouchers).map(([scope, code]) => {
                        const voucher = vouchers.find((v) => v.code === code);
                        return voucher ? (
                            <Chip
                                key={voucher.code}
                                label={`${scope}: ${voucher.code} - ₫${discountValue(voucher).toLocaleString('vi-VN')}`}
                                color="success"
                                variant="outlined"
                            />
                        ) : null;
                    })}
                </Box>
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

            {/* Modal chọn voucher theo scope */}
            <VoucherModal
                isOpen={isVoucherOpen}
                onClose={() => setIsVoucherOpen(false)}
                vouchers={vouchers}
                onApply={handleApply}
                scopes={['PLATFORM', 'FREESHIP', 'COIN_BACK']}
            />
        </Box>
    );
};

export default VoucherSection;
