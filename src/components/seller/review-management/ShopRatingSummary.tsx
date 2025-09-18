import { Card } from '../common/Card';

export default function ShopRatingSummary() {
    return (
        <Card className="space-y-4 p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-base font-semibold text-gray-800">
                    Đánh Giá Shop <span className="text-red-600">0.0</span>/5
                </h2>
                <div className="text-sm text-gray-500">
                    Từ 17-06-2025 đến 16-07-2025
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    {
                        label: 'Tổng lượt đánh giá',
                        value: 0,
                        diff: '0%',
                        color: 'text-red-500',
                    },
                    {
                        label: 'Tỷ lệ đánh giá đơn hàng',
                        value: '0%',
                        diff: '0%',
                        color: 'text-red-500',
                    },
                    {
                        label: 'Tỷ lệ đánh giá tốt',
                        value: '0%',
                        diff: '0%',
                        color: 'text-red-500',
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className="space-y-1 shadow-sm border border-gray-300 rounded-lg p-4 hover:shadow-md transition"
                    >
                        <div className="text-sm text-gray-500">
                            {item.label}
                        </div>
                        <div className="text-2xl font-bold text-black">
                            {item.value}
                        </div>
                        <div className="text-xs text-gray-400">
                            so với 30 ngày trước{' '}
                            <span className={item.color}>{item.diff}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm text-gray-700 border border-gray-300 rounded-lg p-4 hover:shadow-sm transition">
                    Đánh giá tiêu cực cần phản hồi:{' '}
                    <span className="text-red-500 font-medium">0</span>{' '}
                    <a href="#" className="text-blue-600 ml-2">
                        Xem &gt;
                    </a>
                    <div className="text-xs text-gray-500 mt-1">
                        Các đánh giá có 1 & 2 sao cần bạn phản hồi
                    </div>
                </div>
                <div className="text-sm text-gray-700 border border-gray-300 rounded-lg p-4 hover:shadow-sm transition">
                    Đánh giá gần đây:{' '}
                    <span className="text-red-500 font-medium">0</span>{' '}
                    <a href="#" className="text-blue-600 ml-2">
                        Xem &gt;
                    </a>
                    <div className="text-xs text-gray-500 mt-1">
                        Đánh giá mới được cập nhật từ lần truy cập trước
                    </div>
                </div>
            </div>
        </Card>
    );
}
