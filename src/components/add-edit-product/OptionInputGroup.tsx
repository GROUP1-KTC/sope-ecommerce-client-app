import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

interface OptionInputGroupProps {
    options: string[];
    onOptionsChange: (options: string[]) => void;
}

const OptionInputGroup = ({ options, onOptionsChange }: OptionInputGroupProps) => {
    const [localOptions, setLocalOptions] = useState([...options, '']);
    const [errorIndex, setErrorIndex] = useState<number | null>(null);

    useEffect(() => {
        setLocalOptions([...options, '']);
    }, [options]);

    const handleChange = (value: string, index: number) => {
        const trimmedValue = value.slice(0, 20);
        const updated = [...localOptions];
        updated[index] = trimmedValue;

        // ✅ Check duplicate (trừ chính nó ra)
        const isDuplicate = updated.some(
            (opt, idx) => idx !== index && opt.trim() !== "" && opt.trim().toLowerCase() === trimmedValue.trim().toLowerCase()
        );

        if (isDuplicate) {
            setErrorIndex(index);
        } else {
            setErrorIndex(null);
        }

        if (index === localOptions.length - 1 && trimmedValue.trim() !== '' && !isDuplicate) {
            updated.push('');
        }

        setLocalOptions(updated);

        if (!isDuplicate) {
            onOptionsChange(updated.filter((opt) => opt.trim() !== ''));
        }
    };

    const handleDelete = (index: number) => {
        const updated = [...localOptions];
        updated.splice(index, 1);
        setLocalOptions(updated);
        onOptionsChange(updated.filter((opt) => opt.trim() !== ''));
    };

    const rows = [];
    for (let i = 0; i < localOptions.length; i += 2) {
        rows.push([localOptions[i], localOptions[i + 1] ?? '']);
    }

    return (
        <div className="space-y-2 w-full">
            {rows.map((pair, rowIdx) => (
                <div key={rowIdx} className="flex gap-2">
                    {pair.map((val, colIdx) => {
                        const idx = rowIdx * 2 + colIdx;
                        const hasError = errorIndex === idx;

                        return (
                            <div key={idx} className="flex flex-col w-1/2">
                                <div
                                    className={`flex items-center border rounded px-1 bg-white ${hasError ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    <input
                                        type="text"
                                        value={val}
                                        placeholder="Nhập"
                                        maxLength={20}
                                        className="flex-grow px-2 py-1 focus:outline-none"
                                        onChange={(e) => handleChange(e.target.value, idx)}
                                    />
                                    <span className="text-gray-400 text-sm pr-2">
                                        {val.length}/20
                                    </span>
                                    {val.trim() !== '' && (
                                        <Trash2
                                            className="w-4 h-4 text-red-400 cursor-pointer"
                                            onClick={() => handleDelete(idx)}
                                        />
                                    )}
                                </div>
                                {hasError && (
                                    <p className="text-red-500 text-xs mt-1">
                                        Giá trị này đã tồn tại, vui lòng nhập khác
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default OptionInputGroup;