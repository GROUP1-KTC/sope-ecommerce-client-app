'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
// import Image from 'next/image';
import Link from "next/link";
import { useGetProductBySlugQuery } from '~/features/products/productApi';
import { useGetBreadcrumbCategoryQuery } from '~/features/categories/categoryApi';
import ProductInfo from '~/components/product-detail/ProductInfo';
import ProductReviews from '~/components/product-detail/ProductReviews';
import { useGetReviewByProductQuery } from '~/features/reviews/reviewApi';

const ProductBySlug = () => {
    const params = useParams();
    const slug = params?.productSlug as string;

    const { data: product, isLoading, isError } = useGetProductBySlugQuery(slug);

    const { data: reviews } = useGetReviewByProductQuery(product?.productId ?? '');

    console.log('check review', reviews)

    const [categoryId, setCategoryId] = useState<string | null>(null);


    useEffect(() => {
        if (product?.category?.id) {
            setCategoryId(product.category.id);
        }
    }, [product]);

    const { data: breadcrumb } = useGetBreadcrumbCategoryQuery(categoryId!, {
        skip: !categoryId,
    });

    const attributeMap = useMemo(() => {
        const map = new Map<string, Set<string>>();
        product?.variants?.forEach((variant) => {
            variant?.attributes?.forEach((attr) => {
                if (!map.has(attr.name)) map.set(attr.name, new Set());
                map.get(attr.name)?.add(attr.value);
            });
        });
        return map;
    }, [product]);

    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});

    const handleAttributeSelect = (name: string, value: string) => {
        setSelectedAttributes((prev) => {
            if (prev[name] === value) {
                const { [name]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [name]: value };
        });
    };

    const selectedVariant = useMemo(() => {
        if (Object.keys(selectedAttributes).length === 0) return undefined;
        return product?.variants?.find((variant) =>
            variant?.attributes?.every(
                (attr) => selectedAttributes[attr.name] === attr.value,
            ),
        );
    }, [product, selectedAttributes]);

    const minPrice = useMemo(() => {
        if (!product?.variants || product.variants.length === 0) return 0;

        // lọc ra các variant có giá > 0
        const validPrices = product.variants
            .map(v => v.price)
            .filter(price => price > 0);

        // nếu không có giá hợp lệ thì return 0
        if (validPrices.length === 0) return 0;

        return Math.min(...validPrices);
    }, [product]);

    const displayedPrice = selectedVariant?.price ?? minPrice;
    const displayedStock = selectedVariant?.stock;

    if (isLoading) return <p>Đang tải sản phẩm...</p>;
    if (isError) return <p>Lỗi khi tải sản phẩm.</p>;
    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <div className="w-4/5 mx-auto ">
            {/* PRODUCT LINK */}
            <div className="text-base text-gray-600 mb-4 mt-4">
                <nav className="flex items-center flex-wrap gap-1">
                    {/* Shopee */}
                    <Link href="/" className="text-blue-600  hover:underline">
                        Shopee
                    </Link>
                    <span>›</span>

                    {/* Categories */}
                    {breadcrumb?.map((cat, idx) => (
                        <React.Fragment key={cat.id}>
                            <Link
                                href={`/${cat.slug}`}
                                className="text-blue-600 hover:underline"
                            >
                                {cat.name}
                            </Link>
                            <span>›</span>
                        </React.Fragment>
                    ))}

                    {/* Product name */}
                    <span className="text-gray-800 font-medium">{product.name}</span>
                </nav>
            </div>

            <ProductInfo
                product={product}
                selectedVariant={selectedVariant}
                attributeMap={attributeMap}
                selectedAttributes={selectedAttributes}
                handleAttributeSelect={handleAttributeSelect}
                price={displayedPrice}
                stock={displayedStock}
            />

            <ProductReviews reviews={reviews ?? []} />



        </div>
    );
};

export default ProductBySlug;
