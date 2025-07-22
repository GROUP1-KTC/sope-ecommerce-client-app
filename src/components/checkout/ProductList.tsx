import React from 'react';

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

interface ProductListProps {
    cartItems: CartItem[];
}

export default function ProductList({ cartItems }: ProductListProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Sản phẩm</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-t">
                    <thead>
                        <tr className="border-b text-gray-500 text-sm">
                            <th className="py-2">Sản Phẩm</th>
                            <th className="py-2">Đơn giá</th>
                            <th className="py-2">Số lượng</th>
                            <th className="py-2">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="flex items-center gap-3 py-2">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover border rounded"
                                        loading="lazy"
                                    />
                                    <div className="font-medium line-clamp-2">
                                        {item.name}
                                    </div>
                                </td>
                                <td className="py-2">
                                    ₫{item.price.toLocaleString('vi-VN')}
                                </td>
                                <td className="py-2">{item.quantity}</td>
                                <td className="py-2 text-red-500 font-semibold">
                                    ₫
                                    {(
                                        item.price * item.quantity
                                    ).toLocaleString('vi-VN')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
