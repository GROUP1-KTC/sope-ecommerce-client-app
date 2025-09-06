'use client';
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type LiveStatsProps = {
  orders: number;
  revenue: number;
  viewers: number;
  liveTime: string; 
};

export default function LiveStats({ orders, revenue, viewers, liveTime }: LiveStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-1 h-full flex flex-col">
      <h3 className="text-base font-bold mb-3">Thống kê Live</h3>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <ShoppingCartIcon fontSize="small" />
            <span>Đơn hàng</span>
          </div>
          <span className="font-semibold">{orders}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <MonetizationOnIcon fontSize="small" />
            <span>Doanh thu</span>
          </div>
          <span className="font-semibold text-green-600">
            {revenue.toLocaleString('vi-VN')} ₫
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <PeopleIcon fontSize="small" />
            <span>Người xem</span>
          </div>
          <span className="font-semibold">{viewers}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <AccessTimeIcon fontSize="small" />
            <span>Thời gian live</span>
          </div>
          <span className="font-medium">{liveTime}</span>
        </div>
      </div>
    </div>
  );
}
