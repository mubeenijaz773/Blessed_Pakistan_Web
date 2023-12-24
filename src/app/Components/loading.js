// components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white  ">
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              // strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2a8 8 0 018-8"
            />
          </svg>
        </div>
        <p className="text-lg text-blue-500 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
