"use client";

import { useState } from "react";
import ExpandableItem from "../../common/ExpandableItem";
import StepIndicator from "../common/StepIndicator";
import FormNavigationButtons from "../common/FormNavigationButtons";

function ShippingToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="border rounded px-4 py-3 bg-gray-50">
      <div className="font-semibold mb-2">{label}</div>
      <div className="flex justify-between items-center">
        <span>Activate this shipping unit</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="w-5 h-5"
        />
      </div>
    </div>
  );
}

export default function ShippingSettingsForm() {
  const [shippingState, setShippingState] = useState<{
    [key: string]: boolean;
  }>({
    "Super Fast - Urgent": false,
    Fast: false,
    Savings: false,
  });

  const toggleShipping = (key: string) => {
    setShippingState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const shippingOptions = ["Super Fast - Urgent", "Fast", "Savings"];

  const [step, setStep] = useState(1);

  const steps = [
    "Shop Infomation",
    "Shipping Settings",
    "Tax Information",
    "Identification Information",
    "Complete",
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6 mt-10">
      <StepIndicator steps={steps} currentStep={step} />
      {shippingOptions.map((title) => (
        <ExpandableItem key={title} title={title}>
          <ShippingToggle
            label={title}
            checked={shippingState[title]}
            onChange={() => toggleShipping(title)}
          />
        </ExpandableItem>
      ))}

      <ExpandableItem title="Add shipping unit">
        <p className="text-sm text-gray-600">
          Note: Sope does not support tracking for transportation methods that
          are not integrated and will not be responsible for any missing or
          damaged products.
        </p>
      </ExpandableItem>

      <FormNavigationButtons />
    </div>
  );
}
