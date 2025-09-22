import { Card } from '../common/Card';
import SensitiveValue from '../common/SensitiveValue';

export default function ShopTaxInfo() {
    return (
        <Card className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Thông tin thuế
                </h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-red-600 text-sm text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer">
                        Chỉnh sửa thông tin
                    </button>
                </div>
            </div>
            <div className="p-4 bg-blue-50 text-sm text-red-800 border border-blue-200 rounded">
                Người bán chỉ được cập nhật thông tin một lần trong tháng và
                phải đảm bảo thông tin chính xác để tránh các vấn đề liên quan
                đến thuế và hóa đơn điện tử.
            </div>

            <div className="space-y-3">
                <div className="flex items-center">
                    <label className="w-1/3 text-gray-600">
                        Loại hình kinh doanh
                    </label>
                    <div className="w-2/3 text-gray-800">Cá nhân</div>
                </div>

                <div className="flex items-center">
                    <label className="w-1/3 text-gray-600">
                        Địa chỉ đăng ký kinh doanh
                    </label>
                    <div className="w-2/3">
                        <SensitiveValue value="Bình thạnh, Thành phố Hồ Chí Minh" />
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="w-1/3 text-gray-600">
                        Email nhận hóa đơn điện tử
                    </label>
                    <div className="w-2/3 text-gray-800">
                        nguyenvuhai60@gmail.com
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="w-1/3 text-gray-600">Mã số thuế</label>
                    <div className="w-2/3">
                        <SensitiveValue value="1234567890" />
                    </div>
                </div>
            </div>
        </Card>
    );
}
