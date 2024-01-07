'use client'

import Link from "next/link";
import React, { useState } from 'react';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ServiceUrl} from "../../global"
import { BiLock, BiMailSend } from "react-icons/bi";
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

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };





  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
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
          //     router.push(`/Components/Add_Agencies?email=${email}`)
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
  



 
return( 
  <div className="flex  justify-center  h-auto bg-gray-100">
   
   
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-auto mt-[30px] ">
    <div className=" flex justify-center items-center  " >
    <Image src="/logo_app.jpg" width={120} height={120}/>
 </div>

    <h2 className="text-3xl font-semibold mb-4 font-sans text-center text-purple-700 ">Sign Up</h2>
     
      <form>
  
      <div className="relative flex flex-col">
      <span className="absolute right-2 top-2">
     <BsPerson className="w-4 h-4 text-blue-500" />
    </span>
    <input
        id="email"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder=" "
       autoFocus
      className="relative z-10 border-0 border-b-2 text-xs border-blue-500 h-10 bg-transparent text-gray-900 outline-none px-2 peer"
    />
    <label className="absolute text-xs font-sans transition-transform duration-300 translate-y-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:translate-y-[-1rem] peer-focus:scale-75 peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500">
      Enter Username
    </label>


  </div>
  


        <div className=" mt-5">
        <div className="relative flex flex-col">
        <span className="absolute right-2 top-2">
     <BiMailSend className="w-4 h-4 text-blue-500" />
    </span>
    <input
      id="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     placeholder=" "
      autoFocus
      className="relative z-10 border-0 border-b-2 border-blue-500 text-xs h-10 bg-transparent text-gray-900 outline-none px-2 peer"
    />
    <label className="absolute font-sans text-xs transition-transform duration-300 translate-y-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:translate-y-[-1rem] peer-focus:scale-75 peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500">
      Enter Email
    </label>
  </div>  
        </div>
  

        <div className="mt-5">
      <div className="relative">
       
        <select
          id="role"
          value={selectedRole}
          onChange={handleRoleChange}
          className="relative w-full z-10 border-0 border-b-2 border-blue-500 text-xs h-10 bg-transparent text-gray-900 outline-none px-2 peer"
        >
          <option value="" disabled className="text-gray-500">
            Select Role
          </option>
          <option value="user">User</option>
          <option value="agent">Agent</option>
        </select>
     
      </div>
    </div>
    
  
        <button onClick={handleSignUp} type="button" className="mt-10 w-full text-white 
        bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
          font-medium rounded-lg text-sm  py-3.5 text-center mr-2 mb-2">
            {isLoading ? (
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
            Sign Up
                </div>
              )}
            </button>
  
      </form>
      
      <div className="flex gap-2 mt-4 justify-center">
      <p className="text-center  text-xs text-gray-600">
      Already have an account?
       
      </p>
      <Link className="text-indigo-600 text-xs hover:text-indigo-800" href={"/Components/Login"}>
      Sign In
        </Link>
        </div>
  
    </div>
    <ToastContainer  />
  </div>
  
  
  )
};

export default SignUp;
