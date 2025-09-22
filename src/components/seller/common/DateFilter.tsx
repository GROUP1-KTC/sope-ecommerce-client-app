'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format, subDays } from 'date-fns';

const presets = [
    { label: 'Hôm nay', value: 'today' },
    { label: '7 ngày qua', value: 'last7' },
    { label: '30 ngày qua', value: 'last30' },
    { label: 'Tùy chọn', value: 'custom' },
];

export const DateFilter = ({
    onDateChange,
}: {
    onDateChange?: (range: { from: Date; to: Date }) => void;
}) => {
    const [preset, setPreset] = useState('today');
    const [customRange, setCustomRange] = useState<[Date | null, Date | null]>([
        new Date(),
        new Date(),
    ]);

    const getRange = (type: string) => {
        const now = new Date();
        switch (type) {
            case 'today':
                return { from: now, to: now };
            case 'last7':
                return { from: subDays(now, 6), to: now };
            case 'last30':
                return { from: subDays(now, 29), to: now };
            case 'custom':
                return {
                    from: customRange[0] || now,
                    to: customRange[1] || now,
                };
            default:
                return { from: now, to: now };
        }
    };

    const handlePresetChange = (value: string) => {
        setPreset(value);
        if (value !== 'custom') {
            const range = getRange(value);
            onDateChange?.(range);
        }
    };

    const handleCustomChange = (dates: [Date | null, Date | null]) => {
        setCustomRange(dates);
        const [start, end] = dates;
        if (start && end) {
            onDateChange?.({ from: start, to: end });
        }
    };

    const currentRange = getRange(preset);

    return (
        <div className="flex flex-col gap-2 text-sm">
            <div className="flex gap-2 flex-wrap">
                {presets.map((p) => (
                    <button
                        key={p.value}
                        onClick={() => handlePresetChange(p.value)}
                        className={`px-3 py-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-300 ${
                            preset === p.value
                                ? 'bg-red-100 border-red-400 text-red-600 hover:bg-red-100'
                                : 'text-gray-600'
                        }`}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {preset === 'custom' && (
                <DatePicker
                    selectsRange
                    startDate={customRange[0]}
                    endDate={customRange[1]}
                    onChange={handleCustomChange}
                    isClearable
                    dateFormat="dd/MM/yyyy"
                    className="border px-3 py-2 rounded w-full md:w-[250px]"
                />
            )}

            <div className="text-gray-600">
                Khoảng thời gian:{' '}
                <span className="font-medium">
                    {format(currentRange.from, 'dd/MM/yyyy')} -{' '}
                    {format(currentRange.to, 'dd/MM/yyyy')}
                </span>
            </div>
        </div>
    );
};
