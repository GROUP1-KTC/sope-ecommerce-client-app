import { useState } from 'react';
import Image from 'next/image';
import type { ShippingRate } from '~/types/shipping/shipping';

interface Props {
    rates: ShippingRate[];
    isLoading: boolean;
    error: any;
    onSelect: (rate: ShippingRate) => void;
}

export const ShippingSection: React.FC<Props> = ({
    rates,
    isLoading,
    error,
    onSelect,
}) => {
    const [selected, setSelected] = useState<string | null>(null);

    if (isLoading) return <p>Đang tải phí vận chuyển...</p>;
    if (error) return <p className="text-red-500">Không lấy được phí ship</p>;
    if (!rates || rates.length === 0) return <p>Không có đơn vị vận chuyển</p>;

    return (
        <div className="border border-dashed rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-800 mb-2">
                Chọn đơn vị vận chuyển
            </h3>
            {rates.map((rate) => (
                <div
                    key={rate.id}
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                        selected === rate.id
                            ? 'border-red-500 bg-red-50'
                            : 'hover:border-gray-400'
                    }`}
                    onClick={() => {
                        setSelected(rate.id);
                        onSelect(rate);
                    }}
                >
                    <div className="flex items-center gap-3">
                        {rate.carrierLogo && rate.carrierLogo.trim() !== '' ? (
                            <Image
                                src={rate.carrierLogo}
                                alt={rate.carrierName}
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        ) : (
                            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded">
                                No Logo
                            </div>
                        )}
                        <div>
                            <p className="font-medium text-gray-800">
                                {rate.carrierName}
                            </p>
                            <p className="text-sm text-gray-500">
                                {rate.expected} • {rate.service}
                            </p>
                        </div>
                    </div>
                    <span className="font-semibold text-red-600">
                        ₫{parseInt(rate.totalFee, 10).toLocaleString('vi-VN')}
                    </span>
                </div>
            ))}
        </div>
    );
};
