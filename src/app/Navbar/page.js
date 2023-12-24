"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import { FiMenu } from "react-icons/fi";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRouter, useSearchParams } from "next/navigation";

import UserDropdown from "../Components/UserMenu/page";
import { Ring } from "@uiball/loaders";
import { IoIosSearch } from "react-icons/io";





const NavbarUnique = () => {

  const [userid, setUserid] = useState("");
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  const router1 = useSearchParams();
  const userparams = router1.get('data')
 
  const [selectedTab, setSelectedTab] = useState("PROPERTIES"); // Initialize with the default selected tab
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading1,setIsLoading1]=useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'ADMIN', value: 'ADMIN', route: '/Components/Admin' },
    { label: 'Add Society', value: 'Add Society', route: '/Components/Add_Society' },
    { label: 'Add Agency', value: 'Add Agency', route: '/Components/Add_Agencies' },
    { label: 'Add Project', value: 'Add Project', route: '/Components/Add_Project' },
    { label: 'Plot Finder', value: 'Plot Finder', route: '/' },
  ];
  // Add_Project

  const handleopenMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionClick = (option , move) => {
    setSelectedOption(option);
    setShowMenu(false);

    console.log(move)
      // Navigate to the selected route if it's defined
      router.push(move);
    
  };






  const userdata = JSON.parse(userparams);




  const [text] = useTypewriter({
    words: [
      "Your trusted Buying home Platform.",
      "Providing best home for customers.",
      "Delivery on time in demand.",
    ],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 10,
    delaySpeed: 2000,
  });

  
  const handleTabClick = (tab) => {
  setIsLoading1(true)
    console.log(tab);
    setSelectedTab(tab);
    setTimeout(()=>{
      setIsLoading1(false)
    },6000)
  };

  const login = () => {
    router.push("/Components/Login");
  };

  const SignUp = () => {
    router.push("/Components/Sign_Up");
  };

  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("_id");
    setUserid(id);
    var userobj = localStorage.getItem("current_user");
    // console.log(JSON.parse(userobj), "data in local object");
    setUser(JSON.parse(userobj));
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    // Call the async function to fetch data
  }, []);


  // Show the button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      router.push(`/Components/SearchById/${searchQuery}`);
    }
  };

function gotoprojects() {
  

  router.push("/Components/ViewProjects");
}

// Agents

function gotoAgents() {
  

  router.push("/Components/Agents");
}


  return (
    <main>
    <div className="flex-col" >
     
      <div className="w-full h-[80px] mx-auto px-4    bg-blue-600 flex items-center justify-between">
      {/* {isLoading1 && <LoadingIndicator />} */}

        <div className="max-w-2xl ml-[30px]  mx-auto ">        
          <div >
            <ul
              className="flex flex-wrap -mb-px"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist"
            >
              <li className="px-3" >
                {/* <FaHome className="text-white w-8 h-8" /> */}
                {/* <img src="/logo_app.jpg" className="w-25 h-[50px] "/> */}
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
                <Link href={"/Components/Land_Records"} prefetch={false}>
                  <button
                    className={`inline-block hover:rounded-md  py-2 px-3 text-xs font-medium text-center 
                     ${selectedTab === "LAND RECORDS"
                        ? " bg-white text-blue-600 text-center w-[150px] font-semibold rounded-md"
                        : "text-white"
                      }`}
                    id="profile-tab"
                    onClick={() => handleTabClick("LAND RECORDS")}
                  >
                    LAND RECORDS
                  </button>
                </Link>
              </li>
              <li className="mr-2" role="presentation">
                <Link href={"/Components/View_Societies"} prefetch={false}>
                  <button
                    className={`inline-block  hover:rounded-md rounded-t-lg py-2 px-3  text-xs font-medium text-center  ${selectedTab === "SOCIETY VIEW"
                        ? "bg-white text-blue-600 text-center w-[150px] font-semibold rounded-md"
                        : "text-white"
                      }`}
                    id="profile-tab"
                    onClick={() => handleTabClick("SOCIETY VIEW")}
                  >
                    SOCIETY VIEW
                  </button>
                </Link>
              </li>
              <li className="mr-2" role="presentation">
                <Link href={"/"} prefetch={false}>
                  <button
                    className={`inline-block  hover:rounded-md rounded-t-lg py-2 px-3  text-xs font-medium text-center  ${selectedTab === "PLOT FINDER"
                        ? "bg-white text-blue-600 text-center w-[150px] font-semibold rounded-md"
                        : "text-white"
                      }`}
                    id="PLOT FINDER-tab"
                    onClick={() => handleTabClick("PLOT FINDER")}
                  >
                   PLOT FINDER
                  </button>
                </Link>
              </li>
<div >
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {showMenu && (
        <div
          id="dropdown"
          className="z-50 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 w-48"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            {options.map((option) => (
              <li className="mr-2" role="presentation" key={option.value}>
                <button
                  className={`block w-full py-3 text-xs font-medium hover:bg-slate-300 text-blue-600 text-center border-transparent border-b-2 `}
                  id="profile-tab"
                  onClick={() => handleOptionClick(option , option.route)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>




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
          <Link href="/Components/Add_Property" prefetch={false}>
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
                    className="mt-1"
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
              <UserDropdown user={user} userdata={userdata} />
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

          {/* {userid !== null && userid !== "" ? (
          
          ) : null} */}
        </div>
        <div className="inline-flex lg:hidden">
          <FiMenu className="text-3xl" />
        </div>
      </div>
    </div>


{/* ///////////////////////////////// bottom navbar //////////////////////////////////////////////// */}

    <div className="w-full h-[50px] mx-auto bg-white flex items-center gap-6">
    <div className="flex items-center ml-9">
    {/* Logo */}
    <img src="/logo_app.jpg" className="w-[90px] h-[50px]" alt="Logo" />
    <p className="text-black font-sans font-semibold text-lg">
      Blessed Pakistan
    </p>
  </div>

         {/* First dropdown button */}
         <div className="flex  duration-500" >
      <div className="relative flex gap-2 duration-500">
        {/* <button
          onClick={() => setShowTabs1(!showTabs1)}
          className="text-black text-xs ml-4 flex gap-2 "
        >
        
       <span className="mt-1">BUY</span>
          <FaArrowRight className="w-3 h-3 mt-1 text-blue-600"/>
        </button>
      
        {showTabs1 && (
          <div className="text-black text-xs flex mt-1 gap-4 duration-500">
         
            <div className="text-black">HOME</div>
            <div className="text-black">PLOTS</div>
            <div className="text-black">COMMERCIALS</div>
          </div>
        )} */}
        {/* <div className="border-r border-blue-600" /> */}

      </div>
      <div className="relative flex gap-2">
        {/* <button
          onClick={() => setShowTabs1(false)}
          className="text-black text-xs ml-4 flex gap-2 "
        >
        
       <span className="mt-1">RENT</span>
        </button> */}
        <div className="border-r border-blue-600" />
      </div>
      <div className="relative flex gap-2">
        <button
        onClick={gotoAgents}
          className="text-black text-xs ml-4 flex gap-2 "
        >
          {/* Add your icon for the first dropdown button */}
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

export default NavbarUnique;
