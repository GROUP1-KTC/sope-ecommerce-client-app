import { useState, useEffect } from 'react';
import VariantGroupInput from './VariantGroupInput';
import type { Attribute, ProductVariantFormData } from '~/types/products';
interface SalesInfoProps {
    onPriceChange: (price: number) => void;
    onStockChange: (stock: number) => void;
    onVariantsChange?: (variants: ProductVariantFormData[]) => void; // NEW
}

const SalesInfo = ({
    onPriceChange,
    onStockChange,
    onVariantsChange,
}: SalesInfoProps) => {
    const [showVariant1, setShowVariant1] = useState(false);
    const [showVariant2, setShowVariant2] = useState(false);

    const [variant1, setVariant1] = useState('');
    const [variant1Options, setVariant1Options] = useState<string[]>([]);

    const [variant2, setVariant2] = useState('');
    const [variant2Options, setVariant2Options] = useState<string[]>([]);

    const [variantCombinations, setVariantCombinations] = useState<
        {
            key: string;
            option1: string;
            option2?: string;
            price: number;
            stock: number;
            image?: File;
        }[]
    >([]);

    const [imageVariant, setImageVariant] = useState<{
        [optionImage: string]: File;
    }>({});

    const [duplicateOptionsInV1, setDuplicateOptionsInV1] = useState(false);
    const [duplicateOptionsInV2, setDuplicateOptionsInV2] = useState(false);

    const hasDuplicates = (arr: string[]) => {
        const nonEmpty = arr.filter((item) => item.trim() !== '');
        return new Set(nonEmpty).size !== nonEmpty.length;
    };

    useEffect(() => {
        setDuplicateOptionsInV1(hasDuplicates(variant1Options));
    }, [variant1Options]);

    useEffect(() => {
        setDuplicateOptionsInV2(hasDuplicates(variant2Options));
    }, [variant2Options]);

    const [duplicateVariantName, setDuplicateVariantName] = useState(false);

    useEffect(() => {
        // Kiểm tra tên phân loại có trùng không (phân biệt chữ hoa thường)
        setDuplicateVariantName(
            variant1.trim().toLowerCase() !== '' &&
                variant2.trim().toLowerCase() !== '' &&
                variant1.trim().toLowerCase() === variant2.trim().toLowerCase(),
        );
    }, [variant1, variant2]);

    useEffect(() => {
        if (variant1Options.length && !variant2Options.length) {
            setVariantCombinations(
                variant1Options.map((opt) => ({
                    key: opt,
                    option1: opt,
                    price: 0,
                    stock: 0,
                })),
            );
        } else if (variant1Options.length && variant2Options.length) {
            const combos: typeof variantCombinations = [];
            variant1Options.forEach((opt1) => {
                variant2Options.forEach((opt2) => {
                    combos.push({
                        key: `${opt1}-${opt2}`,
                        option1: opt1,
                        option2: opt2,
                        price: 0,
                        stock: 0,
                    });
                });
            });
            setVariantCombinations(combos);
        }
    }, [variant1Options, variant2Options]);

    useEffect(() => {
        const variantData: ProductVariantFormData[] = variantCombinations.map(
            (combo) => {
                const imageFile = imageVariant[combo.option1]; // mỗi nhóm option1 chia sẻ ảnh

                const attributes: Attribute[] = [
                    {
                        attributeId: 1,
                        name: variant1,
                        value: combo.option1,
                    },
                ];

                if (variant2 && combo.option2) {
                    attributes.push({
                        attributeId: 2,
                        name: variant2,
                        value: combo.option2,
                    });
                }

                return {
                    price: combo.price,
                    stock: combo.stock,
                    imageVariant: imageFile ?? null,
                    attributes,
                };
            },
        );

        onVariantsChange?.(variantData);
    }, [variantCombinations, imageVariant, variant1, variant2]);

    const handlePriceChangeVariant = (key: string, price: number) => {
        if (price < 0) return;
        setVariantCombinations((prev) =>
            prev.map((c) => (c.key === key ? { ...c, price } : c)),
        );
    };

    const handleStockChangeVariant = (key: string, stock: number) => {
        if (stock < 0) return;
        setVariantCombinations((prev) =>
            prev.map((c) => (c.key === key ? { ...c, stock } : c)),
        );
    };

    const handleImageVariantChange = (optionKey: string, file?: File) => {
        if (file) {
            setImageVariant((prev) => ({
                ...prev,
                [optionKey]: file,
            }));
        }
    };

    const groupedCombinations = variantCombinations.reduce(
        (acc, combo) => {
            if (!acc[combo.option1]) acc[combo.option1] = [];
            acc[combo.option1].push(combo);
            return acc;
        },
        {} as Record<string, typeof variantCombinations>,
    );

    return (
        <div className="bg-white rounded shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Thông tin bán hàng</h2>

            {/* Variant loại 1 */}
            {!showVariant1 ? (
                <>
                    <button
                        onClick={() => setShowVariant1(true)}
                        className="border border-dashed border-orange-400 text-orange-500 px-4 py-2  rounded"
                    >
                        + Thêm nhóm phân loại
                    </button>

                    <div className="mt-4">
                        <label className="block font-medium mb-1">* Giá</label>
                        <input
                            type="number"
                            placeholder="Nhập vào"
                            min="0"
                            className="border rounded p-2 w-full"
                            // value={price}
                            onChange={(e) =>
                                onPriceChange(Number(e.target.value))
                            }
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block font-medium mb-1">
                            * Kho hàng
                        </label>
                        <input
                            type="number"
                            className="border rounded p-2 w-full"
                            min="0"
                            // value={stock}
                            onChange={(e) =>
                                onStockChange(Number(e.target.value))
                            }
                        />
                    </div>
                </>
            ) : (
                <VariantGroupInput
                    label="Phân loại 1"
                    variantName={variant1}
                    setVariantName={setVariant1}
                    options={variant1Options}
                    setOptions={setVariant1Options}
                    onRemove={() => {
                        setShowVariant1(false);
                        setShowVariant2(false);
                    }}
                />
            )}

            {/* Variant loại 2 */}
            {showVariant1 && !showVariant2 && (
                <button
                    onClick={() => setShowVariant2(true)}
                    className="mt-4 border border-dashed border-orange-400 text-orange-500 px-4 py-2 rounded"
                >
                    + Thêm nhóm phân loại 2
                </button>
            )}
            {showVariant2 && (
                <>
                    <VariantGroupInput
                        label="Phân loại 2"
                        variantName={variant2}
                        setVariantName={setVariant2}
                        options={variant2Options}
                        setOptions={setVariant2Options}
                        onRemove={() => {
                            setShowVariant2(false);
                            setVariant2('');
                            setVariant2Options([]);
                        }}
                    />
                    {duplicateVariantName && (
                        <p className="text-red-500 mt-2">
                            Tên phân loại 1 và 2 không được trùng nhau.
                        </p>
                    )}
                    {duplicateOptionsInV1 && (
                        <p className="text-red-500 mt-2">
                            Tùy chọn của phân loại 1 đang bị trùng nhau.
                        </p>
                    )}
                    {duplicateOptionsInV2 && (
                        <p className="text-red-500 mt-2">
                            Tùy chọn của phân loại 2 đang bị trùng nhau.
                        </p>
                    )}
                </>
            )}

            {showVariant1 && (
                <table className="table-auto border-collapse border border-gray-300 mt-4 w-full">
                    <thead>
                        <tr>
                            <th className="border px-2 py-1">{variant1}</th>
                            {variant2 && variant2Options && (
                                <th className="border px-2 py-1">{variant2}</th>
                            )}
                            <th className="border px-2 py-1">Giá</th>
                            <th className="border px-2 py-1">Kho hàng</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(groupedCombinations).map(
                            ([option1, combos]) =>
                                combos.map((combo, index) => (
                                    <tr key={combo.key}>
                                        {index === 0 && (
                                            <td
                                                className="border px-2 py-1"
                                                rowSpan={combos.length}
                                            >
                                                <div className="flex flex-col items-center space-y-1">
                                                    <span>{option1}</span>

                                                    {/* Nút chọn ảnh */}
                                                    <label className="cursor-pointer">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleImageVariantChange(
                                                                    option1,
                                                                    e.target
                                                                        .files?.[0],
                                                                )
                                                            }
                                                        />
                                                        <div className="w-[60px] h-[60px] border border-dashed rounded flex items-center justify-center">
                                                            {imageVariant[
                                                                option1
                                                            ] ? (
                                                                <img
                                                                    src={URL.createObjectURL(
                                                                        imageVariant[
                                                                            option1
                                                                        ],
                                                                    )}
                                                                    alt="preview"
                                                                    className="object-cover w-full h-full rounded"
                                                                />
                                                            ) : (
                                                                <span className="text-red-500 text-sm text-center">
                                                                    📷
                                                                </span>
                                                            )}
                                                        </div>
                                                    </label>
                                                </div>
                                            </td>
                                        )}
                                        {variant2 && variant2Options && (
                                            <td className="border items-center justify-center align-middle px-2 py-1">
                                                {combo.option2}
                                            </td>
                                        )}
                                        <td className="border px-2 py-1">
                                            <input
                                                type="number"
                                                min="0"
                                                value={combo.price}
                                                onChange={(e) =>
                                                    handlePriceChangeVariant(
                                                        combo.key,
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="border rounded p-1 w-full"
                                            />
                                        </td>
                                        <td className="border px-2 py-1">
                                            <input
                                                type="number"
                                                min="0"
                                                value={combo.stock}
                                                onChange={(e) =>
                                                    handleStockChangeVariant(
                                                        combo.key,
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="border rounded p-1 w-full"
                                            />
                                        </td>
                                    </tr>
                                )),
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SalesInfo;
