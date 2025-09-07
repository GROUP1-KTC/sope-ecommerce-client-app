// ShopOrderCard.tsx
import React, { useState } from 'react';
import OrderItemRow from './OrderItemRow';
import VoucherModal from './VoucherModal';
import { ShippingSection } from './ShippingSelector';
import type { CartGroup } from '~/app/(customer)/cart/page';
import type { ShippingRate } from '~/types/shipping/shipping';
import type { Discount } from '~/types/discount/discount';

interface ShopOrderCardProps {
    group: CartGroup;
    shopExtras: Record<string, any>;
    updateShopNote: (shopId: string, note: string) => void;
    updateShopDiscount: (shopId: string, voucher: string) => void;
    updateShippingUnit: (shopId: string, rate: ShippingRate) => void;
    shopVouchers?: Discount[];
    shippingRates?: ShippingRate[];
    shippingLoading?: boolean;
    shippingError?: any;
}

const ShopOrderCard: React.FC<ShopOrderCardProps> = ({
    group,
    shopExtras,
    updateShopNote,
    updateShopDiscount,
    updateShippingUnit,
    shopVouchers,
    shippingRates = [],
    shippingLoading = false,
    shippingError = null,
}) => {
    const [isVoucherOpen, setIsVoucherOpen] = useState(false);

    const handleApply = (selected: Record<string, string | null>) => {
        const code = selected.SHOP ?? null;
        if (code) {
            updateShopDiscount(group.shop.id, code);
        } else {
            updateShopDiscount(group.shop.id, '');
        }
        setIsVoucherOpen(false);
    };

    return (
        <div className="mb-8 border rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 border-b">
                <img
                    src={group.shop.avatarUrl}
                    alt={group.shop.name}
                    className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold text-gray-800">
                    {group.shop.name}
                </span>
            </div>

            {/* Items table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left bg-white">
                    <thead>
                        <tr className="text-gray-500 text-sm">
                            <th className="py-2 px-3">Sản Phẩm</th>
                            <th className="py-2 px-3">Đơn giá</th>
                            <th className="py-2 px-3">Số lượng</th>
                            <th className="py-2 px-3">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {group.items.map((item: any) => (
                            <OrderItemRow key={item.id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Shipping (per shop) --- */}
            <div className="bg-gray-50 px-4 py-3 border-t">
                <ShippingSection
                    rates={shippingRates}
                    isLoading={shippingLoading}
                    error={shippingError}
                    onSelect={(rate) => updateShippingUnit(group.shop.id, rate)}
                />
            </div>

            {/* Note & Voucher (below shipping) */}
            <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t">
                <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">
                        Ghi chú cho shop
                    </label>
                    <input
                        type="text"
                        placeholder="VD: Giao giờ hành chính"
                        value={shopExtras[group.shop.id]?.note || ''}
                        onChange={(e) =>
                            updateShopNote(group.shop.id, e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                </div>

                <div className="flex-shrink-0">
                    <button
                        onClick={() => setIsVoucherOpen(true)}
                        className="mt-2 sm:mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium shadow hover:from-red-600 hover:to-red-700 transition"
                    >
                        + Voucher cho shop
                    </button>
                </div>
            </div>

            <VoucherModal
                isOpen={isVoucherOpen}
                onClose={() => setIsVoucherOpen(false)}
                vouchers={shopVouchers}
                onApply={handleApply}
                scopes={['SHOP']}
            />
        </div>
    );
};

export default ShopOrderCard;
