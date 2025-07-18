'use client';

import { useState } from 'react';
import StepIndicator from '../common/StepIndicator';
import FormNavigationButtons from '../common/FormNavigationButtons';

export default function SellerRegisterForm() {
    const [form, setForm] = useState({
        shopName: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit form:', form);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
            <StepIndicator />
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-1">
                        * Shop name
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            name="shopName"
                            value={form.shopName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        * Pick-up address
                    </label>
                    <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm"
                    >
                        + Add
                    </button>
                </div>

                <div>
                    <label className="block font-medium mb-1">* Email</label>
                    <input
                        type="email"
                        name="email"
                        disabled
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        * Phone Number
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <FormNavigationButtons />
            </form>
        </div>
    );
}
