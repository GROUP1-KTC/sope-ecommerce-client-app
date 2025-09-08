import { useState, useEffect } from 'react';
import VariantGroupInput from './VariantGroupInput';
import type { Attribute, ProductVariant } from '~/types/products';
import { ProductFormDataWithMedia } from './RightSideBar';
import { handleNumberKeyDown } from '~/utils/keyboard';
interface SalesInfoProps {
    onVariantsChange: (variants: ProductVariant[]) => void;
    productData: ProductFormDataWithMedia;
}

const SalesInfo = ({ onVariantsChange, productData }: SalesInfoProps) => {
    const [showVariant1, setShowVariant1] = useState(false);
    const [showVariant2, setShowVariant2] = useState(false);

    console.log('check productData', productData)

    const [simpleVariant, setSimpleVariant] = useState<ProductVariant>({
        price: productData.variants[0]?.price ?? 0,
        stock: productData.variants[0]?.stock ?? 0,
        weight: productData.variants[0]?.weight ?? 0,
        dimension: productData.variants[0]?.dimension ?? { length: 0, width: 0, height: 0 },
        imageVariant: null,
        attributes: [],
    });

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
            weight: number;
            dimension: { length: number; width: number; height: number };
            image?: File
        }[]
    >([]);

    const [imageVariant, setImageVariant] = useState<{ [optionImage: string]: File }>({});

    const [duplicateOptionsInV1, setDuplicateOptionsInV1] = useState(false);
    const [duplicateOptionsInV2, setDuplicateOptionsInV2] = useState(false);

    const hasDuplicates = (arr: string[]) => {
        const nonEmpty = arr.filter((item) => item.trim() !== '');
        return new Set(nonEmpty).size !== nonEmpty.length;
    };

    useEffect(() => {
        if (!showVariant1 && !showVariant2) {
            onVariantsChange([simpleVariant]);
        }
    }, [simpleVariant, showVariant1, showVariant2]);

    useEffect(() => {
        setDuplicateOptionsInV1(hasDuplicates(variant1Options));
    }, [variant1Options]);

    useEffect(() => {
        setDuplicateOptionsInV2(hasDuplicates(variant2Options));
    }, [variant2Options]);

    const [duplicateVariantName, setDuplicateVariantName] = useState(false);

    useEffect(() => {
        setDuplicateVariantName(
            variant1.trim().toLowerCase() !== '' &&
            variant2.trim().toLowerCase() !== '' &&
            variant1.trim().toLowerCase() === variant2.trim().toLowerCase()
        );
    }, [variant1, variant2]);

    useEffect(() => {
        if (variant1Options.length && !variant2Options.length) {
            setVariantCombinations(
                variant1Options.map(opt => ({
                    key: opt,
                    option1: opt,
                    price: 0,
                    stock: 0,
                    weight: 0,
                    dimension: { length: 0, width: 0, height: 0 }
                }))
            );
        } else if (variant1Options.length && variant2Options.length) {
            const combos: typeof variantCombinations = [];
            variant1Options.forEach(opt1 => {
                variant2Options.forEach(opt2 => {
                    combos.push({
                        key: `${opt1}-${opt2}`,
                        option1: opt1,
                        option2: opt2,
                        price: 0,
                        stock: 0,
                        weight: 0,
                        dimension: { length: 0, width: 0, height: 0 }
                    });
                });
            });
            setVariantCombinations(combos);
        }
    }, [variant1Options, variant2Options]);

    useEffect(() => {
        const variantData: ProductVariant[] = variantCombinations.map((combo) => {
            const imageFile = imageVariant[combo.option1];

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
                weight: combo.weight,
                dimension: combo.dimension,
                attributes,
            };
        });

        onVariantsChange?.(variantData);
    }, [variantCombinations, imageVariant, variant1, variant2]);

    const handlePriceChangeVariant = (key: string, price: number) => {
        if (price < 0) return;
        setVariantCombinations(prev =>
            prev.map(c => (c.key === key ? { ...c, price } : c))
        );
    };

    const handleStockChangeVariant = (key: string, stock: number) => {
        if (stock < 0) return;
        setVariantCombinations(prev =>
            prev.map(c => (c.key === key ? { ...c, stock } : c))
        );
    };

    const handleDimensionChangeVariant = (
        key: string,
        dimension: { length: number; width: number; height: number }
    ) => {
        setVariantCombinations(prev =>
            prev.map(c => (c.key === key ? { ...c, dimension } : c))
        );
    };

    const handleWeightChangeVariant = (key: string, weight: number) => {
        if (weight < 0) return;
        setVariantCombinations(prev =>
            prev.map(c => (c.key === key ? { ...c, weight } : c))
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

    const groupedCombinations = variantCombinations.reduce((acc, combo) => {
        if (!acc[combo.option1]) acc[combo.option1] = [];
        acc[combo.option1].push(combo);
        return acc;
    }, {} as Record<string, typeof variantCombinations>);

    const handleRemoveVariant1 = () => {
        setShowVariant1(false);
        setShowVariant2(false);
        setVariant1("");
        setVariant1Options([]);
        setVariant2("");
        setVariant2Options([]);
        setVariantCombinations([]);
        onVariantsChange([simpleVariant]);
    };

    return (
        <div className="bg-white rounded shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Thông tin bán hàng</h2>

            {/* Variant loại 1 */}
            {!showVariant1 ? (
                <>
                    <button
                        onClick={() => setShowVariant1(true)}
                        className="border border-dashed border-orange-400 text-orange-500 px-4 py-2 cursor-pointer rounded"
                    >
                        + Thêm nhóm phân loại
                    </button>

                    {/* Price, Stock, Weight */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div>
                            <label className="block font-medium mb-1">* Giá</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Nhập vào"
                                    className="border rounded p-2 w-full pr-10"
                                    value={simpleVariant.price}
                                    onChange={(e) => setSimpleVariant({ ...simpleVariant, price: Number(e.target.value) })}
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    ₫
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">* Kho hàng</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border rounded p-2 w-full pr-10"
                                    value={simpleVariant.stock}
                                    onChange={(e) => setSimpleVariant({ ...simpleVariant, stock: Number(e.target.value) })}
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    cái
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Cân nặng</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border rounded p-2 w-full pr-12"
                                    value={simpleVariant.weight}
                                    onChange={(e) => setSimpleVariant({ ...simpleVariant, weight: Number(e.target.value) })}
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    gram
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Dimension */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div>
                            <label className="block font-medium mb-1">Dài</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border rounded p-2 w-full pr-10"
                                    value={simpleVariant.dimension?.length ?? ""}
                                    onChange={(e) =>
                                        setSimpleVariant({
                                            ...simpleVariant,
                                            dimension: {
                                                ...(simpleVariant.dimension ?? { length: 0, width: 0, height: 0 }),
                                                length: Number(e.target.value),
                                            },
                                        })
                                    }
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    cm
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Rộng</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border rounded p-2 w-full pr-10"
                                    value={simpleVariant.dimension?.width ?? ""}
                                    onChange={(e) =>
                                        setSimpleVariant({
                                            ...simpleVariant,
                                            dimension: {
                                                ...(simpleVariant.dimension ?? { length: 0, width: 0, height: 0 }),
                                                width: Number(e.target.value),
                                            },
                                        })
                                    }
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    cm
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Cao</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border rounded p-2 w-full pr-10"
                                    value={simpleVariant.dimension?.height ?? ""}
                                    onChange={(e) =>
                                        setSimpleVariant({
                                            ...simpleVariant,
                                            dimension: {
                                                ...(simpleVariant.dimension ?? { length: 0, width: 0, height: 0 }),
                                                height: Number(e.target.value),
                                            },
                                        })
                                    }
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    cm
                                </span>
                            </div>
                        </div>
                    </div>

                </>
            ) : (
                <VariantGroupInput
                    label="Phân loại 1"
                    variantName={variant1}
                    setVariantName={setVariant1}
                    options={variant1Options}
                    setOptions={setVariant1Options}
                    onRemove={handleRemoveVariant1}
                />
            )}

            {/* Variant loại 2 */}
            {showVariant1 && !showVariant2 && (
                <button
                    onClick={() => setShowVariant2(true)}
                    className="mt-4 border border-dashed border-orange-400 text-orange-500 px-4 py-2 rounded cursor-pointer"
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
                            setShowVariant2(false)
                            setVariant2("")
                            setVariant2Options([])
                        }}
                    />
                    {duplicateVariantName && (
                        <p className="text-red-500 mt-2">Tên phân loại 1 và 2 không được trùng nhau.</p>
                    )}
                    {duplicateOptionsInV1 && (
                        <p className="text-red-500 mt-2">Tùy chọn của phân loại 1 đang bị trùng nhau.</p>
                    )}
                    {duplicateOptionsInV2 && (
                        <p className="text-red-500 mt-2">Tùy chọn của phân loại 2 đang bị trùng nhau.</p>
                    )}
                </>
            )}

            {showVariant1 && (
                <table className="table-auto border-separate border-spacing-1.5 border border-gray-300 rounded overflow-hidden mt-4 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-200  px-2 py-1">{variant1}</th>
                            {variant2 && variant2Options && (
                                <th className="border border-gray-200  px-2 py-1">{variant2}</th>
                            )}
                            <th className="border border-gray-200  px-2 py-1">Giá </th>
                            <th className="border border-gray-200  px-2 py-1">Kho hàng </th>
                            <th className="border border-gray-200  px-2 py-1">Kích thước (cm) </th>
                            <th className="border border-gray-200  px-2 py-1">Cân nặng (gram)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Object.entries(groupedCombinations).map(([option1, combos]) => (
                            combos.map((combo, index) => (
                                <tr key={combo.key}>
                                    {index === 0 && (
                                        <td className="border border-gray-200  px-2 py-1" rowSpan={combos.length}>
                                            <div className="flex flex-col items-center space-y-1">
                                                <span>{option1}</span>

                                                {/* Nút chọn ảnh */}
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handleImageVariantChange(option1, e.target.files?.[0])}
                                                    />
                                                    <div className="w-[60px] h-[60px] border border-dashed rounded flex items-center justify-center">
                                                        {imageVariant[option1] ? (
                                                            <img
                                                                src={URL.createObjectURL(imageVariant[option1])}
                                                                alt="preview"
                                                                className="object-cover w-full h-full rounded"
                                                            />
                                                        ) : (
                                                            <span className="text-red-500 text-sm text-center">📷</span>
                                                        )}
                                                    </div>
                                                </label>
                                            </div>
                                        </td>
                                    )}
                                    {variant2 && variant2Options && (
                                        <td className="border border-gray-200 text-center justify-center align-middle px-2 py-1">{combo.option2}</td>
                                    )}
                                    <td className="border border-gray-200  px-2 py-1">
                                        <input
                                            type="text"
                                            value={combo.price}
                                            onChange={(e) => handlePriceChangeVariant(combo.key, Number(e.target.value))}
                                            className="border border-gray-400 rounded p-1 w-full"
                                        />
                                    </td>
                                    <td className="border border-gray-200  px-2 py-1">
                                        <input
                                            type="text"
                                            value={combo.stock}
                                            onChange={(e) => handleStockChangeVariant(combo.key, Number(e.target.value))}
                                            className="border border-gray-400 rounded p-1 w-full"
                                        />
                                    </td>

                                    {/* Dimension (dài, rộng, cao) */}
                                    <td className="border border-gray-200  px-2 py-1">
                                        <div className="grid grid-cols-3 gap-1">
                                            <input
                                                type="number"
                                                placeholder="D"
                                                value={combo.dimension?.length ?? ""}
                                                onChange={(e) =>
                                                    handleDimensionChangeVariant(combo.key, {
                                                        ...combo.dimension,
                                                        length: Number(e.target.value),
                                                    })
                                                }
                                                className="border border-gray-400 rounded p-1 w-full"
                                            />
                                            <input
                                                type="number"
                                                placeholder="R"
                                                value={combo.dimension?.width ?? ""}
                                                onChange={(e) =>
                                                    handleDimensionChangeVariant(combo.key, {
                                                        ...combo.dimension,
                                                        width: Number(e.target.value),
                                                    })
                                                }
                                                className="border border-gray-400 rounded p-1 w-full"
                                            />
                                            <input
                                                type="number"
                                                placeholder="C"
                                                value={combo.dimension?.height ?? ""}
                                                onChange={(e) =>
                                                    handleDimensionChangeVariant(combo.key, {
                                                        ...combo.dimension,
                                                        height: Number(e.target.value),
                                                    })
                                                }
                                                className="border border-gray-400 rounded p-1 w-full"
                                            />
                                        </div>
                                    </td>

                                    <td className="border border-gray-200  px-2 py-1">
                                        <input
                                            type="text"
                                            value={combo.weight}
                                            onChange={(e) => handleWeightChangeVariant(combo.key, Number(e.target.value))}
                                            className="border border-gray-400 rounded p-1 w-full"
                                        />
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody >
                </table >
            )}

        </div >
    );
};

export default SalesInfo;