'use client';

type StepProps = {
    steps: string[];
    currentStep: number;
};

export default function StepIndicator({ steps, currentStep }: StepProps) {
    return (
        <div className="flex items-center justify-between mb-8 text-sm text-gray-600 relative">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="flex-1 flex flex-col items-center relative"
                >
                    <div
                        className={`w-3 h-3 rounded-full z-10 ${
                            index <= currentStep ? 'bg-red-500' : 'bg-gray-300'
                        }`}
                    />
                    <div
                        className={`mt-1 text-center ${
                            index === currentStep
                                ? 'text-red-500 font-semibold'
                                : ''
                        }`}
                    >
                        {step}
                    </div>
                    {index < steps.length - 1 && (
                        <div className="absolute top-1.5 left-1/2 w-full h-px bg-gray-300 z-0">
                            <div
                                className={`absolute top-0 left-0 h-px ${
                                    index < currentStep
                                        ? 'bg-red-500'
                                        : 'bg-gray-300'
                                }`}
                                style={{ width: '100%' }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
