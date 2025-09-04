'use client';
import type { FormEvent } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import type { Focused } from 'react-credit-cards-2/dist/es/types';
import { PaymentCardData } from '~/types/payment';


interface AddPaymentCardDialogProps {
    isOpen: boolean;
    onClose: () => void;
    cardData: PaymentCardData;
    setCardData: React.Dispatch<React.SetStateAction<PaymentCardData>>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const AddPaymentCardDialog: React.FC<AddPaymentCardDialogProps> = ({
    isOpen,
    onClose,
    cardData,
    setCardData,
    onSubmit,
}) => {
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === 'number' && value.length > 16) return;
        if (name === 'cvc' && value.length > 4) return;
        if (name === 'expiry' && value.length > 5) return;
        setCardData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setCardData((prev) => ({ ...prev, focused: e.target.name }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div className="relative bg-white rounded-lg p-10 w-full max-w-4xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Thêm thẻ mới</h2>
                    <button
                        className="text-red-500 hover:text-red-700 text-2xl cursor-pointer"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <div className="flex gap-6">
                    <div className="w-1/2">
                        <Cards
                            number={cardData.number}
                            expiry={cardData.expiry}
                            name={cardData.name}
                            cvc={cardData.cvc}
                            focused={cardData.focused as Focused}
                        />
                    </div>
                    <form onSubmit={onSubmit} className="w-1/2 space-y-4">
                        {(
                            [
                                {
                                    label: 'Số thẻ',
                                    name: 'number',
                                    placeholder: '1234 5678 9012 3456',
                                },
                                {
                                    label: 'Tên trên thẻ',
                                    name: 'name',
                                    placeholder: 'Nguyen Van A',
                                },
                                {
                                    label: 'Ngày hết hạn',
                                    name: 'expiry',
                                    placeholder: 'MM/YY',
                                },
                                {
                                    label: 'CVV',
                                    name: 'cvc',
                                    placeholder: '123',
                                },
                            ] as const
                        ).map((field) => (
                            <div className="flex items-center" key={field.name}>
                                <label className="block text-gray-700 text-sm font-bold w-1/3">
                                    {field.label}
                                </label>
                                <input
                                    className="w-2/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    type="text"
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={
                                        cardData[
                                            field.name as keyof PaymentCardData
                                        ] as string
                                    }
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    required
                                />
                            </div>
                        ))}

                        <div className="flex items-center">
                            <label className="block text-gray-700 text-sm font-bold w-1/3">
                                Loại thẻ
                            </label>
                            <select
                                className="w-2/3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                name="cardType"
                                value={cardData.cardType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">-- Chọn loại thẻ --</option>
                                <option value="VISA">Visa</option>
                                <option value="MASTERCARD">MasterCard</option>
                                <option value="AMEX">American Express</option>
                                <option value="JCB">JCB</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-1/6 hover:shadow-lg transition cursor-pointer"
                            >
                                Thêm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPaymentCardDialog;
