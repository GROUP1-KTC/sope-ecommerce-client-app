'use client';

import React, { useState } from 'react';
import SearchBar from '~/components/voucher/InputBar';
import VoucherItem from '~/components/voucher/VoucherItem';

// Định nghĩa interfaces
interface Voucher {
  title: string;
  discount: string;
  minOrder: string;
  platform: string;
  expiry: string;
  used: boolean;
  type: 'amount' | 'shipping';
}

interface Category {
  id: string;
  name: string;
  count: number;
}

// Component Filter
interface FilterProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selected, onSelect }) => (
  <div className="flex justify-center gap-2 mb-4 overflow-x-auto whitespace-nowrap">
    {categories.map((cat) => (
      <button
        key={cat.id}
        className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${
          selected === cat.id ? ' text-red-500 underline' : 'text-gray-700'
        }`}
        onClick={() => onSelect(cat.id)}
      >
        {cat.name} ({cat.count})
      </button>
    ))}
  </div>
);

// Trang chính Voucher List
const VoucherListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dữ liệu mẫu voucher
  const voucherData: Voucher[] = [
    { title: 'Giảm 17% Giảm tối đa đ80k', discount: 'Giảm 17%', minOrder: 'đ150k', platform: 'Shopee Live', expiry: '30/11/2025', used: false, type: 'amount' },
    { title: 'Giảm 18% Giảm tối đa đ60k', discount: 'Giảm 18%', minOrder: 'đ150k', platform: 'Shopee Live', expiry: '15/12/2025', used: false, type: 'amount' },
    { title: 'Miễn phí vận chuyển', discount: 'Giảm 18%', minOrder: 'đ100k', platform: 'Shopee Live', expiry: '15/12/2025', used: false, type: 'shipping' },
    { title: 'Giảm 15% Giảm tối đa đ3tr', discount: 'Giảm 15%', minOrder: 'đ10tr', platform: 'Điện Tử', expiry: '31/12/2025', used: false, type: 'amount' },
    { title: 'Miễn phí vận chuyển', discount: 'Giảm 12%', minOrder: 'đ10tr', platform: 'Điện Tử', expiry: '31/12/2025', used: false, type: 'shipping' },
  ];

  const categories: Category[] = [
    { id: 'all', name: 'Tất cả', count: 1712 },
    { id: 'shopee', name: 'Shopee', count: 1701 },
    { id: 'shopee_vip', name: 'ShopeeVIP', count: 0 },
    { id: 'shop', name: 'Shop', count: 11 },
    { id: 'nap_the', name: 'Nạp thẻ & Dịch vụ', count: 0 },
    { id: 'scan_pay', name: 'Scan & Pay', count: 0 },
  ];

  const filteredVouchers = voucherData.filter((voucher) =>
    (selectedCategory === 'all' || voucher.platform === (selectedCategory === 'shopee' ? 'Shopee Live' : 'Điện Tử')) &&
    (voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.discount.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="order-detail-page bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold uppercase text-gray-800">Kho Voucher</span>
            <div className="flex gap-2 text-sm">
              <a href="#" className="text-red-600 hover:underline">Tìm thêm voucher</a>
              <span>|</span>
              <a href="#" className="text-red-600 hover:underline">Xem lịch sử voucher</a>
              <span>|</span>
              <a href="#" className="text-red-600 hover:underline">Tìm hiểu</a>
            </div>
          </div>
          <div className="text-gray-600 mb-6">
            Quản lý và sử dụng các voucher của bạn
          </div>
          <hr className="my-4 border-gray-300" />
          <div className="space-y-6">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <Filter
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredVouchers.map((voucher, index) => (
                <VoucherItem
                  key={index}
                  title={voucher.title}
                  discount={voucher.discount}
                  minOrder={voucher.minOrder}
                  platform={voucher.platform}
                  expiry={voucher.expiry}
                  used={voucher.used}
                  type={voucher.type}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherListPage;