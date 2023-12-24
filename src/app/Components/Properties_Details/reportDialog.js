"use client"

import React , {useState , useEffect} from "react";

import {UserReportProduct } from "../../action/feedback";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdCancel } from "react-icons/md";


///////////////////////////////  Feedback //////////////////////////////////////////////////

export default function  ReportDialogBox  ({ onClose })  {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
  
  useEffect(() =>{
  
    setEmail(localStorage.getItem("email"))
  
  },[])
  
  
    const handleSubmit = async () => {
      setIsLoading(true);
  var userid  = localStorage.getItem("_id")
           var data = await UserReportProduct(userid ,email , description) 
         
         if(email && description){
         
           if (data["status"] == 200) {
  
        
         toast.success('Your Report Submit Successfully');
         setIsLoading(false);
          // Close the dialog box after submission
      onClose();
       } else if (data["status"] == 400) {
         toast.error("Error to Submit");
         setIsLoading(false);
       } else if (data["status"] == 404) {
         toast.error("Error to Submit");
         setIsLoading(false);
       }else{
         toast.error("Error to Submit")
         setIsLoading(false);
       }
      }else{
        toast.error("fill the required feilds")
        setIsLoading(false);
      }
  
   
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <ToastContainer />
        <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
          <div className='flex justify-between'>
          <h2 className="text-2xl font-semibold mb-4 text-black">Report</h2>
  <div onClick={onClose}> 
  <MdCancel />
  </div>
          </div>
  
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 text-black p-3 border rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
  
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              placeholder='your Report.....'
              className="mt-1 p-3 border text-black rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
  
          <div className="flex justify-end">
          <button className='border rounded-lg px-4 py-2 text-black' onClick={onClose}>
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={handleSubmit}
            >
              {isLoading ? (
                      <div className="flex gap-1 justify-center items-center text-white text-xs">
                        {/* Replace with your loading spinner */}
                        Loading...
                      </div>
                    ) : (
                      <div className="flex justify-center items-center">
                        Submit
                      </div>
                    )}
            </button>
    
          </div>
        </div>
      </div>
    );
  };
  