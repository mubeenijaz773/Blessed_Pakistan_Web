'use client'

import Link from "next/link";
import React, { useState } from 'react';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServiceUrl } from '@/app/global';
import { BiLock, BiMailSend, BiUser } from "react-icons/bi";
import { BsEye, BsEyeSlash, BsFillPersonBadgeFill, BsPerson } from "react-icons/bs";
import { Ring } from "@uiball/loaders";
import { useRouter } from "next/navigation";
import Image from "next/image";



const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState('');
const router =  useRouter()
  const [isLoading, setIsLoading] = useState(false);


  const [isUserRoleValid, setIsUserRoleValid] = useState(true);
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };





  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setSelectedRole(selectedRole);
 
    // Your validation logic
    const isValid = selectedRole !== '';
    setIsUserRoleValid(isValid);
  };



  const handleSignUp = async () => {
    setIsLoading(true); // Set loading to true when the button is pressed
  
    if (!isEmailValid(email)) {
      toast.error("Invalid email format");
      console.log("email error");
    } else {
      const res = await fetch(`${ServiceUrl}/Emailcheck/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data1 = await res.json();
      if (data1["status"] === 200) {
        toast.success("Account Already Exist");
      } else {
        try {
          const response = await fetch(`${ServiceUrl}/Verification_SignUp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              role : selectedRole
            }),
          });
  
          const data = await response.json();
          console.log(data); // Check the response from the API
          // if (data["status"] === 200) {
          //   if(selectedRole === "agent"){
          //     router.push(`/Add_Agencies?email=${email}`)
          //     toast.success("Email Sent First make your Profile")
          //   }else{
          //     toast.success("Email Sent successfully");
          //   }
          // } else if (data["status"] === 400) {
          //   toast.error("Enter Valid Email");
          // }
          // You can handle the response here and show appropriate messages to the user
        } catch (error) {
          toast.error("Error signing up:", error);
        }
      }
    }
  
    setIsLoading(false); // Set loading to false after the condition checks are complete
  };
  
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Check if the email contains "@gmail.com"
    setIsEmailValid(newEmail.toLowerCase().includes('@gmail.com'));
  };



  return( 
  
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
    
          {/* Signup Card */}
          <div className="flex-shrink-0 w-1/2 flex justify-center items-center bg-slate-100 py-10 ">
            <div className="max-w-md w-full  p-10 bg-white rounded-xl z-10 ">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                 Welcom Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">Please signup to your account</p>
        </div>
        <div className="flex flex-row justify-center items-center ">
        <div className="w-[200px] h-[120px] relative" >
        <Image layout="fill" src="/logo_app.jpg"  alt="Logo" />
        </div>
        </div>
    
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"/>
          
          <div className="mt-8 content-center relative ">
            <div className="absolute right-0 mt-8">
            <BiUser className="h-5 w-5 text-green-500" />
                    </div>
            <label className="text-sm font-bold text-gray-700 tracking-wide">
              Username
            </label>
            <input 
            id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                     placeholder="Enter username"     
             className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
             />
                </div>
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
             placeholder="Enter email"
             autoFocus
             value={email}
             onChange={handleEmailChange}
             type="text"   
             className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              />
                </div>
          <div>
          <div className="relative">
          <div className="relative">
            <div className="absolute right-0 mt-8">
              {isUserRoleValid ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              ) : (
                <BiUser className="h-5 w-5 text-green-500" />
              )}
            </div>
            <label className="text-sm font-bold text-gray-700 tracking-wide">User Role</label>
    
    {/* Custom dropdown wrapper */}
    <div className="relative mb-8 ">
      <select
        id="userRole"
        value={selectedRole}
        onChange={handleRoleChange}
        className="w-full text-base py-2  pr-8 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
      >
        <option value="" disabled className="text-gray-500">
          Select Role
        </option>
        <option value="user">User</option>
        <option value="agent">Agent</option>
      </select>
    
    </div>
          </div>
          </div>
                  <button
                    disabled={isLoading}
                    onClick={handleSignUp}
                    type="button"
                    className="w-full flex justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-purple-300 dark:focus:ring-purple-800 text-gray-100 p-4  rounded-full tracking-wide
                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  >
                    {isLoading ? (
                      <div className="flex gap-1 justify-center items-center text-blue-600 text-xs">
                        <Ring size={15} lineWeight={5} speed={2} className="mt-1" color="white" />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">SignUp</div>
                    )}
                  </button>
                </div>
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
      
    
    )
  };
export default SignUp;
