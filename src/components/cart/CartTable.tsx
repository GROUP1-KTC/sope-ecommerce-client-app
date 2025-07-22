import React from 'react';
import CartItemRow from './CartItemRow';

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

interface CartTableProps {
    cartItems: CartItem[];
    selected: number[];
    handleSelect: (id: number) => void;
    handleSelectAll: () => void;
    handleDelete: (id: number) => void;
    handleQuantityChange: (id: number, newQuantity: number) => void;
}

const CartTable = ({
    cartItems,
    selected,
    handleSelect,
    handleSelectAll,
    handleDelete,
    handleQuantityChange,
}: CartTableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-t">
                <thead>
                    <tr className="border-b text-gray-500 text-sm">
                        <th className="py-10">
                            <input
                                type="checkbox"
                                checked={
                                    selected.length === cartItems.length &&
                                    cartItems.length > 0
                                }
                                onChange={handleSelectAll}
                                className="h-5 w-5"
                            />
                        </th>
                        <th className="py-2">Sản Phẩm</th>
                        <th className="py-2">Đơn Giá</th>
                        <th className="py-2">Số Lượng</th>
                        <th className="py-2">Số Tiền</th>
                        <th className="py-2">Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <CartItemRow
                            key={item.id}
                            item={item}
                            isSelected={selected.includes(item.id)}
                            handleSelect={handleSelect}
                            handleDelete={handleDelete}
                            handleQuantityChange={handleQuantityChange}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartTable;
