'use client';

import { useEffect, useState } from 'react';
import type { Address } from './types';
import ProgressBar from './ProgressBar';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import AddressModal from './AddressModal';
import { useCreateShopMutation } from '~/features/shop/shopApi';
import { useAlertStore } from '~/store/zustand/alertStore';

export default function CreateShopMultiStep() {
    const [step, setStep] = useState<number>(1);

    // Step 1 fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState<Address | null>(null);
    const [addressModalOpen, setAddressModalOpen] = useState(false);

    // Step 2 - shop info
    const [description, setDescription] = useState('');
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    // Step 3 - tax / business
    const [taxCode, setTaxCode] = useState('');
    const [taxFile, setTaxFile] = useState<File | null>(null);
    const [taxFilePreview, setTaxFilePreview] = useState<string | null>(null);

    // Step 4 - identity verification
    const [idType, setIdType] = useState<'CITIZEN_IDENTIFICATION' | 'PASSPORT'>(
        'CITIZEN_IDENTIFICATION',
    );
    const [idName, setIdName] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [idFront, setIdFront] = useState<File | null>(null);
    const [idBack, setIdBack] = useState<File | null>(null);
    const [selfie, setSelfie] = useState<File | null>(null);
    const [previewIdFront, setPreviewIdFront] = useState<string | null>(null);
    const [previewIdBack, setPreviewIdBack] = useState<string | null>(null);
    const [previewSelfie, setPreviewSelfie] = useState<string | null>(null);

    // Step 5
    const [createShop] = useCreateShopMutation();

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

    const validateStep = (s: number) => {
        const e: Record<string, string> = {};
        if (s === 1) {
            if (!name.trim()) e.name = 'Tên shop bắt buộc';
            if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
                e.email = 'Email không hợp lệ';
            if (!phone.trim() || phone.trim().length < 10)
                e.phone = 'SĐT không hợp lệ';
            if (!address) e.address = 'Phải có địa chỉ lấy hàng';
        } else if (s === 2) {
            if (!description.trim()) e.description = 'Mô tả shop nên có';
        } else if (s === 3) {
            if (!taxCode.trim()) e.taxCode = 'Mall cần mã số thuế';
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

    const handleFinalSubmit = async () => {
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
        }

        const formData = new FormData();
        formData.append(
            'requestJson',
            JSON.stringify({
                name,
                phone,
                email,
                address,
                description,
                taxCode,
                isMall: false,
                identification: {
                    idType,
                    idName,
                    idNumber,
                },
            }),
        );

        if (logoFile) formData.append('logoFile', logoFile);
        if (taxFile) formData.append('taxFile', taxFile);
        if (idFront) formData.append('idFront', idFront);
        if (idBack) formData.append('idBack', idBack);
        if (selfie) formData.append('selfie', selfie);

        try {
            // log FormData trước khi gửi
            console.log('=== FormData content ===');
            for (const [key, value] of formData.entries()) {
                if (value instanceof File) {
                    console.log(
                        `${key}: File { name: ${value.name}, size: ${value.size}, type: ${value.type} }`,
                    );
                } else {
                    console.log(`${key}: ${value}`);
                }
            }

            const result = await createShop(formData).unwrap();
            console.log('Shop created:', result);
            useAlertStore.getState().showAlert({
                severity: 'success',
                message: 'Đăng ký hoàn tất!',
            });
        } catch (err) {
            console.error(err);
            useAlertStore.getState().showAlert({
                severity: 'error',
                message: 'Có lỗi xảy ra khi tạo shop.',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
            <div className="mb-6">
                <ProgressBar step={step} />
            </div>

            <div>
                {step === 1 && (
                    <Step1
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        address={address}
                        openAddressModal={() => setAddressModalOpen(true)}
                        clearAddress={() => setAddress(null)}
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
                            address,
                            description,
                            logoPreview,
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

            <div className="mt-6 flex items-center justify-between">
                <div>
                    {step > 1 && (
                        <button
                            onClick={goBack}
                            className="px-4 py-3 rounded bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-pointer transition"
                        >
                            Quay lại
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {step < 5 ? (
                        <button
                            onClick={goNext}
                            className="px-5 py-3 rounded bg-red-500 text-white hover:bg-red-600 cursor-pointer transition"
                        >
                            Tiếp theo
                        </button>
                    ) : (
                        <button
                            onClick={handleFinalSubmit}
                            className="px-5 py-3 rounded bg-green-600 text-white hover:bg-green-700 cursor-pointer transition"
                        >
                            Hoàn tất
                        </button>
                    )}
                </div>
            </div>

            {addressModalOpen && (
                <AddressModal
                    onClose={() => setAddressModalOpen(false)}
                    onAdd={(addr) => {
                        setAddress((prev) => {
                            const next = { ...addr, id: cryptoRandomId() };
                            return next;
                        });
                        setAddressModalOpen(false);
                    }}
                />
            )}
        </div>
    );
}

function cryptoRandomId() {
    return Math.random().toString(36).slice(2, 9);
}
