import React from "react";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-6">
      <div className="text-blue-600 mb-4">
        <svg
          className="w-24 h-24 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
        404
      </h1>
      <div className="bg-blue-600 text-white px-2 text-sm rounded rotate-12 absolute mb-16">
        Page Not Found
      </div>
      <div className="mt-5 text-center">
        <p className="text-2xl font-semibold text-gray-700 md:text-3xl">
          Oops! We can't find that page.
        </p>
        <p className="mt-4 text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Back to Home
          </a>
          <button
            onclick="history.back()"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
