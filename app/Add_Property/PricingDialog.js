
"use client";

import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
// import getStipePromise from "../../lib/stripe";





const UpgradeDialog = ( {isOpen, onClose, onUpgrade, onSetDone} ) => {
  const options = [
    { text: "Post Free Ad", price: 2000 },
    { text: "Post 1 Ad & Feature for 14 Days", price: 8500 },
    { text: "Post 1 Ad & Feature for 30 Days", price: 10000 },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleOptionChange = (option) => {
    if(option.text == "Post Free Ad"){
      onClose()
    }
    setSelectedOption(option);
    onSetDone(option.text)
 
  };


  const handleUpgradeClick = () => {
    setShowPaymentDialog(true);
  };


  const handlePaymentClose = () => {
    setShowPaymentDialog(false);
  };



  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white p-8 rounded-md shadow-md w-[800px] h-auto">
            {/* Top Message */}
            <div className="float-right cursor-pointer" onClick={onClose}>
              <MdCancel size={30} />
            </div>
            <div className="mb-4">
              <p className="text-red-500 text-lg font-bold">
                Your AD was not posted
              </p>
              <p className="text-gray-600">
                Consider upgrading to enhance visibility!
              </p>
            </div>

            {/* Options List */}
            <ul className="mb-4">
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`border p-4 ${
                    selectedOption?.text === option.text
                      ? "bg-gradient-to-r from-blue-300 to-blue-700 text-white"
                      : ""
                  }`}
                >
                  <label className="flex justify-between items-center space-x-2">
                    <div className="flex gap-5 cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio"
                        checked={selectedOption?.text === option.text}
                        onChange={() => handleOptionChange(option)}
                      />
                      {option.text}
                      {option.text === "Post 1 Ad & Feature for 30 Days" && (
                        <p
                          className={`bg-blue-600 p-2 rounded-full text-xs text-white`}
                        >
                          Recommended
                        </p>
                      )}
                    </div>

                    <span
                      className={`text-gray-800
                      ${
                        selectedOption?.text === option.text
                          ? " text-white"
                          : ""
                      }
                    `}
                    >
                      Rs {option.price}
                    </span>
                  </label>
                </li>
              ))}
            </ul>

            {/* Upgrade Button */}
            <button
              onClick={handleUpgradeClick}
              disabled={!selectedOption}
              className={`mt-6 px-4 py-2 text-white rounded-md ${
                selectedOption
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              } focus:outline-none focus:ring focus:border-blue-300`}
            >
              Upgrade Your Ad
            </button>

            {/* //////////////////////////// Payment Dialog /////////////////////////////////// */}

            {showPaymentDialog && (
              <PaymentMethods
                SelectedPlan={selectedOption}
                onClose={handlePaymentClose}
                Close={onClose}
                // onSetSelectedDone={handleGetValue}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradeDialog;







// ////////////////////////////////////  payment Methods /////////////////////////////////////

function PaymentMethods({ SelectedPlan, onClose }) {


  const products = [
    {
      product: 1,
      name: "Stripe Product",
      price: 400,
      quantity: 3,
    },
    {
      product: 2,
      name: "Stripe Product2",
      price: 40,
      quantity: 2,
    },
    {
      product: 3,
      name: "Stripe Product23",
      price: 4000,
      quantity: 1,
    },
  ];


  // const handleCheckout = async () => {
  //   const stripe = await getStipePromise();
  //   const response = await fetch("/api/stripe-session/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     cache: "no-cache",
  //     body: JSON.stringify(products),
  //   });

  //   const data = await response.json();
  //   if (data.session) {
  //     stripe?.redirectToCheckout({ sessionId: data.session.id });
  //   }
  // };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full h-full">
        <div className="float-right cursor-pointer" onClick={onClose}>
          <MdCancel size={30} />
        </div>
        <p className="text-2xl font-bold text-center mb-4">Payment Methods</p>

        {/* Selected Plan */}
        <div className="flex justify-between border p-4 mb-4">
          <p className="text-black">{SelectedPlan?.text}</p>
          <p className="text-blue-500">Rs {SelectedPlan?.price}</p>
        </div>

        <div className="flex justify-around">
          {/* Payment Icons */}

          <div className="flex flex-col items-center mt-9">
            {/* Debit Card */}
            <p className="text-gray-700 font-semibold text-xl">
              Pay by Credit / Debit Card
            </p>
            <div     className="flex flex-col justify-center items-center mt-4 border h-[200px] w-[300px] rounded-md cursor-pointer transition duration-300 transform hover:scale-105">
              <span className="text-3xl">
                <FaRegCreditCard size={60} />
              </span>
              <span className="mt-2">Debit Card</span>
              <span className="mt-2 text-sm text-gray-500">
                Pay with Visa, Mastercard, or JCB
              </span>
            </div>
          </div>


  {/* Jazz Cash */}
          {/* <div className="flex flex-col items-center mt-9">
          
            <p className="text-gray-700 font-semibold text-xl">
              Pay using Other Options
            </p>
            <div className="flex flex-col justify-center items-center mt-4 border h-[200px] w-[300px] rounded-md cursor-pointer transition duration-300 transform hover:scale-105">
              <span className="text-3xl">
                <FaMobileAlt size={60} />
              </span>
              <span className="mt-2">Jazz Cash</span>
              <span className="mt-2 text-sm text-gray-500">
                Pay via your JazzCash app
              </span>
            </div>
          </div> */}


        </div>

      
      </div>
    </div>
  );
}
