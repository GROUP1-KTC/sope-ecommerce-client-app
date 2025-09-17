import React from 'react';

const SelectFilter = () => {
    return (
        <div className=" max-w-sm mx-auto">
            <div className="mt-8 text-4xs text-gray-500 font-semibold uppercase tracking-wider">
                Bộ lọc tìm kiếm
            </div>

            <div className="mt-4 space-y-6 text-sm">
                {/* Thương Hiệu */}
                <div>
                    <div className="font-semibold mb-2">Thương Hiệu</div>
                    <div className="space-y-1">
                        {['AVOCADO', 'COOLMATE', 'PH', 'JBAGY'].map((brand) => (
                            <label
                                key={brand}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    className="accent-orange-500"
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <hr />

                {/* Khoảng Giá */}
                <div>
                    <div className="font-semibold mb-2">Khoảng Giá</div>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="number"
                            placeholder="₫ TỪ"
                            className="border rounded px-2 py-1 w-24 text-xs"
                        />
                        <span>–</span>
                        <input
                            type="number"
                            placeholder="₫ ĐẾN"
                            className="border rounded px-2 py-1 w-24 text-xs"
                        />
                    </div>
                    <button className="w-full bg-[#E44358] text-white rounded py-2 font-semibold cursor-pointer hover:bg-[#d0001a] transition-colors duration-200">
                        ÁP DỤNG
                    </button>
                </div>

                <hr />

                {/* Loại Shop */}
                <div>
                    <div className="font-semibold mb-2">Loại Shop</div>
                    {[
                        'Shopee Mall',
                        'Shop Yêu thích',
                        'Xử lý đơn hàng bởi Shopee',
                    ].map((type) => (
                        <label key={type} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="accent-orange-500"
                            />
                            <span>{type}</span>
                        </label>
                    ))}
                </div>

                <hr />

                {/* Tình Trạng */}
                <div>
                    <div className="font-semibold mb-2">Tình Trạng</div>
                    {['Đã sử dụng', 'Mới'].map((status) => (
                        <label key={status} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="accent-orange-500"
                            />
                            <span>{status}</span>
                        </label>
                    ))}
                </div>

                <hr />

                {/* Đánh Giá */}
                <div>
                    <div className="font-semibold mb-2">Đánh Giá</div>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <label
                            key={star}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <span className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={
                                            i < star
                                                ? 'text-orange-400'
                                                : 'text-gray-300'
                                        }
                                    >
                                        ★
                                    </span>
                                ))}
                            </span>
                            <span className="text-xs text-gray-700">
                                trở lên
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectFilter;
