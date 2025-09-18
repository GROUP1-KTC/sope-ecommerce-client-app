import React, { useState } from 'react';
import Image from 'next/image';
import type { ProductResponse } from '~/types/products';
import { Pencil, ChevronDown, ChevronUp } from 'lucide-react';
import EditModal from './EditModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdateProductMutation } from '~/features/products/productApi';
import Ads from '../ads-flashsale/Ads';
import FlashSale from '../ads-flashsale/FlashSale';
import CustomLink from '~/components/shared/loading/CustomLink';

interface Props {
    products: ProductResponse[];
    viewMode: 'list' | 'grid';
}

export default function ProductTable({ products, viewMode }: Props) {
    const [updateProduct] = useUpdateProductMutation();

    const [editModal, setEditModal] = useState<{
        type: 'price' | 'stock' | null;
        product: ProductResponse | null;
    }>({ type: null, product: null });

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const [openFlashSaleId, setOpenFlashSaleId] = useState<string | null>(null);

    const openEditModal = (
        product: ProductResponse,
        type: 'price' | 'stock',
    ) => {
        setEditModal({ product, type });
    };

    const closeEditModal = () => {
        setEditModal({ type: null, product: null });
    };

    const [adsModal, setAdsModal] = useState<{
        open: boolean;
        productId: string | null;
    }>({ open: false, productId: null });

    const openAdsModal = (productId: string) => {
        setAdsModal({ open: true, productId });
    };

    const closeAdsModal = () => {
        setAdsModal({ open: false, productId: null });
    };

    const [sortBy, setSortBy] = useState<'price' | 'stock' | 'sold' | null>(
        null,
    );
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (key: 'price' | 'stock' | 'sold') => {
        if (sortBy === key) {
            // Nếu bấm lại cùng nút thì đổi chiều
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            // Nếu bấm nút khác thì set asc mặc định
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    const handleUpdate = async (slug: string, updates: any) => {
        try {
            const formData = new FormData();

            formData.append('product', JSON.stringify(updates));
            formData.forEach((v, k) => console.log('➡️', k, v));

            for (const [key, value] of formData.entries()) {
                if (value instanceof Blob) {
                    const text = await value.text();
                    console.log('➡️', key, text);
                } else {
                    console.log('➡️', key, value);
                }
            }

            const res = await updateProduct({ slug, data: formData }).unwrap();
            console.log('✅ Update thành công:', res);
            closeEditModal();
        } catch (err) {
            console.error('❌ Update thất bại', err);
        } finally {
            closeEditModal();
        }
    };

    // const sortedProducts = [...products].sort((a, b) => {
    //     const getValue = (
    //         p: ProductResponse,
    //         key: 'price' | 'stock' | 'sold',
    //     ) => {
    //         if (key === 'price')
    //             return Math.min(...p.variants.map((v) => v.price));
    //         if (key === 'stock')
    //             return p.variants.reduce((s, v) => s + (v.stock ?? 0), 0);
    //         if (key === 'sold')
    //             return p.variants.reduce((s, v) => s + (v.sold ?? 0), 0);
    //         return 0;
    //     };

    //     if (!sortBy) return 0;

    //     const valA = getValue(a, sortBy);
    //     const valB = getValue(b, sortBy);

    //     return sortOrder === 'asc' ? valA - valB : valB - valA;
    // });

    // --- GRID VIEW ---
    if (viewMode === 'grid') {
        return (
            <>
                <div className="flex gap-4 mb-4 p-2 text-sm  items-center">
                    <span className="px-3">Sắp xếp theo:</span>
                    {(['price', 'stock', 'sold'] as const).map((key) => (
                        <button
                            key={key}
                            onClick={() => handleSort(key)}
                            className={`flex items-center gap-1 px-3 py-1 rounded cursor-pointer
        ${sortBy === key ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
                        >
                            {key === 'price' && 'Giá'}
                            {key === 'stock' && 'Kho hàng'}
                            {key === 'sold' && 'Bán chạy'}
                            {sortBy === key &&
                                (sortOrder === 'asc' ? (
                                    <ChevronUp size={14} />
                                ) : (
                                    <ChevronDown size={14} />
                                ))}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
                    {products.map((product) => (
                        <CustomLink
                            key={product.productId}
                            href={`/seller/edit-product/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group border border-gray-400 cursor-pointer rounded-lg bg-white shadow transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-red-600"
                        >
                            <div className="relative w-full h-40 overflow-hidden">
                                <Image
                                    src={product.defaultImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-3 text-sm flex flex-col justify-between h-31">
                                <div className="line-clamp-2 font-medium min-h-[1.0rem]">
                                    {product.name}
                                </div>

                                <div>
                                    <div className="text-red-600 font-semibold mt-1">
                                        {Math.min(
                                            ...product.variants.map(
                                                (v) => v.price,
                                            ),
                                        ).toLocaleString('vi-VN')}
                                        ₫
                                        {product.variants.length > 1 && (
                                            <>
                                                {' '}
                                                -{' '}
                                                {Math.max(
                                                    ...product.variants.map(
                                                        (v) => v.price,
                                                    ),
                                                ).toLocaleString('vi-VN')}
                                                ₫
                                            </>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Kho hàng:{' '}
                                        {product.variants.reduce(
                                            (sum, v) => sum + (v.stock ?? 0),
                                            0,
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Đã bán:{' '}
                                        {product.variants.reduce(
                                            (sum, v) => sum + (v.sold ?? 0),
                                            0,
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CustomLink>
                    ))}
                </div>
            </>
        );
    }

    return (
        <>
            {editModal.product && (
                <EditModal
                    product={editModal.product}
                    type={editModal.type}
                    onClose={closeEditModal}
                    onSave={(values) => {
                        if (editModal.product) {
                            handleUpdate(editModal.product.slug, values);
                        }
                    }}
                />
            )}

            <div className="border border-gray-200 rounded-lg shadow-sm overflow-x-auto px-2">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-50 text-gray-700 text-sm">
                            <th className="p-3  text-left w-10">
                                <input type="checkbox" />
                            </th>
                            <th className="p-3  text-left">Tên sản phẩm</th>
                            <th className="p-3  text-center">Doanh số</th>
                            <th className="p-3  text-center">Giá</th>
                            <th className="p-3  text-center">Kho hàng</th>
                            <th className="p-3  text-center">
                                Chất lượng nội dung
                            </th>
                            <th className="p-3  text-center">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => {
                            const variants = product.variants || [];
                            const hasOnlyOneVariant = variants.length === 1;
                            const firstVariant = hasOnlyOneVariant
                                ? variants[0]
                                : null;
                            const isSimpleProduct =
                                hasOnlyOneVariant &&
                                (!firstVariant?.attributes ||
                                    firstVariant.attributes.length === 0);

                            const showAll = expanded[product.productId];

                            return (
                                <React.Fragment key={product.productId}>
                                    {/* Row cho product */}
                                    <tr
                                        key={product.productId}
                                        className="hover:bg-red-50 mb-4"
                                    >
                                        <td className="p-3 align-top">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="p-3 align-top flex gap-3">
                                            <Image
                                                src={product.defaultImage}
                                                width={90}
                                                height={90}
                                                alt={product.name}
                                                className="object-cover rounded "
                                            />
                                            <div>
                                                <div className="font-semibold text-gray-900 flex flex-wrap items-center gap-1">
                                                    <span>{product.name}</span>
                                                    {!isSimpleProduct &&
                                                        variants.length > 0 && (
                                                            <span className="text-xs text-red-500 border border-red-300 px-1 rounded-full">
                                                                {
                                                                    variants.length
                                                                }{' '}
                                                                biến thể
                                                            </span>
                                                        )}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    ID: {product.productId}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Doanh số */}
                                        <td className="p-3 align-top text-center">
                                            {isSimpleProduct
                                                ? (firstVariant?.sold ?? 0)
                                                : variants.reduce(
                                                      (t, v) =>
                                                          t + (v.sold ?? 0),
                                                      0,
                                                  )}
                                        </td>

                                        {/* Giá */}
                                        <td className="p-3 align-top text-center">
                                            {isSimpleProduct ? (
                                                <>
                                                    ₫
                                                    {firstVariant?.price.toLocaleString(
                                                        'vi-VN',
                                                    )}
                                                </>
                                            ) : (
                                                (() => {
                                                    const prices = variants
                                                        .map((v) => v.price)
                                                        .filter((p) => p > 0);
                                                    if (prices.length === 0)
                                                        return null;
                                                    const minPrice = Math.min(
                                                        ...prices,
                                                    );
                                                    const maxPrice = Math.max(
                                                        ...prices,
                                                    );
                                                    return (
                                                        <>
                                                            ₫
                                                            {minPrice.toLocaleString(
                                                                'vi-VN',
                                                            )}
                                                            {minPrice !==
                                                                maxPrice && (
                                                                <>
                                                                    {' '}
                                                                    - ₫
                                                                    {maxPrice.toLocaleString(
                                                                        'vi-VN',
                                                                    )}
                                                                </>
                                                            )}
                                                        </>
                                                    );
                                                })()
                                            )}
                                            <button
                                                onClick={() =>
                                                    openEditModal(
                                                        product,
                                                        'price',
                                                    )
                                                }
                                                className="cursor-pointer ml-1 text-yellow-500 hover:text-red-500"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                        </td>

                                        {/* Kho hang */}
                                        <td className="p-3 align-top text-center">
                                            {isSimpleProduct
                                                ? (firstVariant?.stock ?? 0)
                                                : variants.reduce(
                                                      (t, v) =>
                                                          t + (v.stock ?? 0),
                                                      0,
                                                  )}
                                            <button
                                                onClick={() =>
                                                    openEditModal(
                                                        product,
                                                        'stock',
                                                    )
                                                }
                                                className="cursor-pointer ml-1 text-yellow-500 hover:text-red-500"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                        </td>
                                        {/* Chất lượng nội dung */}
                                        <td className="p-3 align-top text-center">
                                            Đạt chuẩn
                                        </td>

                                        {/* Thao tác */}
                                        <td className="p-3 align-top text-center">
                                            <div className="flex flex-col gap-1 items-center">
                                                <CustomLink
                                                    href={`/seller/edit-product/${product.slug}`}
                                                    className="text-blue-600 hover:underline text-sm"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Cập nhật
                                                </CustomLink>
                                                <CustomLink
                                                    href="#"
                                                    className="text-blue-600 hover:underline text-sm"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        openAdsModal(
                                                            product.productId,
                                                        );
                                                    }}
                                                >
                                                    Quảng cáo
                                                </CustomLink>
                                                <CustomLink
                                                    href="#"
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    Xem thêm
                                                </CustomLink>
                                            </div>
                                        </td>

                                        <Ads
                                            open={adsModal.open}
                                            productId={adsModal.productId}
                                            onClose={closeAdsModal}
                                        />
                                    </tr>
                                    {/* Row cho variants */}
                                    {!isSimpleProduct && (
                                        <AnimatePresence initial={false}>
                                            {(showAll
                                                ? variants
                                                : variants.slice(0, 2)
                                            ).map((variant, idx) => (
                                                <motion.tr
                                                    key={
                                                        variant.productVariantId ||
                                                        idx
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        y: -10,
                                                        height: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        height: 'auto',
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        y: -10,
                                                        height: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: 'easeInOut',
                                                    }}
                                                    className="bg-gray-50 overflow-hidden"
                                                >
                                                    <td className="p-3 "></td>
                                                    <td className="p-3 align-top flex gap-3 pl-8 ">
                                                        {typeof variant.imageVariant ===
                                                            'string' && (
                                                            <Image
                                                                src={
                                                                    variant.imageVariant
                                                                }
                                                                width={60}
                                                                height={60}
                                                                alt={
                                                                    variant.attributes
                                                                        ?.map(
                                                                            (
                                                                                a,
                                                                            ) =>
                                                                                a.value,
                                                                        )
                                                                        .join(
                                                                            ', ',
                                                                        ) ||
                                                                    'Variant'
                                                                }
                                                                className="object-cover rounded border"
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {variant
                                                                    .attributes
                                                                    ?.length
                                                                    ? variant.attributes
                                                                          .map(
                                                                              (
                                                                                  a,
                                                                              ) =>
                                                                                  a.value,
                                                                          )
                                                                          .join(
                                                                              ', ',
                                                                          )
                                                                    : `Biến thể ${idx + 1}`}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                Model ID:{' '}
                                                                {
                                                                    variant.productVariantId
                                                                }
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 align-top text-center">
                                                        {variant.sold ?? 0}
                                                    </td>
                                                    <td className="p-3 align-top text-center">
                                                        ₫
                                                        {variant.price.toLocaleString(
                                                            'vi-VN',
                                                        )}
                                                    </td>
                                                    <td className="p-3 align-top text-center">
                                                        {variant.stock === 0 ? (
                                                            <span className="text-red-500 font-medium">
                                                                Hết hàng
                                                            </span>
                                                        ) : (
                                                            variant.stock
                                                        )}
                                                    </td>
                                                    <td className="p-3 align-top text-center">
                                                        <button
                                                            onClick={() =>
                                                                setOpenFlashSaleId(
                                                                    variant.productVariantId as string,
                                                                )
                                                            }
                                                            disabled={
                                                                variant.stock <
                                                                10
                                                            }
                                                            className={`px-3 py-1.5 text-sm font-medium rounded-lg shadow-sm transition-colors duration-200
       															     ${
                                                                         variant.stock <
                                                                         10
                                                                             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                             : 'bg-gradient-to-r cursor-pointer from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600'
                                                                     }`}
                                                            title={
                                                                variant.stock <
                                                                10
                                                                    ? ''
                                                                    : 'Đăng ký FlashSale'
                                                            }
                                                        >
                                                            ⚡ FlashSale
                                                        </button>

                                                        {openFlashSaleId ===
                                                            variant.productVariantId && (
                                                            <FlashSale
                                                                open={true}
                                                                onClose={() =>
                                                                    setOpenFlashSaleId(
                                                                        null,
                                                                    )
                                                                }
                                                                productVariantId={
                                                                    variant.productVariantId
                                                                }
                                                            />
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    )}

                                    {/* Nút xem thêm / thu gọn */}
                                    {!isSimpleProduct &&
                                        variants.length > 2 && (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    className="py-2"
                                                >
                                                    <div className="flex justify-center">
                                                        <button
                                                            onClick={() =>
                                                                setExpanded(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [product.productId]:
                                                                            !showAll,
                                                                    }),
                                                                )
                                                            }
                                                            className={`flex items-center cursor-pointer  justify-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-colors 
   																${
                                                                    showAll
                                                                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                                }`}
                                                        >
                                                            {showAll ? (
                                                                <>
                                                                    Thu gọn{' '}
                                                                    <ChevronUp
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Xem thêm
                                                                    (còn{' '}
                                                                    {variants.length -
                                                                        2}{' '}
                                                                    phân loại){' '}
                                                                    <ChevronDown
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
