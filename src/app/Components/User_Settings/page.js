"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SettingsTabs from "./settings_tabs";
import { ServiceUrl } from "../../global";
import NewProduct from "../Add_Property/page";
import { DotSpinner, Metronome, Ring } from "@uiball/loaders";
import PricingPlan from "./Pricing_Plan";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbPackages } from "react-icons/tb";
import { GiSelfLove } from "react-icons/gi";
import { GetFavoritePropertyByUserId , DeleteFavoritePropertyById , SavefavoriteProperty } from "../../action/favorites";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import {DeletePropertyById} from "../../action/Property"
import { toast } from "react-toastify";

// const tabData = [

// ];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("My Properties"); // Initialize the active tab state
  const [tabData, setTabData] = useState([
    {
      name: "My Properties",
      icon: <FaHome />,
    },
    {
      name: "Favorites",
      icon: <GiSelfLove />,
    },
    {
      name: "Post Listing",
      icon: <TbBrandProducthunt />,
    },

    {
      name: "My Packages",
      icon: <TbPackages />,
    },
  ])
  const [postlisting, setPostListing] = useState([]);
  const [favoritepostlisting, setFavoritePostListing] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {


    CheckUserRole()
    GetData();
    GetpropertyByuserId();
  }, []);



function CheckUserRole() {
  
 let userRole =  localStorage.getItem("role") || ""; 
  
 if (userRole === 'user') {
  setTabData(prevTabData => [
    ...prevTabData,
    {
      name: "User Profile",
      icon: <CgProfile />,
    }
  ]);
} else if (userRole === 'agent') {
  setTabData(prevTabData => [
    ...prevTabData,
    {
      name: "Agent Profile",
      icon: <CgProfile />,
    }
  ]);
}
}




  const GetData = async () => {
    try {
      var userid = localStorage.getItem("_id");
      const response = await fetch(`${ServiceUrl}/PropertyByuserid/${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      setPostListing(data["obj"]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  // /////////////////////////  Favorite properties /////////////////////////////////////////

  const GetpropertyByuserId = async () => {
    try {
      var userid = localStorage.getItem("_id");

      const data = await GetFavoritePropertyByUserId(userid);
      console.log(data, "favorite list");
      setFavoritePostListing(data["Get"]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  //////////////////////// Side Bar Tabs Click ///////////////////////////////////

  const handleTabClick = (tabName) => {
    var userid = localStorage.getItem("_id");
    setActiveTab(tabName); // Update the active tab state when a tab is clicked
    if (tabName == "Agent Profile") {
      router.push(`/Components/AgentProfile/${userid}/?Agent=profile`);
    }
  };




  const handleRemoveFavorite = async (propertyId) => {
    try {
      const response = await DeleteFavoritePropertyById(propertyId);

      if (response.status === 200) {
        // If the deletion is successful, update the state to trigger a re-render
        const updatedFavorites = favoritepostlisting.filter((fav) => fav._id !== propertyId);
        setFavoritePostListing(updatedFavorites);
        toast.success('Favorite property removed successfully');
      } else {
      toast.error( response.message);
      }
    } catch (error) {
      toast.error('Error removing favorite property:', error);
    }
  };




  const handleDeleteMyProperty = async (propertyId) => {
    try {
      const response = await DeletePropertyById(propertyId);

      if (response.status === 200) {
        // If the deletion is successful, update the state to trigger a re-render
        const updatedFavorites = postlisting.filter((fav) => fav._id !== propertyId);
        setPostListing(updatedFavorites);
        toast.success('property Delete successfully');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Error Delete  property:', error);
    }
  };



  return (
    <div className="flex  ">
      {/*///////////////////////////////////// Left Sidebar //////////////////////////// */}

      <aside className="w-1/4 min-h-screen bg-white shadow-lg p-4">
        <ul className="mt-8 space-y-2">
          {tabData.map((tab) => (
            <li className="flex justify-center items-center" key={tab.name}>
              <button
                onClick={() => handleTabClick(tab.name)}
                className={`flex flex-row gap-3 items-center rounded-full w-full p-4 ${
                  activeTab === tab.name
                    ? "text-white bg-blue-600 shadow-xl rounded-full hover:scale-105 transform transition duration-500"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* /////////////////////////// Main Content ///////////////////////////////////////////////// */}

      <div className="w-3/4 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
              <h2 className="text-2xl font-semibold mt-2">{activeTab}</h2>
            </div>
          </div>

          <hr className="my-4" />
          <div className="space-y-4">
            {/* Render content based on activeTab */}

            {activeTab === "My Properties" && (
              <div>
              

                {postlisting.map((item, index) => (
                  <MyProperties
                    key={index}
                    listing={item}
                    isLoading={isLoading}
                    onDeleteProperty={handleDeleteMyProperty}
                  />
                ))}
              </div>
            )}

            {activeTab == "Favorites" && (
              <div>
           
                {favoritepostlisting.map((item, index) => (
                  <MyFavoritesProperties
                    key={index}
                    listing={item}
                    isLoading={isLoading}
                    onRemoveFavorite={handleRemoveFavorite}
                  />
                ))}
              </div>
            )}

            {activeTab === "Post Listing" && (
              <div className=" items-center p-6">
                <NewProduct />
              </div>
            )}

            {activeTab === "User Profile" && (
              <div className=" items-center p-6">
                <SettingsTabs />
              </div>
            )}
            {activeTab === "My Packages" && (
              <div className=" items-center p-6">
                <PricingPlan />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;









function MyProperties({ listing, isLoading , onDeleteProperty }) {
  const [menuVisible, setMenuVisible] = useState(false);
const router  =  useRouter()


  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


function handleEditProperty(id){
  router.push(`/Components/Edit_property/${id}`)
}

const handleDeleteMyProperty = async () => {
  if (onDeleteProperty) {
    // Call the callback function passed from the parent component
    onDeleteProperty(listing._id);
  }
};


async function handleFavorite(){

const userid = localStorage.getItem('_id') || '';

  const Addtofavorite =  await SavefavoriteProperty(userid , listing._id) 
 
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
 




  return (
    <div>

      <div
    
        className="bg-white shadow-lg hover:shadow-xl p-4 rounded-lg flex"
      >
        <div className="w-1/3 flex justify-center">
          <img
            src={`${ServiceUrl}/Product/?filename=${listing.images[0]["name"]}`}
            alt={listing.propertyType}
            className="w-[400px] object-cover h-[220px] rounded-lg"
          />
        </div>

        <div className="w-2/3 p-4 px-5">
          <div className="text-sm font-sans font-bold flex gap-3  text-gray-900 mb-2">
            <img src="/property-type.png" className="w-5 h-5 mt-2" />
            <span className="mt-2">{listing.propertyType}</span>

            <p className="text-gray-600 flex ml-8 mt-2 gap-3">
              <img src="/curr-location.png" className="w-5 h-5 " />
              <span className="font-bold text-sm font-sans text-black ">
                {listing.location}
              </span>
            </p>
          </div>
          <ul className="mt-6">
            <li className="flex gap-3 items-center">
              <img src="/bed.png" className="w-5 h-5" />
              <span className="font-bold text-sm font-sans">
                {listing.bedrooms}
              </span>
              Bedrooms
              <li className="flex gap-3 items-center ml-4 mt-2">
                <img src="/bath.png" className="w-5 h-5" />
                <span className="font-bold text-sm font-sans">
                  {listing.bathrooms}
                </span>
                Washrooms
              </li>
            </li>
            <li className="flex gap-3 items-center mt-6">
              <img src="/area.png" className="w-5 h-5" />
              <span className="font-bold text-sm font-sans">
                {listing.Area_size}
              </span>
              sq. ft.
            </li>
            <li className="flex gap-3 items-center mt-6">
              <img src="/price-tag.png" className="w-5 h-5" />
              PKR
              <span className="font-bold text-sm font-sans">
                {listing.price}
              </span>
            </li>
          </ul>
        </div>

        {/*////////////////// Three-dot menu /////////////////// */}

        <div className=" cursor-pointer" onClick={handleToggleMenu}>
          <div className="group relative">
            <div className="bg-gray-50 rounded-full p-2">
              <HiDotsVertical className="text-black text-md " />
            </div>

            <div
              className={`absolute ${
                menuVisible ? "flex" : "hidden"
              } flex-col right-0 top-8 w-[150px] bg-white border border-gray-200 rounded shadow-md transform transition-transform duration-300 ease-in-out`}
            >
              <button
                className="flex gap-3 px-4 py-2 text-xs hover:bg-gray-100 text-black"
                 onClick={() =>handleEditProperty(listing._id)}
              >
                <MdOutlineModeEdit />
                <span>Edit</span>
              </button>
              <button
                className="flex gap-3 px-4 py-2 text-xs hover:bg-gray-100 text-black"
           onClick={handleDeleteMyProperty}
              >
                <MdOutlineDeleteOutline />

                <span>Delete</span>
              </button>
              <button
                className="flex gap-3 px-4 py-2 text-xs hover:bg-gray-100 text-black"
                onClick={handleFavorite}
              >
                <GiSelfLove />

                <span>Add to Favorite</span>
              </button>
            </div>
          </div>
        </div>
        {/* ///////////////////////////////////// */}
      </div>
   
    </div>
  );
}




// Favorites Properties 





function MyFavoritesProperties({ listing, isLoading  , onRemoveFavorite  }) {
  const [menuVisible, setMenuVisible] = useState(false);
const router  =  useRouter()
  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };



  const handleRemoveFavorite = async () => {
    if (onRemoveFavorite) {
      // Call the callback function passed from the parent component
      onRemoveFavorite(listing._id);
    }
  };





  return (
    <div>

      <div
    
        className="bg-white shadow-lg hover:shadow-xl p-4 rounded-lg flex"
      >
        <div className="w-1/3 flex justify-center">
          <img
            src={`${ServiceUrl}/Product/?filename=${listing.images[0]["name"]}`}
            alt={listing.propertyType}
            className="w-[400px] object-cover h-[220px] rounded-lg"
          />
        </div>

        <div className="w-2/3 p-4 px-5">
          <div className="text-sm font-sans font-bold flex gap-3  text-gray-900 mb-2">
            <img src="/property-type.png" className="w-5 h-5 mt-2" />
            <span className="mt-2">{listing.propertyType}</span>

            <p className="text-gray-600 flex ml-8 mt-2 gap-3">
              <img src="/curr-location.png" className="w-5 h-5 " />
              <span className="font-bold text-sm font-sans text-black ">
                {listing.location}
              </span>
            </p>
          </div>
          <ul className="mt-6">
            <li className="flex gap-3 items-center">
              <img src="/bed.png" className="w-5 h-5" />
              <span className="font-bold text-sm font-sans">
                {listing.bedrooms}
              </span>
              Bedrooms
              <li className="flex gap-3 items-center ml-4 mt-2">
                <img src="/bath.png" className="w-5 h-5" />
                <span className="font-bold text-sm font-sans">
                  {listing.bathrooms}
                </span>
                Washrooms
              </li>
            </li>
            <li className="flex gap-3 items-center mt-6">
              <img src="/area.png" className="w-5 h-5" />
              <span className="font-bold text-sm font-sans">
                {listing.Area_size}
              </span>
              sq. ft.
            </li>
            <li className="flex gap-3 items-center mt-6">
              <img src="/price-tag.png" className="w-5 h-5" />
              PKR
              <span className="font-bold text-sm font-sans">
                {listing.price}
              </span>
            </li>
          </ul>
        </div>

        {/*////////////////// Three-dot menu /////////////////// */}

        <div className=" cursor-pointer" onClick={handleToggleMenu}>
          <div className="group relative">
            <div className="bg-gray-50 rounded-full p-2">
              <HiDotsVertical className="text-black text-md " />
            </div>

            <div
              className={`absolute ${
                menuVisible ? "flex" : "hidden"
              } flex-col right-0 top-8 w-[150px] bg-white border border-gray-200 rounded shadow-md transform transition-transform duration-300 ease-in-out`}
            >
           
              <button
                className="flex gap-3 px-4 py-2 text-xs hover:bg-gray-100 text-black"
                onClick={handleRemoveFavorite}
              >
                <MdOutlineDeleteOutline />

                <span>Remove</span>
              </button>
          
            </div>
          </div>
        </div>
        {/* ///////////////////////////////////// */}
      </div>
   
    </div>
  );
}









   {/* ))/ */}
      {/* ) : (
        <div className="flex justify-center mt-[60px] mb-[60px] items-center">
          {isLoading && <DotSpinner size={40} speed={0.9} color="blue" />}
        </div>
      )} */}