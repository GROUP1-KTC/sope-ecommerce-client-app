import { Card } from "../common/Card";
import SensitiveValue from "../common/SensitiveValue";
import { Lock } from "lucide-react";

export default function ShopIdentityInfo() {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Thông tin định danh
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100">
            Chỉnh sửa thông tin
          </button>
          <button className="px-4 py-2 border border-red-600 text-white bg-red-600 rounded hover:bg-red-700">
            Lịch sử chỉnh sửa
          </button>
        </div>
      </div>

      <div className="p-4 bg-blue-50 text-sm text-red-800 border border-blue-200 rounded">
        Thông tin định danh chỉ được cập nhật một lần trong tháng.
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <label className="w-1/3 text-gray-600">Quốc tịch</label>
          <div className="w-2/3 text-gray-800">Việt Nam</div>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-600">Hình thức định danh</label>
          <div className="w-2/3 text-gray-800">Căn Cước Công Dân (CCCD)</div>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-600">Số CCCD</label>
          <div className="w-2/3">
            <SensitiveValue value="123456789012" />
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-1/3 text-gray-600">Họ & Tên</label>
          <div className="w-2/3">
            <SensitiveValue value="Nguyễn Văn A" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <div className="flex items-start w-full sm:w-[48%]">
          <label className="w-1/3 text-gray-600">CMND/CCCD/Hộ chiếu</label>
          <div className="w-2/3">
            <SensitiveValue
              hiddenMask={
                <div className="flex gap-2">
                  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                    <Lock className="text-gray-400" />
                  </div>
                  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                    <Lock className="text-gray-400" />
                  </div>
                </div>
              }
            >
              <div className="flex gap-2">
                <img
                  src="/images/id-front.jpg"
                  alt="Mặt trước"
                  className="w-24 h-24 object-cover rounded"
                />
                <img
                  src="/images/id-back.jpg"
                  alt="Mặt sau"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            </SensitiveValue>
          </div>
        </div>

        <div className="flex items-start w-full sm:w-[48%]">
          <label className="w-1/3 text-gray-600">Sinh trắc học khuôn mặt</label>
          <div className="w-2/3">
            <SensitiveValue
              hiddenMask={
                <div className="flex gap-2">
                  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                    <Lock className="text-gray-400" />
                  </div>
                  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded">
                    <Lock className="text-gray-400" />
                  </div>
                </div>
              }
            >
              <div className="flex gap-2">
                <img
                  src="/images/face-scan-1.jpg"
                  alt="Face 1"
                  className="w-24 h-24 object-cover rounded"
                />
                <img
                  src="/images/face-scan-2.jpg"
                  alt="Face 2"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            </SensitiveValue>
          </div>
        </div>
      </div>
    </Card>
  );
}
