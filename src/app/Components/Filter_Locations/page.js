"use client"
import React from "react"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceUrl } from "../../global";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import LoadingSpinner from "../../Components/Loader/page";
import { MdLocationOn, MdOutlineShareLocation } from 'react-icons/md';
import { IoMdCall } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { TbArrowAutofitHeight, TbMailFilled } from "react-icons/tb";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import EmailDailogBox from "../Email_Dailog/page"
import  CallDialog from "../Call_Dailogbox/page"
import { useRouter } from "next/navigation";


export default function FilterLocations(){

const router = useSearchParams()
const [details, setDetails] = useState([]);
const [searchText, setSearchText] = useState("");
const [isLoading, setIsLoading] = useState(true);
const [userid, setUserid] = useState('');
var purpose  =  router.get('purpose');
var location =  router.get('location');
var city = router.get('city');
var subType = router.get('subType')

const routerr = useRouter()
const [isDialogOpen, setDialogOpen] = useState(false);
const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);

const toggleDialog = () => {
  setDialogOpen(!isDialogOpen);
};


const openEmailDialog = () => {
  setEmailDialogOpen(true);
};

const closeEmailDialog = () => {
  setEmailDialogOpen(false);
};



useEffect(() => {
  setUserid(localStorage.getItem('_id'));
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${ServiceUrl}/Find_PopularLocations/?purpose=${purpose}&city=${city}&location=${location}&subType=${subType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setDetails(data["filteredProducts"]);
      console.log(data["filteredProducts"], 'data')
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching images:", error);
    }
  };


  // Render the property details based on searchText
  const filteredProperties = details.filter((property) => {
    return (
      property.city.toLowerCase().includes(searchText.toLowerCase()) ||
      property.location.toLowerCase().includes(searchText.toLowerCase()) ||
      property.propertyType.toLowerCase().includes(searchText.toLowerCase()) ||
      property.subType.toLowerCase().includes(searchText.toLowerCase()) ||
      property.price.toLowerCase().includes(searchText.toLowerCase()) ||
      property.title.toLowerCase().includes(searchText.toLowerCase()) ||
      property.bedrooms.toLowerCase().includes(searchText.toLowerCase()) ||
      property.bathrooms.toLowerCase().includes(searchText.toLowerCase()) 
      // Add more conditions as needed based on your data structure
    )
  });







  function GotToNextPage(item){

    if (userid == "" || userid == null) {
      routerr.push("/Components/Login");
      toast.error("You Have to First Login");
    } else {
      routerr.push(`/Components/Properties_Details/${item._id}`);
    }
  }

    
 




  return (
    <div className="mt-[50px] m-11 " >

<div className="relative flex justify-center mb-9 ">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search Properties"
        className=" w-[900px] h-[50px] pl-9  pr-10 border-2 border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button className="absolute top-1/2 right-2 transform -translate-y-1/2 text-purple-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            // strokeWidth="2"
            d="M16 16 22 22 16 16 8 8 2 2 8 8 16 16"
          />
        </svg>
      </button>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {details.length === 0 ? (
         
         <div className="flex justify-center mt-10">
         <LoadingSpinner />
         </div>
        

        ) : (
            filteredProperties.map((item) => (
            <div   key={item._id} className="bg-white w-9/12 rounded-lg overflow-hidden shadow-md">
             <div onClick={() => GotToNextPage(item) } className="cursor-pointer" >

          
              <img
                className="w-full h-[150px] object-cover object-center"
                src={`${ServiceUrl}/Product/?filename=${item.images[0]["name"]}`}
                alt={item.images.name}
              />
                 </div>
              <div className="p-4">
                <div className="flex flex-row justify-between">
                  <text className="text-gray-400 text-xs font-sans">Added: 6 days Ago</text>
                  <img src="/verification.png" className="w-5 h-5" />
                </div>
                <p className="text-xs text-gray-700 mb-2">
                  Pkr
                  <span className="text-sm text-black font-medium font-sans"> {item.price}</span>
                </p>
                <h2 className="text-sm font-semibold text-gray-900 mb-2">{item.title}</h2>
                <div className="flex items-center gap-2 text-xs text-black mb-2">
                  <MdLocationOn />
                  {item.location}
                </div>
                <div className="flex flex-row items-center text-sm text-gray-600">
                  <div className="flex items-center text-xs text-black gap-2">
                    <MdOutlineShareLocation />
                    {item.city}
                  </div>
                  <div className="flex items-center font-sans ml-3 text-xs gap-2 text-black">
                    <TbArrowAutofitHeight />
                    {item.Area_size}
                  </div>
                </div>
              </div>

              <div className=" flex items-center justify-center mb-5">
                <button onClick={openEmailDialog}
                  className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <TbMailFilled className="w-4 h-4" />
                  Email
                </button>
                <CallDialog call={item.mobile} isOpen={isDialogOpen} onClose={toggleDialog} />
  <EmailDailogBox item={item}  isOpen={isEmailDialogOpen} onClose={closeEmailDialog}  />
                <button
                onClick={toggleDialog}
                  className="flex gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <IoMdCall className="w-4 h-4" />
                  Call
                </button>
              </div>
            </div>
          ))
        )}
        <ToastContainer />
      </div>
    </div>
  );
  
}