import Image from 'next/image';

// components/CreateShopMultiStep/Step2.tsx
interface Step2Props {
    description: string;
    setDescription: (v: string) => void;
    logoFile: File | null;
    setLogoFile: (f: File | null) => void;
    logoPreview: string | null;
}

export default function Step2({
    description,
    setDescription,
    setLogoFile,
    logoPreview,
}: Step2Props) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Thông tin về shop</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Mô tả ngắn
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="w-full border rounded p-2 border-gray-300"
                        placeholder="Mô tả shop, sản phẩm chủ lực, chính sách..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Logo (upload)
                    </label>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        id="logo-upload"
                        className="hidden"
                        onChange={(e) =>
                            setLogoFile(e.target.files?.[0] ?? null)
                        }
                    />

                    {/* Custom button */}
                    <label
                        htmlFor="logo-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Chọn ảnh
                    </label>

                    {/* Preview */}
                    {logoPreview ? (
                        <Image
                            width={112}
                            height={112}
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
