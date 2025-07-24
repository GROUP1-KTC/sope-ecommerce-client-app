import React from 'react';

export interface Voucher {
    id: string;
    title: string;
    description: string;
}

interface VoucherModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (voucher: Voucher) => void;
    selectedVoucher: Voucher | null;
}

const vouchers: Voucher[] = [
    {
        id: '1',
        title: 'Giảm 60k',
        description: 'Đơn Tối Thiểu ₫0',
    },
    {
        id: '2',
        title: 'Miễn phí vận chuyển',
        description: 'Đơn Tối Thiểu ₫0',
    },
];

const VoucherModal: React.FC<VoucherModalProps> = ({
    visible,
    onClose,
    onSelect,
    selectedVoucher,
}) => {
    const [selected, setSelected] = React.useState<string | null>(
        selectedVoucher?.id || null,
    );

    const handleOK = () => {
        const voucher = vouchers.find((v) => v.id === selected);
        if (voucher) {
            onSelect(voucher);
        }
        onClose();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="bg-white rounded shadow-lg w-[90%] max-w-md p-6 relative z-50">
                <h2 className="text-lg font-semibold text-center mb-4">
                    Chọn Shopee Voucher
                </h2>

                <input
                    type="text"
                    placeholder="Nhập mã Voucher"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 outline-none"
                />

                <div className="space-y-2 mb-4">
                    {vouchers.map((voucher) => (
                        <label
                            key={voucher.id}
                            className={`flex items-center justify-between border rounded px-4 py-3 cursor-pointer ${
                                selected === voucher.id
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'hover:border-gray-400'
                            }`}
                        >
                            <div>
                                <div className="font-semibold">
                                    {voucher.title}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {voucher.description}
                                </div>
                            </div>
                            <input
                                type="radio"
                                checked={selected === voucher.id}
                                onChange={() => setSelected(voucher.id)}
                            />
                        </label>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
                        onClick={onClose}
                    >
                        Trở lại
                    </button>
                    <button
                        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
                        onClick={handleOK}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VoucherModal;
