"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ServiceUrl } from '@/app/global';
import Link from "next/link";


import {
  Commercial_Type,
  HomeList,
  Plots_Type,
  cities,
  MIN,
  MAX,
  AREA_MAX_Home,
  AREA_MIN_Home,
  AREA_MAX_Plots,
  AREA_MIN_Plots,
  AREA_MAX_Commercials,
  AREA_MIN_Commercials,
  Bedrooms,
} from "@/app/GetList";
import { Ring } from "@uiball/loaders";

// initTE();

const SearchFilter = ({Purpose}) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState("Any");
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [subType, setSubType] = useState(null);
  const [activeTab, setActiveTab] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Lahore"); // Default selected city
  const [iscityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [areaMin, setAreaMin] = useState(0); // Changed state variable name
  const [areaMax, setAreaMax] = useState("Any"); // Changed state variable name
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [isLoading,setIsLoading]=useState(false);






  const handleAreaMinChange = (e) => {
    setAreaMin(e.target.value);
  };

  const handleAreaMaxChange = (e) => {
    setAreaMax(e.target.value);
  };

  const handleAreaMinClick = (value) => {
    setAreaMin(value);
    setShowAreaDropdown(false);
  };

  const handleAreaMaxClick = (value) => {
    setAreaMax(value);
    setShowAreaDropdown(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false); // Close the dropdown when a city is selected
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!iscityDropdownOpen);
  };

  const [selectedBed, setSelectedBed] = useState("ALL"); // Initialize with the default value

  const handleBedClick = (value) => {
    setSelectedBed(value);
  };





////////////////////////////////// Save Recent Searches Data /////////////////////////////////////



  const handleSearch = async () => {
    setIsLoading(true);
    var userid = localStorage.getItem("_id")
    const response = await fetch(`${ServiceUrl}/Search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: userid,
        city:selectedCity,
     propertyType:activeTab,
       min_price:input1,
        max_price:input2,
        min_area:areaMin,
        max_area:areaMax
      }),
    });
    fetchData();
    setSearchTerm("");
  };

  useEffect(() => {
    fetchData(); // Call the async function to fetch data
  }, []);

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("_id");
      const response = await fetch(`${ServiceUrl}/Search/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setRecentSearches(data["searchdata"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    console.log("Selected:", option);
    setIsOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInput1Change = (e) => {
    setInput1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInput2(e.target.value);
  };

  const handleMinClick = (value) => {
    setInput1(value);
    setShowPriceDropdown(false);
  };

  const handleMaxClick = (value) => {
    setInput2(value);
    setShowPriceDropdown(false);
  };

  



  return (
    // Accordian
    <div
      id="accordionExample5"
      className="w-auto mt-[40px] ml-[60px] opacity-120  "
    >
      <div className="font-sans uppercase" >
      {activeTab == "Home" &&  <h1  className="text-center font-semibold text-3xl mb-9" >Search properties for sale in Pakistan</h1>}
      {activeTab == "Plots" && <h1 className="text-center font-semibold text-3xl mb-9" >Search plots for sale in Pakistan</h1>}
      {activeTab == "Commercials" &&  <h1  className="text-center font-semibold text-3xl mb-9">Search commercial properties for sale in Pakistan</h1>}
      
      </div>

      <div className="rounded-t-lg border  border-neutral-200 bg-black dark:border-neutral-600 dark:bg-neutral-800">
        {/* City Filter */}

        <div
          id="collapseOne5"
          className="!visible"
          data-te-collapse-item
          data-te-collapse-show
          aria-labelledby="headingOne5"
        >
          <div className="px-5 py-4 font-sans flex gap-1">
            <div className="group inline-block relative">
              <div
                className="outline-none focus:outline-none  border cursor-pointer bg-white rounded-sm h-[64px] w-[200px]"
                onClick={toggleCityDropdown}
              >
                <span className="font-semibold font-sans text-blue-600 text-xs text-start ml-2 mt-0">
                  CITY
                </span>
                <div className="flex gap-1 mt-2 px-2">
                  <span className="text-xs font-sans text-black flex-1">
                    {selectedCity}
                  </span>
                  <span>
                    <svg
                      className={`fill-current mt-1 h-4 w-4 transform text-black ${
                        iscityDropdownOpen ? "rotate-180" : ""
                      } transition duration-150 ease-in-out`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </div>
              </div>
              {iscityDropdownOpen && ( // Render the dropdown only if isDropdownOpen is true
                <ul className="bg-white z-50 border shadow-lg rounded-sm  transform overflow-y-auto scale-100 absolute transition
                 duration-150 ease-in-out origin-top min-w-32 w-[200px] h-64 custom-scrollbar">
                  {cities.map((city, index) => (
                    <li
                      key={index}
                      className="rounded-sm font-sans text-xs px-3 py-2 hover:bg-gray-200 cursor-pointer hover:text-blue-600 text-black"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Search Bar */}

            <div className="flex justify-center font-sans items-center">
              <div className="w-[530px] ">
                {/* <label
                  for="search"
                  className="mb-2 text-sm font-medium text-gray-900 font-sans sr-only dark:text-white"
                >
                  Find
                </label> */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        // stroke-linecap="round"
                        stroke-linejoin="round"
                  
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    id="search"
                    className="block w-full h-[64px] rounded-sm font-sans p-5 pl-10 text-sm text-gray-900 border border-gray-300   bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </div>
              <Link href={`/ViewAllProperties/?purpose=${Purpose}&city=${selectedCity}&location=${searchTerm}&propertyType=${activeTab}&subType=${subType}&minPrice=${input1}&maxPrice=${input2}&minAreaSize=${areaMin}&maxAreaSize=${areaMax}&bedrooms=${selectedBed}`} >
              <button
                onClick={handleSearch}
                type="submit"
                className="text-white ml-1 w-[150px] h-[64px] font-sans  font-medium  text-sm  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg   dark:shadow-purple-800/80 "
              >
                
              {isLoading ? (
                <div className="flex gap-1 justify-center items-center" >
                  <Ring
                    size={15}
                    lineWeight={5}
                    speed={2}
                    className="mt-1"
                    color="white"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center" >
                   Find
                </div>
              )} 
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border  border-neutral-200 bg-black dark:border-neutral-600 dark:bg-neutral-800">
        <div
          id="collapseTwo5"
          //   className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingTwo5"
        >
          <div className="flex flex-row gap-1 ml-2  p-1 ">
            <div>
              <div
                onClick={toggleDropdown}
                className="outline-none focus:outline-none ml-2 border cursor-pointer bg-white rounded-sm h-[64px] w-[200px] mt-4"
              >
                <span className="font-semibold text-blue-600 font-sans text-xs text-start ml-2 mt-0">
                  PROPERTY TYPE
                </span>
             
                <div className="flex gap-1 mt-2 px-2">
                {subType == "" || subType == null && <span className="text-black">{activeTab}</span> } 
                    {isDropdownOpen ? (
                      <></> 
                    ) : (
                      <>
                        {subType != "" ? (
                          <span className="text-sm font-sans text-black flex-1">
                            {subType}
                          </span>
                        ) : 
                        (
                          <span className="text-sm font-sans text-black flex-1">
                          Select Property Type
                        </span>
                        )
                        }
                      </>
                    )}
                  <span>
                    <svg
                      className={`fill-current mt-1 h-4 w-4 transform text-black ${
                        isDropdownOpen ? "rotate-0" : "rotate-180"
                      } transition duration-150 ease-in-out`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                </div>
              </div>

              {isDropdownOpen && (
                <div className="bg-white z-50 ml-2 border shadow-lg rounded-sm  transform overflow-hidden scale-100 absolute transition duration-150 ease-in-out origin-top w-[300px] h-64 custom-scrollbar">
                  {/* Dropdown content here */}
                  <div className="flex justify-center gap-3 p-2">
                    <div
                      className={`cursor-pointer hover:text-blue-600 ${
                        activeTab === "Home"
                          ? "text-blue-600 font-sans font-semibold"
                          : "text-black"
                      }`}
                      onClick={() => handleTabClick("Home")}
                    >
                      Home
                    </div>
                    <div
                      className={`cursor-pointer hover:text-blue-600 ${
                        activeTab === "Plots"
                          ? "text-blue-600 font-sans font-semibold"
                          : "text-black"
                      }`}
                      onClick={() => handleTabClick("Plots")}
                    >
                      Plots
                    </div>
                    <div
                      className={`cursor-pointer hover:text-blue-600 ${
                        activeTab === "Commercials"
                          ? "text-blue-600 font-sans font-semibold"
                          : "text-black"
                      }`}
                      onClick={() => handleTabClick("Commercials")}
                    >
                      Commercials
                    </div>
                  </div>

                  {/* Rest of your dropdown content */}

                  <TabsContent
  activeTab={activeTab}
  setSubType={setSubType}
  isDropdownOpen={isDropdownOpen}
  toggleDropdown={toggleDropdown}
/>

                </div>
              )}
            </div>

            {/* price pkr filter */}

            <div className=" py-4">
              <div className="group inline-block relative">
                <div className="outline-none focus:outline-none  border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]">
                  <span className="font-semibold text-blue-600 text-xs font-sans text-start ml-2 mt-0">
                    PRICE (PKR)
                  </span>
                  <div className="flex flex-row justify-between gap-1 mt-2 px-2">
                    <div className="flex flex-row justify-between w-1/2 ">
                      <span className="text-xs text-black mt-1 font-sans flex-1">
                        {input1 != "" ? <p className="mr-3">{input1}</p> : 0}
                      </span>
                      <div className="flex gap-2 ">
                        <span className=" text-sm text-black font-sans mt-1 flex-1">
                          To
                        </span>
                        <span className="text-sm text-black mt-1 font-sans flex-1">
                          {input2 != "" ? (
                            <p className="ml-3">{input2}</p>
                          ) : (
                            Any
                          )}
                        </span>
                      </div>
                    </div>

                    <span>
                      <svg
                        className="fill-current mt-1 h-4 w-4 transform text-black rotate-0 hover:rotate-180 transition duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="bg-white z-50 border  shadow-lg rounded-sm  transform overflow-hidden scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">
                  <div className="flex flex-row gap-2 max-w-md mx-auto p-2 px-2 ">
                    <div className="">
                      <label
                        htmlFor="input1"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MIN:
                      </label>
                      <input
                        type="text"
                        id="input1"
                        name="input1"
                        value={input1}
                        onChange={handleInput1Change}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="input2"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MAX:
                      </label>
                      <input
                        type="text"
                        id="input2"
                        name="input2"
                        value={input2}
                        onChange={handleInput2Change}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row  max-w-md mx-auto gap-2 px-2 p-2">
                    <div className="h-[150px] w-[125px] border border-gray-400 overflow-y-auto custom-scrollbar">
                      <ul className="">
                        {MIN.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleMinClick(value)}
                            className="text-center font-sans cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-xs text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="h-[145px] w-[125px] overflow-y-auto border border-gray-400 custom-scrollbar">
                      <ul className="">
                        {MAX.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleMaxClick(value)}
                            className=" text-xs font-sans text-center cursor-pointer px-1 py-1 hover:bg-green-100  border border-b text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Area SQRFT  filter Home */}

{activeTab == "Home"  && 
            <div className="py-4">
              <div className="group inline-block relative">
                <div className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]">
                  <span className="font-semibold text-blue-600 text-xs font-sans text-start ml-2 mt-0">
                    AREA (SQFT)
                  </span>
                  <div className="flex flex-row justify-between gap-1 mt-2 px-2">
                    <div className="flex flex-row justify-between w-1/2 ">
                      <span className="text-xs font-sans text-black mt-1 flex-1">
                        {areaMin !== "" ? <p className="mr-3">{areaMin}</p> : 0}
                      </span>
                      <div className="flex gap-2 ">
                        <span className="text-sm font-sans text-black mt-1 flex-1">
                          To
                        </span>
                        <span className="text-sm text-black font-sans mt-1 flex-1">
                          {areaMax !== "" ? (
                            <p className="ml-3">{areaMax}</p>
                          ) : (
                            "Any"
                          )}
                        </span>
                      </div>
                    </div>

                    <span>
                      <svg
                        className="fill-current mt-1 h-4 w-4 transform text-black rotate-0 hover:rotate-180 transition duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="bg-white z-50 border shadow-lg rounded-sm transform overflow-hidden scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">
                  <div className="flex flex-row gap-2 max-w-md mx-auto p-2 px-2">
                    <div className="">
                      <label
                        htmlFor="areaMinInput"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MIN:
                      </label>
                      <input
                        type="text"
                        id="areaMinInput"
                        name="areaMinInput"
                        value={areaMin}
                        onChange={handleAreaMinChange}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="areaMaxInput"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MAX:
                      </label>
                      <input
                        type="text"
                        id="areaMaxInput"
                        name="areaMaxInput"
                        value={areaMax}
                        onChange={handleAreaMaxChange}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row max-w-md mx-auto gap-2 px-2 p-2">
                    <div className="h-[160px] w-[125px] border border-gray-400 overflow-y-auto custom-scrollbar">
                      <ul className="">
                        {AREA_MIN_Home.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleAreaMinClick(value)}
                            className="text-center font-sans cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-xs text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="h-[160px] w-[125px] overflow-y-auto border border-gray-400 custom-scrollbar">
                      <ul className="">
                        {AREA_MAX_Home.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleAreaMaxClick(value)}
                            className="text-xs font-sans text-center cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
}

{/* Area Size For Plots */}

{activeTab == "Plots"  && 
            <div className="py-4">
              <div className="group inline-block relative">
                <div className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]">
                  <span className="font-semibold text-blue-600 text-xs font-sans text-start ml-2 mt-0">
                    AREA (SQFT)
                  </span>
                  <div className="flex flex-row justify-between gap-1 mt-2 px-2">
                    <div className="flex flex-row justify-between w-1/2 ">
                      <span className="text-xs font-sans text-black mt-1 flex-1">
                        {areaMin !== "" ? <p className="mr-3">{areaMin}</p> : 0}
                      </span>
                      <div className="flex gap-2 ">
                        <span className="text-sm font-sans text-black mt-1 flex-1">
                          To
                        </span>
                        <span className="text-sm text-black font-sans mt-1 flex-1">
                          {areaMax !== "" ? (
                            <p className="ml-3">{areaMax}</p>
                          ) : (
                            "Any"
                          )}
                        </span>
                      </div>
                    </div>

                    <span>
                      <svg
                        className="fill-current mt-1 h-4 w-4 transform text-black rotate-0 hover:rotate-180 transition duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="bg-white z-50 border shadow-lg rounded-sm transform overflow-hidden scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">
                  <div className="flex flex-row gap-2 max-w-md mx-auto p-2 px-2">
                    <div className="">
                      <label
                        htmlFor="areaMinInput"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MIN:
                      </label>
                      <input
                        type="text"
                        id="areaMinInput"
                        name="areaMinInput"
                        value={areaMin}
                        onChange={handleAreaMinChange}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="areaMaxInput"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MAX:
                      </label>
                      <input
                        type="text"
                        id="areaMaxInput"
                        name="areaMaxInput"
                        value={areaMax}
                        onChange={handleAreaMaxChange}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row max-w-md mx-auto gap-2 px-2 p-2">
                    <div className="h-[160px] w-[125px] border border-gray-400 overflow-y-auto custom-scrollbar">
                      <ul className="">
                        {AREA_MIN_Plots.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleAreaMinClick(value)}
                            className="text-center font-sans cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-xs text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="h-[160px] w-[125px] overflow-y-auto border border-gray-400 custom-scrollbar">
                      <ul className="">
                        {AREA_MAX_Plots.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleAreaMaxClick(value)}
                            className="text-xs font-sans text-center cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                        }



{/* Area Size For Commercials */}

{activeTab == "Commercials"  && 
            <div className="py-4">
              <div className="group inline-block relative">
                <div className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]">
                  <span className="font-semibold text-blue-600 text-xs font-sans text-start ml-2 mt-0">
                    AREA (SQFT)
                  </span>
                  <div className="flex flex-row justify-between gap-1 mt-2 px-2">
                    <div className="flex flex-row justify-between w-1/2 ">
                      <span className="text-xs font-sans text-black mt-1 flex-1">
                        {areaMin !== "" ? <p className="mr-3">{areaMin}</p> : 0}
                      </span>
                      <div className="flex gap-2 ">
                        <span className="text-sm font-sans text-black mt-1 flex-1">
                          To
                        </span>
                        <span className="text-sm text-black font-sans mt-1 flex-1">
                          {areaMax !== "" ? (
                            <p className="ml-3">{areaMax}</p>
                          ) : (
                            "Any"
                          )}
                        </span>
                      </div>
                    </div>

                    <span>
                      <svg
                        className="fill-current mt-1 h-4 w-4 transform text-black rotate-0 hover:rotate-180 transition duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="bg-white z-50 border shadow-lg rounded-sm transform overflow-hidden scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">
                  <div className="flex flex-row gap-2 max-w-md mx-auto p-2 px-2">
                    <div className="">
                      <label
                        htmlFor="areaMinInput"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MIN:
                      </label>
                      <input
                        type="text"
                        id="areaMinInput"
                        name="areaMinInput"
                        value={areaMin}
                        onChange={handleAreaMinChange}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor="areaMaxInput"
                        className="block text-center font-sans text-gray-700 text-sm font-bold mb-2"
                      >
                        MAX:
                      </label>
                      <input
                        type="text"
                        id="areaMaxInput"
                        name="areaMaxInput"
                        value={areaMax}
                        onChange={handleAreaMaxChange}
                        className="shadow text-xs focus:border-black font-sans appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row max-w-md mx-auto gap-2 px-2 p-2">
                    <div className="h-[160px] w-[125px] border border-gray-400 overflow-y-auto custom-scrollbar">
                      <ul className="">
                        {AREA_MIN_Commercials.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleAreaMinClick(value)}
                            className="text-center font-sans cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-xs text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="h-[160px] w-[125px] overflow-y-auto border border-gray-400 custom-scrollbar">
                      <ul className="">
                        {AREA_MAX_Commercials.map((value, index) => (
                          <li
                            key={index}
                            onClick={() => handleAreaMaxClick(value)}
                            className="text-xs font-sans text-center cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-black"
                          >
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

                        }




            {/* BEDS filter */}

{activeTab == "Home" && 
            <div className="py-4">
              <div className="group inline-block relative">
                <div className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[150px]">
                  <span className="font-semibold text-blue-600 text-xs font-sans text-start ml-2 mt-0">
                    BEDS
                  </span>
                  <div className="flex gap-1 mt-2 px-2">
                    <span className="text-sm font-sans text-black flex-1">
                      {selectedBed}
                    </span>
                    <span>
                      <svg
                        className="fill-current mt-1 h-4 w-4 transform text-black rotate-0 hover:rotate-180 transition duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="bg-white z-50 border shadow-lg rounded-sm transform overflow-hidden scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top  w-[150px] h-64">
                  <div className="h-64 w-[150px] overflow-y-auto transform border border-gray-400 custom-scrollbar">
                    <ul className="">
                      {Bedrooms.map((value, index) => (
                        <li
                          key={index}
                          onClick={() => handleBedClick(value)}
                          className="text-xs font-sans text-center cursor-pointer px-1 py-1 hover:bg-green-100 border border-b text-black"
                        >
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
}
          </div>
                      
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;





// Tabs PropertyType







//////////////////////////////// Tabs content PropertyType ///////////////////////////////////////////

function TabsContent(props) {
  

  const activeTab = props.activeTab;

  const handleHomeClick = (text) => {
    props.setSubType(text);
    props.toggleDropdown(); // Close the dialog
  };
  

  
  const handlePlotClick = (text) => {
    props.setSubType(text);
    props.toggleDropdown(); 
  };

  const handleCommercialClick = (text) => {
    props.setSubType(text);
    props.toggleDropdown(); 
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-2 mb-3 ">
        {/* Home tab content */}
        {HomeList.map((item, index) => (
          <div
            onClick={() => handleHomeClick(item.text)}
            key={index}
            className={`${
              activeTab === "Home" ? "block" : "hidden"
            } text-xs border flex justify-center  border-gray-200 font-sans text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500`}
          >
            <div className="flex flex-col py-2 space-x-2">
              <span className="mt-1 font-bold text-black font-sans">
                {item.text}
              </span>
            </div>
          </div>
        ))}
        {/* Repeat similar code for Plots and Commercials */}
      </div>

      {/* Plots tab content */}
      <div className="grid grid-cols-2 gap-4 px-3">
        {Plots_Type.map((item, index) => (
          <div
            onClick={() => handlePlotClick(item.text)}
            key={index}
            className={`${
              activeTab === "Plots" ? "block" : "hidden"
            } text-xs border flex justify-center  border-gray-200 font-sans text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500`}
          >
            <div className="flex flex-col py-2 space-x-2">
              <span className="mt-1 font-bold text-black font-sans">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Commercials tab content */}
      <div className="grid grid-cols-2 gap-4 px-3">
        {Commercial_Type.map((item, index) => (
          <div
            onClick={() => handleCommercialClick(item.text)}
            key={index}
            className={`${
              activeTab === "Commercials" ? "block" : "hidden"
            } text-xs border flex justify-center font-sans  border-gray-200 text-gray-500 rounded text-center items-center transform transition-transform hover:scale-105 cursor-pointer hover:bg-gray-100 hover:shadow-md hover:text-blue-500 hover:border-blue-500`}
          >
            <div className="flex flex-col py-2 space-x-2">
              <span className="mt-1 font-bold text-black font-sans">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
