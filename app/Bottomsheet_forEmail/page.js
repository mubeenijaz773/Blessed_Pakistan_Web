"use client"
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { UserEmailNotify, SaveUserNotify } from "@/app/action/EmailNotify";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const BottomSheetCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state

  useEffect(() => {
    var email = localStorage.getItem("email");

    const fetchImages = async () => {
      try {
        const data = await UserEmailNotify(email);
        if (data["status"] === 200) {
          setIsVisible(false);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();

    // For demonstration purposes, set isLoggedIn based on your authentication status
    const userIsLoggedIn = localStorage.getItem("_id");
    setIsLoggedIn(userIsLoggedIn);

  }, [1000]); // Correct the useEffect dependency array

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubscribe = async () => {
    const email = localStorage.getItem("email");
    if (email) {
      try {
        const data = await SaveUserNotify(email);
        if (data["obj"]) {
          toast.success("Subscribed Successfully");
          setSubscribed(true);
          setIsVisible(false);
        } else {
          setIsVisible(false);
          toast("You are Already Subscribed");
        }
      } catch (error) {
        toast.error("Error subscribing:", error); // Ensure error is properly displayed
      }
    } else {
      toast.error("Error to Subscribe");
    }
  };

  return (
    <main>
      <div className={`fixed opacity-70 bottom-0 left-0 right-0 p-11 shadow-xl shadow-white bg-black transform transition-transform ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <IoClose className="w-[34px] h-[34px]" />
        </button>
        {subscribed ? (
          <p className="text-white font-sans font-semibold">Subscribed!</p>
        ) : isLoggedIn ? (
          <>
            <div className="flex items-center justify-around">
              <div className="flex flex-grow gap-2">
                <Image src="/bell.png" width={50} height={50} alt="Bell" />
                <span className="text-lg mt-5 text-white font-sans font-semibold">
                  Get the latest Property updates, real estate Projects and News
                </span>
              </div>
              <div>
                <button
                  onClick={handleSubscribe}
                  className="bg-white rounded-full hover:bg-purple-700 hover:text-white font-sans text-black px-4 py-2 focus:outline-none transition-transform transform hover:scale-105"
                >
                  I want to be Notified
                </button>
                <button onClick={handleClose} className="text-white hover:text-blue-700 px-4 py-2 font-sans focus:outline-none transition-colors">
                  Maybe Later
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="justify-center items-center text-center text-xl flex gap-3 text-white">
            <Image src="/bellalert.png" width={50} height={50} alt="Bell Alert" />
            {`Don"t miss out on your dream property! Sign in to get notified via email.`}
            <a className="text-blue-700 decoration-blue-600 text-sm underline" href={"/Login"}>Go to Login Page &rsquo;</a>
          </p>
        )}
      </div>
    </main>
  );
};

export default BottomSheetCard;
