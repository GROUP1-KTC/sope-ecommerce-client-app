// components/CreateShopMultiStep/ProgressBar.tsx
interface ProgressBarProps {
    step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {
    const labels = [
        'Thông tin cơ bản',
        'Mô tả shop',
        'Thuế & doanh nghiệp',
        'Xác minh',
        'Hoàn tất',
    ];

    return (
        <div>
            <div className="flex items-center gap-4 justify-between mb-3">
                {labels.map((l, i) => {
                    const idx = i + 1;
                    const active = idx === step;
                    const done = idx < step;
                    return (
                        <div key={l} className="flex items-center gap-3">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                                    done
                                        ? 'bg-red-500'
                                        : active
                                          ? 'bg-red-600'
                                          : 'bg-gray-300'
                                }`}
                            >
                                {done ? '✓' : idx}
                            </div>
                            <div className="hidden sm:block text-sm">{l}</div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-3 h-2 bg-gray-200 rounded">
                <div
                    className="h-2 bg-red-600 rounded"
                    style={{ width: `${((step - 1) / (5 - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
}
