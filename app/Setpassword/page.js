'use client'
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useState , Suspense, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ServiceUrl } from '@/app/global';
import { useRouter } from "next/navigation";
import { Ring } from "@uiball/loaders";
import {GetUser} from "@/app/action/user";


// Use the defined type for the children prop
const SuspenseBoundary = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);



const WrapSetPassword = () =>{

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [users, setUsers] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const router = useSearchParams();
  const userId = router.get("_id")


  const route = useRouter()

useEffect(() => {

  GetUserData()
},[])


async function GetUserData() {
  
const user = await GetUser(userId)
setUsers(user.Get[0])
}



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
  
     // Check if the password and confirm password match
     if (password !== confirmpassword) {
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
            email: users.email,
            password: password
          }),
        });
        const data = await res.json();
  console.log(data.status , res.status , data)
        if (data.status == 200) {
          route.push('/Login');
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