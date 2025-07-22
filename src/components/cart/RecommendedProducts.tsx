import React from 'react';
import ProductCard from './ProductCard';


type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
};

interface RecommendedProductsProps {
    products: Product[];
}

const RecommendedProducts = ({ products }: RecommendedProductsProps) => {
    return (
        <div className="max-w-5xl mx-auto mt-10">
            <h3 className="text-xl font-semibold mb-4">
                Có thể bạn cũng thích
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {products.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts;
