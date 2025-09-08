import Image from "next/image";
import { useState } from "react";
import { ProductResponse } from "~/types/products";

interface EditModalProps {
	product: ProductResponse;
	type: "price" | "stock" | null;
	onClose: () => void;
	onSave: (values: any) => void;
}

export default function EditModal({ product, type, onClose, onSave }: EditModalProps) {
	const [bulkValue, setBulkValue] = useState<string>("");
	const [variants, setVariants] = useState(product.variants || []);

	const applyToAll = () => {
		if (!bulkValue) {
			alert("Không được để trống ô!");
			return;
		}
		if (!type) return;

		setVariants(variants.map(v => ({
			...v,
			[type]: Number(bulkValue)
		})));
	};

	const updateVariant = (id: string | undefined, value: number) => {
		if (!type) return;
		setVariants(variants.map(v =>
			v.productVariantId === id ? { ...v, [type]: Number(value) } : v
		));
	};

	const handleSave = () => {
		if (!type) return;

		const payload = {
			variants: variants.map(v => ({
				productVariantId: v.productVariantId,
				...(type === "price"
					? { price: v.price }
					: { stock: v.stock })
			}))
		};

		onSave(payload);
	};

	return (
		<div className="fixed inset-0 bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-[600px] p-6 shadow-lg">
				<h2 className="text-lg font-semibold mb-4">
					Cập nhật {type === "price" ? "giá" : "kho"}
				</h2>

				<p className="mb-2 font-medium">{product.name}</p>

				<div className="flex items-center justify-center gap-3 mb-4 bg-gray-50 border  border-gray-200 rounded-md p-3">
					<span className="text-gray-700 text-sm font-medium">
						Chỉnh sửa hàng loạt
					</span>
					<input
						type="number"
						placeholder={`Nhập ${type === "price" ? "giá" : "số lượng"}`}
						className="border border-gray-200 rounded px-2 py-1 w-40 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						value={bulkValue}
						onChange={e => setBulkValue(e.target.value)}
					/>
					<button
						onClick={applyToAll}
						className="border border-orange-500 text-orange-500 px-3 py-1 rounded hover:bg-orange-50 text-sm transition"
					>
						Áp dụng cho tất cả phân loại
					</button>
				</div>


				<div className="max-h-80 overflow-y-auto border border-gray-400 rounded">
					<table className="w-full text-sm">
						<thead className="bg-gray-100">
							<tr>
								<th className="p-2 text-left">Phân loại hàng</th>
								<th className="p-2 text-center">{type === "price" ? "Giá" : "Kho"}</th>
							</tr>
						</thead>
						<tbody>
							{variants.map(v => (
								<tr key={v.productVariantId} className="border-t  border-gray-200 ">
									<td className="p-4 flex items-center gap-2 ">
										{typeof v.imageVariant === "string" && v.imageVariant && (
											<Image
												src={v.imageVariant}
												width={40}
												height={40}
												alt={v.attributes?.map(a => a.value).join(", ") || "Variant"}
												className="object-cover rounded border"
											/>
										)}
										{/* image */}
										{v.attributes?.map(a => a.value).join(", ") || v.productVariantId}
									</td>
									<td className="p-3 text-center">
										<div className="flex items-center justify-between border border-gray-500 rounded w-full overflow-hidden">
											{type === "price" && <span className="px-2 text-gray-500">đ</span>}
											<input
												type="number"
												className="flex-1 px-4 py-1 text-right"
												value={v[type ?? "price"] ?? ""}
												onChange={e => updateVariant(v.productVariantId, Number(e.target.value))}
											/>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="flex justify-end gap-2 mt-4">
					<button onClick={onClose} className="px-4 py-2 border rounded">Hủy</button>
					<button onClick={handleSave} className="px-4 py-2 bg-orange-500 text-white rounded">Cập nhật</button>
				</div>
			</div>
		</div>
	);
}
