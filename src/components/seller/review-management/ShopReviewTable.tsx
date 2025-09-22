import { Card } from '../common/Card';
import ShopReviewFilters from './ShopReviewFilters';

export default function ShopReviewTable() {
    return (
        <Card className="space-y-4">
            <div className="text-base font-semibold text-gray-800">
                Danh sách đánh giá shop
            </div>
            <ShopReviewFilters />
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 border-t pt-4">
                    <thead className="text-black">
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 font-medium">
                                Thông tin sản phẩm
                            </th>
                            <th className="px-4 py-2 font-medium">
                                Đánh giá của người mua
                            </th>
                            <th className="px-4 py-2 font-medium">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                colSpan={3}
                                className="text-center text-gray-500 py-6 border-b"
                            >
                                Không có dữ liệu đánh giá.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
