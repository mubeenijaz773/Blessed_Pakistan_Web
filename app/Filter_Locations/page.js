"use client"
import React from "react"
import { useSearchParams } from "next/navigation";
import { useEffect, useState , Suspense } from "react";
import { ServiceUrl } from '@/app/global';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdLocationOn, MdOutlineShareLocation } from 'react-icons/md';
import { IoMdCall } from 'react-icons/io';
import { TbArrowAutofitHeight, TbMailFilled } from "react-icons/tb";
import EmailDailogBox from "../Email_Dailog/page"
import  CallDialog from "../Call_Dailogbox/page"
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Footer from "../Footer/page";






// Use the defined type for the children prop
const SuspenseBoundary = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);


const WrapFilterLocations = () =>{


  const router = useSearchParams()
  const [details, setDetails] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [userid, setUserid] = useState('');
  var purpose  =  router.get('purpose');
  var location =  router.get('location');
  var city = router.get('city');
  var subType = router.get('subType')
  
  const routerr = useRouter()
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
  const toggleDialog = () => {
    const header_title ="Contact Number"
    setTitle(header_title)  
    setDialogOpen(!isDialogOpen);
  };
  
  
  const openEmailDialog = () => {
    setEmailDialogOpen(true);
  };
  
  
  
  
  const closeEmailDialog = () => {
    setEmailDialogOpen(false);
  };
  
  
  
  useEffect(() => {
    setUserid(localStorage.getItem('_id'));
      fetchProperty();
    }, []);
  
    const fetchProperty = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `${ServiceUrl}/Find_PopularLocations/?purpose=${purpose}&city=${city}&location=${location}&subType=${subType}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
  
        setDetails(data["filteredProducts"]);
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error("Error fetching images:", error);
      }
    };
  
  
    // Render the property details based on searchText
    const filteredProperties = details.filter((property) => {
      return (
        property.city.toLowerCase().includes(searchText.toLowerCase()) ||
        property.location.toLowerCase().includes(searchText.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchText.toLowerCase()) ||
        property.subType.toLowerCase().includes(searchText.toLowerCase()) ||
        property.price.toLowerCase().includes(searchText.toLowerCase()) ||
        property.title.toLowerCase().includes(searchText.toLowerCase()) ||
        property.bedrooms.toLowerCase().includes(searchText.toLowerCase()) ||
        property.bathrooms.toLowerCase().includes(searchText.toLowerCase()) 
        // Add more conditions as needed based on your data structure
      )
    });
  
  
  
    const [timeSinceInsertion, setTimeSinceInsertion] = useState(false);
  
    useEffect(() => {
      // Assuming that images is an array of objects and each object has a 'createdAt' property
        details.map((item,index) => {
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
    
      
    }, [details]);
  
  
  
    function GotToNextPage(item){
  
      if (userid == "" || userid == null) {
        routerr.push("/Login");
        toast.error("You Have to First Login");
      } else {
        routerr.push(`/Properties_Details/${item._id}`);
      }
    }
  
      
   
  
  
  
  
    return (
      <div className="bg-white min-h-screen w-full">
  
  
  <div className="flex justify-center items-center  w-full" >
          <div
            className="w-full flex flex-col justify-center items-center opacity-120 bg-black  py-10">
            <div className=" bg-black  dark:bg-neutral-800 ">
  
              <div className="flex flex-wrap">
  
                {/* Purpose  */}
  
                <div  className="px-1 py-4 flex gap-1">
                  <div className="group inline-block relative">
          
                    {/* Search Bar */}
  
                     <div className="flex flex-col justify-center items-center">
                     <h1 className="text-3xl font-bold text-white mb-4">Explore Properties by Location</h1>
                   
                      <div className="w-[630px] ">
                      
                        <div className="relative rounded-full ">
                          <div className="absolute inset-y-0  left-0 flex items-center pl-3 cursor-pointer ">
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
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                       
                            className="block w-full h-[64px] rounded-full  font-sans p-5 pl-10 text-sm text-gray-900 border border-gray-300    focus:ring-blue-500 focus:border-blue-500 dark:bg-blue-700 dark:border-blue-600 bg-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search by city, location, property type, price, bedrooms, bathrooms..."
                          
                          />
                        </div>
                      </div>
  
                    </div>
                  </div>
                </div>
              </div>
  
            </div>
          
            </div>
          </div>
        
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-10">
          {isLoading ? (
        
         <FilterLocationsLoading />
         ) : (
         filteredProperties.length === 0 ? (
              <p>No properties found.</p>
            ) : (
    
            filteredProperties.map((item) => (
                  <div key={item._id} className="bg-white border p-3 mb-10 border-gray-300 w-[400px] rounded-[30px] overflow-hidden shadow-lg">
      
                <div className="w-full h-[180px] relative cursor-pointer p-3" onClick={() => GotToNextPage(item)} >
                  <Image
                    className="object-cover object-center rounded-[30px]"
                    src={`${ServiceUrl}/Product/?filename=${item.images[0]["name"]}`}
                    alt={item.images.name}
                  layout="fill"
                  />
                </div>
                <div className="p-4">
                  <div className="flex flex-row justify-between" >
                    <text className="text-gray-400 text-xs font-sans" >{`Added: ${timeSinceInsertion}` || 0 }</text>
                    <Image  src="/verification.png" width={20} height={20} />
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
  
  ))))}
       
        </div>
        <Footer/>
      </div>
    );
    


}
export default function FilterLocations(){


return(
  <>
    
    <SuspenseBoundary>
  <WrapFilterLocations />
</SuspenseBoundary>
  </>
)

}




const FilterLocationsLoading = () =>{
  return(
    
    [...Array(3)].map((_,index) => (
      <div key={index} className="bg-white border mb-10 border-gray-300 w-[400px] rounded-[30px] overflow-hidden shadow-lg animate-pulse ">

    <div className="cursor-pointer p-3" >
<div className="w-full h-[180px] object-cover object-center rounded-[30px] bg-gray-200"/>
    </div>

    <div className="p-4">
      <div className="flex flex-row justify-between mb-2" >
        <div className="text-gray-400 bg-gray-200 text-xs w-[43%] h-5 rounded-full font-sans" />
        <div  className="w-5 h-5 bg-gray-200 rounded-full" />
      </div>
      
      <div className="text-gray-400 bg-gray-200 mb-2 text-xs w-[43%] h-5 rounded-full font-sans" />
      <div className="text-gray-400 bg-gray-200 mb-2  text-xs w-[43%] h-5 rounded-full font-sans" />
    
      
      <div className="flex justify-start gap-2 w-full mb-2 ">  
             <div className="h-5 w-5 rounded-full bg-slate-200"></div>
              <div className="mb-1 h-5 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
              </div>
              
              <div className="flex justify-start gap-2 w-full mb-2 ">  
             <div className="h-5 w-5 rounded-full bg-slate-200"></div>
              <div className="mb-1 h-5 w-[35%] rounded-lg bg-slate-200 text-lg"></div>
              </div>
    
    <div className=" flex items-center justify-center px-4 mb-5">
      <button
        className="flex justify-center items-center gap-2 text-white bg-gray-200  font-medium rounded-full text-xs px-5 w-full py-3.5 text-center mr-2 mb-2"
      >
      </button>


      <button
        className="flex justify-center items-center gap-2 text-white bg-gray-200 rounded-full  text-xs px-5 w-full py-3.5  mr-2 mb-2"
      >
      </button>

    </div>

  </div>
</div>

))
     
  )
}