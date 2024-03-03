'use client'
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState , Suspense } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServiceUrl } from '@/app/global';
import { useRouter } from "next/navigation";
import { Ring } from "@uiball/loaders";



// Use the defined type for the children prop
const SuspenseBoundary = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);



const WrapSetPassword = () =>{

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [confirmpassword, setConfirmpassword] = useState('');
  const router = useSearchParams();
  const data = JSON.parse(decodeURIComponent(router.get("data")));
  const email = data['email']
  const username = data['username']
  const role = data["role"]

  const route = useRouter()

  const isStrongPassword = (password) => {
    // Define your strong password criteria here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!isStrongPassword(password)) {
      toast.error('Password does not meet strong requirements');
      console.log('error password');
      return;
    }
  
    if (password === confirmpassword) {
      setIsLoading(true);
  
      try {
        const response = await fetch(`${ServiceUrl}/SignUp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            role: role,
          }),
        });
  
        const data = await response.json();
        toast.success('Account Created successfully');
  
        if (data.obj['role'] === 'agent') {
          route.push('/Add_Agencies');
        } else if (data.obj['role'] === 'user') {
          route.push('/Login');
        }
      } catch (error) {
        toast.error('Error signing up:', error);
      } finally {
        // Set loading state to false, regardless of success or error
        setIsLoading(false);
      }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">


      <div className="bg-white p-10 rounded-lg shadow-lg w-96">

        <h2 className="text-3xl font-semibold mb-4 font-sans text-center text-purple-600">Set Your Password</h2>

        <form>

          <div className="relative flex flex-col gap-9 ">

            <input
              id="email"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              autoFocus
              className="relative z-10 border-0 border-b-2 text-xs border-blue-500 h-10 bg-transparent text-gray-900 outline-none px-2 peer"
            />
            <label className="absolute text-xs font-sans transition-transform duration-300 translate-y-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:translate-y-[-1rem] peer-focus:scale-75 peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500">
              Enter Password
            </label>
          </div>

          <div className=" mt-5">
            <div className="relative flex flex-col">

              <input
                id="password"
                // type={showPassword ? 'text' : 'password'}
                type="text"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                placeholder=" "
                autoFocus
                className="relative z-10 border-0 border-b-2 border-blue-500 text-xs h-10 bg-transparent text-gray-900 outline-none px-2 peer"
              />
              <label className="absolute font-sans text-xs transition-transform duration-300 translate-y-0 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100  peer-focus:translate-y-[-1rem] peer-focus:scale-75 peer-placeholder-shown:text-gray-500 peer-focus:text-blue-500">
                Confirm Password
              </label>
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
              ):(
                <div className="flex justify-center items-center" >
                Submit
                    </div>
                    )}
              </button>

        </form>

        <div className="flex gap-2 mt-4 justify-center">
          <p className="text-center  text-xs text-gray-600">
            Already have an account?

          </p>
          <Link className="text-indigo-600 text-xs hover:text-indigo-800" href={'/Login'}>
            Sign In
          </Link>
        </div>

      </div>
      <ToastContainer />
    </div>


  )

}




const SetPassword = () => {



return(
  <>
    
    <SuspenseBoundary>
  <WrapSetPassword />
</SuspenseBoundary>
  </>
)
}

export default SetPassword;