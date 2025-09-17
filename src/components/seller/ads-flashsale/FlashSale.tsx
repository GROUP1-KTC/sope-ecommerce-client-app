'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useCreateFlashSaleMutation } from '~/features/service-program/serviceprogramApi';
import { useAlertStore } from '~/store/zustand/alertStore';

interface FlashSaleProps {
    open: boolean;
    onClose: () => void;
    productVariantId: string;
}

export default function FlashSale({
    open,
    onClose,
    productVariantId,
}: FlashSaleProps) {
    const [saleDate, setSaleDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState<number | ''>(
        '',
    );

    // RTK Query mutation hook
    const [createFlashSale, { isLoading }] = useCreateFlashSaleMutation();

    const handleSubmit = async () => {
        if (
            !discountPercentage ||
            discountPercentage <= 0 ||
            discountPercentage >= 100
        ) {
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'Phần trăm giảm giá phải > 0 và < 100',
            });
        }

        const payload = {
            productVariantId,
            saleDate,
            startTime,
            endTime,
            discountPercentage,
        };

        try {
            await createFlashSale(payload).unwrap();
            console.log('✅ FlashSale created:', payload);
            onClose();
        } catch (err) {
            console.error('❌ Tạo FlashSale thất bại:', err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'Tạo FlashSale thất bại!',
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 flex items-center justify-center p-4"
            >
                <Dialog.Panel className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 space-y-4">
                    <Dialog.Title className="text-lg font-semibold text-gray-800">
                        Thiết lập FlashSale
                    </Dialog.Title>

                    <div className="space-y-3">
                        {/* Chọn ngày */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Ngày
                            </label>
                            <input
                                type="date"
                                value={saleDate}
                                onChange={(e) => setSaleDate(e.target.value)}
                                className="w-full border rounded p-2 text-sm"
                            />
                        </div>

                        {/* Chọn giờ */}
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">
                                    Giờ bắt đầu
                                </label>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) =>
                                        setStartTime(e.target.value)
                                    }
                                    className="w-full border rounded p-2 text-sm"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm text-gray-600 mb-1">
                                    Giờ kết thúc
                                </label>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full border rounded p-2 text-sm"
                                />
                            </div>
                        </div>

                        {/* Discount Percentage */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Phần trăm giảm giá (%)
                            </label>
                            <input
                                type="number"
                                min={5}
                                max={95}
                                value={discountPercentage}
                                onChange={(e) =>
                                    setDiscountPercentage(
                                        e.target.value === ''
                                            ? ''
                                            : Number(e.target.value),
                                    )
                                }
                                className="w-full border rounded p-2 text-sm"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Giá trị hợp lệ: 5% - 90%
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                            disabled={isLoading}
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
                        </button>
                    </div>
                </Dialog.Panel>
            </motion.div>
        </Dialog>
    );
}
