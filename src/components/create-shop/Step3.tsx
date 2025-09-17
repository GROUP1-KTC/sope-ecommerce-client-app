// components/CreateShopMultiStep/Step3.tsx
interface Step3Props {
    taxCode: string;
    setTaxCode: (v: string) => void;
    taxFile: File | null;
    setTaxFile: (f: File | null) => void;
    taxFilePreview: string | null;
    errors: Record<string, string>;
}

export default function Step3({
    taxCode,
    setTaxCode,
    taxFile,
    setTaxFile,
    taxFilePreview,
    errors,
}: Step3Props) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Thông tin thuế / doanh nghiệp
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Mã số thuế <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={taxCode}
                        onChange={(e) => setTaxCode(e.target.value)}
                        className="w-full border rounded p-2 mt-1"
                        placeholder="Nhập mã số thuế"
                    />
                    {errors.taxCode && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.taxCode}
                        </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                        Bạn có thể thực hiện đăng ký mã số thuế trên{' '}
                        <a
                            href="https://thuedientu.gdt.gov.vn/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Cổng thông tin quốc gia về Thuế
                        </a>
                        .
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Giấy tờ thuế (upload, nếu có)
                    </label>

                    <input
                        type="file"
                        accept="application/pdf,image/*"
                        id="tax-upload"
                        className="hidden"
                        onChange={(e) =>
                            setTaxFile(e.target.files?.[0] ?? null)
                        }
                    />

                    <label
                        htmlFor="tax-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {taxFile ? 'Đổi file' : 'Chọn file'}
                    </label>

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
            </div>
        </div>
    );
}
