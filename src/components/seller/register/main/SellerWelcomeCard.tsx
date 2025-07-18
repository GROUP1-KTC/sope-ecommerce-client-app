"use client";
import Link from "next/link";

export default function SellerWelcomeCard() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-12 mt-10 text-center">
      <img src="/welcome.png" alt="Welcome" />
      <h1 className="text-2xl font-semibold mb-2">Welcome to Sope!</h1>
      <p className="text-gray-600 mb-6">
        Please provide the information to create a seller account on Sope.
      </p>
      <Link href="/seller/register-shop">
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
          Continue Registration
        </button>
      </Link>
    </div>
  );
}
