"use client";
import React, { useState, useEffect, useRef } from "react";
import { GiHouse } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { ServiceUrl } from '@/app/global';
import { RiPriceTag3Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronLeft, FaChevronRight, FaHome } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import LoadingSpinner from "../../Loader/page";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { GetProductByPropertyid } from "@/app/action/Property";
import Image from "next/image";

const FindPropertyById = ({params}:{params?:any} ) => {
  const [images, setImages] = useState([]);

  const [userid, setUserid] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchImages();
    setUserid(localStorage.getItem("_id"));
  }, [images]);



  const fetchImages = async () => {
    try {
      const data = await GetProductByPropertyid(params.id);
    
      setImages(data["Get"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };



  function GotToNextPage(item) {
    if (userid == "" || userid == null) {
      router.push("/Login");
      toast.error("You Have to First Login");
    } else {
      router.push(`/Properties_Details/${item._id}`);
    }
  }

  return (
    <div className="container mx-auto mt-[50px] mb-[100px] p-4 ">
      <div className="max-w-full p-10 rounded-lg relative overflow-hidden">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl text-neutral-900 font-bold mb-4 font-sans">
            Property
          </h1>
        </div>
  
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {images.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg text-gray-500 font-semibold">
                  Not Found
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((item, index) => (
                  <div key={index} onClick={() => GotToNextPage(item)}>
                    <Properties item={item} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
                }  
export default FindPropertyById;






function Properties({ item }) {
  const [timeSinceInsertion, setTimeSinceInsertion] = useState(null);

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

  return (
    <div className="w-full">
      <div className="w-[300px] ml-5 cursor-pointer rounded-lg transform hover:scale-105 transition duration-300 snap-start">
      
      <div className="h-[200px] w-[300px] relative">
                <Image
          className="rounded-lg h-[200px] w-[300px]"
          src={`${ServiceUrl}/Product/?filename=${item.images[0]["name"]}`}
          alt={item.images.name}
          layout="fill"
        />
        </div>
      
        <div className="p-1 mt-3">
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
            <HiLocationMarker className="text-gray-900" />
            <p className="mb-3 text-xs text-neutral-900 font-bold font-sans">
              {item.city} {item.location}
            </p>
          </div>

          <div className="flex space-x-2">
            <FaHome className="text-gray-900" />
            <span className="text-xs text-neutral-900 font-bold font-sans">
              {" "}
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
