import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    sold: string;
}

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="bg-white mb-1 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 w-[192px] min-w-[192px] min-h-[240px] hover:scale-105">
                <Image
                    width={192}
                    height={144}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                />

                <div className="p-2">
                    <h3
                        className="text-xs font-semibold text-gray-800 mb-1"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxHeight: '2.75rem',
                        }}
                    >
                        {product.name}
                    </h3>

                    <p className="text-red-500 font-bold text-xs mb-1">
                        ₫{product.price.toLocaleString('vi-VN')}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        <span>⭐ {product.rating}</span>
                        <span>|</span>
                        <span>{product.sold} Đã bán</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
