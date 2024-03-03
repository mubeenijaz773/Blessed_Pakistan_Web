"use client";

import React, { useState } from "react";
import { BiMailSend, BiLock } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ServiceUrl } from '@/app/global';
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { Ring } from "@uiball/loaders";
import Image from "next/image";
import { DiCode } from "react-icons/di";



const Forgetpassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isloading1, setIsLoading1] = useState(false);
  const [showPasswordFeild, setShowPasswordFeild] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationCodeInput, setShowVerificationCodeInput] = useState(false);
  const [verificationcode1, setVerificationCode1] = useState("");

  const [password, setPassword] = useState(""); // State for the password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for the confirm password input


  const EmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function handlevisibility(){
    setShowPassword(!showPassword);
  }

  function handleConfirmvisibility(){
    setShowConfirmPassword(!showconfirmPassword);
  }

  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Check if the email contains "@gmail.com"
    setIsEmailValid(newEmail.toLowerCase().includes('@gmail.com'));
  };
  

  const SendEmail = async () => {
    setIsLoading(true)
    if (!EmailValid(email)) {
      toast.error("Invalid email format");
      console.log("email error");
      setIsLoading(false)
 
      return;
    } else {
      const res = await fetch(`${ServiceUrl}/EmailForgetPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          email: email,

        }),
      });
      const data = await res.json();

      // Set the verificationcode state with the received value
      setVerificationCode1(data['code']);
      if (data["status"] == 200) {
        toast.success("Email Sent successfully");
        setShowVerificationCodeInput(true);
        setIsLoading(false)
      } else if (data["status"] == 400) {
        toast.error("Enter Valid Email");
        setIsLoading(false)
      }
      // You can handle the response here and show appropriate messages to the user
      setIsLoading(false)
 
    }
    setIsLoading(false)
  };

  const handleLogin = () => {
    setIsLoading1(true)
    if (verificationcode1 == verificationCode) {
      setShowPasswordFeild(true);
      // setShowVerificationCodeInput(false);
      setIsLoading1(false)
    } else {
      toast.error('Not Match')
      setIsLoading1(false)
    }
    setIsLoading1(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
    } else {
      try {
        // Update password
        const res = await fetch(`${ServiceUrl}/SetNewPassword`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        });
        const data = await res.json();
  // console.log(data.status)
        if (data.status === 200) {
          router.push('/Login');
          toast.success("Password updated successfully");
        } else {
          toast.error("Failed to update password");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error("Failed to update password");
      }
    }
  };
  






  return (
    <main className="flex min-h-screen  bg-slate-100 ">
    <ToastContainer/>
    {/* Background Image */}
    <div
      className="flex-shrink-0 w-1/2 bg-cover bg-no-repeat relative items-center"
      style={{
        backgroundImage: 'url("/bg.png")',
        backgroundSize: 'cover',
        // Add other background properties as needed
      }}
    >
      {/* <div className="absolute bg-black opacity-60 inset-0 z-0"></div> */}
    </div>

    {/* Login Card */}
    <div className="flex-shrink-0 w-1/2 flex justify-center items-center bg-slate-100 py-10 ">
      <div className="max-w-md w-full  p-10 bg-white rounded-xl z-10 ">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
          {showPasswordFeild ? (
      "Set Passowrd"
    ) : showVerificationCodeInput ? "Verification code" : "Forgot Password"}
 
 </h2>
    <p className="mt-2 text-sm text-gray-600">
    {showPasswordFeild ? (
      "Set your passowrd to continue"
    ) : showVerificationCodeInput ? "Enter Verification code to continue" : "Enter your email for verification"}
  
  </p>
  </div>
  <div className="flex flex-row justify-center items-center ">
  <div className="w-[200px] h-[120px] relative" >
  <Image layout="fill" src="/logo_app.jpg"  alt="Logo" />
  </div>
  </div>

  <form className="mt-8 space-y-6" action="#" method="POST">
    <input type="hidden" name="remember" value="true"/>
    
    
    {showPasswordFeild ? (
        <>

    <div className="mt-8 content-center relative ">
      <div className="absolute right-0 mt-8">
  
    {showPassword ? (
                <BsEye onClick={handlevisibility} className="w-4 h-4 text-green-500" />
              ) : (
                <BsEyeSlash onClick={handlevisibility} className="w-4 h-4 text-green-500" />
              )}
              </div>
      <label className="text-sm font-bold text-gray-700 tracking-wide">
        Password
      </label>
      <input 
       id="password"
       type={showPassword ? "text" : "password"}
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       placeholder="Enter password..."     
       className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
       />
          </div>
   
    
    
    <div className="mt-8 content-center relative ">
      <div className="absolute right-0 mt-8">
  
    {showconfirmPassword ? (
                <BsEye onClick={handleConfirmvisibility} className="w-4 h-4 text-green-500" />
              ) : (
                <BsEyeSlash onClick={handleConfirmvisibility} className="w-4 h-4 text-green-500" />
              )}
              </div>
      <label className="text-sm font-bold text-gray-700 tracking-wide">
       Confirm Password
      </label>
      <input 
       id="confirmpassword"
       type={showconfirmPassword ? "text" : "password"}
       value={confirmPassword}
       onChange={(e) => setConfirmPassword(e.target.value)}
       placeholder="Enter Confirm password.."     
       className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
       />
          </div>
        
        
        </>
    ):(
      <>
      {showVerificationCodeInput ? (
        <div className="mt-8 content-center relative ">
        <div className="absolute right-0 mt-8">
                  <DiCode  className="w-6 h-6 text-green-500" />            
                </div>

        <label className="text-sm font-bold text-gray-700 tracking-wide">
         Verification Code
        </label>
        <input 
         id="verificationcode"
         type="text"
         value={verificationCode}
         onChange={(e) => setVerificationCode(e.target.value)}
         placeholder="Enter verification code.."     
         className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
         />
            </div>
        ):(
          <div className="relative">
      
          <div className="absolute right-0 mt-8">
          {isEmailValid ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ):(
            <BiMailSend className="h-5 w-5 text-green-500" />
          )}
         
                  </div>
    
    
          <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
          <input
           id="email"
           type="email"
           placeholder="Enter email"
           autoFocus
           value={email}
           onChange={handleEmailChange}
           className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
            />
    
              </div>
        
      )}
</>
    )}
      
      {showPasswordFeild ? (
     
     <button
     onClick={handleSubmit}
     type="button"
     className="w-full flex justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-purple-300 dark:focus:ring-purple-800 text-gray-100 p-4  rounded-full tracking-wide
     font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
   >
   
       <div className="flex justify-center items-center">Submite</div>
   
   </button>
   
   ): showVerificationCodeInput ? (
                    <button
                    onClick={handleLogin}
                    type="button"
                    className="w-full flex justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-purple-300 dark:focus:ring-purple-800 text-gray-100 p-4  rounded-full tracking-wide
                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  >             
                  
                    {isloading1 ? (
                      <div className="flex gap-1 justify-center items-center text-blue-600 text-xs " >
                        <Ring
                          size={15}
                          lineWeight={5}
                          speed={2}
                          className="mt-1"
                          color="white"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center" >
                        Confirm
                      </div>
                    )}
                  </button>
                ) : (
                  <button
              onClick={SendEmail}
              type="button"
              className="w-full flex justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-purple-300 dark:focus:ring-purple-800 text-gray-100 p-4  rounded-full tracking-wide
              font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
            
                    {isloading ? (
                      <div className="flex gap-1 justify-center items-center text-blue-600 text-xs " >
                        <Ring
                          size={15}
                          lineWeight={5}
                          speed={2}
                          className="mt-1"
                          color="white"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center" >
                        Send Verification Code

                      </div>
                    )}

                  </button>
                )}


        </form>
        
  <div className="flex items-center justify-center space-x-2 mt-10">
    <span className="h-px w-16 bg-gray-300"></span>
    <span className="text-gray-500 font-normal">OR</span>
    <span className="h-px w-16 bg-gray-300"></span>
  </div>
        <p className="flex flex-col items-center justify-center mt-5 text-center text-md text-gray-500">
      <span>Already have an account?</span>
      <Link href="/Login" className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">Login</Link>
    </p>
        
      </div>
    </div>
  </main>
  );
};

export default Forgetpassword;
