"use client"
import Link from "next/link"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ServiceUrl} from "../../global"
import {  BiLock, BiMailSend, } from "react-icons/bi";
import { BsEye, BsEyeSlash, } from "react-icons/bs";
import { Ring } from '@uiball/loaders'
import Image from "next/image";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router  = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
<div className="flex justify-center min-h-screen bg-gray-100 ">
 <ToastContainer />
 
  <div className="bg-white p-8 rounded-lg shadow-lg w-96 h-[450px] mt-[30px]">
 <div className=" flex justify-center items-center">
  <Image src="/logo_app.jpg" width={120} height={120}/>
  </div>
    <h2 className="text-3xl font-semibold mb-4 font-sans text-center text-purple-700">Sign In</h2>
    <form>
  
    <div className="relative flex flex-col">
  <span className="absolute right-2 top-2">
  <BiMailSend className="w-4 h-4 text-blue-500" />
  </span>
  <input
    id="email"
    type="email"
    placeholder="Enter email"
    autoFocus
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="relative z-10  border-0 border-b-2 text-xs border-blue-500 h-10 bg-transparent text-gray-900 outline-none px-2 peer"
  />
  <label className="absolute text-xs font-sans transition-transform duration-300 translate-y-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:translate-y-[-1rem] peer-focus:scale-75 peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500">
    Enter Email
  </label>
</div>

<div className="mt-5 relative flex flex-col">
  
<div
          className="absolute right-2 top-2 "
        >
          <BiLock className="w-4 h-4 text-blue-500" />
        </div>

  <input
    id="password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    autoFocus
    className="relative z-10  border-0 border-b-2 border-blue-500 text-xs h-10 bg-transparent text-gray-900 outline-none px-2 peer"
  />
  <label className="absolute font-sans text-xs transition-transform duration-300 translate-y-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:translate-y-[-1rem] peer-focus:scale-75 peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500">
    Enter Password
  </label>
</div>


<div className="flex justify-between mt-1" >

  <span className="flex text-xs font-sans gap-2">
    
    {showPassword? (
    <BsEye onClick={handlevisibility} className="w-4 h-4 text-blue-500" />
    ):(
      <BsEyeSlash onClick={handlevisibility} className="w-4 h-4 text-blue-500" />    
    )}
    
    <text  >Show Password</text>
  </span>

      <Link className="text-indigo-600 text-xs font-sans hover:text-indigo-800" href={'/Components/Forgetpassword'}>
          Forgot Password?
        </Link>
        </div> 
      
      <div>


      <button disabled={isLoading} onClick={handleLogin} type="button" className="mt-10 w-full text-white 
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
            Sign In
                </div>
              )} 
          </button>

      </div>
    </form>
    <div className="flex gap-2 mt-4 justify-center">
    <p className="text-center  text-xs text-gray-600">
      Don't have an account?
    </p>
    <Link className="text-indigo-600 text-xs hover:text-indigo-800" href={"/Components/Sign_Up"}>
        Sign Up 
      </Link>
      </div>
  </div>
</div>

    )
}


export default Login 



