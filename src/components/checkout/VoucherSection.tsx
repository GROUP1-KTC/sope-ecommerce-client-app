import React from 'react';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

type Voucher = {
    discount: number;
    code?: string;
};

interface VoucherSectionProps {
    voucher: Voucher | null;
}

export default function VoucherSection({ voucher }: VoucherSectionProps) {
    return (
        <div className="mb-6 p-4 border rounded">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <ConfirmationNumberIcon className="text-red-500 mr-2" />
                    <span className="font-semibold">Shope Voucher</span>
                </div>
                <button
                    className="text-blue-500 underline"
                    onClick={() =>
                        alert('Chức năng chọn voucher chưa được triển khai.')
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
                    <span className="text-gray-500">(Không đủ sử dụng Xu)</span>
                </span>
                <input
                    type="text"
                    className="ml-2 w-16 border rounded px-1"
                    defaultValue="-40"
                    disabled
                />
            </div>
        </div>
    );
}
