import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';
import type { Voucher } from '~/components/cart/VoucherModal';

interface VoucherSectionProps {
    onSelectVoucher: () => void;
    voucher: Voucher | null;
}

const VoucherSection: React.FC<VoucherSectionProps> = ({
    onSelectVoucher,
    voucher,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 4,
                p: 2,
                border: '1px dashed',
                borderColor: 'grey.400',
                borderRadius: 1,
            }}
        >
            <Box display="flex" alignItems="center" gap={1}>
                <DiscountIcon color="error" />
                <Typography fontWeight="medium">
                    {voucher ? `Voucher: ${voucher.title}` : 'Shopee Voucher'}
                </Typography>
            </Box>
            <Button color="primary" onClick={onSelectVoucher}>
                Chọn hoặc nhập mã
            </Button>
        </Box>
    );
};

export default VoucherSection;
