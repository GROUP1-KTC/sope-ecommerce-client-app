export default function PayoutSummary() {
  return (
    <div className="space-y-4">
      <div className="text-lg font-semibold">Tổng Quan</div>
      <div className="p-3 bg-blue-100 text-sm rounded text-red-700 border border-red-300">
        Các số dưới đây chưa bao gồm điều chỉnh. Vui lòng tải xuống Báo cáo thu
        nhập để kiểm tra chi tiết các điều chỉnh liên quan.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm font-medium">
        <div>
          <div className="text-gray-500">Chưa thanh toán</div>
          <div className="text-xl font-bold">₫0</div>
        </div>
        <div>
          <div className="text-gray-500">Tuần này</div>
          <div className="text-xl font-bold">₫0</div>
        </div>
        <div>
          <div className="text-gray-500">Tháng này</div>
          <div className="text-xl font-bold">₫0</div>
        </div>
        <div>
          <div className="text-gray-500">Tổng cộng</div>
          <div className="text-xl font-bold">₫0</div>
        </div>
      </div>

      <div className="text-right text-sm text-red-600 underline cursor-pointer">
        Số dư TK Shopee
      </div>
    </div>
  );
}
