"use client"
import Link from "next/link";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServiceUrl } from '@/app/global';
import { BiLock, BiMailSend } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Ring } from '@uiball/loaders';
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router  = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Check if the email contains "@gmail.com"
    setIsEmailValid(newEmail.toLowerCase().includes('@gmail.com'));
  };
  
  function handlevisibility(){
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    if (email !== '' && password !== '') {
      try {
        setIsLoading(true); // Set isLoading to true when login button is clicked

        const response = await fetch(`${ServiceUrl}/Login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();
      // Check the response from the API
        if (data['status'] === 200) {
          router.push('/');
          setIsLoading(false);
          toast.success('Login Successfully'); 
          localStorage.setItem('current_user', JSON.stringify(data['user']))
          localStorage.setItem('_id', data['user']['_id'])
          localStorage.setItem('role', data['user']['role'])
          localStorage.setItem('email', data['user']['email'])
        } else if (data.status === 400) {
          toast.error('Incorrect Password');
          setIsLoading(false);
        } else if (data.status === 500) {
          toast.error('User Not Found');
          setIsLoading(false);
        }
      } catch (error) {
        toast.error('Error logging in:', error);
        setIsLoading(false);
      }
    } else {
      toast.error('Enter All the required fields');
      setIsLoading(false);
    }
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
    
          {/* Login Card */}
          <div className="flex-shrink-0 w-1/2 flex justify-center items-center bg-slate-100 py-10 ">
            <div className="max-w-md w-full  p-10 bg-white rounded-xl z-10 ">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                 Welcom Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <div className="flex flex-row justify-center items-center ">
        <div className="w-[200px] h-[120px] relative" >
        <Image layout="fill" src="/logo_app.jpg"  alt="Logo" />
        </div>
        </div>
    
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"/>
          
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
          <div className="flex items-center justify-end">
            
            <div className="text-sm">
              <Link href={'/Forgetpassword'} className="font-medium text-indigo-500 hover:text-indigo-500">
                    Forgot your password?
              </Link>
            </div>
          </div>
          <div>
                  <button
                    disabled={isLoading}
                    onClick={handleLogin}
                    type="button"
                    className="w-full flex justify-center bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4  focus:ring-purple-300 dark:focus:ring-purple-800 text-gray-100 p-4  rounded-full tracking-wide
                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                  >
                    {isLoading ? (
                      <div className="flex gap-1 justify-center items-center text-blue-600 text-xs">
                        <Ring size={15} lineWeight={5} speed={2} className="mt-1" color="white" />
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">Sign In</div>
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
            <span>{`Don't have an account?`}</span>
            <Link href="/Sign_Up" className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">Sign up</Link>
          </p>
              
            </div>
          </div>
        </main>
    
  )
}

export default Login;

