type Props = {
    filters: {
        mainTab: string;
        subTab: string;
        priority: string;
        query: string;
        action: string;
    };
};

export default function RequestTable({ filters }: Props) {
    const allData = [
        {
            id: 'REQ001',
            type: 'refund',
            product: 'Áo sơ mi',
            status: 'Đang xử lý',
            main: 'Đơn Trả hàng Hoàn tiền',
            sub: 'Đã hoàn tiền cho Người mua',
            priority: 'Hết hạn sau 2 ngày',
        },
        {
            id: 'REQ002',
            type: 'return',
            product: 'Giày thể thao',
            status: 'Đã xử lý',
            main: 'Đơn Hủy',
            sub: 'Yêu cầu bị hủy/không hợp lệ',
            priority: 'Hết hạn sau 1 ngày',
        },
    ];

    const filtered = allData.filter((item) => {
        const { mainTab, subTab, priority, query, action } = filters;

        const matchMain = mainTab === 'Tất cả' || item.main === mainTab;
        const matchSub = subTab === 'Tất cả' || item.sub === subTab;
        const matchPriority =
            priority === 'Tất cả' || item.priority === priority;
        const matchQuery = query === '' || item.id.includes(query);
        const matchAction = action === '' || item.type === action;

        return (
            matchMain && matchSub && matchPriority && matchQuery && matchAction
        );
    });

    return (
        <div className="border rounded overflow-hidden mt-4">
            <div className="grid grid-cols-8 bg-gray-100 p-2 text-sm font-semibold">
                <div>Sản phẩm</div>
                <div>Số tiền</div>
                <div>Lý do</div>
                <div>Phương án cho Người mua</div>
                <div>Trạng thái xử lý khiếu nại</div>
                <div>Vận chuyển chiều giao hàng</div>
                <div>Vận chuyển hàng hoàn</div>
                <div>Thao tác</div>
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                    <svg
                        className="mx-auto mb-2 w-10 h-10 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m2 0a2 2 0 100-4h-2a2 2 0 00-2-2H9a2 2 0 000 4h2a2 2 0 012 2z"
                        />
                    </svg>
                    0 Yêu cầu
                </div>
            ) : (
                filtered.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-8 p-2 text-sm border-t hover:bg-gray-50"
                    >
                        <div>{item.product}</div>
                        <div>₫300.000</div>
                        <div>Không vừa</div>
                        <div>Trả hàng hoàn tiền</div>
                        <div>{item.status}</div>
                        <div>Ninja Van</div>
                        <div>Ninja Van</div>
                        <div>
                            <button className="text-blue-500 hover:underline text-sm">
                                Xem
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
