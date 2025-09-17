import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import type { Discount, DiscountScope } from '~/types/discount/discount';

interface VoucherModalProps {
    isOpen: boolean;
    onClose: () => void;
    vouchers?: Discount[];
    onApply: (selected: Record<DiscountScope, string | null>) => void;
    scopes?: DiscountScope[];
    fetchVoucherByCode?: (code: string) => Promise<Discount | null>;
}

const VoucherModal: React.FC<VoucherModalProps> = ({
    isOpen,
    onClose,
    vouchers = [],
    onApply,
    scopes = ['PLATFORM', 'FREESHIP', 'COIN_BACK', 'SHOP'],
    fetchVoucherByCode,
}) => {
    const [selectedByScope, setSelectedByScope] = useState<
        Record<DiscountScope, string | null>
    >({
        FREESHIP: null,
        COIN_BACK: null,
        PLATFORM: null,
        SHOP: null,
    });

    const [manualCode, setManualCode] = useState('');
    const [manualVoucher, setManualVoucher] = useState<Discount | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const hasSelection = Object.values(selectedByScope).some((v) => v !== null);

    const toggleSelect = (scope: DiscountScope, voucherCode: string) => {
        setSelectedByScope((prev) => ({
            ...prev,
            [scope]: prev[scope] === voucherCode ? null : voucherCode,
        }));
    };

    const handleApply = () => {
        onApply(selectedByScope);
        onClose();
    };

    const handleCheckCode = async () => {
        if (!manualCode.trim() || !fetchVoucherByCode) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetchVoucherByCode(manualCode.trim());
            if (res) {
                setManualVoucher(res);
                // auto select scope luôn
                setSelectedByScope((prev) => ({
                    ...prev,
                    [res.scope]: res.code,
                }));
            } else {
                setError('Mã không hợp lệ hoặc không tồn tại.');
                setManualVoucher(null);
            }
        } catch (e) {
            setError('Có lỗi khi kiểm tra mã.');
        } finally {
            setLoading(false);
        }
    };

    // Group vouchers
    const grouped = vouchers.reduce(
        (acc, v) => {
            if (scopes.includes(v.scope)) {
                acc[v.scope].push(v);
            }
            return acc;
        },
        { FREESHIP: [], COIN_BACK: [], PLATFORM: [], SHOP: [] } as Record<
            DiscountScope,
            Discount[]
        >,
    );

    const renderVoucherCard = (voucher: Discount, scope: DiscountScope) => {
        const isSelected = selectedByScope[scope] === voucher.code;
        const isExpired =
            voucher.status !== 'ACTIVE' ||
            (voucher.endDate && new Date(voucher.endDate) < new Date());

        return (
            <div
                key={voucher.id}
                onClick={() => !isExpired && toggleSelect(scope, voucher.code)}
                className={`p-4 rounded-xl border shadow-sm cursor-pointer transition ${
                    isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-red-400'
                } ${isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-gray-800">
                            {voucher.code}
                        </p>
                        <p className="text-sm text-gray-600">
                            {voucher.description}
                        </p>
                    </div>
                    <span className="text-red-600 font-bold text-sm">
                        {voucher.discountType === 'PERCENTAGE'
                            ? `-${voucher.value}%`
                            : `-₫${voucher.value.toLocaleString('vi-VN')}`}
                    </span>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>
                        ĐH tối thiểu: ₫
                        {voucher.minOrderValue.toLocaleString('vi-VN')}
                    </p>
                    {voucher.maxDiscountValue > 0 && (
                        <p>
                            Giảm tối đa: ₫
                            {voucher.maxDiscountValue.toLocaleString('vi-VN')}
                        </p>
                    )}
                    {voucher.endDate && (
                        <p>
                            HSD:{' '}
                            {new Date(voucher.endDate).toLocaleDateString(
                                'vi-VN',
                            )}
                        </p>
                    )}
                </div>
                {isExpired && (
                    <p className="mt-2 text-xs text-red-500 font-medium">
                        Voucher hết hạn / không khả dụng
                    </p>
                )}
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg space-y-6">
                    <Dialog.Title className="text-lg font-semibold text-gray-800">
                        Chọn Voucher
                    </Dialog.Title>

                    {/* Nhập mã thủ công */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                            placeholder="Nhập mã voucher"
                            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                        />
                        <button
                            onClick={handleCheckCode}
                            disabled={loading}
                            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                        >
                            {loading ? 'Đang kiểm tra...' : 'Áp dụng'}
                        </button>
                    </div>
                    {error && (
                        <p className="text-xs text-red-500 font-medium">
                            {error}
                        </p>
                    )}

                    {manualVoucher && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                Mã nhập thủ công
                            </h3>
                            {renderVoucherCard(
                                manualVoucher,
                                manualVoucher.scope,
                            )}
                        </div>
                    )}

                    {(scopes as DiscountScope[]).map((scope) => (
                        <div key={scope}>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">
                                {scope === 'FREESHIP' && 'Voucher Freeship'}
                                {scope === 'COIN_BACK' &&
                                    'Voucher Hoàn xu / Coin back'}
                                {scope === 'PLATFORM' && 'Voucher Toàn sàn'}
                            </h3>
                            {grouped[scope].length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {grouped[scope].map((v) =>
                                        renderVoucherCard(v, scope),
                                    )}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 italic">
                                    Không có voucher nào
                                </p>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            Đóng
                        </button>
                        {hasSelection && (
                            <button
                                onClick={handleApply}
                                className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                            >
                                Áp dụng
                            </button>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default VoucherModal;
