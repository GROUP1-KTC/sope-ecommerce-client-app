'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ChevronDown } from "lucide-react";
import { ProductSummary } from '~/types/products';

interface ProductListProps {
	products: ProductSummary[];
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, page, totalPages, onPageChange }) => {

	const [sort, setSort] = useState<string>('default');

	const sortedProducts = useMemo(() => {
		let sorted = [...products];

		if (sort === 'price_asc') {
			sorted.sort((a, b) => a.minPrice - b.minPrice);
		} else if (sort === 'price_desc') {
			sorted.sort((a, b) => b.minPrice - a.minPrice);
		} else if (sort === 'bestseller') {
			sorted.sort((a, b) => b.totalSold - a.totalSold);
		}

		return sorted;
	}, [products, sort]);

	return (
		<div className="flex-1 pl-6">
			{/* Sorting */}
			<div className="flex items-center gap-2 mb-4 relative">
				{/* Nút mặc định */}
				<button
					className={`px-4 py-2 rounded cursor-pointer border text-sm font-medium ${sort === 'default'
						? 'bg-red-500 text-white border-red-500'
						: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
						}`}
					onClick={() => setSort('default')}
				>
					Mặc định
				</button>

				{/* Nút bán chạy */}
				<button
					className={`px-4 py-2 rounded cursor-pointer border text-sm font-medium ${sort === 'bestseller'
						? 'bg-red-500 text-white border-red-500'
						: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
						}`}
					onClick={() => setSort('bestseller')}
				>
					Bán chạy
				</button>

				{/* Dropdown giá */}
				<div className="relative group">
					<button
						className={`px-4 py-2 rounded cursor-pointer border text-sm font-medium min-w-[150px] flex items-center justify-between ${sort.includes('price')
							? 'bg-red-500 text-white border-red-500'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
							}`}
					>
						<span>Giá</span>
						<ChevronDown className="w-4 h-4" />
					</button>
					<div className="absolute left-0 top-full  hidden group-hover:block bg-white border rounded shadow-md z-10 min-w-[150px]">
						<button
							className={`block w-full text-left px-4 py-2 text-sm ${sort === 'price_asc'
								? 'bg-red-100 text-red-600'
								: 'hover:bg-gray-100'
								}`}
							onClick={() => setSort('price_asc')}
						>
							Thấp đến cao
						</button>
						<button
							className={`block w-full text-left px-4 py-2 text-sm ${sort === 'price_desc'
								? 'bg-red-100 text-red-600'
								: 'hover:bg-gray-100'
								}`}
							onClick={() => setSort('price_desc')}
						>
							Cao đến thấp
						</button>
					</div>
				</div>

				{/* Phân trang */}
				<span className="ml-auto text-xs text-gray-500">
					{page + 1}/{totalPages}
				</span>
				<button
					className="p-1 border rounded mx-1 cursor-pointer text-black hover:text-red-500"
					disabled={page === 0}
					onClick={() => onPageChange(page - 1)}
				>
					<ArrowBackIcon />
				</button>
				<button
					className="p-1 border rounded mx-1 cursor-pointer text-gray-500 hover:text-red-500"
					disabled={page + 1 >= totalPages}
					onClick={() => onPageChange(page + 1)}
				>
					<ArrowForwardIcon />
				</button>
			</div>

			{/* Grid sản phẩm */}
			<div className="grid grid-cols-5 gap-4">
				{sortedProducts.map((product) => (
					<Link
						key={product.productId}
						href={`/product-by-slug/${product.slug}`}
						className="border border-gray-600 rounded-lg bg-white flex flex-col p-2 relative cursor-pointer hover:shadow-lg hover:scale-105 hover:bg-orange-100 transition duration-200"
					>
						<div className="w-full h-36 flex items-center justify-center mb-2 overflow-hidden">
							<Image
								src={product.defaultImage}
								alt={product.name}
								className="w-full h-full object-contain rounded bg-white"
								width={300}
								height={300}
							/>
						</div>
						<div className="text-left text-sm">
							<div className="font-medium text-xs mb-1 line-clamp-2">{product.name}</div>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-red-500 font-extrabold text-xl">
									₫{(product.minPrice ?? 0).toLocaleString('vi-VN')}
								</span>
							</div>
							<div className="flex items-center text-xs justify-between text-gray-500 gap-1">
								<span className="text-yellow-500">
									⭐ {product.averageRating ? product.averageRating.toFixed(1) : '0.0'}
								</span>
								<span>Đã bán {product.totalSold}</span>
							</div>
						</div>
					</Link>
				))}
			</div>

			{/* Pagination */}
			{/* <div className="flex justify-center items-center mt-6 gap-2">
				<button
					disabled={page === 0}
					onClick={() => onPageChange(page - 1)}
					className="p-1 border rounded mx-1 cursor-pointer text-black hover:text-red-500 disabled:opacity-50"
				>
					<ArrowBackIcon />
				</button>
				<span className="text-xs text-gray-500">
					{page + 1}/{totalPages}
				</span>
				<button
					disabled={page + 1 >= totalPages}
					onClick={() => onPageChange(page + 1)}
					className="p-1 border rounded mx-1 cursor-pointer text-gray-500 hover:text-red-500 disabled:opacity-50"
				>
					<ArrowForwardIcon />
				</button>
			</div> */}
		</div>
	);
};

export default ProductList;
