"use client";
import React, { useState, useEffect, useRef } from "react";

import { BiCategoryAlt } from "react-icons/bi";
import { ServiceUrl } from "../../global";
import { PiProjectorScreenFill } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome } from "react-icons/fa";
import LoadingSpinner from "../Loader/page";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { RiPriceTag3Line } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import Image from "next/image";


export default function ProjectView() {
  const [Project, setProject] = useState([]);

  const [userid, setUserid] = useState("");
  const scrollContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

 
  useEffect(() => {
    fetchProject();
    setUserid(localStorage.getItem("_id"));
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${ServiceUrl}/Fetch_Projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, "project");
      setProject(data["Projectdata"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Project:", error);
    }
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

  function GotToNextPage(item) {
    if (userid == "" || userid == null) {
      router.push("/Components/Login");
      toast.error("You Have to First Login");
    } else {
    
      router.push(`/Components/ViewprojectsByid/${item._id}`);
    }
  }

  return (
    <div className="container mx-auto mt-[50px] mb-[100px] p-4 ">
      <div className="max-w-full border border-slate-300 p-10 rounded-lg relative overflow-hidden">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl text-neutral-900 font-bold mb-4 font-sans">
            Blessed Projects
          </h1>
        </div>

        {isLoading ? (
         <div className="loading-indicator flex flex-row  gap-10 w-full">
         {[...Array(4)].map((_, index) => (
           <div
             key={index}
             className=" flex flex-row w-[300px] ml-5   gap-2   p-4 mb-2 rounded-lg cursor-pointer   animate-pulse"     
           >
             <li className="flex flex-col items-center gap-2 w-[300px]">
            
             <div className="mb-1 h-[200px] w-[300px] rounded-lg bg-slate-200 text-lg"></div>
            
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
      
            <div className="flex justify-start gap-2 w-full ">  
                 <div className="h-5 w-5 rounded-full bg-slate-200"></div>   
                 <div className="mb-1 h-6 w-[90%] rounded-lg bg-slate-200 text-lg"></div>         
            </div>
      
             </li>
           </div>
         ))}
       </div>
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
              {Project.map((item) => (
                <div
                  key={item._id}
                  className="p-2 scroll-snap-align: start;"
                  style={{ scrollSnapAlign: "start" }}
                  onClick={() => GotToNextPage(item)}
                >
                  <div className="w-[300px] ml-5 cursor-pointer rounded-lg transform hover:scale-105 transition duration-300 snap-start">
                  {item.images && item.images.length > 0 ? (
      <div className="h-[200px] w-[300px] relative">
      <Image
        className="rounded-lg  object-cover"
        src={`${ServiceUrl}/Add_Project/?filename=${item.images[0].name}`}
        alt={item.name}
        layout="fill"
      />
      </div>
    ) : (
      <div className="h-[200px] w-[300px] relative">
      <Image
        className="rounded-lg object-cover"
        src="/default-image.jpg"  // Replace with the path to your default image
        alt="Default Image"
        layout="fill"
      />
  </div>
    )}
                    <div className="p-1 mt-3">
                      <div className="flex gap-2">
                        <PiProjectorScreenFill  className="text-gray-900" />
                        <h5 className="mb-2 text-xs text-neutral-900 font-bold font-sans">
                          {item.name}
                        </h5>
                      </div>

                      <div className="flex gap-2">
                      <HiLocationMarker className="text-gray-900" />
                        <h5 className="mb-2 text-xs text-neutral-900 font-bold font-sans truncate max-w-xs">
                          {item.city} , {item.location}
                        </h5>
                      </div>

                      <div className="flex space-x-2">
                        <FaHome className="text-gray-900" />
                        <span className="text-xs text-neutral-900 font-bold font-sans">
                          {item.location}
                        </span>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <BiCategoryAlt className="text-gray-900" />
                        <span className="text-xs text-neutral-900 font-bold font-sans">
                          {item.city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>

            <BsArrowRight
              onClick={scrollRight}
              className="border absolute right-4 top-1/2 text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
            >
              &gt;
            </BsArrowRight>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
