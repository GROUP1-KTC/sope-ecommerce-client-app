// components/CreateShopMultiStep/Step4.tsx
interface Step4Props {
    idType: 'CITIZEN_IDENTIFICATION' | 'PASSPORT';
    setIdType: (v: 'CITIZEN_IDENTIFICATION' | 'PASSPORT') => void;
    idName: string;
    setIdName: (v: string) => void;
    idNumber: string;
    setIdNumber: (v: string) => void;
    setIdFront: (f: File | null) => void;
    setIdBack: (f: File | null) => void;
    setSelfie: (f: File | null) => void;
    previewIdFront: string | null;
    previewIdBack: string | null;
    previewSelfie: string | null;
    errors: Record<string, string>;
}

export default function Step4({
    idType,
    setIdType,
    idName,
    setIdName,
    idNumber,
    setIdNumber,
    setIdFront,
    setIdBack,
    setSelfie,
    previewIdFront,
    previewIdBack,
    previewSelfie,
    errors,
}: Step4Props) {
    const handleFileChange = (
        fileSetter: (f: File | null) => void,
        previewSetter: (s: string | null) => void,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0] ?? null;
        fileSetter(file);
        if (file && file.type.startsWith('image/')) {
            previewSetter(URL.createObjectURL(file));
        } else {
            previewSetter(null);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Xác minh định danh</h3>

            <div className="space-y-4">
                <div>
                    <label className="text-sm block mb-1 font-medium">
                        Loại giấy tờ
                    </label>
                    <div className="relative">
                        <select
                            value={idType}
                            onChange={(e) =>
                                setIdType(
                                    e.target.value as
                                    | 'CITIZEN_IDENTIFICATION'
                                    | 'PASSPORT',
                                )
                            }
                            className="block w-full appearance-none border border-gray-300 rounded-md px-3 py-2 pr-8 bg-white text-gray-700 shadow-sm focus:outline-none"
                        >
                            <option value="CITIZEN_IDENTIFICATION">
                                Chứng minh nhân dân / Căn cước
                            </option>
                            <option value="PASSPORT">Hộ chiếu</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-sm block mb-1">
                        Họ tên (trên giấy tờ)
                    </label>
                    <input
                        value={idName}
                        onChange={(e) => setIdName(e.target.value)}
                        className="w-full border rounded p-2 border-gray-300"
                    />
                    {errors.idName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.idName}
                        </p>
                    )}
                </div>

                <div>
                    <label className="text-sm block mb-1">Số giấy tờ</label>
                    <input
                        value={idNumber}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ''); 
                            setIdNumber(value);
                        }}
                        className="w-full border rounded p-2 border-gray-300"
                    />

                    {errors.idNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.idNumber}
                        </p>
                    )}
                </div>

                {/* Upload ảnh */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Mặt trước */}
                    <div>
                        <label className="text-sm block mb-1">
                            Ảnh giấy tờ (mặt trước)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="id-front-upload"
                            className="hidden"
                            onChange={(e) =>
                                handleFileChange(setIdFront, () => { }, e)
                            }
                        />
                        <label
                            htmlFor="id-front-upload"
                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            {previewIdFront ? 'Đổi ảnh' : 'Chọn ảnh'}
                        </label>
                        {previewIdFront ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={previewIdFront}
                                alt="front"
                                className="w-full h-32 object-cover mt-2 border rounded"
                            />
                        ) : (
                            <div className="text-sm text-gray-500 mt-2">
                                Chưa có ảnh
                            </div>
                        )}
                    </div>

                    {/* Mặt sau */}
                    <div>
                        <label className="text-sm block mb-1">
                            Ảnh giấy tờ (mặt sau)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="id-back-upload"
                            className="hidden"
                            onChange={(e) =>
                                handleFileChange(setIdBack, () => { }, e)
                            }
                        />
                        <label
                            htmlFor="id-back-upload"
                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            {previewIdBack ? 'Đổi ảnh' : 'Chọn ảnh'}
                        </label>
                        {previewIdBack ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={previewIdBack}
                                alt="back"
                                className="w-full h-32 object-cover mt-2 border rounded"
                            />
                        ) : (
                            <div className="text-sm text-gray-500 mt-2">
                                Chưa có ảnh
                            </div>
                        )}
                    </div>

                    {/* Selfie */}
                    <div>
                        <label className="text-sm block mb-1">
                            Selfie (cầm giấy tờ)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            id="selfie-upload"
                            className="hidden"
                            onChange={(e) =>
                                handleFileChange(setSelfie, () => { }, e)
                            }
                        />
                        <label
                            htmlFor="selfie-upload"
                            className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            {previewSelfie ? 'Đổi ảnh' : 'Chọn ảnh'}
                        </label>
                        {previewSelfie ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={previewSelfie}
                                alt="selfie"
                                className="w-full h-32 object-cover mt-2 border rounded"
                            />
                        ) : (
                            <div className="text-sm text-gray-500 mt-2">
                                Chưa có ảnh
                            </div>
                        )}
                    </div>
                </div>

                {errors.idDocs && (
                    <p className="text-red-500 text-sm mt-1">{errors.idDocs}</p>
                )}
            </div>
        </div>
    );
}
