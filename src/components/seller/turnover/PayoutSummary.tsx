import type { PayoutSummaryResult } from '~/types/orders/order';

interface Props {
    summary: PayoutSummaryResult | null;
    isLoading: boolean;
    isError: boolean;
}

function formatCurrency(value: number): string {
    return `₫${value.toLocaleString('vi-VN')}`;
}

export default function PayoutSummary({ summary, isLoading, isError }: Props) {
    if (isLoading) {
        return <div className="p-4">Đang tải doanh thu...</div>;
    }

    if (isError || !summary) {
        return <div className="p-4 text-red-500">Không thể tải dữ liệu</div>;
    }

    return (
        <div className="space-y-4">
            <div className="text-lg font-semibold">Tổng Quan</div>
            <div className="p-3 bg-blue-100 text-sm rounded text-red-700 border border-red-300">
                Các số dưới đây chưa bao gồm điều chỉnh. Vui lòng tải xuống Báo
                cáo thu nhập để kiểm tra chi tiết.
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm font-medium">
                <div>
                    <div className="text-gray-500">Chưa thanh toán</div>
                    <div className="text-xl font-bold">
                        {formatCurrency(summary.unpaid)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Tuần này</div>
                    <div className="text-xl font-bold">
                        {formatCurrency(summary.week)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Tháng này</div>
                    <div className="text-xl font-bold">
                        {formatCurrency(summary.month)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Tổng cộng</div>
                    <div className="text-xl font-bold">
                        {formatCurrency(summary.total)}
                    </div>
                </div>
                <div>
                    <div className="text-gray-500">Số dư còn lại</div>
                </div>
            </div>
        </div>
    );
}
