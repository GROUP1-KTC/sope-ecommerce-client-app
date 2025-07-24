'use client';

import React from 'react';
import DiscountIcon from '@mui/icons-material/Discount';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

interface VoucherItemProps {
    title: string;
    discount: string;
    minOrder: string;
    platform: string;
    expiry: string;
    used: boolean;
    type: 'amount' | 'shipping';
}

const VoucherItem: React.FC<VoucherItemProps> = ({
    title,
    // discount,
    minOrder,
    platform,
    expiry,
    used,
    type,
}) => {
    const iconFrameColor = type === 'amount' ? 'bg-red-400' : 'bg-green-400';
    const borderColor =
        type === 'amount' ? 'border-l-red-500' : 'border-l-green-500';

    return (
        <div
            className={`bg-white text-gray-800 rounded-lg p-3 relative mb-3 shadow-md flex gap-3 border-l-4 ${borderColor}`}
        >
            <div className="flex-shrink-0 h-size-12 flex items-center justify-center">
                <div className={`${iconFrameColor} rounded-md p-6`}>
                    {type === 'amount' ? (
                        <DiscountIcon className="text-white" />
                    ) : (
                        <LocalShippingIcon className="text-white" />
                    )}
                </div>
            </div>

            <div className="flex-1 flex items-center gap-3">
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-base">{title}</h3>
                    </div>
                    <p className="text-xs">Đơn Tối Thiểu: {minOrder}</p>
                    <p className="text-xs">{platform}</p>
                    <p className="text-[10px] mt-1.5">
                        Hiệu lực sử dụng: {expiry}
                    </p>
                </div>
                <button
                    className={`flex-shrink-0 px-4 py-1.5 ${
                        used
                            ? 'bg-gray-500 cursor-not-allowed'
                            : 'bg-white hover:bg-red-600 hover:text-white'
                    } text-red-600 text-xs border border-red-600 border-2 font-medium rounded transition-colors cursor-pointer`}
                    disabled={used}
                >
                    {used ? 'Đã Sử Dụng' : 'Dùng Ngay'}
                </button>
            </div>
        </div>
    );
};

export default VoucherItem;
