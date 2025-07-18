'use client';

import { useRouter } from 'next/navigation';

export default function SellerWelcomeSeller() {
    const router = useRouter();
    return (
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-12 mt-10 text-center">
            <img src="/welcome.png" alt="Welcome" />
            <h1 className="text-2xl font-semibold mb-2">Welcome to Sope!</h1>
            <p className="text-gray-600 mb-6">
                Please provide the information to create a seller account on
                Sope.
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={() => router.push('/seller/register-onboarding')}
            >
                Continue Registration
            </button>
        </div>
    );
}
