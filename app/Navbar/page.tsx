"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

import { useRouter, useSearchParams } from "next/navigation";
import UserDropdown from "../UserMenu/page";
import { Ring } from "@uiball/loaders";
import { IoIosSearch } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import Image from "next/image";





const Navbarunique = () => {

  const [userid, setUserid] = useState("");
  const [user, setUser] :any = useState("");

 
  const [selectedTab, setSelectedTab] = useState("PROPERTIES"); // Initialize with the default selected tab
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const options = [
    { label: 'ADMIN', value: 'ADMIN', route: '/Admin' },
    { label: 'Add Society', value: 'Add Society', route: '/Add_Society' },
    { label: 'Add Project', value: 'Add Project', route: '/Add_Project' },
    // { label: 'Add Agency', value: 'Add Agency', route: '/Add_Agencies' },
  ];
  // Add_Project

  const handleopenMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionClick = (move:any) => {
    setShowMenu(false);
  
    router.push(move.route);
    
  };


  
  const handleTabClick = (tab:any) => {
    console.log(tab);
    setSelectedTab(tab);
  };

  const login = () => {
    router.push("/Login");
  };

  const SignUp = () => {
    router.push("/Sign_Up");
  };

  useEffect(() => {
    const id: any = localStorage.getItem("_id") || '';
    setUserid(id);
  
    // Retrieve user data from local storage
    const userObjString: string | null = localStorage.getItem("current_user");
    
    // Check if userObjString is not null and not an empty string
    if (userObjString && userObjString.trim() !== "") {
      try {
        // Parse the JSON data
        const userObj: any = JSON.parse(userObjString);
        
        // Set the user state
        setUser(userObj);
      } catch (error) {
        // Handle JSON parsing errors
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  

  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Replace with the actual async operation.
  };


  const handleSearch = () => {
    if(searchQuery){
      router.push(`/SearchById/${searchQuery}`);
    }
  };

function gotoprojects() {
  

  router.push("/ViewProjects");
}

// Agents

function gotoAgents() {
  router.push("/Agents");
}


  return (
    <main>
    <div className="flex-col" >
     
      <div className="w-full h-[80px] mx-auto px-4    bg-blue-600 flex items-center justify-between">

        <div className="max-w-2xl ml-[30px]  mx-auto ">        
          <div >
            <ul
              className="flex flex-wrap -mb-px"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="px-3" >
                <FaHome className="text-white w-8 h-8" />
              </li>
              <li className="mr-2" role="presentation">
                <Link href={"/"} prefetch={false}>
                  <button
                    className={`inline-block  hover:rounded-md   py-2 px-3 text-xs font-medium text-center border-transparent  ${selectedTab === "PROPERTIES" ? " bg-white text-blue-600 text-center w-[100px] font-semibold rounded-md" : "text-white"
                      }`}
                    id="profile-tab"
                    onClick={() => handleTabClick("PROPERTIES")}
                  >
                    PROPERTIES
                  </button>
                </Link>
              </li>
              <li className="mr-2" role="presentation">
                <Link href={"/Land_Records"} prefetch={false}>
                  <button
                    className={`inline-block hover:rounded-md  py-2 px-3 text-xs font-medium text-center 
                     ${selectedTab === "LAND_RECORDS"
                        ? " bg-white text-blue-600 text-center w-[150px] font-semibold rounded-md"
                        : "text-white"
                      }`}
                    id="profile-tab"
                    onClick={() => handleTabClick("LAND_RECORDS")}
                  >
                   LAND_RECORDS 
                  </button>
                </Link>
              </li>
              <li className="mr-2" role="presentation">
                <Link href={"/View_Societies"} prefetch={false}>
                  <button
                    className={`inline-block  hover:rounded-md rounded-t-lg py-2 px-3  text-xs font-medium text-center  ${selectedTab === "SOCIETY_VIEW"
                        ? "bg-white text-blue-600 text-center w-[150px] font-semibold rounded-md"
                        : "text-white"
                      }`}
                    id="profile-tab"
                    onClick={() => handleTabClick("SOCIETY_VIEW")}
                  >
                    SOCIETY_VIEW
                  </button>
                </Link>
              </li>
              <li className="mr-2" role="presentation">
                <Link href={"/"} prefetch={false}>
                  <button
                    className={`inline-block  hover:rounded-md rounded-t-lg py-2 px-3  text-xs font-medium text-center  ${selectedTab === "PLOT_FINDER"
                        ? "bg-white text-blue-600 text-center w-[150px] font-semibold rounded-md"
                        : "text-white"
                      }`}
                    id="PLOT FINDER-tab"
                    onClick={() => handleTabClick("PLOT_FINDER")}
                  >
                   PLOT_FINDER
                  </button>
                </Link>
              </li>

{user['role'] == "Admin" ? (
  <div>
      <button
        onClick={handleopenMenu}
        className="relative w-full  text-white text-center  font-medium rounded-md text-xs px-5 py-2 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        MORE
        <svg
          className={`w-2.5 h-2.5 ml-2.5 ${showMenu ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            // stroke-linecap="round"
            stroke-linejoin="round"
        
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {showMenu && (
        <div
          id="dropdown"
          className="z-50 absolute mt-2 bg-white  shadow-lg dark:bg-gray-700 w-48"
        >
          <ul className=" text-sm text-gray-700  dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {options.map((option:any) => (
              <>
              <li role="presentation" key={option.value}>
                <button
                  className={`flex gap-2 w-full py-3 text-xs font-medium hover:bg-slate-200 px-5 text-blue-600 text-start`}
                  id="profile-tab"
                  onClick={() => handleOptionClick(option)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="currentColor"
                    className="bi bi-plus mr-1 text-blue-600 relative z-10"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.5 1a.5.5 0 0 1 .5.5V7h5.5a.5.5 0 0 1 0 1H8v5.5a.5.5 0 0 1-1 0V8H1.5a.5.5 0 0 1 0-1H7V1.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                  {option.label}
                </button>
              </li>
              <hr/>
              </>
            ))}
          </ul>
        </div>
      )}
    </div>
       
): null}
     </ul>
          </div>
        </div>


{/* Search Property By ID */}


        <div className="flex items-center">
      <input
        type="text"
        placeholder="Search by Property ID"
        className="px-4 py-2 text-xs border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
        onClick={handleSearch}
      >
      <IoIosSearch />
      </button>
    </div>
        <div>
          <Link href="/Add_Property" prefetch={false}>
            <button
              className="w-[116px]  h-8 relative transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95 text-xs flex justify-center font-sans font-medium items-center cursor-pointer bg-white text-blue-600 m-2 rounded  hover:shadow-xl "
              onClick={handleButtonClick}
              disabled={isLoading} // Disable the button when it's in the loading state.
            >
              {isLoading ? (
                <div className="flex gap-1" >
                  <Ring
                    size={15}
                    lineWeight={5}
                    speed={2}
                    className={`mt-1`}
                    color="blue"
                  />
                </div>
              ) : (
                <div className="flex" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    fill="currentColor"
                    className="bi bi-plus mr-1 text-blue-600 relative z-10"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.5 1a.5.5 0 0 1 .5.5V7h5.5a.5.5 0 0 1 0 1H8v5.5a.5.5 0 0 1-1 0V8H1.5a.5.5 0 0 1 0-1H7V1.5a.5.5 0 0 1 .5-.5z" />
                  </svg>
                  Add Property
                </div>
              )}
            </button>
          </Link>
        </div>
        <div className="hidden lg:inline-flex font-sans gap-8 items-center">
          {userid ? (
            <>
              <UserDropdown user={user} userdata={''} />
            </>
          ) : (
            <>
              <button
                onClick={login}
                className="w-[96px]  h-8 relative transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95 text-xs flex justify-center font-sans font-medium items-center cursor-pointer bg-white text-blue-600 m-2 rounded  hover:shadow-xl "
                >
                Login
              </button>
              <button
                onClick={SignUp}
                className="w-[96px]  h-8 relative transform transition-transform motion-ease-in-out motion-duration-300 hover:scale-105 active:scale-95 text-xs flex justify-center font-sans font-medium items-center cursor-pointer bg-white text-blue-600 m-2 rounded  hover:shadow-xl "
                >
                SignUp
              </button>
            </>
          )}

        </div>
        <div className="inline-flex lg:hidden">
          <FiMenu className="text-3xl" />
        </div>
      </div>
    </div>


{/* ///////////////////////////////// bottom  //////////////////////////////////////////////// */}

    <div className="w-full h-[50px] mx-auto border bg-white flex items-center gap-6">
    <div className="flex items-center ml-9">
    {/* Logo */}
    <div className="w-[90px] h-[50px] relative" >
    <Image layout="fill" src="/logo_app.jpg"  alt="Logo" />
    </div>
    <p className="text-black font-sans font-semibold text-lg">
      Blessed Pakistan
    </p>
  </div>

         {/* First dropdown button */}
         <div className="flex  duration-500" >
      <div className="relative flex gap-2 duration-500">
      </div>
      <div className="relative flex gap-2">
        <div className="border-r border-blue-600" />
      </div>
      <div className="relative flex gap-2">
        <button
        onClick={gotoAgents}
          className="text-black text-xs ml-4 flex gap-2 "
        >
       <span className="mt-1">AGENTS</span>
        </button>
        <div className="border-r border-blue-600" />
      </div>
      <div className="relative flex gap-2">
        <button
        onClick={gotoprojects}
          className="text-black text-xs ml-4 flex gap-2 "
        >
          {/* Add your icon for the first dropdown button */}
       <span className="mt-1">NEW PROJECTS</span>
        </button>
     
      </div>
      </div>

</div>

</main>
  );
};

export default Navbarunique;
