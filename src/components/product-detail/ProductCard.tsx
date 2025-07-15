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
    <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 w-full"> 
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-cover" 
        />
      </Link>
      <div className="p-2"> 
        <Link href={`/product/${product.id}`}>
          <h3 className="text-xs font-semibold text-gray-800 mb-1 line-clamp-2"> 
            {product.name}
          </h3>
        </Link>
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
  );
};

export default ProductCard;
