"use client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import { GrMapLocation } from "react-icons/gr";
import { ServiceUrl } from '@/app/global';
import Link from "next/link";
import { useRouter } from 'next/navigation';



export default function DisplayLocations  () {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("For Sale");
  const [userid, setUserid] = useState('');

  const router = useRouter()


  useEffect(() => {
    fetchLocations();
    setUserid(localStorage.getItem('_id'));
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch(`${ServiceUrl}/FetchProduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLocations(data["products"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };
  const renderLocationTabs = () => {
    const forRentLocations = locations.filter(
      (location) => location.purpose === "Rent"
    );
    const forSaleLocations = locations.filter(
      (location) => location.purpose === "Sell"
    );

    const activeLocations =
      activeTab === "For Rent" ? forRentLocations : forSaleLocations;

    // Determine the header text based on the selected tab
    const headerText =
      activeTab === "For Rent"
        ? "Flats"
        : activeTab === "For Sale"
        ? "Plots"
        : "";





        function GotToNextPage(){

          if(userid == "" || userid == null){
          
            router.push("/Login")
            toast.error("You Have to First Login")
          }else{
          
        
          }
          
          
          
          }






//////////////////////// Html Start From here //////////////////////////////////////////




    return (
      <main className="p-5">
        <div className="px-7">
          <h1 className="text-black font-bold font-sans text-2xl">
            Popular locations
          </h1>
        </div>
        <div className="m-11">


  {/* /////////////////////// Tabs ///////////// */}
          
          <div className="flex space-x-4">
            <div
              className={`tab cursor-pointer ${
                activeTab === "For Sale"
                  ? "border-b-4 px-2 border-blue-700 "
                  : "text-gray-500  "
              }`}
              onClick={() => toggleTab("For Sale")}
            >
              <span className={`text-lg font-medium font-sans text-black`}>
                For Sale
              </span>
            </div>

            <div
              className={`tab cursor-pointer ${
                activeTab === "For Rent"
                  ? "border-b-4 px-2 border-blue-700 "
                  : "text-gray-500"
              }`}
              onClick={() => toggleTab("For Rent")}
            >
              <span className={` text-lg font-medium font-sans text-black`}>
                To Rent
              </span>
            </div>
          </div>

{/* /////////////////// Tabs Content ////////////////////////////////////// */}


          {/* <div className="border border-b h-0.5 border-gray-300 w-full" /> */}

          {isLoading ? (
        <>
        <div className="loading-indicator flex flex-row justify-between flex-wrap animate-pulse w-full mt-5">
         {[...Array(3)].map((_, index) => (
          <div
          key={index}
          className='py-4'
          >
             <div className=" h-[40px] w-[60px] rounded-full flex justify-start bg-slate-200 text-lg"></div>
                  <div
                  className="flex justify-between items-center gap-5  w-full mt-2 ">  
                <div className="h-[40px] w-[40px] rounded-full bg-slate-200"></div>
                 <div className="mb-1 h-7 w-[300px] rounded-full bg-slate-200 text-lg mt-1"></div>
            </div>  
           </div>
         ))}
       </div>
        <div className="loading-indicator flex flex-row justify-between flex-wrap animate-pulse w-full mt-5">
        {[...Array(3)].map((_, index) => (
         <div
         key={index}
         className='py-4'
         >
            <div className=" h-[40px] w-[60px] rounded-full flex justify-start bg-slate-200 text-lg"></div>
                 <div
                 className="flex justify-between items-center gap-5  w-full mt-2 ">  
               <div className="h-[40px] w-[40px] rounded-full bg-slate-200"></div>
                <div className="mb-1 h-7 w-[300px] rounded-full bg-slate-200 text-lg mt-1"></div>
           </div>  
          </div>
        ))}
      </div>
       <div className="loading-indicator flex flex-row justify-between flex-wrap animate-pulse w-full mt-5">
       {[...Array(3)].map((_, index) => (
        <div
        key={index}
        className='py-4'
        >
           <div className=" h-[40px] w-[60px] rounded-full flex justify-start bg-slate-200 text-lg"></div>
                <div
                className="flex justify-between items-center gap-5  w-full mt-2 ">  
              <div className="h-[40px] w-[40px] rounded-full bg-slate-200"></div>
               <div className="mb-1 h-7 w-[300px] rounded-full bg-slate-200 text-lg mt-1"></div>
          </div>  
         </div>
       ))}
     </div>
     </>
       ) : (
            <div className="mt-4">
              <div className="mb-4">
                {headerText && (
                  <h1 className="text-black font-medium mt-7 font-sans text-xl">
                    Most Popular Locations For {headerText}
                  </h1>
                )}

  {/* ////////////////////////////// Flats  To Rent ///////////////////////////////////   */}

                {activeTab == "For Rent" && (

<>



<div className='flex flex-row justify-center items-center w-full' >
                  <div className="flex flex-row  justify-between w-[100%]  gap-10 ">
                    {/* Lahore   */}
                    <div className='w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Lahore
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Lahore' && item.subType === 'Flats' )
  .map(item => item.location)))
  .map((location, index) => (
                        
                          <div
                            key={index}
                         
                            className=""
                          >
                            <div    onClick={GotToNextPage} className="location-card">
                              <Link
                                href={`/Filter_Locations?purpose=Rent&location=${location}&city=Lahore&subType=Flats`}
                              >
                               
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans underline text-sm text-blue-600 hover:text-blue-500">
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                                
                              </Link>
                            </div>
                          </div>
                    
                      ))}
                    </div>

                    {/* Karachi */}

                    <div  className='w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Karachi
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Karachi' && item.subType === 'Flats' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                           
                            className=""
                          >
                            <div  onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Rent&location=${location}&city=Karachi&subType=Flats`}
                              >
                              
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans underline text-sm text-blue-600 hover:text-blue-500">
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                                
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>

                    {/* Islamabad */}

                    <div  className='w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Islamabad
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Islamabad' && item.subType === 'Flats' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                            className=""
                          >
                            <div    onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Rent&location=${location}&city=Islamabad&subType=Flats`}
                              >
                               
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                                
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  </div>
                  </>
                )}





                {/* //////////////////////////////////////////////////////////////////////////////////// */}

                {/*  /////////////////////////////  For Sale Plots //////////////////////////// */}

                {activeTab == "For Sale" && (
           
<div className='flex flex-row justify-center items-center w-full' >
                  <div className="flex flex-row  justify-between w-[100%]  gap-10 ">
                     {/* Lahore   */}
                    <div className='w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Lahore
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Lahore' && item.subType === 'Plots' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                            className=""
                          >
                            <div    onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Lahore&subType=Plots`}
                              >
                              
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 text-sm font-sans underline text-bllue-600 hover:text-blue-500">
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                               
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>

                    {/* Karachi */}

                    <div className='w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Karachi
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Karachi' && item.subType === 'Plots' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                            className=""
                          >
                            <div    onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Karachi&subType=Plots`}
                              >
                             
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                                
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>

                    {/* Islamabad */}

                    <div className='w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Islamabad
                      </h1>
                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Islamabad' && item.subType === 'Plots' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                            className=""
                          >
                            <div    onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Islamabad&subType=Plots`}
                              >
                              
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                                 
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  </div>
                )}
                {/* //////////////////////////////////////////////////////////////////////////////////// */}

                {/*  /////////////////////////////  For Sale Flats //////////////////////////// */}

                {activeTab === "For Sale" && (
                  <>
                    <h1 className="text-black font-medium mt-7 font-sans text-xl">
                      Most Popular Locations For Flats
                    </h1>

                  
<div className='flex flex-row justify-center items-center w-full' >
                  <div className="flex flex-row  justify-between w-[100%]  gap-10 ">
                 
                      
                      
                      {/* Lahore   */}
                      <div className='w-[33%]' >
                        <h1 className="text-black font-medium mt-7 font-sans mb-7">
                          Lahore
                        </h1>

                        {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Lahore' && item.subType === 'Flats' )
  .map(item => item.location)))
  .map((location, index) => (
                          <>
                            <div
                              key={index}
                              className=""
                            >
                              <div     onClick={GotToNextPage} className="location-card">
                              <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Lahore&subType=Flats`}
                              >
                               
                                      <div className="flex items-center mb-2">
                                        <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                        <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                          {location} {activeLocations.length}
                                        </span>
                                      </div>
                                
                                </Link>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>

                      {/* Karachi */}

                      <div className='w-[33%]'>
                        <h1 className="text-black font-medium mt-7 font-sans mb-7">
                          Karachi
                        </h1>

                        {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Karachi' && item.subType === 'Flats' )
  .map(item => item.location)))
  .map((location, index) => (
                          <>
                            <div
                              key={index}
                              className=""
                            >
                              <div    onClick={GotToNextPage} className="location-card">
                              <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Karachi&subType=Flats`}
                              >
                               
                                      <div className="flex items-center mb-2">
                                        <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                        <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                          {location} {activeLocations.length}
                                        </span>
                                      </div>
                                   
                                </Link>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>

                      {/* Islamabad */}

                      <div className='w-[33%]' >
                        <h1 className="text-black font-medium mt-7 font-sans mb-7">
                          Islamabad
                        </h1>

                        {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Islamabad' && item.subType === 'Flats' )
  .map(item => item.location)))
  .map((location, index) => (
                          <>
                            <div
                              key={index}
                              className=""
                            >
                              <div    onClick={GotToNextPage} className="location-card">
                              <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Islamabad&subType=Flats`}
                              >
                                 
                                      <div className="flex items-center mb-2">
                                        <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                        <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                          {location} {activeLocations.length}
                                        </span>
                                      </div>
                          
                                </Link>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                    </div>
                  </>
                )}
{/* //////////////////////////////////////////////////////////////////////////////////// */}

       {/*  /////////////////////////////  For Sale Houses //////////////////////////// */}

       {activeTab === "For Sale" && (
                  <>
                    <h1 className="text-black font-medium mt-7 font-sans text-xl">
                      Most Popular Locations For Houses
                    </h1>

                  
<div className='flex flex-row justify-center items-center w-full' >
                  <div className="flex flex-row  justify-between w-[100%]  gap-10 ">
                      {/* Lahore   */}
                      <div className='w-[33%]' >
                        <h1 className="text-black font-medium mt-7 font-sans mb-7">
                          Lahore
                        </h1>

                        {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Lahore' && item.subType === 'House' )
  .map(item => item.location)))
  .map((location, index) => (
                          <>
                            <div
                              key={index}
                              className=""
                            >
                              <div    onClick={GotToNextPage} className="location-card">
                              <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Lahore&subType=House`}
                              >
                               
                                      <div className="flex items-center mb-2">
                                        <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                        <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                          {location} {activeLocations.length}
                                        </span>
                                      </div>
                                  
                                </Link>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>

                      {/* Karachi */}

                      <div className='w-[33%]' >
                        <h1 className="text-black font-medium mt-7 font-sans mb-7">
                          Karachi
                        </h1>

                        {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Karachi' && item.subType === 'House' )
  .map(item => item.location)))
  .map((location, index) => (
                          <>
                            <div
                              key={index}
                              className=""
                            >
                              <div    onClick={GotToNextPage} className="location-card">
                              <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Karachi&subType=House`}
                              >
                                  
                                      <div className="flex items-center mb-2">
                                        <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                        <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                      
                                          {location}  {activeLocations.length}
                                        </span>
                                      </div>
                         
                                </Link>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>

                      {/* Islamabad */}

                      <div className='w-[33%]' >
                        <h1 className="text-black font-medium mt-7 font-sans mb-7">
                          Islamabad
                        </h1>

                        {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Islamabad' && item.subType === 'House' )
  .map(item => item.location)))
  .map((location, index) => (
                          <>
                            <div
                              key={index}
                              className=""
                            >
                              <div    onClick={GotToNextPage} className="location-card">
                              <Link
                                href={`/Filter_Locations?purpose=Sell&location=${location}&city=Islamabad&subType=House`}
                              >
                              
                                      <div className="flex items-center mb-2">
                                        <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                        <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                         
                                          {location} {activeLocations.length}
                                        </span>
                                      </div>
                                    
                                </Link>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                    </div>
                  </>
                )}



{/* /////////////////////  Houses To Rent ///////////////////////////////  */}


{activeTab == "For Rent" && (

  <>

  <h1 className="text-black font-medium mt-7 font-sans text-xl">
  Most Popular Locations For Houses
  </h1>
              
<div className='flex flex-row justify-center items-center w-full' >
                  <div className="flex flex-row  justify-between w-[100%]  gap-10 ">
                           {/* Lahore   */}
                    <div className=' w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Lahore
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Lahore' && item.subType === 'House' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                            className=""
                          >
                            <div     onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Rent&location=${location}&city=Lahore&subType=House`}
                              >
                          
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                            
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                               
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>

                    {/* Karachi */}

                    <div className='w-[33%]' > 
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Karachi
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Karachi' && item.subType === 'House' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                            className=""
                          >
                            <div    onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Rent&location=${location}&city=Karachi&subType=House`}
                              >
                              
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                               
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                              
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>

                    {/* Islamabad */}

                    <div className=' w-[33%]' >
                      <h1 className="text-black font-medium mt-7 font-sans mb-7">
                        Islamabad
                      </h1>

                      {Array.from(new Set(activeLocations
  .filter(item => item.city === 'Islamabad' && item.subType === 'House' )
  .map(item => item.location)))
  .map((location, index) => (
                        <>
                          <div
                            key={index}
                            className=""
                          >
                            <div    onClick={GotToNextPage} className="location-card">
                            <Link
                                href={`/Filter_Locations?purpose=Rent&location=${location}&city=Islamabad&subType=House`}
                              >
                             
                                    <div className="flex items-center mb-2">
                                      <GrMapLocation  className="w-5 h-5 text-blue-700" />

                                      <span className="ml-2 font-sans text-sm underline text-blue-600 hover:text-blue-500">
                                  
                                        {location} {activeLocations.length}
                                      </span>
                                    </div>
                              
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                  </div>
                  </>
                )}
 </div>
            </div>
          )}
        </div>
      </main>
    );
  };

  return (
    <div>
      <div className="mb-[100px]">{renderLocationTabs()}</div>
    </div>
  );
};


