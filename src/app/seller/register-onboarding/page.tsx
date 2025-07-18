"use client";

import { useState } from "react";
import SellerHeaderSignup from "~/components/seller/header/SellerHeaderSignup";
import StepIndicator from '~/components/seller/register/StepIndicator';
import SellerRegisterForm from '~/components/seller/register/SellerRegisterForm';
import ShippingSettingsForm from '~/components/seller/register/ShippingSettingsForm';
import SellerFaxForm from '~/components/seller/register/SellerFaxForm';

const steps = [
	"Shop Information",
	"Shipping Settings",
	"Tax Information",
	"Complete"
];

export default function RegisterOnboardingPage() {
	const [step, setStep] = useState(0);

	// Render form theo từng bước
	const renderStep = () => {
		switch (step) {
			case 0:
				return <SellerRegisterForm />;
			case 1:
				return <ShippingSettingsForm />;
			case 2:
				return <SellerFaxForm />;
			case 3:
				return (
					<div className="flex flex-col items-center justify-center min-h-[400px]">
						<h2 className="text-2xl font-bold mb-4 text-green-600">Hoàn tất đăng ký!</h2>
						<p className="mb-6">Chúc mừng bạn đã hoàn thành các bước đăng ký bán hàng.</p>
					</div>
				);
			default:
				return null;
		}
	};

	// Điều hướng bước
	const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
	const handleBack = () => setStep((s) => Math.max(s - 1, 0));

	return (
		<>
			<SellerHeaderSignup />
			<div className="min-h-screen flex flex-col items-center justify-center bg-[#fff9f5] py-10">
				<div className="w-full max-w-3xl bg-white rounded shadow-lg p-8">
					<StepIndicator steps={steps} currentStep={step} />
					<div className="mb-8">{renderStep()}</div>
					<div className="flex justify-between">
						<button
							className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
							onClick={handleBack}
							disabled={step === 0}
						>
							Back
						</button>
						{step < steps.length - 1 ? (
							<>
								<button
									className="px-6 py-2 rounded bg-blue-500 text-white font-semibold"
								>
									Save
								</button>
								<button
									className="px-6 py-2 rounded bg-red-500 text-white font-semibold"
									onClick={handleNext}
								>
									Next
								</button>
							</>



						) : null}
					</div>
				</div>
			</div>

		</>
	);
} 