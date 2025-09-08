import { X } from 'lucide-react';
import OptionInputGroup from './OptionInputGroup';

interface VariantGroupInputProps {
      label: string;
      variantName: string;
      setVariantName: (value: string) => void;
      options: string[];
      setOptions: (options: string[]) => void;
      onRemove?: () => void;
}

export default function VariantGroupInput({
      label,
      variantName,
      setVariantName,
      options,
      setOptions,
      onRemove
}: VariantGroupInputProps) {
      return (
            <div className="bg-gray-200 py-2 px-1">
                  <div className="flex justify-between items-center p-2">
                        <div className="flex items-center w-full">
                              <label className="mr-2 whitespace-nowrap">{label}</label>
                              <input
                                    type="text"
                                    placeholder="Phân loại (ví dụ: Màu sắc, Size...)"
                                    className="w-3/4 border rounded p-1"
                                    value={variantName}
                                    onChange={(e) => setVariantName(e.target.value)}
                              />
                        </div>
                        <button
                              type="button"
                              className="text-gray-400 hover:text-red-500"
                              onClick={onRemove}
                              tabIndex={-1}
                        >
                              <X size={32} />
                        </button>
                  </div>
                  <div className="p-2 flex mb-3">
                        <label className="mr-2 whitespace-nowrap">Tùy chọn</label>
                        <OptionInputGroup options={options} onOptionsChange={setOptions} />
                  </div>
            </div>
      );
}
