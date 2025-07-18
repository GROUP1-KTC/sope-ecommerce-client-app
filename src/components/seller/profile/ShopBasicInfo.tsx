import { Card } from "../common/Card";

export default function ShopBasicInfo() {
  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Thông tin cơ bản
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100">
            Xem Shop của tôi
          </button>
          <button className="px-4 py-2 border border-blue-600 text-white bg-blue-600 rounded hover:bg-blue-700">
            Chỉnh sửa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <span className="text-gray-600">Tên Shop</span>
        <span className="col-span-2">SopeAAA</span>

        <span className="text-gray-600">Logo của Shop</span>
        <div className="col-span-2 flex items-center gap-4">
          <img
            src="/logoSope.png"
            alt="Shop Logo"
            className="w-24 h-24 rounded-full object-cover"
          />
          <ul className="text-sm text-gray-500 list-disc ml-4">
            <li>Kích thước: 300x300px</li>
            <li>Dung lượng: tối đa 2MB</li>
            <li>Định dạng: JPG, PNG</li>
          </ul>
        </div>

        <span className="text-gray-600">Mô tả Shop</span>
        <span className="col-span-2 text-gray-800">Chưa cập nhật</span>
      </div>
    </Card>
  );
}
