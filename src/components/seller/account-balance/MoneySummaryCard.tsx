"use client";

import { Card } from "../common/Card";

export default function MoneySummaryCard() {
  return (
    <Card className="flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <div className="text-gray-500 text-sm">Số dư</div>
          <div className="text-xl font-semibold text-black">₫0</div>
        </div>
        <div className="text-xs text-gray-400">Tự động rút tiền: Tắt</div>
        <button className="bg-red-100 text-blue-600 rounded px-4 py-2 text-sm w-fit">
          Yêu Cầu Thanh Toán
        </button>
      </div>

      <div className="text-sm text-gray-700">
        <div className="font-semibold text-start">Tài khoản ngân hàng</div>
        <div className="flex justify-start">
          <button className="text-blue-600 hover:underline text-sm mr-4">
            Hủy Liên Kết Tài Khoản Ngân Hàng
          </button>
          <button className="text-blue-600 hover:underline text-sm">
            Thêm Tài khoản Ngân hàng
          </button>
        </div>
      </div>
    </Card>
  );
}
