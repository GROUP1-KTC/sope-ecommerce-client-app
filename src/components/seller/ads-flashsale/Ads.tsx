import React, { useState } from 'react';
import { addDays, format, isBefore, isAfter, isSameDay } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useCreateAdsForProductMutation } from '~/features/service-program/serviceprogramApi';

interface AdsProps {
    open: boolean;
    productId: string | null;
    onClose: () => void;
}

export default function Ads({ open, productId, onClose }: AdsProps) {

    const today = new Date();
    const maxDate = addDays(today, 30); // tới 1 tháng sau
    const [startDate, setStartDate] = useState<Date | null>(null);

    const [createAds] = useCreateAdsForProductMutation();

    if (!open || !productId) return null;

    const handleConfirm = async () => {
        if (!startDate) return;
        const payload = {
            productId,
            startDate: format(startDate, 'yyyy-MM-dd'),
            durationDays: 7,
        };
        try {
            const res = await createAds(payload).unwrap();
            console.log('🎉 Quảng cáo tạo thành công:', res);
            onClose();
        } catch (e) {
            console.error('🚨 Lỗi tạo quảng cáo:', e);
        }
    };

    const handleSelect = (day: Date) => {
        // nếu click lại vào ngày đang chọn -> reset
        if (startDate && isSameDay(startDate, day)) {
            setStartDate(null);
        } else {
            setStartDate(day);
        }
    };

    const isInRange = (day: Date) => {
        if (!startDate) return false;
        const end = addDays(startDate, 7); // tối đa 7 ngày
        return !isBefore(day, startDate) && !isAfter(day, end);
    };

    const days: Date[] = [];
    let cur = today;
    while (!isAfter(cur, maxDate)) {
        days.push(cur);
        cur = addDays(cur, 1);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-lg shadow-lg w-[480px] max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                    <h2 className="text-lg font-semibold">
                        Thiết lập Quảng cáo
                    </h2>
                    <p className="text-sm text-gray-500">
                        Sản phẩm: {productId}
                    </p>
                </div>

                <div className="p-6">
                    <h3 className="font-medium mb-3">
                        (Gói Ads 7 ngày) với giá 700000
                    </h3>
                    <div className="grid grid-cols-7 gap-2 text-sm">
                        {days.map((day, idx) => {
                            const isSelected =
                                startDate && isSameDay(startDate, day);
                            const active = isInRange(day);
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(day)}
                                    disabled={
                                        isBefore(day, today) ||
                                        isAfter(day, maxDate)
                                    }
                                    className={`p-2 rounded border 
										${isSelected ? 'bg-red-500 text-white border-red-500' : ''}
										${active && !isSelected ? 'bg-red-100 border-red-300' : ''}
										${!isSelected && !active ? 'bg-white hover:bg-gray-100 border-gray-300' : ''}
										disabled:opacity-40 disabled:cursor-not-allowed`}
                                >
                                    {format(day, 'dd', { locale: vi })}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end gap-2 border-t p-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
                    >
                        Hủy
                    </button>
                    <button
                        disabled={!startDate}
                        onClick={handleConfirm}
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 text-sm disabled:opacity-50"
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}
