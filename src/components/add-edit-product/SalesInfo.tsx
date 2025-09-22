import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import VariantGroupInput from './VariantGroupInput';
import type { Attribute, Dimension, ProductVariant } from '~/types/products';
import type { ProductFormDataWithMedia } from './RightSideBar';
import { handleNumberKeyDown } from '~/utils/keyboard';
import Image from 'next/image';
interface SalesInfoProps {
    onVariantsChange: (variants: ProductVariant[]) => void;
    productData: ProductFormDataWithMedia;
    mode: 'add' | 'edit';
}

const SalesInfo = ({ onVariantsChange, productData, mode }: SalesInfoProps) => {
    const [showVariant1, setShowVariant1] = useState(false);
    const [showVariant2, setShowVariant2] = useState(false);

    const [variant1, setVariant1] = useState('');
    const [variant1Options, setVariant1Options] = useState<string[]>([]);
    const [variant2, setVariant2] = useState('');
    const [variant2Options, setVariant2Options] = useState<string[]>([]);

    const [variantCombinations, setVariantCombinations] = useState<
        ProductVariant[]
    >([]);

    const dimensions: { key: keyof Dimension; label: string }[] = [
        { key: 'length', label: 'Dài' },
        { key: 'width', label: 'Rộng' },
        { key: 'height', label: 'Cao' },
    ];

    const normalizeAttributes = (
        attrs: Attribute[] = [],
        orderNames: string[],
    ) => {
        return orderNames
            .map(
                (name) =>
                    attrs.find((a) => a.name === name) ?? { name, value: '' },
            )
            .filter((a) => a.value !== '');
    };

    const normalizeVariants = useCallback(
        (variants: ProductVariant[], orderNames: string[]) =>
            variants.map((v) => ({
                ...v,
                attributes: normalizeAttributes(v.attributes ?? [], orderNames),
            })),
        [],
    );

    const stableKey = (attrs: Attribute[] = []) =>
        attrs.map((a) => `${a.name}:${a.value}`).join('|');

    const isSameAttributes = (a: Attribute[], b: Attribute[]) =>
        stableKey(a) === stableKey(b);

    const hydratingRef = useRef(false);

    const sameByKey = useCallback(
        (a: ProductVariant[], b: ProductVariant[]) => {
            if (a.length !== b.length) return false;
            const mapA = new Map(
                a.map((v) => [stableKey(v.attributes ?? []), v]),
            );
            return b.every((v) => {
                const u = mapA.get(stableKey(v.attributes ?? []));
                if (!u) return false;
                const da = u.dimension ?? { length: 0, width: 0, height: 0 };
                const db = v.dimension ?? { length: 0, width: 0, height: 0 };
                return (
                    u.price === v.price &&
                    u.stock === v.stock &&
                    u.weight === v.weight &&
                    da.length === db.length &&
                    da.width === db.width &&
                    da.height === db.height
                );
            });
        },
        [],
    );

    const incomingVariants = useMemo(
        () => productData?.variants ?? [],
        [productData?.variants],
    );

    function extractOptions(vars: ProductVariant[], name: string): string[] {
        const seen = new Set<string>();
        const result: string[] = [];
        for (const v of vars) {
            const val = v.attributes?.find((a) => a.name === name)?.value;
            if (val && !seen.has(val)) {
                seen.add(val);
                result.push(val);
            }
        }
        return result;
    }

    useEffect(() => {
        const vars = incomingVariants;

        if (mode === 'edit' && vars.length > 0) {
            if (!sameByKey(vars, variantCombinations)) {
                hydratingRef.current = true;

                const names = (vars[0].attributes ?? []).map((a) => a.name);

                setVariantCombinations(normalizeVariants(vars, names));

                if (names.length >= 1) {
                    setShowVariant1(true);
                    setVariant1(names[0]);
                    setVariant1Options(
                        Array.from(
                            new Set(
                                vars
                                    .map(
                                        (v) =>
                                            v.attributes?.find(
                                                (a) => a.name === names[0],
                                            )?.value,
                                    )
                                    .filter(Boolean) as string[],
                            ),
                        ),
                    );
                    setVariant1Options(extractOptions(vars, names[0]));
                }
                if (names.length >= 2) {
                    setShowVariant2(true);
                    setVariant2(names[1]);
                    setVariant2Options(
                        Array.from(
                            new Set(
                                vars
                                    .map(
                                        (v) =>
                                            v.attributes?.find(
                                                (a) => a.name === names[1],
                                            )?.value,
                                    )
                                    .filter(Boolean) as string[],
                            ),
                        ),
                    );
                    setVariant2Options(extractOptions(vars, names[1]));
                }

                setTimeout(() => {
                    hydratingRef.current = false;
                }, 0);
            }
        }

        if (
            mode === 'add' &&
            vars.length === 0 &&
            variantCombinations.length === 0
        ) {
            hydratingRef.current = true;
            setVariantCombinations([
                {
                    price: 0,
                    stock: 0,
                    weight: 0,
                    dimension: { length: 0, width: 0, height: 0 },
                    imageVariant: null,
                    attributes: [],
                },
            ]);
            setTimeout(() => {
                hydratingRef.current = false;
            }, 0);
        }
    }, [
        mode,
        incomingVariants,
        variantCombinations,
        normalizeVariants,
        sameByKey,
    ]);

    useEffect(() => {
        if (hydratingRef.current) return;
        onVariantsChange(variantCombinations);
    }, [variantCombinations, onVariantsChange]);

    useEffect(() => {
        setVariantCombinations((prev) => {
            const prevMap = new Map(
                prev.map((v) => [stableKey(v.attributes ?? []), v]),
            );
            const out: ProductVariant[] = [];

            const makeDefault = (attrs: Attribute[]): ProductVariant => ({
                price: 0,
                stock: 0,
                weight: 0,
                dimension: { length: 0, width: 0, height: 0 },
                imageVariant: null,
                attributes: normalizeAttributes(
                    attrs,
                    [variant1, variant2].filter(Boolean),
                ),
            });

            if (variant1 && variant1Options.length && !variant2) {
                for (const o1 of variant1Options) {
                    const attrs = normalizeAttributes(
                        [{ name: variant1, value: o1 }],
                        [variant1].filter(Boolean),
                    );
                    const key = stableKey(attrs);
                    out.push(prevMap.get(key) ?? makeDefault(attrs));
                }
            } else if (
                variant1 &&
                variant2 &&
                variant1Options.length &&
                variant2Options.length
            ) {
                for (const o1 of variant1Options) {
                    for (const o2 of variant2Options) {
                        const attrs = normalizeAttributes(
                            [
                                { name: variant1, value: o1 },
                                { name: variant2, value: o2 },
                            ],
                            [variant1, variant2].filter(Boolean),
                        );
                        const key = stableKey(attrs);
                        out.push(prevMap.get(key) ?? makeDefault(attrs));
                    }
                }
            }

            if (
                out.length === prev.length &&
                out.every(
                    (v, i) =>
                        stableKey(v.attributes ?? []) ===
                        stableKey(prev[i].attributes ?? []),
                )
            ) {
                return prev;
            }

            return out.length ? out : prev;
        });
    }, [variant1, variant2, variant1Options, variant2Options]);

    const handlePriceChangeVariant = (attrs: Attribute[], price: number) => {
        if (price < 0) return;
        setVariantCombinations((prev) =>
            prev.map((v) =>
                isSameAttributes(v.attributes ?? [], attrs)
                    ? { ...v, price }
                    : v,
            ),
        );
    };

    const handleStockChangeVariant = (attrs: Attribute[], stock: number) => {
        if (stock < 0) return;
        setVariantCombinations((prev) =>
            prev.map((v) =>
                isSameAttributes(v.attributes ?? [], attrs)
                    ? { ...v, stock }
                    : v,
            ),
        );
    };

    const handleDimensionChangeVariant = (
        attrs: Attribute[],
        partialDim: Partial<Dimension>,
    ) => {
        setVariantCombinations((prev) =>
            prev.map((v) =>
                isSameAttributes(v.attributes ?? [], attrs)
                    ? {
                          ...v,
                          dimension: {
                              ...(v.dimension ?? {
                                  length: 0,
                                  width: 0,
                                  height: 0,
                              }),
                              ...partialDim,
                          } as Dimension,
                      }
                    : v,
            ),
        );
    };

    const handleWeightChangeVariant = (attrs: Attribute[], weight: number) => {
        if (weight < 0) return;
        setVariantCombinations((prev) =>
            prev.map((v) =>
                isSameAttributes(v.attributes ?? [], attrs)
                    ? { ...v, weight }
                    : v,
            ),
        );
    };

    const handleImageVariantChange = (
        attrs: Attribute[],
        file?: File | null,
    ) => {
        const converted: File | string | null = file ?? null;

        const variant1Value = attrs.find((a) => a.name === variant1)?.value;

        setVariantCombinations((prev) =>
            prev.map((v) => {
                const vValue = v.attributes?.find(
                    (a) => a.name === variant1,
                )?.value;
                if (vValue === variant1Value) {
                    return { ...v, imageVariant: converted };
                }
                return v;
            }),
        );
    };

    const groupedCombinations = useMemo(() => {
        if (!variant1) return {};
        const groups: Record<string, ProductVariant[]> = {};
        variantCombinations.forEach((v) => {
            const opt1 = v.attributes?.find((a) => a.name === variant1)?.value;
            if (!opt1) return;
            if (!groups[opt1]) groups[opt1] = [];
            groups[opt1].push(v);
        });
        return groups;
    }, [variantCombinations, variant1]);

    const handleRemoveVariant1 = () => {
        setShowVariant1(false);
        setShowVariant2(false);
        setVariant1('');
        setVariant1Options([]);
        setVariant2('');
        setVariant2Options([]);
        setVariantCombinations([
            {
                price: 0,
                stock: 0,
                weight: 0,
                dimension: { length: 0, width: 0, height: 0 },
                imageVariant: null,
                attributes: [],
            },
        ]);
    };

    return (
        <div className="bg-white rounded shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Thông tin bán hàng</h2>

            {/* Variant loại 1 */}
            {mode === 'add' && !showVariant1 ? (
                <>
                    <button
                        onClick={() => setShowVariant1(true)}
                        className="border border-dashed border-red-400 text-red-500 px-4 py-2 cursor-pointer rounded"
                    >
                        + Thêm nhóm phân loại
                    </button>

                    {/* Price, Stock, Weight */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                        <div>
                            <label className="block font-medium mb-1">
                                * Giá
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Nhập vào"
                                    className="border border-gray-500 rounded p-2 w-full pr-10"
                                    value={variantCombinations[0]?.price ?? 0}
                                    onChange={(e) =>
                                        setVariantCombinations((prev) => {
                                            const copy = [...prev];
                                            copy[0] = {
                                                ...copy[0],
                                                price: Number(e.target.value),
                                            };
                                            return copy;
                                        })
                                    }
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    ₫
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">
                                * Kho hàng
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border border-gray-500 x  rounded p-2 w-full pr-10"
                                    value={variantCombinations[0]?.stock ?? 0}
                                    onChange={(e) =>
                                        setVariantCombinations((prev) => {
                                            const copy = [...prev];
                                            copy[0] = {
                                                ...copy[0],
                                                stock: Number(e.target.value),
                                            };
                                            return copy;
                                        })
                                    }
                                    onKeyDown={handleNumberKeyDown}
                                />
                                <span className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-sm">
                                    cái
                                </span>
                            </div>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">
                                Cân nặng
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border border-gray-500 x rounded p-2 w-full pr-12"
                                    value={variantCombinations[0]?.weight ?? 0}
                                    onChange={(e) =>
                                        setVariantCombinations((prev) => {
                                            const copy = [...prev];
                                            copy[0] = {
                                                ...copy[0],
                                                weight: Number(e.target.value),
                                            };
                                            return copy;
                                        })
                                    }
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
                            <label className="block font-medium mb-1">
                                Dài
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border border-gray-500 x rounded p-2 w-full pr-10"
                                    value={
                                        variantCombinations[0]?.dimension
                                            ?.length ?? ''
                                    }
                                    onChange={(e) =>
                                        setVariantCombinations((prev) => {
                                            const copy = [...prev];
                                            const dim = copy[0]?.dimension ?? {
                                                length: 0,
                                                width: 0,
                                                height: 0,
                                            };
                                            copy[0] = {
                                                ...copy[0],
                                                dimension: {
                                                    ...dim,
                                                    length: Number(
                                                        e.target.value,
                                                    ),
                                                },
                                            };
                                            return copy;
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
                            <label className="block font-medium mb-1">
                                Rộng
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border border-gray-500 x rounded p-2 w-full pr-10"
                                    value={
                                        variantCombinations[0]?.dimension
                                            ?.width ?? ''
                                    }
                                    onChange={(e) =>
                                        setVariantCombinations((prev) => {
                                            const copy = [...prev];
                                            const dim = copy[0]?.dimension ?? {
                                                length: 0,
                                                width: 0,
                                                height: 0,
                                            };
                                            copy[0] = {
                                                ...copy[0],
                                                dimension: {
                                                    ...dim,
                                                    width: Number(
                                                        e.target.value,
                                                    ),
                                                },
                                            };
                                            return copy;
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
                            <label className="block font-medium mb-1">
                                Cao
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="border border-gray-500 x rounded p-2 w-full pr-10"
                                    value={
                                        variantCombinations[0]?.dimension
                                            ?.height ?? ''
                                    }
                                    onChange={(e) =>
                                        setVariantCombinations((prev) => {
                                            const copy = [...prev];
                                            const dim = copy[0]?.dimension ?? {
                                                length: 0,
                                                width: 0,
                                                height: 0,
                                            };
                                            copy[0] = {
                                                ...copy[0],
                                                dimension: {
                                                    ...dim,
                                                    height: Number(
                                                        e.target.value,
                                                    ),
                                                },
                                            };
                                            return copy;
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
                    otherVariantName={variant2}
                    mode={mode}
                />
            )}

            {/* Variant loại 2 */}
            {mode === 'add' && showVariant1 && !showVariant2 && (
                <button
                    onClick={() => setShowVariant2(true)}
                    className="mt-4 border border-dashed border-red-400 text-red-500 px-4 py-2 rounded cursor-pointer"
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
                        otherVariantName={variant1}
                        mode={mode}
                    />
                </>
            )}

            {showVariant1 && (
                <div className="overflow-x-auto">
                    <table className="table-auto border-separate border-spacing-1.5 border border-gray-300 rounded mt-4 min-w-max">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                                    {variant1}
                                </th>
                                {variant2 && variant2Options && (
                                    <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                                        {variant2}
                                    </th>
                                )}
                                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                                    Giá
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                                    Kho hàng
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                                    Kích thước (cm)
                                </th>
                                <th className="border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700">
                                    Cân nặng (gram)
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {Object.entries(groupedCombinations).map(
                                ([option1, combos]) =>
                                    (combos as ProductVariant[]).map(
                                        (combo, index) => (
                                            <tr
                                                key={stableKey(
                                                    combo.attributes ?? [],
                                                )}
                                            >
                                                {index === 0 && (
                                                    <td
                                                        className="border border-gray-200  px-2 py-1"
                                                        rowSpan={
                                                            (
                                                                combos as ProductVariant[]
                                                            ).length
                                                        }
                                                    >
                                                        <div className="flex flex-col items-center space-y-1">
                                                            <span>
                                                                {option1}
                                                            </span>

                                                            {/* Nút chọn ảnh */}
                                                            <label className="cursor-pointer">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    className="hidden"
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handleImageVariantChange(
                                                                            combo.attributes ??
                                                                                [],
                                                                            e
                                                                                .target
                                                                                .files?.[0] ??
                                                                                null,
                                                                        )
                                                                    }
                                                                />
                                                                <div className="w-[60px] h-[60px] border border-dashed rounded flex items-center justify-center">
                                                                    {combo.imageVariant ? (
                                                                        typeof combo.imageVariant ===
                                                                        'string' ? (
                                                                            <Image
                                                                                src={
                                                                                    combo.imageVariant
                                                                                }
                                                                                className="object-cover w-full h-full rounded"
                                                                                alt="Image Variant"
                                                                                width={
                                                                                    60
                                                                                }
                                                                                height={
                                                                                    60
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <Image
                                                                                src={URL.createObjectURL(
                                                                                    combo.imageVariant,
                                                                                )}
                                                                                className="object-cover w-full h-full rounded"
                                                                                alt="Image Variant"
                                                                                width={
                                                                                    60
                                                                                }
                                                                                height={
                                                                                    60
                                                                                }
                                                                            />
                                                                        )
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
                                                {variant2 && (
                                                    <td className="border border-gray-200 text-center justify-center align-middle px-2 py-1">
                                                        {
                                                            combo.attributes?.find(
                                                                (a) =>
                                                                    a.name ===
                                                                    variant2,
                                                            )?.value
                                                        }
                                                    </td>
                                                )}
                                                <td className="border border-gray-200 px-2 py-1">
                                                    <input
                                                        type="number"
                                                        value={combo.price}
                                                        onChange={(e) =>
                                                            handlePriceChangeVariant(
                                                                combo.attributes ??
                                                                    [],
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className="table-input"
                                                    />
                                                </td>
                                                <td className="border border-gray-200 px-2 py-1">
                                                    <input
                                                        type="number"
                                                        value={combo.stock}
                                                        onChange={(e) =>
                                                            handleStockChangeVariant(
                                                                combo.attributes ??
                                                                    [],
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className="table-input"
                                                    />
                                                </td>

                                                {/* Dimension (dài, rộng, cao) */}
                                                <td className="border border-gray-200 px-2 py-1">
                                                    <div className="grid grid-cols-3 gap-1">
                                                        {dimensions.map(
                                                            (dim) => (
                                                                <div
                                                                    key={
                                                                        dim.key
                                                                    }
                                                                    className="relative w-full"
                                                                >
                                                                    <span className="absolute -top-2 left-1 text-[10px] text-gray-500 bg-white px-0.5">
                                                                        {
                                                                            dim.label
                                                                        }
                                                                    </span>
                                                                    <input
                                                                        type="number"
                                                                        value={
                                                                            combo
                                                                                .dimension?.[
                                                                                dim
                                                                                    .key
                                                                            ] ??
                                                                            ''
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) => {
                                                                            const raw =
                                                                                e
                                                                                    .target
                                                                                    .value;
                                                                            const parsed =
                                                                                raw ===
                                                                                ''
                                                                                    ? 0
                                                                                    : Number(
                                                                                          raw,
                                                                                      );
                                                                            handleDimensionChangeVariant(
                                                                                combo.attributes ??
                                                                                    [],
                                                                                {
                                                                                    [dim.key]:
                                                                                        parsed,
                                                                                },
                                                                            );
                                                                        }}
                                                                        className="table-input"
                                                                    />
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="border border-gray-200  px-2 py-1">
                                                    <input
                                                        type="number"
                                                        value={combo.weight}
                                                        onChange={(e) =>
                                                            handleWeightChangeVariant(
                                                                combo.attributes ??
                                                                    [],
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                        className="table-input"
                                                    />
                                                </td>
                                            </tr>
                                        ),
                                    ),
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SalesInfo;
