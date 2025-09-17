'use client';

import { useEffect, useState } from 'react';
import { useAlertStore } from '~/store/zustand/alertStore';

type Province = { code: number; name: string };
type District = { code: number; name: string };
type Ward = { code: number; name: string };

type Address = {
    id: string;
    name: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    street: string;
    isDefault?: boolean;
};

export default function CreateShopMultiStep() {
    const [step, setStep] = useState<number>(1);

    // Step 1 fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [addressModalOpen, setAddressModalOpen] = useState(false);

    // Step 2 - shop info
    const [description, setDescription] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    // Step 3 - tax / business
    const [isMall, setIsMall] = useState(false);
    const [taxCode, setTaxCode] = useState('');
    const [taxFile, setTaxFile] = useState<File | null>(null);
    const [taxFilePreview, setTaxFilePreview] = useState<string | null>(null);

    // Step 4 - identity verification
    const [idType, setIdType] = useState<'CITIZEN' | 'PASSPORT'>('CITIZEN');
    const [idName, setIdName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [idFront, setIdFront] = useState<File | null>(null);
    const [idBack, setIdBack] = useState<File | null>(null);
    const [selfie, setSelfie] = useState<File | null>(null);
    const [previewIdFront, setPreviewIdFront] = useState<string | null>(null);
    const [previewIdBack, setPreviewIdBack] = useState<string | null>(null);
    const [previewSelfie, setPreviewSelfie] = useState<string | null>(null);

    // errors
    const [errors, setErrors] = useState<Record<string, string>>({});

    // update previews
    useEffect(() => {
        if (!logoFile) return setLogoPreview(null);
        const url = URL.createObjectURL(logoFile);
        setLogoPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [logoFile]);

    useEffect(() => {
        if (!taxFile) return setTaxFilePreview(null);
        const url = URL.createObjectURL(taxFile);
        setTaxFilePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [taxFile]);

    useEffect(() => {
        if (!idFront) return setPreviewIdFront(null);
        const url = URL.createObjectURL(idFront);
        setPreviewIdFront(url);
        return () => URL.revokeObjectURL(url);
    }, [idFront]);

    useEffect(() => {
        if (!idBack) return setPreviewIdBack(null);
        const url = URL.createObjectURL(idBack);
        setPreviewIdBack(url);
        return () => URL.revokeObjectURL(url);
    }, [idBack]);

    useEffect(() => {
        if (!selfie) return setPreviewSelfie(null);
        const url = URL.createObjectURL(selfie);
        setPreviewSelfie(url);
        return () => URL.revokeObjectURL(url);
    }, [selfie]);

    // Basic validators per step
    const validateStep = (s: number) => {
        const e: Record<string, string> = {};
        if (s === 1) {
            if (!name.trim()) e.name = 'Tên shop bắt buộc';
            if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
                e.email = 'Email không hợp lệ';
            if (!phone.trim() || phone.trim().length < 7)
                e.phone = 'SĐT không hợp lệ';
            if (addresses.length === 0)
                e.addresses = 'Phải có ít nhất 1 địa chỉ lấy hàng';
        } else if (s === 2) {
            if (!description.trim()) e.description = 'Mô tả shop nên có';
        } else if (s === 3) {
            if (isMall && !taxCode.trim()) e.taxCode = 'Mall cần mã số thuế';
        } else if (s === 4) {
            if (!idName.trim()) e.idName = 'Tên trên giấy tờ bắt buộc';
            if (!idNumber.trim()) e.idNumber = 'Số ID/Passport bắt buộc';
            if (!idFront || !selfie)
                e.idDocs = 'Cần ít nhất ảnh mặt trước của giấy tờ và selfie';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const goNext = () => {
        if (validateStep(step)) setStep((p) => Math.min(5, p + 1));
    };
    const goBack = () => setStep((p) => Math.max(1, p - 1));

    const handleFinalSubmit = () => {
        // Validate all once more
        const ok =
            validateStep(1) &&
            validateStep(2) &&
            validateStep(3) &&
            validateStep(4);
        if (!ok) {
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'Có lỗi trong form. Kiểm tra lại các bước.',
            });
            return;
        }

        const payload = {
            name,
            email,
            phone,
            addresses,
            description,
            logoFile: logoFile ? logoFile.name : null,
            isMall,
            taxCode,
            taxFile: taxFile ? taxFile.name : null,
            identity: {
                idType,
                idName,
                idNumber,
                idFront: idFront ? idFront.name : null,
                idBack: idBack ? idBack.name : null,
                selfie: selfie ? selfie.name : null,
            },
        };

        console.log('=== Shop payload ===', payload);
        useAlertStore.getState().showAlert({
            severity: 'success',
            message:
                'Đăng ký hoàn tất (mock). Kiểm tra console để xem payload.',
        });
        // reset or navigate
    };

    // remove address helper
    const removeAddress = (id: string) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    // set default address
    const toggleDefaultAddress = (id: string) => {
        setAddresses((prev) =>
            prev.map((a) => ({ ...a, isDefault: a.id === id })),
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
                {/* progress */}
                <div className="mb-6">
                    <ProgressBar step={step} />
                </div>

                {/* content */}
                <div>
                    {step === 1 && (
                        <Step1
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            phone={phone}
                            setPhone={setPhone}
                            addresses={addresses}
                            openAddressModal={() => setAddressModalOpen(true)}
                            removeAddress={removeAddress}
                            toggleDefaultAddress={toggleDefaultAddress}
                            errors={errors}
                        />
                    )}

                    {step === 2 && (
                        <Step2
                            description={description}
                            setDescription={setDescription}
                            logoFile={logoFile}
                            setLogoFile={setLogoFile}
                            logoPreview={logoPreview}
                        />
                    )}

                    {step === 3 && (
                        <Step3
                            isMall={isMall}
                            setIsMall={setIsMall}
                            taxCode={taxCode}
                            setTaxCode={setTaxCode}
                            taxFile={taxFile}
                            setTaxFile={setTaxFile}
                            taxFilePreview={taxFilePreview}
                            errors={errors}
                        />
                    )}

                    {step === 4 && (
                        <Step4
                            idType={idType}
                            setIdType={setIdType}
                            idName={idName}
                            setIdName={setIdName}
                            idNumber={idNumber}
                            setIdNumber={setIdNumber}
                            setIdFront={setIdFront}
                            setIdBack={setIdBack}
                            setSelfie={setSelfie}
                            previewIdFront={previewIdFront}
                            previewIdBack={previewIdBack}
                            previewSelfie={previewSelfie}
                            errors={errors}
                        />
                    )}

                    {step === 5 && (
                        <Step5
                            summary={{
                                name,
                                email,
                                phone,
                                addresses,
                                description,
                                logoPreview,
                                isMall,
                                taxCode,
                                taxFilePreview,
                                idType,
                                idName,
                                idNumber,
                                previewIdFront,
                                previewIdBack,
                                previewSelfie,
                            }}
                        />
                    )}
                </div>

                {/* navigation */}
                <div className="mt-6 flex items-center justify-between">
                    <div>
                        {step > 1 && (
                            <button
                                onClick={goBack}
                                className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
                            >
                                ← Quay lại
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {step < 5 ? (
                            <button
                                onClick={goNext}
                                className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Tiếp theo →
                            </button>
                        ) : (
                            <button
                                onClick={handleFinalSubmit}
                                className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                            >
                                Hoàn tất
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Address modal */}
            {addressModalOpen && (
                <AddressModal
                    onClose={() => setAddressModalOpen(false)}
                    onAdd={(addr) => {
                        setAddresses((prev) => {
                            // set as default if first
                            const isDefault =
                                prev.length === 0
                                    ? true
                                    : (addr.isDefault ?? false);
                            const next = [
                                ...prev,
                                { ...addr, id: cryptoRandomId(), isDefault },
                            ];
                            // ensure single default
                            if (isDefault) {
                                return next.map((a) => ({
                                    ...a,
                                    isDefault: a.id === addr.id,
                                }));
                            }
                            return next;
                        });
                        setAddressModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

/* ------------------------
   Subcomponents
   ------------------------ */

function ProgressBar({ step }: { step: number }) {
    const labels = [
        'Thông tin cơ bản',
        'Mô tả shop',
        'Thuế & doanh nghiệp',
        'Xác minh',
        'Hoàn tất',
    ];
    return (
        <div>
            <div className="flex items-center gap-4">
                {labels.map((l, i) => {
                    const idx = i + 1;
                    const active = idx === step;
                    const done = idx < step;
                    return (
                        <div key={l} className="flex items-center gap-3">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-white ${
                                    done
                                        ? 'bg-green-500'
                                        : active
                                          ? 'bg-blue-600'
                                          : 'bg-gray-300'
                                }`}
                            >
                                {done ? '✓' : idx}
                            </div>
                            <div className="hidden sm:block text-sm">{l}</div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-3 h-2 bg-gray-200 rounded">
                <div
                    className="h-2 bg-blue-600 rounded"
                    style={{ width: `${((step - 1) / (5 - 1)) * 100}%` }}
                />
            </div>
        </div>
    );
}

function Step1({
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    addresses,
    openAddressModal,
    removeAddress,
    toggleDefaultAddress,
    errors,
}: {
    name: string;
    setName: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
    addresses: Address[];
    openAddressModal: () => void;
    removeAddress: (id: string) => void;
    toggleDefaultAddress: (id: string) => void;
    errors: Record<string, string>;
}) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Step 1 — Thông tin cơ bản & địa chỉ lấy hàng
            </h3>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Tên shop
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded p-2"
                        placeholder="Tên shop"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded p-2"
                            placeholder="email@domain.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số điện thoại
                        </label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border rounded p-2"
                            placeholder="0123xxxxxx"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium">
                            Địa chỉ lấy hàng
                        </label>
                        <button
                            type="button"
                            onClick={openAddressModal}
                            className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
                        >
                            Thêm địa chỉ
                        </button>
                    </div>

                    {addresses.length === 0 ? (
                        <div className="text-sm text-gray-500">
                            Chưa có địa chỉ nào. Thêm để tiếp tục.
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {addresses.map((a) => (
                                <li
                                    key={a.id}
                                    className="flex items-center justify-between border rounded p-2"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {a.name}{' '}
                                            {a.isDefault && (
                                                <span className="text-xs bg-green-100 px-2 ml-2 rounded">
                                                    Mặc định
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {a.phone} • {a.street}, {a.ward},{' '}
                                            {a.district}, {a.city}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!a.isDefault && (
                                            <button
                                                onClick={() =>
                                                    toggleDefaultAddress(a.id)
                                                }
                                                className="text-sm text-blue-600"
                                            >
                                                Đặt mặc định
                                            </button>
                                        )}
                                        <button
                                            onClick={() => removeAddress(a.id)}
                                            className="text-sm text-red-500"
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    {errors.addresses && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.addresses}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Step2({
    description,
    setDescription,
    logoFile,
    setLogoFile,
    logoPreview,
}: {
    description: string;
    setDescription: (v: string) => void;
    logoFile: File | null;
    setLogoFile: (f: File | null) => void;
    logoPreview: string | null;
}) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Step 2 — Thông tin về shop
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Mô tả ngắn
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="w-full border rounded p-2"
                        placeholder="Mô tả shop, sản phẩm chủ lực, chính sách..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Logo (upload)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setLogoFile(e.target.files?.[0] ?? null)
                        }
                        className="block"
                    />
                    {logoPreview ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={logoPreview}
                            alt="logo"
                            className="w-28 h-28 object-cover rounded mt-3 border"
                        />
                    ) : (
                        <div className="text-sm text-gray-500 mt-2">
                            Chưa có ảnh
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function Step3({
    isMall,
    setIsMall,
    taxCode,
    setTaxCode,
    taxFile,
    setTaxFile,
    taxFilePreview,
    errors,
}: {
    isMall: boolean;
    setIsMall: (v: boolean) => void;
    taxCode: string;
    setTaxCode: (v: string) => void;
    taxFile: File | null;
    setTaxFile: (f: File | null) => void;
    taxFilePreview: string | null;
    errors: Record<string, string>;
}) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Step 3 — Thông tin thuế / doanh nghiệp
            </h3>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <input
                        id="isMall"
                        type="checkbox"
                        checked={isMall}
                        onChange={(e) => setIsMall(e.target.checked)}
                    />
                    <label htmlFor="isMall" className="text-sm">
                        Đăng ký là Mall (cần mã số thuế)
                    </label>
                </div>

                {isMall && (
                    <>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Mã số thuế
                            </label>
                            <input
                                value={taxCode}
                                onChange={(e) => setTaxCode(e.target.value)}
                                className="w-full border rounded p-2"
                            />
                            {errors.taxCode && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.taxCode}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Giấy tờ thuế (upload, nếu có)
                            </label>
                            <input
                                type="file"
                                accept="application/pdf,image/*"
                                onChange={(e) =>
                                    setTaxFile(e.target.files?.[0] ?? null)
                                }
                            />
                            {taxFilePreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={taxFilePreview}
                                    alt="tax"
                                    className="w-40 h-32 object-cover mt-2 border rounded"
                                />
                            ) : (
                                <div className="text-sm text-gray-500 mt-2">
                                    Chưa có file
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

function Step4({
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
}: {
    idType: 'CITIZEN' | 'PASSPORT';
    setIdType: (v: 'CITIZEN' | 'PASSPORT') => void;
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
}) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Step 4 — Xác minh định danh
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="text-sm block mb-1">Loại giấy tờ</label>
                    <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value as any)}
                        className="border rounded p-2"
                    >
                        <option value="CITIZEN">
                            Chứng minh nhân dân / Căn cước
                        </option>
                        <option value="PASSPORT">Hộ chiếu</option>
                    </select>
                </div>

                <div>
                    <label className="text-sm block mb-1">
                        Họ tên (trên giấy tờ)
                    </label>
                    <input
                        value={idName}
                        onChange={(e) => setIdName(e.target.value)}
                        className="w-full border rounded p-2"
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
                        onChange={(e) => setIdNumber(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                    {errors.idNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.idNumber}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="text-sm block mb-1">
                            Ảnh giấy tờ (mặt trước)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setIdFront(e.target.files?.[0] ?? null)
                            }
                        />
                        {previewIdFront && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={previewIdFront}
                                alt="front"
                                className="w-full h-32 object-cover mt-2 border rounded"
                            />
                        )}
                    </div>
                    <div>
                        <label className="text-sm block mb-1">
                            Ảnh giấy tờ (mặt sau)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setIdBack(e.target.files?.[0] ?? null)
                            }
                        />
                        {previewIdBack && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={previewIdBack}
                                alt="back"
                                className="w-full h-32 object-cover mt-2 border rounded"
                            />
                        )}
                    </div>
                    <div>
                        <label className="text-sm block mb-1">
                            Selfie (cầm giấy tờ)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setSelfie(e.target.files?.[0] ?? null)
                            }
                        />
                        {previewSelfie && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={previewSelfie}
                                alt="selfie"
                                className="w-full h-32 object-cover mt-2 border rounded"
                            />
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

function Step5({ summary }: { summary: any }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Step 5 — Xác nhận & Hoàn tất
            </h3>

            <div className="space-y-3">
                <div>
                    <div className="font-medium">Tên shop</div>
                    <div className="text-gray-700">{summary.name}</div>
                </div>

                <div>
                    <div className="font-medium">Email / SĐT</div>
                    <div className="text-gray-700">
                        {summary.email} • {summary.phone}
                    </div>
                </div>

                <div>
                    <div className="font-medium">Địa chỉ lấy hàng</div>
                    <div className="text-gray-700">
                        {summary.addresses.length === 0 ? (
                            'Chưa có'
                        ) : (
                            <ul className="list-disc ml-6">
                                {summary.addresses.map((a: Address) => (
                                    <li key={a.id}>
                                        {a.name} — {a.phone} — {a.street},{' '}
                                        {a.ward}, {a.district}, {a.city}{' '}
                                        {a.isDefault && '(Mặc định)'}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div>
                    <div className="font-medium">Mô tả shop</div>
                    <div className="text-gray-700">
                        {summary.description || '-'}
                    </div>
                </div>

                <div>
                    <div className="font-medium">Thuế / Mall</div>
                    <div className="text-gray-700">
                        {summary.isMall
                            ? `Mall — MST: ${summary.taxCode || '-'}`
                            : 'Không'}
                    </div>
                </div>

                <div>
                    <div className="font-medium">Xác minh</div>
                    <div className="text-gray-700">
                        {summary.idType} — {summary.idName} — {summary.idNumber}
                    </div>
                </div>

                <div className="mt-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" required />
                        <span className="text-sm text-gray-700">
                            Tôi xác nhận thông tin trên là đúng
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
}

/* ---------------------------
   Address Modal component
   --------------------------- */

function AddressModal({
    onClose,
    onAdd,
}: {
    onClose: () => void;
    onAdd: (addr: Address) => void;
}) {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);

    const [form, setForm] = useState({
        name: '',
        phone: '',
        province: '',
        district: '',
        ward: '',
        street: '',
        isDefault: false,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/p/')
            .then((r) => r.json())
            .then((data) => setProvinces(data))
            .catch(() => setProvinces([]));
    }, []);

    useEffect(() => {
        if (!form.province) return;
        fetch(`https://provinces.open-api.vn/api/p/${form.province}?depth=2`)
            .then((r) => r.json())
            .then((data) => setDistricts(data.districts || []))
            .catch(() => setDistricts([]));
        setForm((p) => ({ ...p, district: '', ward: '' }));
        setWards([]);
    }, [form.province]);

    useEffect(() => {
        if (!form.district) return;
        fetch(`https://provinces.open-api.vn/api/d/${form.district}?depth=2`)
            .then((r) => r.json())
            .then((data) => setWards(data.wards || []))
            .catch(() => setWards([]));
        setForm((p) => ({ ...p, ward: '' }));
    }, [form.district]);

    const handle = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setForm((p) => ({
            ...p,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const city =
            provinces.find((p) => p.code === parseInt(form.province))?.name ||
            '';
        const district =
            districts.find((d) => d.code === parseInt(form.district))?.name ||
            '';
        const ward =
            wards.find((w) => w.code === parseInt(form.ward))?.name || '';

        const addr: Address = {
            id: cryptoRandomId(),
            name: form.name,
            phone: form.phone,
            city,
            district,
            ward,
            street: form.street,
            isDefault: form.isDefault,
        };

        // small delay to simulate processing
        setTimeout(() => {
            onAdd(addr);
            setLoading(false);
        }, 300);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                        Thêm địa chỉ lấy hàng
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm block mb-1">
                                Người nhận
                            </label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handle}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm block mb-1">
                                Số điện thoại
                            </label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handle}
                                className="w-full border rounded p-2"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="text-sm block mb-1">
                                Tỉnh/Thành
                            </label>
                            <select
                                name="province"
                                value={form.province}
                                onChange={handle}
                                className="w-full border rounded p-2"
                                required
                            >
                                <option value="">Chọn tỉnh</option>
                                {provinces.map((p) => (
                                    <option key={p.code} value={p.code}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm block mb-1">
                                Quận/Huyện
                            </label>
                            <select
                                name="district"
                                value={form.district}
                                onChange={handle}
                                className="w-full border rounded p-2"
                                required
                                disabled={!form.province}
                            >
                                <option value="">Chọn quận</option>
                                {districts.map((d) => (
                                    <option key={d.code} value={d.code}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm block mb-1">
                                Phường/Xã
                            </label>
                            <select
                                name="ward"
                                value={form.ward}
                                onChange={handle}
                                className="w-full border rounded p-2"
                                required
                                disabled={!form.district}
                            >
                                <option value="">Chọn phường</option>
                                {wards.map((w) => (
                                    <option key={w.code} value={w.code}>
                                        {w.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm block mb-1">
                            Địa chỉ chi tiết
                        </label>
                        <input
                            name="street"
                            value={form.street}
                            onChange={handle}
                            className="w-full border rounded p-2"
                            placeholder="Số nhà, tên đường..."
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            id="isDefault"
                            name="isDefault"
                            type="checkbox"
                            checked={form.isDefault}
                            onChange={handle}
                        />
                        <label htmlFor="isDefault" className="text-sm">
                            Đặt là địa chỉ mặc định
                        </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded border"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded bg-blue-600 text-white"
                        >
                            {loading ? 'Đang thêm...' : 'Thêm địa chỉ'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ---------------------------
   Helpers
   --------------------------- */

function cryptoRandomId() {
    // cross-browser small id
    return Math.random().toString(36).slice(2, 9);
}
