"use client";
import React, { useState, useEffect, useRef } from "react";

import { ServiceUrl } from "../../global";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../Loader/page";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function DisplayAgencies() {
  const [images, setImages] = useState([]);
 
  const [userid, setUserid] = useState("");
  const scrollContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
const router = useRouter()

  useEffect(() => {
    fetchImages();
    setUserid(localStorage.getItem("_id"));
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${ServiceUrl}/Fetch_Agency`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setImages(data["Productdata"]);
      console.log(images, data["Productdata"], "data in agency");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
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


function GotoAgentProfile(item) {
  
  router.push(`/Components/AgentProfile/${item._id}`)
}
  
  return (
    <div className="container mx-auto mt-[50px] mb-[100px] p-4 ">
       <h1 className="text-black font-bold font-sans text-2xl mb-4 ">
          Titanium Agencies
        </h1>
      <div className="max-w-full  p-10 rounded-lg relative overflow-hidden">
       

        <ToastContainer />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <BsArrowLeft
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
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
          {images.map((item) => (

item.status === "Active" && (

  <div key={item._id} className="p-2 scroll-snap-align: start;">
    <div onClick={() => GotoAgentProfile(item)} className="flex flex-row gap-4 rounded-lg cursor-pointer transform hover:scale-105 transition duration-300 snap-start bg-white shadow-md p-4 ml-7">
      <img
        className="rounded-lg h-[70px] w-[70px]"
        src={`${ServiceUrl}/Add_Agency/?filename=${item.Logoimages[0]["name"]}`}
        alt={item.Logoimages.name}
      />
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
              className="absolute right-4 top-1/2 text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
            >
              &gt;
            </BsArrowRight>
          </div>
        )}
      </div>
    </div>
  );
}