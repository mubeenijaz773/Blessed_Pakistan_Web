"use client"

// Dialog.js

import { useState } from 'react';
import { FaPhoneSquare, FaCopy, FaMobile, FaCheckCircle } from 'react-icons/fa';

export default function CallDialog({ call , isOpen, onClose }) {
    const [copiedNumber, setCopiedNumber] = useState(null);

    // Sample mobile numbers
    // const mobileNumbers = [
    //   { number: '+1 (123) 456-7890', id: 1 },
    //   { number: '+1 (987) 654-3210', id: 2 },
    // ];
  

    const copyToClipboard = async (number) => {
      try {
        // Attempt to use the clipboard API
        await navigator.clipboard.writeText(number);
        setCopiedNumber(number);
  
        // Show the tick icon after 5 seconds
        setTimeout(() => {
          setCopiedNumber(null);
        }, 2000);
      } catch (error) {
        // Fallback to using a text area for unsupported browsers
        const textArea = document.createElement('textarea');
        textArea.value = number;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedNumber(number);
  
        // Show the tick icon after 5 seconds
        setTimeout(() => {
          setCopiedNumber(null);
        }, 5000);
      }
    };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-[400px] max-w-md p-6 rounded-lg shadow-md">
              <div className='flex flex-row justify-center' >
              <h2 className="text-xl font-bold mb-4 fixed text-purple-700">Contact Us</h2>
              <svg    onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-x cursor-pointer ml-[320px]" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
              </div>

              <div className="space-y-4">
                {/* {mobileNumbers.map((mobile) => ( */}
                  <div className="flex items-center">
                    <div className=" bg-white rounded-full flex justify-center items-center shadow-lg w-[60px] h-[60px] ">
                      <FaMobile className="w-5 h-5 text-purple-700 " />
                    </div>
                    <div className="flex-grow ml-6">{call}</div>
                    <button
                      type="button"
                      className="ml-2 p-2 rounded-full text-gray-500 hover:text-gray-700"
                      onClick={() => copyToClipboard(call)}
                    >
                      {copiedNumber === call ? (
                        <FaCheckCircle className="w-4 h-4 text-purple-700" />
                      ) : (
                        <FaCopy className="w-4 h-4 text-purple-700 " />
                      )}
                    </button>
                  </div>
                {/* ))} */}
              </div>
            
              {/* <button
                type="button"
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={onClose}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
