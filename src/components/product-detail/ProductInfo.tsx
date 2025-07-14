'use client';

import { useState } from 'react';

interface ProductInfoProps {
    product: {
        id: number;
        name: string;
        price: number;
        image: string;
        rating: number;
        sold: string;
    };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [showPolicyModal, setShowPolicyModal] = useState(false);

    return (
        <div className="bg-white shadow rounded p-4 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[450px]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[450px] object-contain rounded"
                />
                <div className="flex overflow-x-auto gap-2 mt-4 pb-2">
                    <img
                        src={product.image}
                        alt={`${product.name} - View 1`}
                        className="w-20 h-20 object-cover rounded border-3 border-red-500"
                    />
                    <img
                        src={product.image}
                        alt={`${product.name} - View 2`}
                        className="w-20 h-20 object-cover rounded border-2 border-gray-300"
                    />
                    <img
                        src={product.image}
                        alt={`${product.name} - View 3`}
                        className="w-20 h-20 object-cover rounded border-2 border-gray-300"
                    />
                    <img
                        src={product.image}
                        alt={`${product.name} - View 4`}
                        className="w-20 h-20 object-cover rounded border-2 border-gray-300"
                    />
                </div>
                <div className="flex justify-center items-center mt-4 space-x-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-red-700 hover:bg-red-50 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                        <span>Chia sẻ</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-red-700 hover:bg-red-50 transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span>Yêu thích</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{product.name}</h2>
                <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                    <span>⭐ {product.rating}</span>
                    <span>|</span>
                    <span>700 Đánh giá</span>
                    <span>|</span>
                    <span>
                        <span className="text-gray-700 font-semibold">{product.sold}</span>
                        <span className="ml-1 text-gray-500">Đã bán</span>
                    </span>
                    <span className="ml-auto">Tố cáo</span>
                </div>
                <div
                    className="relative flex items-center gap-4 mb-4 bg-red-50 px-6 py-3 rounded"
                    onMouseEnter={() => setShowVoucherModal(true)}
                    onMouseLeave={() => setShowVoucherModal(false)}
                >
                    <span className="text-red-500 font-medium text-3xl">
                        ₫{product.price.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-yellow-500 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                            />
                        </svg>
                    </span>
                    <span className="text-gray-400 text-lg line-through">
                        ₫{(product.price * 1.2).toLocaleString('vi-VN')}
                    </span>
                    {showVoucherModal && (
                        <div className="absolute left-0 top-full mt-2 w-112 bg-white border border-gray-400 rounded shadow-lg p-4 z-10">
                            <div className="text-sm">
                                <p className="text-gray-800 font-medium mb-2">Chi tiết giá</p>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Giá gốc:</span>
                                    <span className="text-red-600">₫{product.price.toLocaleString('vi-VN')}</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-gray-700">Giảm giá sản phẩm:</span>
                                    <span className="text-red-600">-₫95,000</span>
                                </div>
                                <hr className="border-t border-gray-200 my-2" />

                                <div className="flex justify-between mt-1">
                                    <span className="text-gray-700">Voucher Shopee:</span>
                                    <span className="text-red-600">-₫44,550</span>
                                </div>
                                <div className="text-gray-500 text-xs mt-1">
                                    Mua từ ₫100,000 giảm giá 15%. Sử dụng Voucher có hạn.
                                </div>
                                <hr className="border-t border-gray-200 my-2" />

                                <div className="flex justify-between mt-1">

                                    <span className="text-gray-700">Voucher cửa Shop:</span>
                                    <span className="text-red-600">-₫8,000</span>
                                </div>
                                <div className="text-gray-500 text-xs mt-1">
                                    Mua từ ₫0 giảm giá 50%. Sử dụng Voucher có hạn.
                                </div>
                                <hr className="border-t border-gray-200 my-2" />

                                <div className="flex justify-between mt-3">
                                    <span className="text-gray-900 font-bold">Giá tạm tính:</span>
                                    <span className="text-red-600 font-bold">₫252,450</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 italic">
                                    *Vui lòng kiểm tra Voucher đã dùng hoặc nhận toast để đổi giá ưu đãi
                                </p>
                            </div>

                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-start mt-2">
                        <span className="w-32 font-semibold">Voucher của shop</span>
                        <div className="flex-1">
                            <span className="bg-red-200 text-red-700 font-medium px-2 py-1 rounded-xs shadow-md break-words mr-3">
                                Giảm 3%
                            </span>

                            <span className="bg-red-200 text-red-700 font-medium px-2 py-1 rounded-xs shadow-md break-words">
                                Giảm 6%
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start mt-4">
                        <span className="w-32 font-semibold">Combo Khuyến Mãi</span>
                        <div className="flex-1">
                            <span className="text-red-700 font-medium px-2 py-1 rounded-xs shadow-md break-words mr-3 border border-red-500">
                                Mua 3 & giảm ₫10.000
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start mt-4">
                        <span className="w-32 font-semibold">Vận chuyển</span>
                        <div className="flex-1 flex flex-col gap-1 break-words">
                            <span className='text-black'>Nhận hàng 12 Th07 - 17 Th07</span>
                            <span className='text-black'>Phí ship: ₫15,000 (miễn phí với đơn từ ₫50,000)</span>
                            <span className="text-grey-500">
                                Tặng voucher ₫10,000 nếu giao sau 17 Th07
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center relative">
                        <span className="w-32 font-semibold">An tâm mua sắm cùng Sope</span>
                        <span className="flex-1 break-words text-black">
                            Trả hàng miễn phí 15 ngày · Chính hãng 100% · Miễn phí vận chuyển
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-blue-500 ml-2 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onMouseEnter={() => setShowPolicyModal(true)}
                                onMouseLeave={() => setShowPolicyModal(false)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                        {showPolicyModal && (
                            <div className="absolute left-0 top-full mt-2 w-112 bg-white border border-gray-400 rounded shadow-lg p-4 z-10">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Chính sách mua sắm</h3>
                                <p className="text-gray-600">Trả hàng miễn phí trong vòng 15 ngày nếu sản phẩm không đúng mô tả.</p>
                                <p className="text-gray-600 mt-2">Cam kết 100% hàng chính hãng, có hóa đơn rõ ràng.</p>
                                <p className="text-gray-600 mt-2">Miễn phí vận chuyển cho đơn hàng từ 50,000 VNĐ.</p>

                            </div>
                        )}
                    </div>
                    <div className="flex items-center mt-4">
                        <span className="w-32 font-semibold">Chọn Size</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 text-sm font-medium">
                                S
                            </button>
                            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 text-sm font-medium">
                                M
                            </button>
                            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 text-sm font-medium">
                                L
                            </button>
                            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 active:bg-gray-400 text-sm font-medium">
                                XL
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center mt-4 mb-2">
                        <span className="w-32 font-semibold">Số lượng</span>
                        <div className="flex items-center gap-3 flex-1">
                            <button
                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 transition-colors text-lg font-semibold"
                                type="button"
                                aria-label="Giảm số lượng"
                                onClick={() => {
                                    // handle decrease quantity
                                }}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min={1}
                                defaultValue={1}
                                className="w-16 h-10 text-center border border-gray-300 rounded-none outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 transition-colors text-lg font-semibold"
                                type="button"
                                aria-label="Tăng số lượng"
                                onClick={() => {
                                    // handle increase quantity
                                }}
                            >
                                +
                            </button>
                            <span className="text-gray-600">Còn hàng</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"> <i></i> Thêm vào giỏ hàng</button>
                    <button className="bg-red-600 text-white px-6 rounded hover:bg-red-700">
                        <span>
                            <p>Mua với Voucher</p>
                            <p>đ{product.price}</p>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;