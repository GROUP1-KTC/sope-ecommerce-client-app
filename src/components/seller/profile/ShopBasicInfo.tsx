'use client';
import Image from 'next/image';
import { Card } from '../common/Card';
import { useState, useEffect } from 'react';
import {
    useGetShopMeQuery,
    useUpdateShopMutation,
} from '~/features/shop/shopApi';
import { useAlertStore } from '~/store/zustand/alertStore';

export default function ShopBasicInfo() {
    const { data: shop, isLoading } = useGetShopMeQuery();
    const [updateShop] = useUpdateShopMutation();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: '',
        description: '',
        logoUrl: '',
    });

    useEffect(() => {
        if (shop) {
            setForm({
                name: shop.name,
                description: shop.description || '',
                logoUrl: shop.logoUrl || '',
            });
        }
    }, [shop]);

    if (isLoading) return <div>Loading...</div>;
    if (!shop) return <div>Không tìm thấy shop</div>;

    const handleChange = (field: string, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSave = async () => {
        try {
            await updateShop(form).unwrap();
            useAlertStore.getState().showAlert({
                severity: 'success',
                message: 'Cập nhật thành công!',
            });
            setEditing(false);
        } catch (err) {
            console.error(err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'Cập nhật thất bại!',
            });
        }
    };

    return (
        <Card className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Thông tin cơ bản
                </h2>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border text-sm border-gray-300 text-gray-700 rounded hover:bg-gray-300 cursor-pointer">
                        Xem Shop của tôi
                    </button>
                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 border text-sm border-red-600 text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer"
                        >
                            Chỉnh sửa
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 border text-sm border-green-600 text-white bg-green-600 rounded hover:bg-green-700 cursor-pointer"
                        >
                            Lưu
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-gray-600">Tên Shop</span>
                {editing ? (
                    <input
                        className="col-span-2 border rounded px-2 py-1"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                ) : (
                    <span className="col-span-2">{shop.name}</span>
                )}

                <span className="text-gray-600">Logo của Shop</span>
                <div className="col-span-2 flex items-center gap-4">
                    {editing ? (
                        <input
                            className="w-full border rounded px-2 py-1"
                            value={form.logoUrl}
                            onChange={(e) =>
                                handleChange('logoUrl', e.target.value)
                            }
                        />
                    ) : (
                        <Image
                            src={shop.logoUrl || '/logoSope.png'}
                            alt="Shop Logo"
                            width={40}
                            height={40}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    )}
                </div>

                <span className="text-gray-600">Mô tả Shop</span>
                {editing ? (
                    <textarea
                        className="col-span-2 border rounded px-2 py-1"
                        value={form.description}
                        onChange={(e) =>
                            handleChange('description', e.target.value)
                        }
                    />
                ) : (
                    <span className="col-span-2 text-gray-800">
                        {shop.description || 'Chưa cập nhật'}
                    </span>
                )}
            </div>
        </Card>
    );
}
