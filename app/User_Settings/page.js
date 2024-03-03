"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SettingsTabs from "./settings_tabs";
import { ServiceUrl } from '@/app/global';
import NewProduct from "../Add_Property/page";
import {GetPropertyUserId} from "@/app/action/Property";
import PricingPlan from "./Pricing_Plan";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbPackages } from "react-icons/tb";
import { GiSelfLove } from "react-icons/gi";
import { GetFavoritePropertyByUserId, DeleteFavoritePropertyById, SavefavoriteProperty } from "@/app/action/favorites";
import { MdOutlineDeleteOutline, MdOutlineSettings, MdSettingsSuggest } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { DeletePropertyById } from "@/app/action/Property"
import { toast } from "react-toastify";
import { Island_Moments } from "next/font/google";
import AgentProfile from "./AgentProfile";
import Image from "next/image";


const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("My Properties"); // Initialize the active tab state
  const [role, setRole] = useState('')
 const [postlisting, setPostListing] = useState([]);
 const [favoritepostlisting, setFavoritePostListing] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const [isloading1, setIsLoading1] = useState(false);

  useEffect(() => {
    let userRole = localStorage.getItem("role") || "";
    setRole(userRole);
    GetData();
   
    GetpropertyByuserId();
  }, []);
  
  
  



  const GetData = async () => {
    try {
      setIsLoading1(true)
      var userid = localStorage.getItem("_id");
      const response = await GetPropertyUserId(userid)

  
      setPostListing(response["Get"]);
      setIsLoading1(false);
    } catch (error) {

      console.error("Error fetching data:", error);
      setIsLoading1(false);
    }
  };


  // /////////////////////////  Favorite properties /////////////////////////////////////////

  const GetpropertyByuserId = async () => {
    try {
      var userid = localStorage.getItem("_id");

      const data = await GetFavoritePropertyByUserId(userid);
      // console.log(data, "favorite list");
      setFavoritePostListing(data["Get"]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  //////////////////////// Side Bar Tabs Click ///////////////////////////////////

  const handleTabClick = (tabName) => {
   
    setActiveTab(tabName); // Update the active tab state when a tab is clicked
   
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
        toast.error(response.message);
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

  const tabIcons = {
    "My Properties": <FaHome />,
    Favorites: <GiSelfLove />,
    "Post Listing": <TbBrandProducthunt />,
    "My Packages": <TbPackages />,
    "Agent Profile": <CgProfile />,
    Settings: <MdOutlineSettings />,
  };

  return (
    <main className="flex h-screen ">
       {/*///////////////////////////////////// Left Sidebar //////////////////////////// */}

    <aside className="w-1/5 h-screen bg-white shadow-lg p-4">
      <div className="flex flex-row gap-2 font-bold ">
        <MdSettingsSuggest className="w-5 h-5 text-blue-600" />
        <h1>Account Settings</h1>
      </div>

      <hr className="my-4" />

      <h1 className="font-semibold text-sm">General</h1>

      <ul className="mt-2 space-y-2">
        <li className="flex justify-center items-center">
          <button
            onClick={() => handleTabClick("My Properties")}
            className={`flex flex-row gap-3 items-center rounded-lg w-full p-3 text-sm ${
              activeTab === "My Properties"
                ? "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 shadow-xl rounded-lg  hover:scale-105 transform transition duration-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <FaHome />
            <span>My Properties</span>
          </button>
        </li>
        <li className="flex justify-center items-center">
          <button
            onClick={() => handleTabClick("Favorites")}
            className={`flex flex-row gap-3 items-center rounded-lg w-full p-3 text-sm ${
              activeTab === "Favorites"
                ? "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 shadow-xl rounded-lg  hover:scale-105 transform transition duration-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <GiSelfLove />
            <span>Favorites</span>
          </button>
        </li>
        <li className="flex justify-center items-center">
          <button
            onClick={() => handleTabClick("Post Listing")}
            className={`flex flex-row gap-3 items-center rounded-lg w-full p-3 text-sm ${
              activeTab === "Post Listing"
                ? "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80shadow-xl rounded-lg  hover:scale-105 transform transition duration-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <TbBrandProducthunt />
            <span>Post Listing</span>
          </button>
        </li>
        <li className="flex justify-center items-center">
          <button
            onClick={() => handleTabClick("My Packages")}
            className={`flex flex-row gap-3 items-center rounded-lg w-full p-3 text-sm ${
              activeTab === "My Packages"
                ? "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 shadow-xl rounded-lg  hover:scale-105 transform transition duration-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <TbPackages />
            <span>My Packages</span>
          </button>
        </li>
      
      {role === "agent" && (
        <li className="flex justify-center items-center">
          <button
            onClick={() => handleTabClick("Agent Profile")}
            className={`flex flex-row gap-3 items-center rounded-lg w-full p-3 text-sm ${
              activeTab === "Agent Profile"
                ? "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 shadow-xl rounded-lg  hover:scale-105 transform transition duration-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <CgProfile />
            <span>Agent Profile</span>
          </button>
        </li>
      ) }

      
<li className="flex justify-center items-center">
          <button
            onClick={() => handleTabClick("Settings")}
            className={`flex flex-row gap-3 items-center rounded-lg w-full p-3 text-sm ${
              activeTab === "Settings"
                ? "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 shadow-xl rounded-lg  hover:scale-105 transform transition duration-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <MdOutlineSettings />
            <span>Settings</span>
          </button>
        </li>
      </ul>
      <hr className="my-4" />
    </aside>
   

      {/* Main Content */}






      <div className="flex-1 min-h-screen p-4 overflow-y-auto overflow-hidden ">

      <div className="bg-white w-full h-auto rounded-lg p-6 shadow-md">
            <div className="flex flex-row">
            <div className="flex flex-row gap-3">
            <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80  w-[40px] h-[40px] flex justify-center items-center rounded-lg  shadow-md text-white " >
              {tabIcons[activeTab]}
       </div>
              <h2 className="text-xl font-bold mt-2">{activeTab}</h2>
            </div>
          </div>
          <hr className="my-4" />
          
      
          <div className="space-y-4">
            {/* Render content based on activeTab */}
            {activeTab === "My Properties" && (
  <>
    {isloading1 ? (
      <MyPropertiesLoadings />
    ) : (
      <>
        {postlisting.length === 0 ? (
          <p className="text-center" >No properties found.</p>
        ) : (
          postlisting.map((item, index) => (
            <MyProperties
              key={item._id}
              listing={item}
              onDeleteProperty={handleDeleteMyProperty}
              GetpropertyByuserId={GetpropertyByuserId}
            />
          ))
        )}
      </>
    )}
  </>
)}

            {activeTab == "Favorites" && (
              <div>

                {favoritepostlisting.map((item, index) => (
                  <MyFavoritesProperties
                  key={item._id}
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

            {activeTab === "Settings" && (
              <div className=" items-center p-6">
                <SettingsTabs />
              </div>
            )}
            {activeTab === "My Packages" && (
              <div className=" items-center p-6">
                <PricingPlan />
              </div>
            )}
                {activeTab === "Agent Profile" && (
              <div className=" items-center p-6 relative">
                <AgentProfile />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;









function MyProperties({ listing, onDeleteProperty,GetpropertyByuserId }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter()


  const handleToggleMenu = () => {
    setMenuVisible(!menuVisible);
  };


  function handleEditProperty(id) {
    router.push(`/Edit_property/${id}`)
  }

  const handleDeleteMyProperty = async () => {
    if (onDeleteProperty) {
      // Call the callback function passed from the parent component
      onDeleteProperty(listing._id);
    }
  };


  async function handleFavorite() {

    const userid = localStorage.getItem('_id') || '';

    const Addtofavorite = await SavefavoriteProperty(userid, listing._id)

    if (Addtofavorite.status == 200) {
      toast.success("Added Success");
      GetpropertyByuserId();
    } else if (Addtofavorite.status == 400) {
      // toast.error("Error to Save")
      toast.success("Added Success")
    } else if (Addtofavorite.status == 500) {
      toast.error("Error to Save")
    } else {
      toast.error("Error to Save")
    }

  }





  return (
    <main className="w-full h-[100%]">

      <div
        className="bg-white shadow-lg mb-2 hover:shadow-xl p-4 rounded-lg flex"
      >
        <div className="w-1/3 flex justify-center">

        <div className="relative w-[400px] h-[220px]">
          <Image
            src={`${ServiceUrl}/Product/?filename=${listing.images[0]["name"]}`}
            alt={listing.propertyType}
            className=" object-cover rounded-lg"
            layout="fill"
          />
          </div>
        </div>

        <div className="w-2/3 p-4 px-5">
          <div className="text-sm font-sans font-bold flex gap-3  text-gray-900 mb-2">
            <Image src="/property-type.png" width={15} height={15} className="mt-2" />
            <span className="mt-2">{listing.propertyType}</span>

            <p className="text-gray-600 flex ml-8 mt-2 gap-3">
              <Image src="/curr-location.png" width={15} height={15} />
              <span className="font-bold text-sm font-sans text-black ">
                {listing.location}
              </span>
            </p>
          </div>
          <ul className="mt-6">
            <li className="flex gap-3 items-center">
              <Image src="/bed.png" width={15} height={15} />
              <span className="font-bold text-sm font-sans">
                {listing.bedrooms}
              </span>
              Bedrooms
              <li className="flex gap-3 items-center ml-4 mt-2">
                <Image src="/bath.png" width={15} height={15} />
                <span className="font-bold text-sm font-sans">
                  {listing.bathrooms}
                </span>
                Washrooms
              </li>
            </li>
            <li className="flex gap-3 items-center mt-6">
              <Image  src="/area.png" width={15} height={15} />
              <span className="font-bold text-sm font-sans">
                {listing.Area_size}
              </span>
              sq. ft.
            </li>
            <li className="flex gap-3 items-center mt-6">
              <Image src="/price-tag.png" width={15} height={15}/>
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
              className={`absolute ${menuVisible ? "flex" : "hidden"
                } flex-col right-0 top-8 w-[150px] bg-white border border-gray-200 rounded shadow-md transform transition-transform duration-300 ease-in-out`}
            >
              <button
                className="flex gap-3 px-4 py-2 text-xs hover:bg-gray-100 text-black"
                onClick={() => handleEditProperty(listing._id)}
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
      </div>

    </main>
  );
}




// Favorites Properties 





function MyFavoritesProperties({ listing, isLoading, onRemoveFavorite }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter()
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
    <div className="w-full " >

      <div

        className="bg-white mb-2 shadow-lg hover:shadow-xl p-4 rounded-lg flex h-auto"
      >
        <div className="w-1/3 flex justify-center">
        <div className="relative w-[400px] h-[220px]">
          <Image
          src={`${ServiceUrl}/Product/?filename=${listing.images[0]["name"]}`}
            alt={listing.propertyType}
            className="object-cover  rounded-lg"
            layout="fill"
          />
          </div>
        </div>

        <div className="w-2/3 p-4 px-5">
          <div className="text-sm font-sans font-bold flex gap-3  text-gray-900 mb-2">
            <Image src="/property-type.png" className=" mt-2" width={15} height={15} />
            <span className="mt-2">{listing.propertyType}</span>

            <p className="text-gray-600 flex ml-8 mt-2 gap-3">
              <Image src="/curr-location.png" width={15} height={15} />
              <span className="font-bold text-sm font-sans text-black ">
                {listing.location}
              </span>
            </p>
          </div>
          <ul className="mt-6">
            <li className="flex gap-3 items-center">
              <Image src="/bed.png" width={15} height={15} />
              <span className="font-bold text-sm font-sans">
                {listing.bedrooms}
              </span>
              Bedrooms
              <li className="flex gap-3 items-center ml-4 mt-2">
                <Image src="/bath.png" width={15} height={15} />
                <span className="font-bold text-sm font-sans">
                  {listing.bathrooms}
                </span>
                Washrooms
              </li>
            </li>
            <li className="flex gap-3 items-center mt-6">
              <Image src="/area.png" width={15} height={15} />
              <span className="font-bold text-sm font-sans">
                {listing.Area_size}
              </span>
              sq. ft.
            </li>
            <li className="flex gap-3 items-center mt-6">
              <Image src="/price-tag.png" width={15} height={15} />
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
              className={`absolute ${menuVisible ? "flex" : "hidden"
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




// My Properties Loading


const MyPropertiesLoadings = () =>{
  return(
    <div className="mb-2  p-4 rounded-lg flex flex-col animate-pulse w-full  ">
                {[...Array(3)].map((_,index) => (
                  <div
                  key={index}
                    className="bg-white shadow-lg mb-2 hover:shadow-xl p-4 rounded-lg flex w-full"
                  >
                    <div
                      className="flex flex-row w-1/3 ml-5 gap-2  mb-2 rounded-lg cursor-pointer "
                    >
                      <div className="mb-1 h-[200px] w-[300px] rounded-lg bg-slate-200 text-lg"></div>
                    </div>

                    <div className="w-2/3 p-4 px-5">

                      <div className="flex flex-row">
                        <div className="flex justify-start gap-2 w-full ">
                          <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                          <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
                        </div>

                        <div className="flex justify-start gap-2 w-full ">
                          <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                          <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
                        </div>

                      </div>


                      <div className="flex flex-row mt-5" >
                        <div className="flex justify-start gap-2 w-full ">
                          <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                          <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
                        </div>

                        <div className="flex justify-start gap-2 w-full ">
                          <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                          <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
                        </div>
                      </div>

                      <div className="flex justify-start gap-2 w-full mt-5">
                        <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                        <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
                      </div>
                      <div className="flex justify-start gap-2 w-full mt-5 ">
                        <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                        <div className="mb-1 h-6 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
                      </div>


                    </div>

                  </div>
                ))}
              </div>
  )
}