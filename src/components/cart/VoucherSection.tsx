import React from 'react';

interface VoucherSectionProps {
    setShowVoucherModal: (value: boolean) => void;
}

const VoucherSection = ({ setShowVoucherModal }: VoucherSectionProps) => {
    return (
        <div className="flex items-center justify-between mt-6 mb-4 px-2 py-3 border border-dashed rounded text-sm">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-red-500 text-lg">🎫</span>
                Shopee Voucher
            </div>
            <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setShowVoucherModal(true)}
            >
                Chọn hoặc nhập mã
            </button>
        </div>
    );
};

export default VoucherSection;
