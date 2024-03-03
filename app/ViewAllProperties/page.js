"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef , Suspense } from "react";
import LoadingSpinner from "../Loader/page";
// import { useRouter } from 'next/navigation';
import { ServiceUrl } from '@/app/global';
import { MdLocationOn, MdOutlineShareLocation } from 'react-icons/md';
import { IoMdCall } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import EmailDailogBox from "../Email_Dailog/page"
import { formatDistanceToNow } from "date-fns";




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
import { TbArrowAutofitHeight, TbMailFilled } from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CallDialog from "../Call_Dailogbox/page"
import { useRouter } from "next/navigation";
import Image from "next/image";




// Use the defined type for the children prop
const SuspenseBoundary = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);



const WrapALLproperties = () =>{

  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [userid, setUserid] = useState('');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const searchParams = useSearchParams();

  // Define state variables for your dropdowns
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPurpose, setSelectedPurpose] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(""); // Default value for propertyType
  const [subType, setSubType] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [iscityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [ispurposeDropdownOpen, setIsPurposeDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Retrieve the query parameter values and set them in the state
    const purposeParam = searchParams.get("purpose");
    const cityParam = searchParams.get("city");
    const locationParam = searchParams.get("location");
    const propertyTypeParam = searchParams.get("propertyType");
    const subTypeParam = searchParams.get("subType");
    const minPriceParam = searchParams.get("minPrice")?.replace(/,/g, "");
    const maxPriceParam = searchParams.get("maxPrice")?.replace(/,/g, "");
    const minAreaSizeParam = searchParams.get("minAreaSize");
    const maxAreaSizeParam = searchParams.get("maxAreaSize");
    const bedroomsParam = searchParams.get("bedrooms");

    setSelectedPurpose(purposeParam || "");
    setSelectedCity(cityParam || "");
    setSearchTerm(locationParam || "");
    setActiveTab(propertyTypeParam || "");
    setSubType(subTypeParam || "");
    setInput1(minPriceParam || "");
    setInput2(maxPriceParam || "");
    setAreaMin(minAreaSizeParam || "");
    setAreaMax(maxAreaSizeParam || "");
    setSelectedBed(bedroomsParam || "");
    setUserid(localStorage.getItem('_id'));
  }, []);








  let [showAreaDropdown, setShowAreaDropdown] = useState(false);

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

  const handlePurposeSelect = (item) => {
    setSelectedPurpose(item);
    setIsPurposeDropdownOpen(false); // Close the dropdown when a city is selected
  };

  const togglePurposeDropdown = () => {
    setIsPurposeDropdownOpen(!ispurposeDropdownOpen);
  };
  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!iscityDropdownOpen);
  };

  const handleBedClick = (value) => {
    setSelectedBed(value);
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



  useEffect(() => {
    DataFilter();
  }, []);

  const DataFilter = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${ServiceUrl}/FetchProduct`,

        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
 
      setImages(data["products"]);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setIsLoading(false);
    }
  };



  ///////////////////////////// ALL Filters //////////////////////////////////////

  const filteredItems = images.filter(item => {
    const isMatchingPurpose = !selectedPurpose || item.purpose === selectedPurpose;
    const isMatchingCity = !selectedCity || item.city === selectedCity;
    const isMatchingProperty = !activeTab || item.propertyType === activeTab;
    const isMatchingSubType = !subType || item.subType.toLowerCase().includes(subType.toLowerCase());
    const isMatchingSearch = item.location.toLowerCase().includes(searchTerm.toLowerCase());
    // Assuming you have minPrice and maxPrice in your component state
    const isMatchingPrice =
      (!parseInt(input1.replace(/,/g, '')) || parseInt(item.price.replace(/,/g, '')) >= parseInt(input1.replace(/,/g, ''))) &&
      (!parseInt(input2.replace(/,/g, '')) || parseInt(item.price.replace(/,/g, '')) <= parseInt(input2.replace(/,/g, '')));

    const isMatchingArea =
      (!parseInt(areaMin) || parseInt(item.Area_size.replace(/\D/g, '')) >= parseInt(areaMin)) &&
      (!parseInt(areaMax) || parseInt(item.Area_size.replace(/\D/g, '')) <= parseInt(areaMax));
    const isMatchingBeds = selectedBed || item.bedrooms === selectedBed;


    return isMatchingPurpose && isMatchingCity && isMatchingProperty && isMatchingSubType && isMatchingSearch && isMatchingPrice && isMatchingArea && isMatchingBeds;


  });


  // Purpose

  const PurposeList = ['Sell', 'Rent']


  const [isPriceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [isAreaHomeDropdownOpen, setAreaHomeDropdownOpen] = useState(false);
  const [isAreaPlotsDropdownOpen, setAreaPlotsDropdownOpen] = useState(false);
  const [isAreaCommercialsDropdownOpen, setAreaCommercialsDropdownOpen] = useState(false);
  const [isBedsDropdownOpen, setIsBedDropdown] = useState(false);


  // const [iscityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  // const [ispurposeDropdownOpen, setIsPurposeDropdownOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const priceDropdownRef = useRef();
  const areaHomeDropdownRef = useRef();
  const areaPlotsDropdownRef = useRef();
  const areaCommercialsDropdownRef = useRef();
  const bedsDropdownRef = useRef();
  const citydropdownref = useRef();
  const purposedropdownref = useRef();
  const DropdownRef = useRef();


  const toggleDropdownPropertyTypes = (dropdown) => {
    switch (dropdown) {
      case 'price':
        setPriceDropdownOpen(!isPriceDropdownOpen);
        break;
      case 'areaHome':
        setAreaHomeDropdownOpen(!isAreaHomeDropdownOpen);
        break;
      case 'areaPlots':
        setAreaPlotsDropdownOpen(!isAreaPlotsDropdownOpen);
        break;
      case 'areaCommercials':
        setAreaCommercialsDropdownOpen(!isAreaCommercialsDropdownOpen);
        break;
      case 'beds dropdown':
        setIsBedDropdown(!isBedsDropdownOpen);
        break;
        default:
        break;
    }
  };

  const closeDropdownsOnClickOutside = (event) => {
    // Check if the click occurred outside each dropdown
    if (
      priceDropdownRef.current &&
      !priceDropdownRef.current.contains(event.target)
    ) {
      setPriceDropdownOpen(false);
    }

    if (
      areaHomeDropdownRef.current &&
      !areaHomeDropdownRef.current.contains(event.target)
    ) {
      setAreaHomeDropdownOpen(false);
    }

    if (
      areaPlotsDropdownRef.current &&
      !areaPlotsDropdownRef.current.contains(event.target)
    ) {
      setAreaPlotsDropdownOpen(false);
    }

    if (
      areaCommercialsDropdownRef.current &&
      !areaCommercialsDropdownRef.current.contains(event.target)
    ) {
      setAreaCommercialsDropdownOpen(false);
    }

    if (
      bedsDropdownRef.current &&
      !bedsDropdownRef.current.contains(event.target)
    ) {
      setIsBedDropdown(false);
    }
    
    if (
      citydropdownref.current &&
      !citydropdownref.current.contains(event.target)
    ) {
      setIsCityDropdownOpen(false);
    }
    
    if (
      purposedropdownref.current &&
      !purposedropdownref.current.contains(event.target)
    ) {
      setIsPurposeDropdownOpen(false);
    }
    
    if (
      DropdownRef.current &&
      !DropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    // Attach click event listener to the document
    document.addEventListener('click', closeDropdownsOnClickOutside);

    // Detach event listener when component unmounts
    return () => {
      document.removeEventListener('click', closeDropdownsOnClickOutside);
    };
  }, []); // Empty dependency array to run this effect only once


  return (
    <main className="bg-white min-h-screen w-full">
      <div className="flex justify-center items-center  w-full" >
        <div
          className="w-full flex flex-col justify-center items-center opacity-120 bg-black  py-5">
          <div className=" bg-black  dark:bg-neutral-800 ">

            <div className="flex flex-wrap">

              {/* Purpose  */}

              <div ref={purposedropdownref} className="px-1 py-4 flex gap-1">
                <div className="group inline-block relative">
                  <div
                    className="outline-none focus:outline-none   cursor-pointer bg-white rounded-sm h-[64px] w-[200px]"
                    onClick={togglePurposeDropdown}
                  >
                    <span className="font-semibold font-sans text-blue-600 text-xs text-start ml-2 mt-0">
                      Purpose
                    </span>
                    <div className="flex gap-1 mt-2 px-2">
                      <span className="text-xs font-sans text-black flex-1">
                        {selectedPurpose}
                      </span>
                      <span>
                        <svg
                          className={`fill-current mt-1 h-4 w-4 transform text-black ${iscityDropdownOpen ? "rotate-180" : ""
                            } transition duration-150 ease-in-out`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  {ispurposeDropdownOpen && ( // Render the dropdown only if isDropdownOpen is true
                    <ul className="bg-white border shadow-lg rounded-sm mt-1 absolute w-full  h-auto custom-scrollbar">
                      {PurposeList.map((item, index) => (
                        <li
                          key={index}
                          className="rounded-sm border border-b-2 font-sans text-xs px-3 py-2 hover:bg-gray-200 cursor-pointer hover:text-blue-600 text-black"
                          onClick={() => handlePurposeSelect(item)}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>


              {/* City Filter */}

              <div
              // id="collapseOne5"
              // className="!visible"
              // data-te-collapse-item
              // data-te-collapse-show
              // aria-labelledby="headingOne5"
              >
                <div ref={citydropdownref} className=" py-4 flex gap-1">
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
                            className={`fill-current mt-1 h-4 w-4 transform text-black ${iscityDropdownOpen ? "rotate-180" : ""
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
                      <ul className="bg-white border shadow-lg rounded-sm mt-1 transform overflow-y-auto scale-100 absolute transition duration-150 ease-in-out origin-top w-[200px] h-64 custom-scrollbar">
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

                  <div className="flex flex-wrap justify-center items-center">
                    <div className="w-[530px] ">
                    
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
                          className="block w-full h-[64px] rounded-sm font-sans p-5 pl-10 text-sm text-gray-900 border border-gray-300    focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 bg-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Search"
                          required
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
          <div ref={DropdownRef} className="bg-black ml-3   dark:bg-neutral-800">
            <div
              id="collapseTwo5"
              //   className="!visible hidden"
              data-te-collapse-item
              aria-labelledby="headingTwo5"
            >
              <div className="flex flex-wrap flex-row gap-1  p-1 ">
                <div>
                  <div
                    onClick={toggleDropdown}
                    className="outline-none focus:outline-none  border cursor-pointer bg-white rounded-sm h-[64px] w-[300px] mt-4"
                  >
                    <span className="font-semibold text-blue-600 font-sans text-xs text-start ml-2 mt-0">
                      PROPERTY TYPE
                    </span>
                    <div className="flex gap-1 mt-2 px-2">
                    
                   {(subType !== "") ? (
  <span className="text-sm font-sans text-black flex-1">
    {subType}
  </span>
) : (
  (activeTab !== "") && (
    <span>{activeTab}</span>
  )
)}

                       
                    
                      <span>
                        <svg
                          className={`fill-current mt-1 h-4 w-4 transform text-black ${isDropdownOpen ? "rotate-0" : "rotate-180"
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
                    <div className="bg-white mt-1 z-50 border shadow-lg rounded-sm  transform overflow-hidden scale-100 absolute transition duration-150 ease-in-out origin-top w-[300px] h-64 custom-scrollbar">
                      {/* Dropdown content here */}
                      <div className="flex justify-center gap-3 p-2">
                        <div
                          className={`cursor-pointer hover:text-blue-600 ${activeTab === "Home"
                              ? "text-blue-600 font-sans font-semibold"
                              : "text-black"
                            }`}
                          onClick={() => handleTabClick("Home")}
                        >
                          Home
                        </div>
                        <div
                          className={`cursor-pointer hover:text-blue-600 ${activeTab === "Plots"
                              ? "text-blue-600 font-sans font-semibold"
                              : "text-black"
                            }`}
                          onClick={() => handleTabClick("Plots")}
                        >
                          Plots
                        </div>
                        <div
                          className={`cursor-pointer hover:text-blue-600 ${activeTab === "Commercials"
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

                <div ref={priceDropdownRef} className="py-4">
                  <div className="group inline-block relative">
                    <div
                      className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]"
                      onClick={() => toggleDropdownPropertyTypes('price')}
                    >
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
                                <p>Any</p>
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

                    {isPriceDropdownOpen && (
                      <div  className="bg-white z-50 mt-1 border shadow-lg rounded-sm transform overflow-hidden scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">
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
                          <div className="h-[50px] w-[125px] border border-gray-400 overflow-y-auto custom-scrollbar">
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
                    )}
                  </div>
                </div>

                {/* Area SQRFT  filter Home */}

                {activeTab == 'Home' &&
                  <div ref={areaHomeDropdownRef} className="py-4">
                    <div className="group inline-block relative">
                      <div
                        className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]"
                        onClick={() => toggleDropdownPropertyTypes('areaHome')}
                      >
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

                      {isAreaHomeDropdownOpen && (
                        <div  className="bg-white z-50 mt-1 border shadow-lg rounded-sm transform overflow-hidden scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">

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
                      )}
                    </div>
                  </div>
                }

                {/* Area Size For Plots */}

                {activeTab == 'Plots' &&
                  <div ref={areaPlotsDropdownRef} className="py-4">
                    <div className="group inline-block relative">
                      <div
                        className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]"
                        onClick={() => toggleDropdownPropertyTypes('areaPlots')}
                      >

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
                          <ToastContainer />

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

                      {isAreaPlotsDropdownOpen && (
                        <div  className="bg-white z-50 mt-1 border shadow-lg rounded-sm transform overflow-hidden scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">

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
                      )}
                    </div>
                  </div>

                }



                {/* Area Size For Commercials */}

                {activeTab == 'Commercials' &&
                  <div ref={areaCommercialsDropdownRef} className="py-4">
                    <div className="group inline-block relative">
                      <div
                        className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[262px]"
                        onClick={() => toggleDropdownPropertyTypes('areaCommercials')}
                      >

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



                      {isAreaCommercialsDropdownOpen && (
                        <div  className="bg-white border z-50 mt-1 shadow-lg rounded-sm transform overflow-hidden scale-100 absolute transition duration-150 ease-in-out origin-top w-[262px] h-64 custom-scrollbar">

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
                      )}
                    </div>
                  </div>

                }


                {/* BEDS filter */}

                {/* <div className=" py-4">
              <div className="group inline-block relative"> */}

{activeTab === 'Home' && (
  <div ref={bedsDropdownRef} className="py-4">
    <div className="group inline-block relative">
      <div
        className="outline-none focus:outline-none border cursor-pointer bg-white rounded-sm h-[64px] w-[100px]"
        onClick={() => toggleDropdownPropertyTypes("beds dropdown")}
      >
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


      {isBedsDropdownOpen && (
        <div  className="bg-white border z-50 mt-1 shadow-lg rounded-sm transform overflow-hidden scale-100 absolute transition duration-150 ease-in-out origin-top  w-[100px] h-64">
          <div className="h-64 w-[100px] overflow-y-auto transform border border-gray-400 custom-scrollbar">
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
                         )}
                   </div>
                  </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fetch all data */}

      <GetAllList images={filteredItems} isLoading={isLoading} />

    </main>

  );

}


export default function ALLproperties() {



return(
  <>

<SuspenseBoundary>
  <WrapALLproperties />
</SuspenseBoundary>

  </>
)


}








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
            className={`${activeTab === "Home" ? "block" : "hidden"
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
            className={`${activeTab === "Plots" ? "block" : "hidden"
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
            className={`${activeTab === "Commercials" ? "block" : "hidden"
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





///////////////////////  Filters Data fetch //////////////////////////////////






const GetAllList = ({ images, isLoading }) => {
  const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const routerr = useRouter()
  const [userid, setUserid] = useState('');

  useEffect(() => {

    setUserid(localStorage.getItem('_id'));
  }, []);







  function GotToNextPage(item) {




    if (userid == "" || userid == null) {
      routerr.push("/Login");
      toast.error("You Have to First Login");
    } else {
      routerr.push(`/Properties_Details/${item._id}`);
    }
  }





  const openEmailDialog = () => {
    setEmailDialogOpen(true);
  };

  const closeEmailDialog = () => {
    setEmailDialogOpen(false);
  };


  const [isDialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [timeSinceInsertion, setTimeSinceInsertion] = useState(false);

  useEffect(() => {
    // Assuming that images is an array of objects and each object has a 'createdAt' property
      images.map((item,index) => {
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
    });
  
    
  }, [images]);



  const toggleDialog = () => {
    const header_title ="Contact Number"
    setTitle(header_title)
    setDialogOpen(!isDialogOpen);
  };







  return (
  
  <div className="container h-screen  mt-16 mb-10 p-10">
  {isLoading ? (
    <LoadingSpinner />
  ) : (
<>
    {images.length === 0 ? (
      <div className="w-full h-full">
        <div className="flex flex-col justify-center items-center ">
          <p className="text-4xl font-extrabold text-indigo-600">Oops! Search Not Found</p>
          <p className="text-gray-500 mt-2">Try refining your search criteria.</p>
        </div>
      </div>
    ):(
  <>
      <h1 className="text-3xl font-extrabold mb-10" >All Properties</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full h-auto">
            {images.map((item) => (
              <div key={item._id} className="bg-white border border-gray-300 w-[400px] rounded-[30px] overflow-hidden shadow-lg">

                <div className="cursor-pointer p-3" onClick={() => GotToNextPage(item)} >
                  
                <div className="w-full h-[180px] relative" >
      <Image
        className=" object-cover object-center rounded-[30px]"
                    src={`${ServiceUrl}/Product/?filename=${item.images[0]["name"]}`}
                    alt={item.images.name}
                    layout="fill"
                  />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-row justify-between" >
                    <text className="text-gray-400 text-xs font-sans" >{`Added ${timeSinceInsertion}` || 0 }</text>
                    <Image src="/verification.png" width={15} height={15} />
                  </div>
                  <p className="text-xs text-gray-700 mb-2">Pkr
                    <span className="text-sm text-black font-medium font-sans" > {item.price}</span></p>
                  <h2 className="text-sm font-semibold text-gray-900 mb-2">{item.title}</h2>
                  <div className="flex items-center gap-2 text-xs text-black mb-2">
                    <MdLocationOn />
                    {item.location}
                  </div>
                  <div className="flex flex-row items-center text-sm text-gray-600">

                    <div className="flex items-center text-xs text-black gap-2">
                      <MdOutlineShareLocation />
                      {item.city}
                    </div>
                    <div className="flex items-center font-sans ml-3 text-xs gap-2 text-black">

                      <TbArrowAutofitHeight />
                      {item.Area_size}
                    </div>
                  </div>
                </div>
                <div className=" flex items-center justify-center px-4 mb-5">
                  <button
                    onClick={openEmailDialog}

                    className="flex justify-center items-center gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full text-xs px-5 w-full py-3.5 text-center mr-2 mb-2"
                  >
                    <TbMailFilled className="w-4 h-4" />
                    Email
                  </button>


                  <button
                    className="flex justify-center items-center gap-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-full  text-xs px-5 w-full py-3.5  mr-2 mb-2"
                    onClick={toggleDialog}
                  >
                    <IoMdCall className="w-4 h-4" />
                    Call
                  </button>


                  <CallDialog call={item.mobile} title={title} isOpen={isDialogOpen} onClose={toggleDialog} />
                  <EmailDailogBox item={item} isOpen={isEmailDialogOpen} onClose={closeEmailDialog} />

                </div>

              </div>

))}
</div>
</>
          )}
      </>
)}
    </div>
  );
}

