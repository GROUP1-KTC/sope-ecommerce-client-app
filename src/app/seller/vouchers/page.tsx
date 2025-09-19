'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
    useCreateDiscountMutation,
    useGetShopDiscountQuery,
} from '~/features/discount/discountApiSlice';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import type { Discount, DiscountFormData } from '~/types/discount/discount';
import DiscountDialog from '~/components/voucher/DiscountDialog';
import { IconButton, Tooltip } from '@mui/material';

export default function ShopVoucherPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const [activeTab, setActiveTab] = useState<
        'all' | 'active' | 'inactive' | 'expired'
    >('all');
    const [searchText, setSearchText] = useState('');

    // Dialog state
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDiscount, setSelectedDiscount] =
        useState<DiscountFormData | null>(null);
    const [isViewMode, setIsViewMode] = useState(false);

    const [createDiscount] = useCreateDiscountMutation();

    const {
        data: response,
        isLoading,
        isError,
    } = useGetShopDiscountQuery({
        shopId: '190e754a-20d1-42e9-81ce-fa1bc282caa9',
        page: currentPage,
        size: 20,
    });

    const data = response?.data;
    let discounts = data?.content ?? [];

    discounts =
        activeTab === 'all'
            ? discounts
            : discounts.filter((d) => d.status.toLowerCase() === activeTab);

    if (searchText.trim()) {
        discounts = discounts.filter(
            (d) =>
                d.code.toLowerCase().includes(searchText.toLowerCase()) ||
                d.description?.toLowerCase().includes(searchText.toLowerCase()),
        );
    }

    if (isLoading) return <div className="p-6">Đang tải voucher...</div>;
    if (isError)
        return <div className="p-6 text-red-600">Lỗi khi tải dữ liệu.</div>;

    const handleCreate = () => {
        setSelectedDiscount(null);
        setIsViewMode(false);
        setOpenDialog(true);
    };

    const handleView = (discount: any) => {
        setSelectedDiscount(discount);
        setIsViewMode(true);
        setOpenDialog(true);
    };

    const handleSave = async (data: Partial<Discount>) => {
        const baseRow = {
            code: data.code!,
            description: data.description,
            value: data.value!,
            scope: data.scope!,
            minOrderValue: data.minOrderValue ?? 0,
            maxUsage: data.maxUsage ?? 0,
            startDate: data.startDate ?? new Date().toISOString(),
            endDate: data.endDate ?? null,
        };

        let finalDiscount: Discount;

        finalDiscount = {
            ...baseRow,
            shopId: '190e754a-20d1-42e9-81ce-fa1bc282caa9',
            discountType: data.discountType!,
            maxDiscountValue: data.maxDiscountValue ?? null,
        } as Discount;

        if (selectedDiscount) {
        } else {
            try {
                const response = await createDiscount(finalDiscount).unwrap();

                return response as Discount;
            } catch (error) {
                console.error('Failed to create discount:', error);
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to create discount';
            }
        }
    };

    console.log('Discounts:', discounts);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold">Quản lý Voucher</h1>
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Tìm theo mã hoặc mô tả..."
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        onClick={handleCreate}
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-2 rounded-lg flex items-center gap-1 transition"
                    >
                        <Plus size={18} /> Tạo voucher mới
                    </button>
                </div>
            </div>

            <div className="flex gap-3 mb-4">
                {['all', 'active', 'inactive', 'expired'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as typeof activeTab)}
                        className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                            activeTab === tab
                                ? 'bg-red-500 text-white'
                                : ' hover:text-white hover:bg-red-600'
                        }`}
                    >
                        {tab === 'all'
                            ? 'Tất cả'
                            : tab === 'active'
                              ? 'Đang hoạt động'
                              : tab === 'inactive'
                                ? 'Chưa kích hoạt'
                                : 'Hết hạn'}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-lg shadow">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-gray-50 text-gray-700">
                        <tr>
                            <th className="p-3"></th>
                            <th className="p-3 text-left">Mã voucher</th>
                            <th className="p-3 text-center">Giá trị</th>
                            <th className="p-3 text-center">Điều kiện</th>
                            <th className="p-3 text-center">Sử dụng</th>
                            <th className="p-3 text-center">Thời gian</th>
                            <th className="p-3 text-center">Trạng thái</th>
                            <th className="p-3 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((d) => (
                            <tr
                                key={d.id}
                                className="hover:bg-orange-50 cursor-pointer"
                                onClick={() => handleView(d)}
                            >
                                <td className="p-3"></td>
                                <td className="p-3 font-semibold">{d.code}</td>
                                <td className="p-3 text-center">
                                    {d.discountType === 'PERCENTAGE'
                                        ? `${d.value}%`
                                        : `₫${d.value.toLocaleString('vi-VN')}`}
                                </td>
                                <td className="p-3 text-center">
                                    Tối thiểu ₫
                                    {d.minOrderValue.toLocaleString('vi-VN')}
                                </td>
                                <td className="p-3 text-center">
                                    {d.currentUsage}/{d.maxUsage}
                                </td>
                                <td className="p-3 text-center">
                                    {new Date(d.startDate).toLocaleDateString(
                                        'vi-VN',
                                    )}{' '}
                                    –{' '}
                                    {d.endDate
                                        ? new Date(
                                              d.endDate,
                                          ).toLocaleDateString('vi-VN')
                                        : 'Không giới hạn'}
                                </td>
                                <td className="p-3 text-center">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            d.status === 'ACTIVE'
                                                ? 'bg-green-100 text-green-700'
                                                : d.status === 'INACTIVE'
                                                  ? 'bg-yellow-100 text-yellow-700'
                                                  : 'bg-gray-100 text-gray-500'
                                        }`}
                                    >
                                        {d.status}
                                    </span>
                                </td>
                                <td className="p-3 text-center flex justify-center gap-2">
                                    <Tooltip title="Xem chi tiết">
                                        <IconButton
                                            size="small"
                                            onClick={() => handleView(d)}
                                        >
                                            <RemoveRedEyeOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4 gap-2">
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    className={`px-3 py-1 border rounded ${currentPage === 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                    Trước
                </button>
                <span>Trang {currentPage + 1}</span>
                <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1 border rounded cursor-pointer"
                >
                    Sau
                </button>
            </div>

            {/* Discount Dialog */}
            <DiscountDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onSave={handleSave}
                data={selectedDiscount || undefined}
                isViewMode={isViewMode}
            />
        </div>
    );
}
