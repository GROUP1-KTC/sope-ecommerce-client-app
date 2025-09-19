import Image from 'next/image';
import type { ProductSummary } from '~/types/products';
import CustomLink from '../shared/loading/CustomLink';

const ProductCard = ({ product }: { product: ProductSummary }) => {
    return (
        <CustomLink href={`/product-detail/${product.slug}`}>
            <div className="bg-white mb-1 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300  w-[180px] min-h-[240px] hover:scale-105 transition-transform duration-400">
                <Image
                    width={192}
                    height={144}
                    src={product.defaultImage}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                />

                <div className="p-2 pt-4">
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
                        ₫{(product.minPrice ?? 0).toLocaleString('vi-VN')}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                        <span>⭐ {product.averageRating ?? 0}</span>
                        <span>|</span>
                        <span>
                            {(product.totalSold ?? 0).toLocaleString('vi-VN')}{' '}
                            Đã bán
                        </span>
                    </div>
                </div>
            </div>
        </CustomLink>
    );
};

export default ProductCard;
