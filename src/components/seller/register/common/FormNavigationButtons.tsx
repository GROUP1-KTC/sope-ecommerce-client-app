import React from 'react';

interface FormNavigationButtonsProps {}

const FormNavigationButtons: React.FC<FormNavigationButtonsProps> = () => {
    return (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
            <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
                Back
            </button>
            <div className="space-x-4">
                <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Save
                </button>
                <button
                    type="button"
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FormNavigationButtons;
