"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ring } from "@uiball/loaders";

export default function UserDropdown({user ,userdata}:{user?:any, userdata?:any} ) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
 
  const router = useRouter();
  const dropdownRef = useRef(null);

  function getFirstCharacter(str) {
    if (str !== null && typeof str === 'string' && str.length > 0) {
      return str.charAt(0); // Returns the first character of the input string
    } else {
      return ''; // Return an empty string if the input is null or empty
    }
  }

  const firstCharacter = getFirstCharacter(user?.username || '');


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };


  const logout = () => {
   setIsLoading1(true);
    router.push("/Components/Login");
    localStorage.removeItem("_id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("current_user");
  };

 const data = JSON.stringify(userdata);

  const handlemove=()=>{
    setIsLoading(true)
  setTimeout(()=>{
setIsLoading(false)
  },3000)
  }

  return (
    <div className="relative inline-block text-left">
     <div onClick={toggleDropdown} className="  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 cursor-pointer border-none rounded-full w-[40px] h-[40px] p-3 relative ml-4 ">
              <p className="text-white text-sm text-center relative uppercase ">
                {firstCharacter}
              </p>
            </div>



{/* drpdown content */}

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 mt-2 w-[400px] h-[400px] p-3  font-sans origin-top-right rounded-3xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div
            className="relative float-right rounded-full bg-purple-600 p-3 hover:rounded-full "
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>


          <div className="py-1" role="none">
          
            <div className="items-center m-auto  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 border-none rounded-full w-[80px] h-[80px] p-3 mt-[30px]">
              <p className="text-white text-4xl text-center relative uppercase mt-2">
                {firstCharacter}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-2xl text-black text-center">Hi, {user.username}!</p>
              <p className="text-center text-black text-lg ml-7 font-semibold font-sans mt-2">
              {user.email}
            </p>
          

            </div>

       
            <div className="mt-3 flex justify-center">
              <div  onClick={handlemove} className="flex justify-center border-[0.8px] border-black items-center text-center m-auto w-[250px] h-[40px] rounded-full overflow-hidden hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"> 
              {isLoading ? (
                <div className="flex gap-1 justify-center items-center text-blue-600 text-xs " >
                  <Ring
                    size={15}
                    lineWeight={5}
                    speed={2}
                    // className="mt-1"
                    color="blue"
                  />
                 please wait...
                </div>
              ) : (
                <div className="flex" >
             <Link href={`/Components/User_Settings`} >
                <p className="text-blue-700 font-semibold text-sm">
                  Manage Your Account
                </p>
                </Link>
                </div>
              )} 
                             
              </div>
            </div>

            <div className="mt-8 flex justify-center">

           <button
              onClick={logout}
              className="w-[300px] h-[50px]  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-xs  cursor-pointer relative  transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95  text-white m-2 font-sans font-medium rounded shadow-lg hover:shadow-xl "
            >
              
              {isLoading1 ? (
                <div className="flex gap-1 justify-center items-center text-white text-xs " >
                  <Ring
                    size={15}
                    lineWeight={5}
                    speed={2}
                    // className="mt-1"
                    color="white"
                  />
              
                </div>
              ) : (
                <div className="flex justify-center items-center text-white" >
              Log Out
                </div>
              )}
            </button>
             
            </div>

       
          </div>
        </div>
      )}
    </div>
  );
}
