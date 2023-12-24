"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceUrl } from "../../global";
import Link from "next/link";
import LoadingSpinner from "../../Components/Loader/page";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailDailogBox from "../Email_Dailog/page";


function PropertyFilter() {
  const [details, setDetails] = useState([]);
  const [filterDetails, setFilterDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("all"); // Default option
  const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
  const [userid, setUserid] = useState("");
  const router = useSearchParams();
  const routerr = useRouter();
  const purpose = router.get("purpose");
  const propertyType = router.get("propertyType");
  let subType = router.get("subType");
  let Area_size = router.get("Area_size"); // Initialize with the actual value

  // Check if Area_size is null or empty and set it to an empty string if needed
  if (Area_size === null || Area_size === undefined || Area_size === "") {
    Area_size = "";
  }

  if (subType === null || subType === undefined || subType === "") {
    subType = "";
  }

  console.log(propertyType, subType, Area_size);






  useEffect(() => {
    fetchProperty();
    setUserid(localStorage.getItem("_id"));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${ServiceUrl}/propertyfind/?purpose=${purpose}&propertyType=${propertyType}&subType=${subType}&Area_size=${Area_size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setDetails(data["filteredProducts"]);
      console.log(data, details, "data ?");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  // const handleDropdownChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  // const filteredDetails = details.filter((property) => {
  //   const searchTextLower = searchText.toLowerCase();
  //   const locationMatch = property.location
  //     .toLowerCase()
  //     .includes(searchTextLower);
  //   const priceValue = parseFloat(property.price.replace(/\D/g, ""));

  //   if (selectedOption === "all") {
  //     // No specific filter selected, return true for all properties
  //     return locationMatch || priceMatch || cityMatch;
  //   } else if (selectedOption === "500000") {
  //     return priceValue < 500000 && (locationMatch || cityMatch);
  //   } else if (selectedOption === "1000000") {
  //     return priceValue < 1000000 && (locationMatch || cityMatch);
  //   } else if (selectedOption === "2000000") {
  //     return priceValue < 2000000 && (locationMatch || cityMatch);
  //   } else if (selectedOption === "3500000") {
  //     return priceValue < 3500000 && (locationMatch || cityMatch);
  //   }

  //   // If none of the conditions match, return false
  //   return false;
  // });
  const openEmailDialog = () => {
    setEmailDialogOpen(true);
  };
  const closeEmailDialog = () => {
    setEmailDialogOpen(false);
  };
  
  function GotToNextPage(item) {
    if (userid == "" || userid == null) {
      routerr.push("/Components/Login");
      toast.error("You Have to First Login");
    } else {
      routerr.push(`/Components/Properties_Details/${item._id}`);
    }
  }

  const filteredData = details.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );





  return (
    <div>
      <div className="container mx-auto py-8">
        {/* Search bar  */}

        <div className="flex space-x-4">
          <div className="relative text-gray-600 mb-10 flex-1">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-indigo-500 w-full"
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
            />
          </div>

          {/* <div className="relative text-gray-600 mb-10 flex-1">
            <select
              onChange={handleDropdownChange}
              value={selectedOption}
              className="border-2 border-gray-300 bg-white h-10 px-5 pr-8 rounded-lg text-sm focus:outline-none focus:border-indigo-500 w-full"
            >
              <option value="all">Select Price</option>
              <option value="all" className="text-gray-800 hover:bg-gray-100">
                All Properties
              </option>
              <option
                value="500000"
                className="text-gray-800 hover:bg-gray-100"
              >
                500,000
              </option>
              <option
                value="1000000"
                className="text-gray-800 hover:bg-gray-100"
              >
                1,000,000
              </option>
              <option
                value="2000000"
                className="text-gray-800 hover:bg-gray-100"
              >
                2,000,000
              </option>
              <option
                value="3500000"
                className="text-gray-800 hover:bg-gray-100"
              >
                3,500,000
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 fill-current text-gray-500 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 8.293a1 1 0 011.414 0L10 9.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>*/}
        </div> 

        <h1 className="text-xl font-semibold  ">Locations of {propertyType} For {purpose}
         
         </h1>

        {isLoading ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            {/* Show Locations */}
            {filteredData.length > 0 && (
              <div className="h-auto mb-9 mt-4 bg-gray-100">
                <div className="w-full max-w-screen-xl p-8 bg-white rounded-lg shadow-lg transition-transform transform ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    {filteredData.map((location, index) => (
                      <div
                        key={index}
                        className="flex flex-grow gap-3 items-center p-4 border rounded-lg hover:bg-gray-200 transition-all"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-geo-alt"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          </svg>
                        </div>

                        <h2 className="text-sm font-semibold">
                          {location.location}
                        </h2>
                      </div>
                    ))}
                    
                  </div>
                </div>
              </div>
            )}
            <ToastContainer />
            {/* Property Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
              {filteredData.length > 0 ? (
                filteredData.map((property, index) => (
                  // <Link
                  //   href={`/Components/Properties_Details?data=${JSON.stringify(property)}`}
                  // >
                  <div
                    key={index}
                  
                    className="bg-white shadow-lg p-4 rounded-lg mb-4 flex "
                  >
                    {/* Left Section - Image */}

                    <div className="w-1/2 pr-4 cursor-pointer"   onClick={() => GotToNextPage(property)}>
                      <img
                        src={`${ServiceUrl}/Product/?filename=${property.images[0]["name"]}`}
                        alt={property.subType}
                        className="w-[300px] h-[370px] rounded-lg"
                      />
                    </div>

                    {/* Right Section - Details */}
                    <div className="w-1/2 flex flex-col justify-center items-center">
                      <div className="text-xl font-semibold mb-2">
                        {property.subType}
                      </div>
                      <div className="text-gray-500 mb-2">
                        {property.propertyType} - {property.subType}
                      </div>
                      <div className="text-gray-600 mb-2">
                        {property.city}, {property.location}
                      </div>
                      <div className="text-gray-600 mb-2">
                        Area: {property.Area_size} 
                      </div>
                      <div className="text-indigo-600 font-bold text-lg mb-2">
                        Price: {property.price}
                      </div>
                      <div className="text-gray-600">
                        {property.bedrooms} Bedrooms | {property.bathrooms}{" "}
                        Bathrooms
                      </div>
                      <div className="mt-4">
                        <button        onClick={openEmailDialog} className="bg-indigo-500 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg">
                          Contact Seller
                        </button>
                        <EmailDailogBox item={property}  isOpen={isEmailDialogOpen} onClose={closeEmailDialog}  />
                      </div>
                    </div>
                  </div>
                  // </Link>
                ))
              ) : (
                <>
                  <div className="flex flex-col w-full ml-[450px] ">
                    <img
                      src="/not.jpg" // Replace with your image path
                      alt="Search Not Found"
                      className="w-40 h-40 mb-6 rounded-full border-4 border-indigo-500 shadow-lg"
                    />
                    <p className="text-2xl font-semibold text-indigo-600">
                      Oops! Search Not Found
                    </p>
                    <p className="text-gray-500 mt-2">
                      Try refining your search criteria.
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PropertyFilter;
