export default function TablePay() {
    return (
        <div className="overflow-x-auto border rounded text-sm">
            <table className="min-w-full">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="px-4 py-2">Đơn hàng</th>
                        <th className="px-4 py-2">Thanh toán đã chuyển vào</th>
                        <th className="px-4 py-2">Trạng thái</th>
                        <th className="px-4 py-2">Phương thức thanh toán</th>
                        <th className="px-4 py-2">Số tiền thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-center text-gray-500">
                        <td colSpan={5} className="py-6">
                            Không có dữ liệu
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
