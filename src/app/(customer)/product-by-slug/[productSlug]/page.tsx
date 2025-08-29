'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useGetProductBySlugQuery } from '~/features/products/productApiSlice';

const ProductBySlug = () => {
    const params = useParams();
    const slug = params?.productSlug as string;

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductBySlugQuery(slug);

    // Khởi tạo map thuộc tính ngay cả khi chưa có product
    const attributeMap = useMemo(() => {
        const map = new Map<string, Set<string>>();
        if (product?.variants) {
            product.variants.forEach((variant) => {
                variant.attributes.forEach((attr) => {
                    if (!map.has(attr.name)) {
                        map.set(attr.name, new Set());
                    }
                    map.get(attr.name)?.add(attr.value);
                });
            });
        }
        return map;
    }, [product]);

    const [selectedAttributes, setSelectedAttributes] = useState<
        Record<string, string>
    >({});

    // Cập nhật selectedAttributes khi product được load lần đầu
    useMemo(() => {
        if (
            product &&
            attributeMap.size > 0 &&
            Object.keys(selectedAttributes).length === 0
        ) {
            const initial: Record<string, string> = {};
            attributeMap.forEach((values, key) => {
                const first = Array.from(values)[0];
                if (first) initial[key] = first;
            });
            setSelectedAttributes(initial);
        }
    }, [product, attributeMap, selectedAttributes]);

    const handleAttributeSelect = (name: string, value: string) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const selectedVariant = useMemo(() => {
        return product?.variants?.find((variant) =>
            variant.attributes.every(
                (attr) => selectedAttributes[attr.name] === attr.value,
            ),
        );
    }, [product, selectedAttributes]);

    const image =
        selectedVariant?.images?.[0]?.url || product?.defaultImage || '';
    const price = selectedVariant?.price || product?.defaultPrice || 0;
    const stock = selectedVariant?.stock ?? 0;

    // Sau khi đã setup hooks ổn định, giờ mới return điều kiện
    if (isLoading) return <p>Đang tải sản phẩm...</p>;
    if (isError) return <p>Lỗi khi tải sản phẩm.</p>;
    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <div className="bg-gray-400">
            <div className="max-w-6xl mx-auto">
                {/* PRODUCT LINK */}
                <div className="flex py-3">RRODUCT LINK --- {product.name}</div>

                {/* MAIN PRODUCT */}
                <div className="bg-white border-red-600 border-4 p-4 flex mx-auto gap-6">
                    {/* LEFT IMAGE */}
                    <div className="w-[40%] border border-red-300 relative aspect-[4/5]">
                        <Image
                            src={image}
                            alt={product.name}
                            fill
                            className="object-contain rounded"
                            sizes="(max-width: 1000px) 100vw, 40vw"
                        />

                        {/* IMAGE VARIANTS */}
                        {/* <div className="flex mt-2 justify-center gap-2">
                                        {selectedVariant?.images?.map((img, index) => (
                                            <div key={index} className="w-12 h-12 border rounded overflow-hidden">
                                                    <Image
                                                        src={img.url}
                                                        alt={`Variant ${index}`}
                                                        width={48}
                                                        height={48}
                                                        className="object-cover"
                                                    />
                                            </div>
                                        ))}
                                </div> */}
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="w-[60%]">
                        <h1 className="text-2xl font-bold mb-2">
                            {product.name}
                        </h1>
                        <p className="text-xl font-bold bg-gray-500 border-gray-600 border p-2 text-red-600 mt-4">
                            Giá: {price.toLocaleString('vi-VN')}₫
                        </p>

                        {Array.from(attributeMap.entries()).map(
                            ([name, values]) => (
                                <div key={name} className="mb-4">
                                    <h2 className="font-semibold mb-1">
                                        Chọn {name}:
                                    </h2>
                                    <div className="flex gap-2 flex-wrap">
                                        {Array.from(values).map((value) => (
                                            <button
                                                key={value}
                                                onClick={() =>
                                                    handleAttributeSelect(
                                                        name,
                                                        value,
                                                    )
                                                }
                                                className={`px-3 py-1 rounded border ${
                                                    selectedAttributes[name] ===
                                                    value
                                                        ? 'bg-black text-white'
                                                        : 'bg-white text-black'
                                                }`}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ),
                        )}

                        <p className="text-gray-600 mt-1">
                            Kho: {stock} sản phẩm
                        </p>

                        <div className="mt-6 flex gap-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                Thêm vào giỏ hàng
                            </button>
                            <button className="border px-4 py-2 rounded hover:bg-gray-100">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>

                {/* SHOP  */}
                <div className="flex border-gray-600 border my-2 mx-auto py-3">
                    {/* img */}
                    <div className="flex mt-2 justify-center mx-10">
                        <div>
                            <Image
                                src={
                                    'https://down-vn.img.susercontent.com/file/vn-11134216-7r98o-lnz923j6isj12e@resize_w160_nl.webp'
                                }
                                alt={`Shop`}
                                width={100}
                                height={100}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <p> SHOP --- {product.shop.name}</p>
                        <div className="flex">
                            <button>Chat Ngay</button>
                            <p>Xem shop</p>
                        </div>
                    </div>
                </div>

                {/* DETAIL */}
                <div>
                    <h1>CHI TIET SAN PHAM</h1>
                </div>

                {/* DESCRIPTION  */}

                {/* REVIEW & COMMENT*/}
            </div>
        </div>
    );
};

export default ProductBySlug;
