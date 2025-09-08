import React, { useMemo } from 'react';
import { ProductDetail } from '~/types/products';
import { X } from "lucide-react";

interface DetailInfoProps {
    productDetails: ProductDetail[];
    onChange: (index: number, field: keyof ProductDetail, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
}

const DetailInfo: React.FC<DetailInfoProps> = ({
    productDetails,
    onChange,
    onAdd,
    onRemove,
}) => {
    const done = useMemo(
        () => productDetails.filter((d) => (d.data ?? '').trim().length > 0).length,
        [productDetails]
    );

    return (
        <div className="bg-white rounded shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">Thông tin chi tiết</h2>
            <div className="text-xs text-gray-500 mb-4">
                Hoàn thành:{' '}
                <span className="text-red-500 font-semibold">
                    {done} / {productDetails.length}
                </span>{' '}
                Điền thông tin thuộc tính để tăng mức độ hiển thị cho sản phẩm
            </div>

            <div className="grid grid-cols-2 gap-6">
                {productDetails.map((detail, index) => (
                    <div
                        key={detail.productDetailId ?? index}
                        className="col-span-2 flex items-center gap-2"
                    >
                        {/* Label input */}
                        <input
                            type="text"
                            value={detail.label}
                            onChange={(e) => onChange(index, 'label', e.target.value)}
                            placeholder="Tên thuộc tính (vd: Thương hiệu)"
                            className="w-1/3 border rounded px-3 py-2"
                        />

                        {/* Data input */}
                        <input
                            type="text"
                            value={detail.data}
                            onChange={(e) => onChange(index, 'data', e.target.value)}
                            placeholder="Giá trị (vd: Nike)"
                            className="w-1/2 border rounded px-3 py-2"
                        />

                        {/* Xóa */}
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Xóa thuộc tính"
                            title="Xóa"
                            tabIndex={-1}
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {productDetails.length === 0 && (
                <p className="text-sm text-gray-400 col-span-2">
                    Chưa có thuộc tính nào, bấm "Thêm thuộc tính" để bắt đầu.
                </p>
            )}

            {/* Add button */}
            <div className="mt-4 flex items-center gap-3">
                <button
                    type="button"
                    onClick={onAdd}
                    disabled={productDetails.length >= 10}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
                >
                    + Thêm thuộc tính
                </button>
                <span className="text-xs text-gray-500">
                    Tối đa 10 thuộc tính.
                </span>
            </div>
        </div>
    );
};

export default DetailInfo;
