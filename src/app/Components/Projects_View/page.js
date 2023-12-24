"use client";
import React, { useState, useEffect, useRef } from "react";
import {DeleteProjectById} from "../../action/projects"
import { BiCategoryAlt } from "react-icons/bi";
import { ServiceUrl } from "../../global";
import { PiProjectorScreenFill } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHome } from "react-icons/fa";
import LoadingSpinner from "../Loader/page";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { GiSelfLove } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";




export default function ProjectView() {
  const [Project, setProject] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [userid, setUserid] = useState("");
  const [userRole, setUserRole] = useState("");
  const scrollContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const router = useRouter();

 
  useEffect(() => {
    fetchProject();
    setUserid(localStorage.getItem("_id") || "");
    setUserRole(localStorage.getItem("role") || "")
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

  const handleToggleMenu = (projectId) => {
    setSelectedProjectId(projectId);
    setMenuVisible(!menuVisible);
  };



  const handleDeleteProject = async (projectId) => {
    try {
      const response = await DeleteProjectById(projectId);

      if (response.status === 200) {
        // If the deletion is successful, update the state to trigger a re-render
        const updated = Project.filter((fav) => fav._id !== projectId);
        setProject(updated);
        toast.success('project Delete successfully');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Error Delete  project:', error);
    }
  };




  return (
    <div className="container mx-auto mt-[50px] mb-[100px] p-4 ">
      <div className="max-w-full bg-gray-100 p-10 rounded-lg relative overflow-hidden">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl text-neutral-900 font-bold mb-4 font-sans">
            Blessed Projects
          </h1>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <BsArrowLeft
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 z-50 text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
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
              {Project.map((item , index) => (
                <div
                  key={index}
                  className="p-2 scroll-snap-align: start;"
                  style={{ scrollSnapAlign: "start" }}
                 
                >
                  <div className="w-[300px] ml-5 cursor-pointer rounded-lg transform hover:scale-105 transition duration-300 snap-start">
                  {item.images && item.images.length > 0 ? (
      <img
      onClick={() => GotToNextPage(item)}
        className="rounded-lg h-[200px] w-[300px] object-cover"
        src={`${ServiceUrl}/Add_Project/?filename=${item.images[0].name}`}
        // alt={item.name}
      />
    ) : (
      <img
        className="rounded-lg h-[200px] w-[300px] object-cover"
        src="/default-image.jpg"  // Replace with the path to your default image
        alt="Default Image"
      />
    )}
                    <div className="p-1 mt-3">

     {/*////////////////// Three-dot menu /////////////////// */}
           
     <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => handleToggleMenu(item._id)}
          >
            <div className="group relative">
              <div className="bg-gray-50 rounded-full p-2">
              <HiDotsVertical className="text-black text-md " />
              </div>
         
              {menuVisible && selectedProjectId === item._id && (
              <div
                className={`absolute flex-col right-0 top-8 w-[150px] bg-white border border-gray-200 rounded shadow-md transform transition-transform duration-300 ease-in-out`}
              >
                {userRole == "Admin" && (
                  <>
            
                <button
                  className="flex w-full gap-3 px-4 py-2 text-xs hover:bg-gray-100 text-black"
                  // onClick={() => handleEdit(item.id)}
                >
                  <MdOutlineModeEdit />
                  <span>Edit</span> 
                </button>
                <button
                  className="flex w-full gap-3 px-4 py-2 text-xs hover:bg-gray-100 text-black"
                  onClick={() => handleDeleteProject(item._id)}
                >
                  <MdOutlineDeleteOutline />
                  
                  <span>Delete</span> 
                </button>
                </>
)}

                <button
                  className="flex gap-3 w-full px-4 py-2 text-xs hover:bg-gray-100 text-black"
                  // onClick={() => handleFavorite(item)}
                >
                  <GiSelfLove />
                  
                  <span>Add to Favorite</span> 
                </button>
              </div>
              )}
            </div>
          </div>
{/* ///////////////////////////////////// */}







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
              className="absolute right-4 top-1/2 text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
            >
              &gt;
            </BsArrowRight>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
