'use client';

import React from 'react';

type CartItem = {
  id: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
};

type OrderItemRowProps = {
  item: CartItem;
};

export default function OrderItemRow({ item }: OrderItemRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 mb-2 px-1 sm:px-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <img
            src={item.image || '/placeholder.png'}
            alt={item.name}
            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm"
            loading="lazy"
          />
          <div className="font-medium text-gray-800 line-clamp-2 text-sm sm:text-base">
            {item.name}
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-2 px-1 sm:px-2 text-sm sm:text-base">
        ₫{item.price.toLocaleString('vi-VN')}
      </td>

      {/* Quantity */}
      <td className="py-2 px-1 sm:px-2 text-sm sm:text-base">{item.quantity}</td>

      {/* Total */}
      <td className="py-2 px-1 sm:px-2 text-red-500 font-semibold text-sm sm:text-base">
        ₫{(item.price * item.quantity).toLocaleString('vi-VN')}
      </td>
    </tr>
  );
}
