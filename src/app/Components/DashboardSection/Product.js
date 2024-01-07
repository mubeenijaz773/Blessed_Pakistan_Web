"use client";
import React, { useState, useEffect, useRef } from "react";
// import { GiHouse } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { ServiceUrl } from "../../global";
import { RiPriceTag3Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  FaHome } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { GiSelfLove } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import LoadingSpinner from "../Loader/page";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import {SavefavoriteProperty} from "../../action/favorites";
import Image from "next/image";




const DisplayProduct = ({ searchTerm }) => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [showAllProperties, setShowAllProperties] = useState(false);
  const [userid, setUserid] = useState("");
  const scrollContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async (propertyId, filename) => {
    try {
      const response = await fetch(`${ServiceUrl}/Product`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename,
        }),
      });

      if (response.ok) {
        fetchImages();
        // File and document deleted successfully
        // Implement any UI updates, like removing the deleted property from the list
        console.log("Property deleted successfully!");
      } else {
        // Handle error
        console.error("Delete failed:", response.statusText);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchImages();
    setUserid(localStorage.getItem("_id"));
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(`${ServiceUrl}/FetchProduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setImages(data["Productdata"]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredImages = images.filter((image) => {
        const title = image.title;
        return title.includes(searchTerm);
      });
      setFilteredImages(filteredImages);
    } else {
      setFilteredImages(images);
    }
  }, [searchTerm, images]);

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
          {filteredImages.length > 4 && (
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
          )}
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
                ? filteredImages
                : filteredImages.slice(0, 4)
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
      router.push("/Components/Login");
      toast.error("You Have to First Login");
    } else {
      router.push(`/Components/Properties_Details/${item._id}`);
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
      <Image
        onClick={() => GotToNextPage(item)}
        className="rounded-lg"
        src={`${ServiceUrl}/Product/?filename=${item.images[0]["name"]}`}
        alt={item.images.name}
        layout="fill"
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
