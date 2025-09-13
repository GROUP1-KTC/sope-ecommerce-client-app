'use client';

import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ChevronRight } from "lucide-react";
import SmsIcon from '@mui/icons-material/Sms';
import ProductList from '~/components/product-list/ProductList';
import { useGetShopByIdQuery } from '~/features/shop/shopApi';

const ShopPage: React.FC = () => {
  const { shopId } = useParams(); 
  const { data: shop, isLoading, error } = useGetShopByIdQuery(shopId as string);

  if (isLoading) return <p>Đang tải cửa hàng...</p>;
  if (error) return <p>Có lỗi khi tải cửa hàng.</p>;
  if (!shop) return <p>Không tìm thấy cửa hàng.</p>;

  const allProducts = shop.products || [];
  const suggestedProducts = allProducts.slice(0, 6);

  return (
    <div className="max-w-[80%] w-full mx-auto p-4 space-y-6">

      {/* Shop Header */}
      <div className="flex items-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm gap-6">
        <div className="w-32 h-32 overflow-hidden rounded-full border border-gray-200 flex-shrink-0">
          <Image
            src={shop.logoUrl || "https://via.placeholder.com/200"}
            alt="Shop Logo"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-gray-800">{shop.name}</h1>
          <p className="text-sm text-gray-600">{shop.description}</p>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 cursor-pointer">
            Chat <SmsIcon style={{ fontSize: 18 }} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
          <div>Sản phẩm: <span className="font-semibold text-red-500">{allProducts.length}</span></div>
          <div>Đánh giá: <span className="font-semibold text-red-500">4.7 (1.8k)</span></div>
          <div>Tham gia: <span className="font-semibold">23 tháng trước</span></div>
          <div>Tỉ lệ phản hồi: <span className="font-semibold">98%</span></div>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-lg text-gray-800">Gợi ý cho bạn</h2>
          <a href="#all-products" className="text-sm text-red-500 flex items-center gap-1 hover:underline">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {suggestedProducts.map((product: any) => (
            <div
              key={product.productId}
              className="border border-gray-100 rounded-lg p-3 flex flex-col items-center bg-white hover:shadow-md transition"
            >
              <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.defaultImage}
                  alt={product.name}
                  width={140}
                  height={140}
                  className="object-contain rounded"
                />
              </div>
              <div className="text-sm text-center line-clamp-2 text-gray-700 mt-2">{product.name}</div>
              <div className="text-red-500 font-bold text-base mt-1">
                ₫{product.defaultPrice.toLocaleString('vi-VN')}
              </div>
              <div className="text-xs text-gray-500">Đã bán: {product.totalSold}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Shop Description */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="font-semibold text-lg text-gray-800 mb-3">Về {shop.name}</h2>
        <p className="text-gray-600 leading-relaxed text-sm">
          {shop.description || "Cửa hàng chưa có mô tả chi tiết."}
        </p>
      </div>

      {/* All Products */}
      <div id="all-products" className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="font-semibold text-lg text-gray-800 mb-5">Tất cả sản phẩm</h2>
        <ProductList products={allProducts} />
      </div>
    </div>
  );
};

export default ShopPage;
