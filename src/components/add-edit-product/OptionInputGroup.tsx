import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface OptionInputGroupProps {
    options: string[];
    onOptionsChange: (options: string[]) => void;
}

const OptionInputGroup = ({ options, onOptionsChange }: OptionInputGroupProps) => {
    const [localOptions, setLocalOptions] = useState([...options, '']);

    const handleChange = (value: string, index: number) => {
        const trimmedValue = value.slice(0, 20);
        const updated = [...localOptions];
        updated[index] = trimmedValue;

        if (index === localOptions.length - 1 && trimmedValue.trim() !== '') {
            updated.push('');
        }

        setLocalOptions(updated);
        onOptionsChange(updated.filter((opt) => opt.trim() !== ''));
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
                        return (
                            <div
                                key={idx}
                                className="flex items-center border rounded px-1 w-1/2 bg-white"
                            >
                                <input
                                    type="text"
                                    value={val}
                                    placeholder="Nhập"
                                    maxLength={20}
                                    className="flex-grow px-2 py-1 focus:outline-none"
                                    onChange={(e) =>
                                        handleChange(e.target.value, idx)
                                    }
                                />
                                <span className="text-gray-400 text-sm pr-2">
                                    {val.length}/20
                                </span>
                                {val.trim() !== '' && (
                                    <>
                                        <Trash2
                                            className="w-4 h-4 text-red-400 cursor-pointer"
                                            onClick={() => handleDelete(idx)}
                                        />
                                    </>
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
