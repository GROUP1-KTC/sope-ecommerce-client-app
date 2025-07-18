"use client";

import { DateFilter } from "../common/DateFilter";



export default function FilterBar({}) {
  return (
    <div className="flex gap-2 my-4 bg-white rounded shadow-md p-6">
      <div className="flex items-center gap-2">
        <DateFilter />
      </div>

      <div className="ml-auto flex gap-2">
        <label className="flex items-center gap-2">
          Loại đơn hàng:
          <select className="border rounded px-2 py-1">
            <option value="">Đơn hàng đã đặt</option>
            <option value="">Đơn hàng đã thanh toán </option>
          </select>
        </label>
      </div>
    </div>
  );
}
