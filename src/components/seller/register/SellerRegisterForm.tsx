"use client";

import { useState } from "react";
import StepIndicator from "../register/StepIndicator";
import FormNavigationButtons from "../../common/FormNavigationButtons";

export default function SellerRegisterForm() {
  const [form, setForm] = useState({
    shopName: "",
    email: "",
    phoneNumber: "",
  });

  const [step, setStep] = useState(0);

  const steps = [
    "Shop Infomation",
    "Shipping Settings",
    "Tax Information",
    "Identification Information",
    "Complete",
  ];

  // Shallow merge state cập nhật từng field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit form:", form);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      {/* Step Indicator */}
      <StepIndicator steps={steps} currentStep={step} />

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">* Shop name</label>
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
          <label className="block font-medium mb-1">* Pick-up address</label>
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
          <label className="block font-medium mb-1">* Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Action Buttons */}
        {/* Nút điều hướng */}
        <FormNavigationButtons />
      </form>
    </div>
  );
}

// Subcomponent
function Step({
  children,
  active = false,
}: {
  children: string;
  active?: boolean;
}) {
  return (
    <div className="flex-1 text-center">
      <div
        className={`w-3 h-3 mx-auto mb-1 rounded-full ${
          active ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>
      <div className={active ? "text-blue-500 font-semibold" : ""}>
        {children}
      </div>
    </div>
  );
}
