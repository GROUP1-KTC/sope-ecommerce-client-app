'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useGetProductByShopIdQuery } from '~/features/products/productApi';
import type { ProductResponse } from '~/types/products';
import Link from 'next/link';

const AllProductsByShop = () => {
    const params = useParams();
    const shopId = params?.shopId as string;

    const {
        data: products = [],
        isLoading,
        isError,
    } = useGetProductByShopIdQuery(shopId);

    console.log('check', products);

    if (isLoading) return <div className="p-6">Đang tải sản phẩm...</div>;
    if (isError)
        return <div className="p-6 text-red-600">Lỗi khi tải sản phẩm.</div>;

    return (
        <div className="p-6 bg-white rounded shadow">
            <div className="text-lg font-semibold mb-6 flex items-center justify-between gap-2">
                <div>Products</div>
                <div className="flex gap-2 items-center">
                    <option className="border-2 p-2 border-grey-400 rounded-xl">
                        Set up for product
                    </option>
                    <option className="border-2 p-2 border-grey-400 rounded-xl">
                        Processing tool
                    </option>
                    <button className="bg-orange-500 text-white p-2 rounded font-semibold hover:bg-orange-600 transition">
                        + Add product
                    </button>
                </div>
            </div>

            {/* Banner */}
            <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded p-4 mb-6">
                <div className="text-orange-600 font-medium">
                    Tham gia ngay Đấu Giá Rẻ Vô Địch để gia tăng{' '}
                    <span className="font-bold">
                        Lượt Truy Cập Miễn Phí & Nhãn Rẻ Vô Địch
                    </span>
                </div>
                <button className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-100 transition">
                    Đấu giá ngay
                </button>
            </div>

            {/* Search & Filter (bạn có thể tối ưu sau) */}
            <div className="flex flex-wrap gap-4 items-center mb-4">
                <input
                    className="border rounded px-3 py-2 w-64"
                    placeholder="Tìm theo tên sản phẩm"
                />
                <input
                    className="border rounded px-3 py-2 w-64"
                    placeholder="Tìm theo danh mục"
                />
                <select className="border rounded px-3 py-2 w-48 text-gray-500">
                    <option>Loại Sản phẩm</option>
                </select>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                    Áp dụng
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition">
                    Đặt lại
                </button>
            </div>

            <div className="mb-4 text-gray-700">
                <span className="font-semibold">
                    {products.length} Sản Phẩm
                </span>
                <span className="ml-2 text-sm">Hạn mức đăng bán: 5000</span>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="border rounded overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 text-sm">
                            <th className="p-3 border-b text-left w-10">
                                <input type="checkbox" />
                            </th>
                            <th className="p-3 border-b text-left">
                                Tên sản phẩm
                            </th>
                            <th className="p-3 border-b text-center">
                                Doanh số
                            </th>
                            <th className="p-3 border-b text-center">Giá</th>
                            <th className="p-3 border-b text-center">
                                Kho hàng
                            </th>
                            <th className="p-3 border-b text-center">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: ProductResponse) => {
                            const variantCount = product.variants?.length ?? 0;
                            return (
                                <tr
                                    key={product.productId}
                                    className="hover:bg-orange-50 border-b"
                                >
                                    <td className="p-3 align-top">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-3 align-top flex gap-3">
                                        <Image
                                            src={
                                                product.defaultImage ||
                                                '/assets/images/default.jpg'
                                            }
                                            width={90}
                                            height={90}
                                            alt={product.name}
                                            className="object-cover rounded border"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900 flex items-center gap-1">
                                                {product.name}
                                                {/* {variantCount > 0 && (
                                                    <span className="text-xs text-orange-500 border border-orange-300 px-1 rounded-full">
                                                        {variantCount} biến thể
                                                    </span>
                                                )}

                                                <span
                                                    className="text-xs text-orange-500 border border-orange-300 px-1 rounded-full cursor-pointer"
                                                    title={product.variants?.map(v => {
                                                        const attrText = v.attributes.map(a => `${a.name}: ${a.value}`).join(', ');
                                                        return `${attrText} - ₫${v.price.toLocaleString('vi-VN')}`;
                                                    }).join('\n')}
                                                >
                                                    {product.variants?.length} biến thể
                                                </span> */}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                ID: {product.productId}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3 align-top text-center">
                                        {/* {product.variants && product.variants.length > 0
                                            ? product.variants.reduce((total, v) => total + (v.sold ?? 0), 0)
                                            : product.sold ?? 0} */}
                                    </td>
                                    <td className="p-3 align-top text-center">
                                        {product.variants &&
                                        product.variants.length > 0 ? (
                                            <>
                                                ₫
                                                {Math.min(
                                                    ...product.variants.map(
                                                        (v) => v.price,
                                                    ),
                                                ).toLocaleString('vi-VN')}{' '}
                                                - ₫
                                                {Math.max(
                                                    ...product.variants.map(
                                                        (v) => v.price,
                                                    ),
                                                ).toLocaleString('vi-VN')}
                                            </>
                                        ) : (
                                            <>
                                                ₫
                                                {product.defaultPrice?.toLocaleString(
                                                    'vi-VN',
                                                )}
                                            </>
                                        )}
                                    </td>
                                    <td className="p-3 align-top text-center">
                                        {product.variants &&
                                        product.variants.length > 0
                                            ? product.variants.reduce(
                                                  (total, v) =>
                                                      total + (v.stock ?? 0),
                                                  0,
                                              )
                                            : (product.stock ?? 0)}
                                    </td>
                                    <td className="p-3 align-top text-center">
                                        <div className="flex flex-col gap-1 items-center">
                                            <Link
                                                href={`/seller/edit-product/${product.slug}`}
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Cập nhật
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Quảng cáo
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-blue-600 hover:underline text-sm"
                                            >
                                                Xem thêm
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProductsByShop;
