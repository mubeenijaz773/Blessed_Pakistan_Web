"use client";
import React, {  useRef } from "react";

import { ServiceUrl } from '@/app/global';



import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Image from "next/image";

export default function DisplayAgencies({Loading ,  Agencies , openAgencyDialog}) {

const scrollContainerRef = useRef(null);



  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  
  return (


   
    <div className="container mx-auto mt-[50px] mb-[100px] px-3 ">
          <div className="max-w-full border border-slate-300 p-10 rounded-lg relative overflow-hidden">
  
       <h1 className="text-black font-bold font-sans text-2xl ">
          Titanium Agencies
        </h1>
      <div className="rounded-lg relative overflow-hidden">
       


        {Loading ? (
       <>
       <AgencyLoading />
       </>
            ) : (
              <>
                Agencies.length === 0 ? (
                  <div className="text-center text-gray-500">No Agencies Found</div>
                ) : (
                 
   
 
          <div>
            <BsArrowLeft
              onClick={scrollLeft}
              className="absolute z-50 -left-0 top-1/2 text-blue-500 border h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
            >
              &lt;
            </BsArrowLeft>
            <div
              ref={scrollContainerRef}
              className="flex gap-4 snap-x snap-start overflow-x-auto"
              style={{
                overflowX: "hidden",
                scrollbarWidth: "none", // Firefox
                "-ms-overflow-style": "none", // IE and Edge
              }}
            >
          {Agencies?.map((item) => (

item.status === "Active" && (

  <div key={item._id} className="p-2 scroll-snap-align: start;">
    <div onClick={() => { openAgencyDialog(item); }} className="flex flex-row mt-10  gap-4 rounded-lg cursor-pointer transform hover:scale-105 transition duration-300 snap-start bg-white shadow-md p-4 ">
     <div className="h-[70px] w-[70px] relative" >
      <Image
        className="rounded-lg "
        src={`${ServiceUrl}/Add_Agency/?filename=${item.Logoimages[0]["name"]}`}
        alt={item.Logoimages.name}
        layout="fill"
      />
      </div>
      <div className="flex flex-col">
        <h5 className="mb-2 text-xs text-neutral-900 font-bold font-sans relative ml-4 mt-2">
          {item.Agencyname}
        </h5>
        <p className="mb-3 text-xs text-neutral-900 font-bold font-sans flex gap-2 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/>
</svg>
          {item.address}
        </p>
    
  
      </div>
    </div>
  </div>

)
))}


            </div>

            <BsArrowRight
              onClick={scrollRight}
              className="absolute right-0 z-50 top-1/2 text-blue-500 border h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
            >
              &gt;
            </BsArrowRight>
          </div>
          </>
        )}
        
      </div>
 </div>
 
    </div>


  );
}



const AgencyLoading = () =>{
  return(
    <div className="loading-indicator flex flex-row flex-wrap gap-10 mt-10">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className=" flex flex-row w-64 gap-2   p-4 mb-2 rounded-lg cursor-pointer   animate-pulse"     
      >
        <li className="flex flex-col items-center gap-2 w-[200px]">
       
       <div className="flex flex-row gap-5 w-full">

        <div className=" h-[70px] w-[90px] rounded-lg bg-slate-200 text-lg"></div>
       
       <div className="w-full h-full flex-col justify-center items-center  ">
             
             <div className="mb-1 h-5 w-full rounded-lg bg-slate-200 text-lg mt-2"></div>
       
             <div className="flex justify-start gap-2 w-full mt-2">  
           <div className="h-4 w-4 rounded-full bg-slate-200"></div>
            <div className="mb-1 h-5 w-[100px] rounded-lg bg-slate-200 text-lg"></div>
       </div>
       </div>
 
 </div>
        </li>
      </div>
    ))}
  </div>
  )
}


