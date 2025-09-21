'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
// import Image from 'next/image';
import {
    useGetProductBySlugQuery,
    useGetSimilarProductsQuery,
    useGetSuggestedProductsQuery,
} from '~/features/products/productApi';
import { useGetBreadcrumbCategoryQuery } from '~/features/categories/categoryApi';
import ProductInfo from '~/components/product-detail/ProductInfo';
import ProductReviews from '~/components/product-detail/ProductReviews';
import { useGetReviewByProductQuery } from '~/features/reviews/reviewApi';
import { skipToken } from '@reduxjs/toolkit/query';
import ProductList from '~/components/product-detail/ProductList';
import CustomLink from '~/components/shared/loading/CustomLink';
import {
    EmptyMessage,
    ErrorMessage,
    LoadingMessage,
} from '~/components/shared/loading/FeedBack';
import ProductDescription from '~/components/product-detail/ProductDescription';
import SellerInfo from '~/components/product-detail/SellerInfo';

const ProductBySlug = () => {
    const params = useParams();
    const slug = params?.productSlug as string;

    const {
        data: product,
        isLoading,
        isError,
    } = useGetProductBySlugQuery(slug);
    const { data: reviews } = useGetReviewByProductQuery(
        product?.productId ?? skipToken,
    );
    const categoryId = product?.categoryId;
    const { data: breadcrumb } = useGetBreadcrumbCategoryQuery(categoryId!, {
        skip: !categoryId,
    });

    const { data: suggestedProducts } = useGetSuggestedProductsQuery(
        product?.productId
            ? { productId: product.productId, limit: 5 }
            : skipToken,
    );

    const { data: similarProducts } = useGetSimilarProductsQuery(
        product?.productId
            ? { productId: product.productId, limit: 5 }
            : skipToken,
    );

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

    const [selectedAttributes, setSelectedAttributes] = useState<
        Record<string, string>
    >({});

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

        const validPrices = product.variants
            .map((v) => v.price)
            .filter((price) => price > 0);

        if (validPrices.length === 0) return 0;

        return Math.min(...validPrices);
    }, [product]);

    const displayedPrice = selectedVariant?.price ?? minPrice;
    const displayedStock = selectedVariant?.stock;

    const sellerInfo = product?.shop
        ? {
              id: product.shop.id,
              name: product.shop.name,
              description: product.shop.description || '',
              lastestTimeOnline: 'Đang online',
              shopAvatar: product.shop.logoUrl || '/default-avatar.png',
              numOfReviews: 0,
              numOfProducts: product.variants?.length || 0,
          }
        : null;

    if (isLoading) return <LoadingMessage message="Đang tải sản phẩm..." />;
    if (isError) return <ErrorMessage message="Sản phẩm này không tồn tại." />;
    if (!product) return <EmptyMessage message="Không tìm thấy sản phẩm." />;

    return (
        <div className="w-4/5 mx-auto ">
            <div className="text-base text-gray-600 mb-4 mt-4">
                <nav className="flex items-center flex-wrap gap-1">
                    <CustomLink
                        href="/"
                        className="text-blue-600  hover:underline"
                    >
                        Sope
                    </CustomLink>
                    <span>›</span>

                    {/* Categories */}
                    {breadcrumb?.map((cat, _) => (
                        <React.Fragment key={cat.id}>
                            <CustomLink
                                href={`/${cat.slug}`}
                                className="text-blue-600 hover:underline"
                            >
                                {cat.name}
                            </CustomLink>
                            <span>›</span>
                        </React.Fragment>
                    ))}

                    <span className="text-gray-800 font-medium">
                        {product.name}
                    </span>
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

            <ProductDescription
                productDetail={{
                    description: product.description ?? '',
                    features:
                        product.productDetails?.reduce(
                            (acc, detail) => {
                                acc[detail.label] = detail.data;
                                return acc;
                            },
                            {} as Record<string, string>,
                        ) ?? {},
                }}
                breadcrumb={
                    breadcrumb?.map((cat) => cat.name).join(' › ') ?? ''
                }
            />

            {sellerInfo && <SellerInfo sellerInfo={sellerInfo} />}

            {suggestedProducts && suggestedProducts.length > 0 && (
                <ProductList
                    title="Sản phẩm gợi ý"
                    products={suggestedProducts}
                />
            )}


            {similarProducts && similarProducts.length > 0 && (
                <ProductList
                    title="Sản phẩm tương tự"
                    products={similarProducts}
                />
            )}

            <ProductReviews
                reviews={reviews ?? []}
                overallReview={product.overallReview}
            />
        </div>
    );
};

export default ProductBySlug;
