'use client';
import { useState } from 'react';

export default function ShopReviewFilters() {
    const [status, setStatus] = useState('all');
    const [stars, setStars] = useState<number[]>([5, 4, 3, 2, 1]);

    const toggleStar = (star: number) => {
        setStars((prev) =>
            prev.includes(star)
                ? prev.filter((s) => s !== star)
                : [...prev, star],
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-700 font-medium">
                    Trạng thái
                </span>
                {['Tất cả', 'Cần phản hồi', 'Đã trả lời'].map((label) => (
                    <button
                        key={label}
                        onClick={() => setStatus(label)}
                        className={`px-3 py-1 border rounded text-sm ${
                            status === label
                                ? 'bg-red-100 border-red-400 text-red-600'
                                : 'text-gray-600'
                        }`}
                    >
                        {label} (0)
                    </button>
                ))}
            </div>

            <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-700 font-medium">
                    Số sao đánh giá
                </span>
                <label className="flex items-center gap-1 text-sm">
                    <input type="checkbox" defaultChecked /> Tất cả
                </label>
                {[5, 4, 3, 2, 1].map((star) => (
                    <label
                        key={star}
                        className="flex items-center gap-1 text-sm"
                    >
                        <input
                            type="checkbox"
                            checked={stars.includes(star)}
                            onChange={() => toggleStar(star)}
                        />
                        {star} Sao (0)
                    </label>
                ))}
            </div>

            <div className="flex flex-wrap gap-2">
                <input
                    placeholder="Tên Sản Phẩm, Mã Đơn Hàng, Tên đăng nhập người mua"
                    className="border px-3 py-2 rounded text-sm flex-1 min-w-[250px]"
                />
                <input
                    placeholder="Thời gian đánh giá"
                    type="date"
                    className="border px-3 py-2 rounded text-sm"
                />
                <button className="bg-red-500 text-white px-4 py-2 rounded text-sm">
                    Tìm kiếm
                </button>
                <button className="border px-4 py-2 rounded text-sm text-gray-600">
                    Đặt lại
                </button>
            </div>
        </div>
    );
}
