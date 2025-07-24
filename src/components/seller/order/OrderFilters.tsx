'use client';

export default function OrderFilters() {
    return (
        <div className="flex flex-col md:flex-row flex-wrap gap-3 items-start md:items-center mb-4">
            <div className="flex gap-2">
                <select className="border rounded px-2 py-1 text-sm">
                    <option>Mã đơn hàng</option>
                </select>
                <input
                    type="text"
                    placeholder="Nhập Mã đơn hàng"
                    className="border rounded px-2 py-1 text-sm w-48"
                />
            </div>

            <div className="flex gap-2">
                <select className="border rounded px-2 py-1 text-sm">
                    <option>Đơn vị vận chuyển</option>
                </select>
                <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm">
                    Áp dụng
                </button>
                <button className="border px-4 py-1 rounded text-sm">
                    Đặt lại
                </button>
            </div>

            <div className="flex gap-2 md:ml-auto">
                <button className="border px-4 py-1 rounded text-sm">
                    Xuất
                </button>
                <button className="border px-4 py-1 rounded text-sm">
                    Lịch sử Xuất Báo cáo
                </button>
            </div>
        </div>
    );
}
