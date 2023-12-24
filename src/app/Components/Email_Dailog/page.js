"use client"
import React , { useState , useEffect } from 'react';



import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ServiceUrl} from "../../global"
// import { BiLock, BiMailSend } from "react-icons/bi";
import { Ring } from "@uiball/loaders";

import { IoMdCall } from 'react-icons/io';
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { RxCross2 } from 'react-icons/rx';

export default function EmailDailogBox({ item, isOpen , onClose}){

  const [selectedValue, setSelectedValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleRadioChange = (event) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value);
  };


  const handleEmailSent = async () => {
    setIsLoading(true); // Set loading to true when the button is pressed
  
 if(selectedValue){
        try {
          const response = await fetch(`${ServiceUrl}/Sent_PropertyEmail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: selectedValue,
              email: item.email,
            }),
          });
  
          const data = await response.json();
          console.log(data); // Check the response from the API
          if (data["status"] === 200) {
            toast.success("Email Sent successfully");
          } else if (data["status"] === 400) {
            toast.error("Enter Valid Email");
          }
          // You can handle the response here and show appropriate messages to the user
        } catch (error) {
          toast.error("Error signing up:", error);
        }
      }else {
        toast.error("select who you are")
      }
  
  
    setIsLoading(false); // Set loading to false after the condition checks are complete
  };

    return(

        <div>

            
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] h-auto  rounded-lg shadow-md">
            <div className="border flex justify-end gap-32 px-4 items-center border-b py-2 shadow-lg w-full bg-white" >
            <h2 className="text-black font-sans flex justify-center font-medium" >Contact Agent</h2>
 <RxCross2 onClick={onClose} className=" cursor-pointer flex justify-end w-5 h-5" />
</div>
<div className=" border border-b py-2 flex flex-col justify-center items-center" >
<img src="/logo2.png" className=" w-10 h-10" />
<text className=" text-sm font-sans font-medium" >Blessed Pakistan</text>
{/* <text className=" text-sm font-sans font-medium" >Agent Name: Haji Ibrar</text> */}
  </div>
   <ToastContainer  />

  <div className="px-5 p-3" >

  <button
//   onClick={handleopen}
        className="flex gap-2 cursor-pointer w-full justify-center items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm font-sans px-5 py-3.5 text-center mr-2 mb-2"
      >
        <IoMdCall className="w-6 h-6" />
       { isOpen ? (
        <span>
         03094476329
        </span>
       ):(
        <span>
       CALL
        </span>
      
       ) }
        
      </button>  
  
  <div className="w-full py-3 mt-5 flex gap-2 flex-col  font-sans rounded  px-2 bg-gray-100">
                    <div className="flex gap-2">
                    <BiMailSend className="w-4 h-4"/>                               
                   <span className="font-semibold text-xs">Email*</span> 
                              
                    </div>             
                    <p>{item.email}</p> 
                    <span className="uppercase text-xs">
                    {/* {data.email} */}
                    </span>
        </div>
    
    
        <div className="w-full py-3 mt-2 flex gap-2 flex-col  font-sans rounded  px-2 bg-gray-100">
                    <div className="flex gap-2">
                   <FaPhoneSquareAlt className="w-4 h-4"/> 
                    <span className="font-semibold text-xs">Mobile*</span> 
                    
                    </div>
                    {item.mobile}
                    <span className="uppercase text-xs">
                    {/* {data.mobile} */}
                    </span>
        </div>


        <div className="w-full py-3 mt-2 flex gap-2 flex-col  font-sans rounded  px-2 bg-gray-100">
                    <div className="flex gap-2">
                   <FaPhoneSquareAlt className="w-4 h-4"/> 
                    <span className="font-semibold text-xs">Message*</span> 
                    
                    </div>
                    <span className=" text-xs">
                    I would like to inquire about your property at Blessed Pakistan Estate . Please contact me at your earliest convenience
                    </span>
        </div>
        <div className="flex gap-2 font-sans mt-3">
      <text className="text-xs text-black">I am a:</text>
      <label className="inline-flex text-xs items-center">
        <input
          type="radio"
          className="form-radio text-purple-600 bg-slate-400 h-4 w-4"
          name="radio"
          value="buyer"
          onChange={handleRadioChange}
        />
        <span className="ml-2">Buyer</span>
      </label>
      <label className="inline-flex text-xs items-center">
        <input
          type="radio"
          className="form-radio text-purple-600 h-4 w-4 bg-slate-400"
          name="radio"
          value="agent"
          onChange={handleRadioChange}
        />
        <span className="ml-2">Agent</span>
      </label>
      <label className="inline-flex text-xs items-center">
        <input
          type="radio"
          className="form-radio text-purple-600 h-4 w-4 bg-slate-400"
          name="radio"
          value="other"
          onChange={handleRadioChange}
        />
        <span className="ml-2">Other</span>
      </label>
    </div>
<button
onClick={handleEmailSent}
        className="flex gap-2 w-full mt-3 cursor-pointer justify-center items-center text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs font-sans px-5 py-2.5 text-center mr-2 mb-2"
      >
        <BiMailSend className="w-6 h-6" />
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
            Send Email
                </div>
              )}
      </button>  




    </div>


      
      
          </div>
        </div>
 )}
        </div>
    )
}