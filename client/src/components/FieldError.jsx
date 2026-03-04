import React from "react";

function FieldError({ message }) {
  // If there's no message, return null so it doesn't take up space
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-center gap-1.5 mt-1.5 text-red-600 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      {/* Small Warning Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-4 h-4 shrink-0"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>

      {/* Error Message */}
      <span className="text-xs font-medium tracking-wide">{message}</span>
    </div>
  );
}

export default FieldError;
