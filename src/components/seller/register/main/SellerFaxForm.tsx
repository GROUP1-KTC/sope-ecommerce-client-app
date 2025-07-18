"use client";

import React, { useState } from "react";
import StepIndicator from "../common/StepIndicator";
import FormNavigationButtons from "../common/FormNavigationButtons";

export default function SellerFaxForm() {
  const [step, setStep] = useState(2);

  const steps = [
    "Shop Infomation",
    "Shipping Settings",
    "Tax Information",
    "Identification Information",
    "Complete",
  ];

  const [formData, setFormData] = useState({
    businessType: "personal",
    address: "",
    selectedCity: "",
    email: "",
    taxCode: "",
  });
  const [emailCount, setEmailCount] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddEmail = () => {
    if (emailCount < 5) {
      // Giả định tối đa 5 email
      setEmailCount(emailCount + 1);
      // Trong ứng dụng thực tế, bạn sẽ thêm một trường input email mới tại đây.
      // Với giao diện tĩnh này, chúng ta chỉ cập nhật số lượng hiển thị.
    }
  };

  const businessOptions = [
    { value: "personal", label: "Personal" },
    { value: "household", label: "House Hold" },
    { value: "company", label: "Company" },
  ];

  return (
    <div className="min-h-screen flex justify-center items-start py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
        <StepIndicator steps={steps} currentStep={step} />
        {/* Loại hình kinh doanh */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            * Business type
          </label>
          <div className="flex items-center space-x-6">
            {businessOptions.map((option) => (
              <label key={option.value} className="inline-flex items-center">
                <input
                  type="radio"
                  name="businessType"
                  value={option.value}
                  className="form-radio text-orange-500"
                  checked={formData.businessType === option.value}
                  onChange={handleChange}
                />
                <span className="ml-2 text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Địa chỉ đăng ký kinh doanh */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            * Business registration address
          </label>
          <div className="mb-4">
            <select
              name="selectedCity" // Đảm bảo name khớp với key trong formData
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={formData.selectedCity}
              onChange={handleChange}
            >
              {/* Thêm các tỉnh/thành phố */}
            </select>
          </div>
          <div className="relative mb-2">
            <input
              type="text"
              name="address" // Đảm bảo name khớp với key trong formData
              placeholder="House
              number/street, Districtv.v."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={formData.address}
              onChange={handleChange}
            />
            <p className="text-red-500 text-xs mt-1">
              Please fill in the specific address. For example: House
              number/street, District...
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Business address: the address according to the business registration
            certificate for companies, business households, or according to
            identification documents (CCCD/ID card) for individuals.
          </p>
        </div>

        {/* Email nhận hóa đơn điện tử */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            * Email to receive electronic invoice
          </label>
          <div className="relative mb-2">
            <input
              type="email"
              name="email" // Đảm bảo name khớp với key trong formData
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {formData.email.length}/100
            </span>
            <p className="text-red-500 text-xs mt-1">
              Please fill in the email address
            </p>
          </div>
          <button
            onClick={handleAddEmail}
            className="flex items-center not-first text-sm font-semibold mt-2 hover:underline"
            disabled={emailCount >= 5}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Email ({emailCount}/5)
          </button>
        </div>

        {/* Mã số thuế */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            * Tax code
          </label>
          <div className="relative mb-2">
            <input
              type="text"
              name="taxCode" // Đảm bảo name khớp với key trong formData
              placeholder="Enter tax code"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={formData.taxCode}
              onChange={handleChange}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {formData.taxCode.length}/14
            </span>
            <p className="text-red-500 text-xs mt-1">
              Please fill in the Tax Identification Number
            </p>
          </div>
          <p className="text-sm text-gray-500">
            The tax code is the business tax code.{" "}
            <a href="#" className="text-orange-500 hover:underline">
              Learn more.
            </a>
          </p>
        </div>

        {/* Nút điều hướng */}
        <FormNavigationButtons />
      </div>
    </div>
  );
}
