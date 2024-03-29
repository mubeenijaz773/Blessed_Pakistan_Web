"use client";
import React, { useState, useEffect, useRef } from "react";

import { BiCategoryAlt } from "react-icons/bi";
import { ServiceUrl } from '@/app/global';
import { RiPriceTag3Line } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  FaHome } from "react-icons/fa";
import {GetAllProperties} from "@/app/action/Property";
import { HiLocationMarker } from "react-icons/hi";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {SavefavoriteProperty} from "@/app/action/favorites";
import Image from "next/image";




const DisplayProduct = () => {
  const [properties, setProperties] = useState([]);

  const [showAllProperties, setShowAllProperties] = useState(false);
  const [userid, setUserid] = useState("");
  const scrollContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    setUserid(localStorage.getItem("_id"));
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await GetAllProperties();
      if(response.status == 200){
      console.log(response , "properties")
      setProperties(response["Get"]);
      setIsLoading(false);
      }else if(response.status == 400){
        setProperties([]);
        setIsLoading(false);
      }
    } catch (error) {
      setProperties([]);
      setIsLoading(false);
      console.error("Error fetching images:", error);
    }
  };


  const toggleShowAllProperties = () => {
    setShowAllProperties(!showAllProperties);
  };

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
    <div className="container mx-auto mt-[50px] mb-[100px] p-4 ">
      <div className="max-w-full border border-slate-300 p-10 rounded-lg relative overflow-hidden">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl text-neutral-900 font-bold mb-4 font-sans">
            Properties
          </h1>
                <div className="text-center mt-1">
              <button
                onClick={toggleShowAllProperties}
                className="text-blue-500 text-sm px-4 font-sans"
              >
                {showAllProperties
                  ? "Show Less Properties"
                  : "View All Properties"}
              </button>
            </div>
          {/* )} */}
        </div>

        {isLoading ? (
       
      <>
      <PropertiesLoading />
      </>
      ) : properties === undefined || properties.length === 0 ? (
        <div className="text-center text-gray-500">No Properties Found</div>
      ) : (
          <div>
            <BsArrowLeft
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 z-50 border text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
            >
              &lt;
            </BsArrowLeft>
            <div
              ref={scrollContainerRef}
              className="flex gap-4 snap-x  snap-start overflow-x-auto"
              style={{
                overflowX: "hidden",
                scrollbarWidth: "none", // Firefox
                "-ms-overflow-style": "none", // IE and Edge
              }}
            >
              {(showAllProperties
                ? properties
                : properties.slice(0, 4)
              ).map((item, index) => (
                <div
                  key={index}
                  className="p-2 scroll-snap-align: start;"
                  style={{ scrollSnapAlign: "start" }}
                 
                >
                  <Properties item={item} userid={userid} />
                </div>
              ))}
            </div>

            <BsArrowRight
              onClick={scrollRight}
              className="absolute right-4 top-1/2 text-blue-500 border h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
            >
              &gt;
            </BsArrowRight>
          </div>
       )}
      </div>
   
    </div>
  );
};

export default DisplayProduct;

function Properties({ item , userid }) {
  const [timeSinceInsertion, setTimeSinceInsertion] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    if (item && item.createdAt) {
      const insertionDate = new Date(item.createdAt);
      const timeAgo = formatDistanceToNow(insertionDate, { addSuffix: true });
      setTimeSinceInsertion(timeAgo);

      // Update time every minute (you can adjust the interval based on your needs)
      const intervalId = setInterval(() => {
        const updatedTimeAgo = formatDistanceToNow(insertionDate, {
          addSuffix: true,
        });
        setTimeSinceInsertion(updatedTimeAgo);
      }, 60000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [item]);



  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  function GotToNextPage(item) {
    if (userid == "" || userid == null) {
      router.push("/Login");
      toast.error("You Have to First Login");
    } else {
      router.push(`/Properties_Details/${item._id}`);
    }
  }


async function handleFavorite(item){

 const Addtofavorite =  await SavefavoriteProperty(userid , item._id) 

if(Addtofavorite.status == 200){
  toast.success("Added Success")
}else if(Addtofavorite.status == 400){
// toast.error("Error to Save")
toast.success("Added Success")
}else if(Addtofavorite.status == 500){
  toast.error("Error to Save")
  }else{
    toast.error("Error to Save")
  }

}


  return (<div className="w-full">
  <div className="w-[300px] cursor-pointer rounded-lg transform hover:scale-105 transition duration-300 snap-start">
    <div className="w-[300px] h-[200px] relative">
 
      <img
  onClick={() => GotToNextPage(item)}
  className="rounded-lg"
  src={item.images[0]?.name}
  alt={item.images[0]?.name || 'fallback-alt-text'}
/>


    </div>
    <div className="p-1 mt-3">
      {/* Three-dot menu */}

      {/* ... (unchanged) */}
      <div className="flex gap-2">
        <RiPriceTag3Line className="text-gray-900" />
        <div className="flex justify-between">
          <h5 className="mb-2 text-xs text-neutral-900 font-bold font-sans">
            {item.price}
          </h5>
          <p className="relative text-xs text-black ml-[90px]">
            Added {timeSinceInsertion || 0}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <HiLocationMarker className="text-purple-900" />
        <p className="mb-3 text-xs text-neutral-900 font-bold font-sans">
          {item.city} {item.location}
        </p>
      </div>
      <div className="flex space-x-2">
        <FaHome className="text-gray-900" />
        <span className="text-xs text-neutral-900 font-bold font-sans">
          {item.propertyType} , {item.subType}
        </span>
      </div>
      <div className="flex space-x-2 mt-2">
        <BiCategoryAlt className="text-gray-900" />
        <span className="text-xs text-neutral-900 font-bold font-sans">
          {item.Area_size}
        </span>
      </div>
    </div>
  </div>
</div>

  );
}




const PropertiesLoading = () =>{
  return(
    <div className="loading-indicator flex flex-row  gap-10 w-full">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className=" flex flex-row w-[300px] ml-5   gap-2   p-4 mb-2 rounded-lg cursor-pointer   animate-pulse"     
      >
        <li className="flex flex-col items-center gap-2 w-[300px]">
       
        <div className="mb-1 h-[200px] w-[300px] rounded-lg bg-slate-200 text-lg"></div>
       
       <div className="flex flex-row justify-between w-full ">
           
           <div className="flex justify-start gap-2 w-full ">  
           <div className="h-5 w-5 rounded-full bg-slate-200"></div>
            <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
            </div>

            <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
            
            </div>

            <div className="flex justify-start gap-2 w-full ">  
           <div className="h-5 w-5 rounded-full bg-slate-200"></div>
            <div className="mb-1 h-6 w-[90%] rounded-lg bg-slate-200 text-lg"></div>
            </div>
                       
            
             <div className="flex justify-start gap-2 w-full ">  
           <div className="h-5 w-5 rounded-full bg-slate-200"></div>
            <div className="mb-1 h-6 w-[90%] rounded-lg bg-slate-200 text-lg"></div>
       </div>
 
       <div className="flex justify-start gap-2 w-full ">  
            <div className="h-5 w-5 rounded-full bg-slate-200"></div>   
            <div className="mb-1 h-6 w-[90%] rounded-lg bg-slate-200 text-lg"></div>         
       </div>
 
        </li>
      </div>
    ))}
  </div>
  )
}