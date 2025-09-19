import { CheckCircle, Circle } from 'lucide-react';
import type { ProductFormDataWithMedia } from './RightSideBar';

interface LeftSideBarProps {
    productData: ProductFormDataWithMedia;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ productData }) => {
    const checks = [
        {
            label: 'Thêm ít nhất 3 hình ảnh',
            valid: productData?.imagesList?.length >= 3,
        },
        {
            label: 'Thêm video sản phẩm',
            valid: !!productData?.defaultVideoIntro,
        },
        {
            label: 'Tên sản phẩm có ít nhất 20-100 kí tự',
            valid:
                (productData?.name?.length ?? 0) >= 20 &&
                (productData?.name?.length ?? 0) <= 100,
        },
        {
            label: 'Thêm ít nhất 150 kí tự hoặc 1 hình ảnh trong mô tả sản phẩm',
            valid:
                (productData?.description?.length ?? 0) >= 150 ||
                /<img/i.test(productData?.description ?? ''),
        },
        {
            label: 'Thêm thương hiệu',
            valid: !!productData?.brand,
        },
        {
            label: 'Thêm ít nhất 2 thông tin chi tiết',
            valid: (productData?.productDetails?.length ?? 0) >= 2,
        },
    ];

    return (
        <aside className="fixed top-20 left-0 w-1/5 h-screen p-4 overflow-y-auto z-20">
            {/* Khung gợi ý */}
            <div className=" rounded-lg shadow-sm bg-white">
                {/* Header */}
                <div className="bg-blue-50 px-4 py-2 rounded-t-lg">
                    <h2 className="text-sm font-semibold text-gray-700">
                        Gợi ý điền Thông tin
                    </h2>
                </div>

                {/* Checklist */}
                <ul className="text-sm space-y-2 p-4">
                    {checks.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2">
                            {item.valid ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                                <Circle className="w-4 h-4 text-gray-300" />
                            )}
                            <span
                                className={
                                    item.valid
                                        ? 'text-green-600'
                                        : 'text-gray-600'
                                }
                            >
                                {item.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Ngành hàng note */}
            <div className="mt-6 text-xs text-gray-500">
                <b>Ngành hàng</b>
                <br />
                Việc đăng tải sản phẩm đúng ngành hàng giúp Người mua dễ dàng
                tìm thấy sản phẩm của Shop...
            </div>
        </aside>
    );
};

export default LeftSideBar;
