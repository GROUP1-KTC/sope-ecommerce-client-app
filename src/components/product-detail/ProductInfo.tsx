'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAlertStore } from '~/store/zustand/alertStore';
import type { CartGroup, CartItem } from '~/app/(customer)/cart/page';
import type { ProductResponse, ProductVariant } from '~/types/products';
import { useAppDispatch, useAppSelector } from '~/hooks/useTypes';
import { useAddCartMutation } from '~/features/cart/cartApiSlice';
interface ProductInfoProps {
    product: ProductResponse;
    selectedVariant?: ProductVariant;
    attributeMap?: Map<string, Set<string>>;
    selectedAttributes?: Record<string, string>;
    handleAttributeSelect?: (name: string, value: string) => void;
    price: number;
    stock?: number;
}

import Cookies from 'js-cookie';

import { v4 as uuidv4 } from 'uuid';
import { addItem } from '~/features/cart/cartSlice';
import type { AddToCartRequest } from '~/types/cart/AddToCartRequest';
import { useRouter } from 'next/navigation';
import {
    setCheckoutItems,
    setIsFormCart,
} from '~/features/orders/checkoutSlice';

const ProductInfo = ({
    product,
    selectedVariant,
    attributeMap,
    selectedAttributes,
    handleAttributeSelect,
    price,
    stock,
}: ProductInfoProps) => {
    const [showVoucherModal, setShowVoucherModal] = useState(false);
    const [showPolicyModal, setShowPolicyModal] = useState(false);
    const [addCartApi] = useAddCartMutation();
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUser = Cookies.get('authUser');
        setIsLoggedIn(!!storedUser);
    }, []);

    const dispatch = useAppDispatch();

    const totalSold =
        product.variants?.reduce(
            (sum, variant) => sum + (variant.sold || 0),
            0,
        ) ?? 0;
    const attributeEntries: [string, Set<string>][] = attributeMap
        ? Array.from(attributeMap.entries())
        : [];
    const [quantity, setQuantity] = useState(1);

    const hasAttributes = attributeEntries.length > 0;
    const isQuantityEnabled = hasAttributes ? !!selectedVariant : true;

    useEffect(() => {
        if (!selectedVariant) {
            setQuantity(1);
        }
    }, [selectedVariant]);

    const [selectedImage, setSelectedImage] = useState(product.defaultImage);

    const handleAddToCart = async (item: CartItem) => {
        const newItem = {
            id: uuidv4(),
            name: item.name,
            productVariantId: item.productVariantId,
            price: item.price,
            image: item.image || null,
            quantity: item.quantity,
            shopId: product.shop?.id || '',
            shopName: product.shop?.name || '',
            shopAvatar: product.shop?.logoUrl || '',
        };

        if (isLoggedIn) {
            // Handle logged-in user
            try {
                const request: AddToCartRequest = {
                    productVariantId: item.productVariantId,
                    quantity: item.quantity,
                    image: item.image || null,
                };

                await addCartApi(request).unwrap();
                useAlertStore.getState().showAlert({
                    severity: 'success',
                    message: 'Thêm sản phẩm vào giỏ hàng thành công!',
                });
            } catch (error) {
                useAlertStore.getState().showAlert({
                    severity: 'error',
                    message: 'Thêm giỏ hàng thất bại!',
                });
            }
        } else {
            // Handle non-logged-in user
            const stored = localStorage.getItem('cart');
            const currentCart: CartGroup[] = stored ? JSON.parse(stored) : [];

            // Find or create shop in cart
            let shopIndex = currentCart.findIndex(
                (s) => s.shop.id === product.shop?.id,
            );

            if (shopIndex === -1) {
                currentCart.push({
                    shop: {
                        id: product.shop?.id || '',
                        name: product.shop?.name || '',
                        avatarUrl: product.shop?.logoUrl || '',
                        address: {
                            street: product.shop?.address?.street || '',
                            ward: product.shop?.address?.ward || '',
                            district: product.shop?.address?.district || '',
                            city: product.shop?.address?.city || '',
                        },
                    },
                    items: [],
                });
                shopIndex = currentCart.length - 1;
            }

            // Add or update item in shop
            const existingItemIndex = currentCart[shopIndex].items.findIndex(
                (i) => i.productVariantId === newItem.productVariantId,
            );

            if (existingItemIndex !== -1) {
                currentCart[shopIndex].items[existingItemIndex].quantity +=
                    newItem.quantity;
            } else {
                currentCart[shopIndex].items.push(newItem);
            }

            localStorage.setItem('cart', JSON.stringify(currentCart));

            useAlertStore.getState().showAlert({
                severity: 'success',
                message:
                    'Thêm sản phẩm vào giỏ hàng thành công (chưa đăng nhập)!',
            });
        }

        dispatch(addItem(newItem));
    };

    const handleCheckout = () => {
        const cartGroups: CartGroup[] = [
            {
                shop: {
                    id: product.shop?.id || '',
                    name: product.shop?.name || '',
                    avatarUrl: product.shop?.logoUrl || '',
                    address: {
                        street: product.shop?.address?.street || '',
                        ward: product.shop?.address?.ward || '',
                        district: product.shop?.address?.district || '',
                        city: product.shop?.address?.city || '',
                    },
                },
                items: [
                    {
                        id: uuidv4(),
                        name: product.name,
                        productVariantId:
                            selectedVariant?.productVariantId ||
                            product.variants?.[0].productVariantId ||
                            '',
                        price: price,
                        image:
                            (selectedVariant?.imageVariant as string) ||
                            product.defaultImage,
                        quantity: quantity,
                    },
                ],
            },
        ];

        dispatch(setCheckoutItems(cartGroups));
        dispatch(setIsFormCart(false));
        router.push('/checkout');
    };

    return (
        <div className="bg-white shadow rounded p-4 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[450px]">
                <Image
                    width={450}
                    height={450}
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-[450px] object-contain rounded"
                />
                <div className="flex overflow-x-auto gap-2 mt-4 pb-2">
                    {[
                        product.defaultImage,
                        ...product.imagesList.map((img) => img.url),
                    ].map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className="focus:outline-none"
                        >
                            <Image
                                width={80}
                                height={80}
                                src={img}
                                alt={`${product.name} - View ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded border-2 ${
                                    selectedImage === img
                                        ? 'border-red-500'
                                        : 'border-gray-300 hover:border-gray-500'
                                }`}
                            />
                        </button>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-4 space-x-6">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-red-700 hover:bg-red-50 transition-colors cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                            />
                        </svg>
                        <span>Chia sẻ</span>
                    </button>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md text-red-700 hover:bg-red-50 transition-colors cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                        <span>Yêu thích</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {product.name}
                </h2>
                <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
                    <span>⭐ 4.5</span>
                    <span>|</span>
                    <span>700 Đánh giá</span>
                    <span>|</span>
                    <span className="text-gray-700 font-semibold">
                        {' '}
                        {totalSold}
                    </span>
                    <span className="ml-1 text-gray-500">Đã bán</span>
                    <span className="ml-auto">Tố cáo</span>
                </div>
                <div
                    className="relative flex items-center gap-4 mb-4 bg-red-50 px-6 py-3 rounded"
                    onMouseEnter={() => setShowVoucherModal(true)}
                    onMouseLeave={() => setShowVoucherModal(false)}
                >
                    <span className="text-red-500 font-medium text-3xl">
                        ₫{price.toLocaleString('vi-VN')}
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
                    {/* <span className="text-gray-400 text-lg line-through">
                        ₫{(product.price * 1.2).toLocaleString('vi-VN')}
                    </span>
                    {showVoucherModal && (
                        <div className="absolute left-0 top-full mt-2 w-112 bg-white border border-gray-400 rounded shadow-lg p-4 z-10">
                            <div className="text-sm">
                                <p className="text-gray-800 font-medium mb-2">
                                    Chi tiết giá
                                </p>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">
                                        Giá gốc:
                                    </span>
                                    <span className="text-red-600">
                                        ₫
                                        {priceDetail.originalPrice.toLocaleString(
                                            'vi-VN',
                                        )}
                                    </span>
                                </div>
                                {priceDetail.discounts.map(
                                    (discount, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-gray-700">
                                                    {
                                                        discount.description.split(
                                                            '.',
                                                        )[0]
                                                    }
                                                    :
                                                </span>
                                                <span className="text-red-600">
                                                    -₫
                                                    {discount.value.toLocaleString(
                                                        'vi-VN',
                                                    )}
                                                </span>
                                            </div>
                                            {discount.description.includes(
                                                '.',
                                            ) && (
                                                    <div className="text-gray-500 text-xs mt-1">
                                                        {discount.description
                                                            .split('.')[1]
                                                            .trim()}
                                                    </div>
                                                )}
                                            <hr className="border-t border-gray-200 my-2" />
                                        </div>
                                    ),
                                )}
                                <div className="flex justify-between mt-3">
                                    <span className="text-gray-900 font-bold">
                                        Giá tạm tính:
                                    </span>
                                    <span className="text-red-600 font-bold">
                                        ₫
                                        {priceDetail.finalPrice.toLocaleString(
                                            'vi-VN',
                                        )}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 italic">
                                    *Vui lòng kiểm tra Voucher đã dùng hoặc nhận
                                    toast để đổi giá ưu đãi
                                </p>
                            </div>
                        </div>
                    )} */}
                </div>

                <div className="flex flex-col gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-start mt-2">
                        <span className="w-32 font-semibold">
                            Voucher của shop
                        </span>
                        <div className="flex-1 flex flex-wrap gap-2">
                            {/* {shopVouchers?.map((voucher, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-200 text-red-700 font-medium px-2 py-1 rounded shadow-md"
                                    >
                                        {voucher.description}
                                    </span>
                                ))} */}
                        </div>
                    </div>

                    {/* {promotionCombo && (
                            <div className="flex items-start mt-4">
                                <span className="w-32 font-semibold">
                                    Combo Khuyến Mãi
                                </span>
                                <div className="flex-1">
                                    <span className="text-red-700 font-medium px-2 py-1 rounded shadow-md border border-red-500">
                                        {promotionCombo.description}
                                    </span>
                                </div>
                            </div>
                        )} */}

                    {/* <div className="flex items-start mt-4">
                            <span className="w-32 font-semibold">Vận chuyển</span>
                            <div className="flex-1 flex flex-col gap-1 break-words">
                                <span className="text-black">
                                    {shipInformation?.time ||
                                        'Thông tin vận chuyển chưa có'}
                                </span>
                                <span className="text-black">
                                    {shipInformation?.fee
                                        ? `Phí ship: ${shipInformation.fee}`
                                        : ''}
                                </span>
                                {shipInformation?.policy && (
                                    <span className="text-gray-500">
                                        {shipInformation.policy}
                                    </span>
                                )}
                            </div>
                        </div> */}
                    <div className="flex items-center relative">
                        <span className="w-32 font-semibold">
                            An tâm mua sắm cùng Sope
                        </span>
                        <span className="flex-1 break-words text-black">
                            {/* {policy.sopePolicy} */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-blue-500 ml-2 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                onMouseEnter={() => setShowPolicyModal(true)}
                                onMouseLeave={() => setShowPolicyModal(false)}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </span>

                        {showPolicyModal && (
                            <div className="absolute left-0 top-full mt-2 w-112 bg-white border border-gray-400 rounded shadow-lg p-4 z-10">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Chính sách mua sắm
                                </h3>
                                {/* {policy.procurementPolicy.map((item, idx) => (
                                        <p
                                            key={idx}
                                            className={`text-gray-600 ${idx > 0 ? 'mt-2' : ''}`}
                                        >
                                            {item}
                                        </p>
                                    ))} */}
                            </div>
                        )}
                    </div>

                    {attributeEntries.map(([name, values], index) => (
                        <div className="flex items-center mt-4" key={name}>
                            <span className="w-32 font-semibold">
                                Chọn {name}
                            </span>
                            <div className="flex gap-2 flex-wrap ">
                                {Array.from(values).map((value) => {
                                    const matchingVariants =
                                        product.variants?.filter((variant) =>
                                            variant?.attributes?.every(
                                                (attr) => {
                                                    if (attr.name === name)
                                                        return (
                                                            attr.value === value
                                                        );
                                                    if (
                                                        selectedAttributes?.[
                                                            attr.name
                                                        ]
                                                    ) {
                                                        return (
                                                            selectedAttributes[
                                                                attr.name
                                                            ] === attr.value
                                                        );
                                                    }
                                                    return true;
                                                },
                                            ),
                                        );

                                    const isOutOfStock =
                                        !matchingVariants?.some(
                                            (v) => v.stock > 0,
                                        );

                                    const variantImage =
                                        index === 0
                                            ? matchingVariants?.find(
                                                  (v) => v.imageVariant,
                                              )?.imageVariant
                                            : null;

                                    return (
                                        <button
                                            key={value}
                                            onClick={() =>
                                                !isOutOfStock &&
                                                handleAttributeSelect?.(
                                                    name,
                                                    value,
                                                )
                                            }
                                            disabled={isOutOfStock}
                                            className={`
                                                    cursor-pointer relative flex items-center gap-2 px-3 py-2 rounded border text-sm font-medium
                                                    transition-colors
                                                    ${
                                                        selectedAttributes?.[
                                                            name
                                                        ] === value
                                                            ? 'border-red-500 text-red-500 bg-red-50'
                                                            : 'border-gray-300 bg-white hover:bg-gray-100'
                                                    }
                                                    ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}
                                                `}
                                        >
                                            {variantImage && (
                                                <img
                                                    src={variantImage}
                                                    alt={`${name} - ${value}`}
                                                    className="w-6 h-6 object-cover rounded"
                                                />
                                            )}
                                            <span>{value}</span>

                                            {/* dấu tick ở góc khi đang chọn */}
                                            {selectedAttributes?.[name] ===
                                                value && (
                                                <span className="absolute top-0 right-0 text-red-500 text-xs font-bold">
                                                    ✓
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    <div className="flex items-center mt-4 mb-2">
                        <span className="w-32 font-semibold">Số lượng</span>
                        <div className="flex items-center gap-3 flex-1">
                            <button
                                className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md text-lg font-semibold
                                    ${!isQuantityEnabled ? 'bg-gray-200 cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-gray-200 transition-colors'}`}
                                type="button"
                                disabled={!isQuantityEnabled}
                                onClick={() =>
                                    setQuantity((prev) => Math.max(1, prev - 1))
                                }
                            >
                                -
                            </button>

                            <input
                                type="number"
                                min={1}
                                max={stock ?? 9999}
                                value={quantity}
                                disabled={!isQuantityEnabled}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val > 0 && val <= (stock ?? 9999))
                                        setQuantity(val);
                                }}
                                className={`w-16 h-10 text-center border border-gray-300 rounded-none outline-none 
                                    ${!isQuantityEnabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'focus:ring-2 focus:ring-blue-500'}`}
                            />

                            <button
                                className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md text-lg font-semibold
                                    ${!isQuantityEnabled ? 'bg-gray-200 cursor-not-allowed opacity-50' : 'bg-gray-100 hover:bg-gray-200 transition-colors'}`}
                                type="button"
                                disabled={!isQuantityEnabled}
                                onClick={() =>
                                    setQuantity((prev) =>
                                        Math.min(stock ?? 9999, prev + 1),
                                    )
                                }
                            >
                                +
                            </button>

                            {selectedVariant && (
                                <span className="text-gray-600">
                                    Còn {stock} sản phẩm
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() =>
                            handleAddToCart({
                                id: uuidv4(),
                                name: product.name,
                                productVariantId:
                                    selectedVariant?.productVariantId ||
                                    product.variants?.[0].productVariantId ||
                                    '',
                                price: price,
                                image:
                                    (selectedVariant?.imageVariant as string) ||
                                    product.defaultImage,
                                quantity: quantity,
                            })
                        }
                        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
                    >
                        <AddShoppingCartIcon className="mr-2" />
                        Thêm vào giỏ hàng
                    </button>
                    <button
                        onClick={() => {
                            handleCheckout();
                        }}
                        className="bg-red-600 text-white px-6 rounded hover:bg-red-700"
                    >
                        <span>
                            <p>Mua ngay</p>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
