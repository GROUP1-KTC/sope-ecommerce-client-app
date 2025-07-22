import React from 'react';

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
};

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="bg-white rounded shadow p-3 flex flex-col items-center hover:shadow-lg transition">
            <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 md:w-28 md:h-28 object-cover mb-2 rounded"
                loading="lazy"
            />
            <div className="font-medium text-center line-clamp-2 mb-1 text-sm md:text-base">
                {product.name}
            </div>
            <div className="text-red-500 font-semibold mb-2 text-sm md:text-base">
                ₫{product.price.toLocaleString('vi-VN')}
            </div>
            <button className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-xs md:text-sm">
                Xem chi tiết
            </button>
        </div>
    );
};

export default ProductCard;
