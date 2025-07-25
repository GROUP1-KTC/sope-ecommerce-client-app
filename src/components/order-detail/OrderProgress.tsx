'use client';

import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentIcon from '@mui/icons-material/Assignment';

type StepInput = {
    date: string;
    active: boolean;
};

type Step = {
    label: string;
    icon: React.ElementType;
};

type OrderProgressProps = {
    steps: StepInput[];
};

const fixedSteps: Step[] = [
    { label: 'Đơn hàng đã đặt', icon: AssignmentIcon },
    { label: 'Đã xác nhận đơn hàng', icon: HowToRegIcon },
    { label: 'Đã giao cho EVC', icon: LocalShippingIcon },
    { label: 'Đã nhận đơn hàng', icon: SaveAltIcon },
    { label: 'Đơn hàng đã hoàn thành', icon: CheckCircleIcon },
];

const OrderProgress: React.FC<OrderProgressProps> = ({ steps }) => {
    return (
        <div className="mb-6 px-4">
            <div className="relative flex justify-between items-start gap-2">
                {fixedSteps.map((step, index) => {
                    const userStep = steps[index];
                    return (
                        <div
                            key={index}
                            className="flex-1 text-center relative z-10"
                        >
                            <div
                                className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
                                    userStep?.active
                                        ? 'bg-green-600 shadow-lg'
                                        : 'bg-gray-200'
                                }`}
                            >
                                <step.icon
                                    className={`w-6 h-6 ${userStep?.active ? 'text-white' : 'text-gray-400'}`}
                                />
                            </div>
                            <p
                                className={`mt-3 font-medium text-sm ${
                                    userStep?.active
                                        ? 'text-gray-900'
                                        : 'text-gray-500'
                                }`}
                            >
                                {step.label}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {userStep?.date}
                            </p>
                        </div>
                    );
                })}
                <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 z-1">
                    <div
                        className="h-full bg-green-600 transition-all duration-500 ease-in-out"
                        style={{
                            width: `${(steps.filter((s) => s.active).length / fixedSteps.length) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default OrderProgress;
