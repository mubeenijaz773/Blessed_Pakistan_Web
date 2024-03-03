"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";
import { ServiceUrl } from '@/app/global';

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailDailogBox from "../Email_Dailog/page";
import { GrMapLocation } from "react-icons/gr";
import CallDialog from "../Call_Dailogbox/page";
import { formatDistanceToNow } from "date-fns";
import { MdLocationOn, MdOutlineShareLocation } from "react-icons/md";
import { TbArrowAutofitHeight, TbMailFilled } from "react-icons/tb";
import { IoMdCall } from "react-icons/io";
import Image from "next/image";



// Define the type for the children prop as ReactNode
interface SuspenseBoundaryProps {
  children: ReactNode;
}

// Use the defined type for the children prop
const SuspenseBoundary = ({ children }: SuspenseBoundaryProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    {children}
  </Suspense>
);

const WrapPropertyFilter = () =>{
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
  const [userid, setUserid] = useState("");
  const router = useSearchParams();
  const routerr = useRouter();
  const purpose = router.get("purpose");
  const propertyType = router.get("propertyType");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [timeSinceInsertion, setTimeSinceInsertion] = useState(false);

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
    setUserid(localStorage.getItem("_id") || '');
  }, []);

  const handleSearchChange = (event:any) => {
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


  
  useEffect(() => {
    // Assuming that images is an array of objects and each object has a 'createdAt' property
      details.map((item:any,index) => {
      if (item && item.createdAt) {
        const insertionDate = new Date(item.createdAt);
        const timeAgo:any = formatDistanceToNow(insertionDate, { addSuffix: true });
        setTimeSinceInsertion(timeAgo);
    
        // Update time every minute (you can adjust the interval based on your needs)
        const intervalId = setInterval(() => {
          const updatedTimeAgo:any = formatDistanceToNow(insertionDate, {
            addSuffix: true,
          });
          setTimeSinceInsertion(updatedTimeAgo);
        }, 60000);
    
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
      }
    });
  
    
  }, [details]);


  const openEmailDialog = () => {
    setEmailDialogOpen(true);
  };
  const closeEmailDialog = () => {
    setEmailDialogOpen(false);
  };
  
  function GotToNextPage(item:any) {
    if (userid == "" || userid == null) {
      routerr.push("/Login");
      toast.error("You Have to First Login");
    } else {
      routerr.push(`/Properties_Details/${item._id}`);
    }
  }

  const filteredData = details.filter((item:any) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );



  const toggleDialog = () => {
    const header_title ="Contact Number"
    setTitle(header_title)  
    setDialogOpen(!isDialogOpen);
  };
  


  return (
    <main className="min-h-screen w-full bg-white" >
 
      <div
          className="w-full flex flex-col justify-center items-center opacity-120 bg-black  py-10">
          <div className=" bg-black  dark:bg-neutral-800 ">

            <div className="flex flex-wrap">

              {/* Purpose  */}

              <div  className="px-1 py-4 flex gap-1">
                <div className="group inline-block relative">
        
                  {/* Search Bar */}

                   <div className="flex flex-col justify-center items-center">
                   <h1 className="text-3xl font-bold text-white mb-4">Find Property {propertyType} For {purpose}</h1>
                 
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
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                       
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

<div className="p-10 w-full h-full">
  <div className="flex gap-2" >
    <GrMapLocation className="w-6 h-6 mt-1"/>
        <h1 className="text-2xl font-extrabold ">Locations of {propertyType} For {purpose}
         </h1>
</div>
        {isLoading ? (   
          <>    
          <div className="w-full max-w-screen-xl p-8 bg-white rounded-lg border  border-gray-400 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {  [...Array(4)].map((_,index) => (
                <div
                key={index}
                  className="animate-pulse flex flex-grow gap-3 items-center p-4 border bg-white rounded-lg shadow-lg "
                >
                  <div className="w-5 h-5 bg-gray-200 rounded-full"/>
                  <div className="h-5 bg-gray-200 w-[100%] rounded-full"/>
                </div>
            ))}
              </div>
                </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mt-10">       
        {  [...Array(3)].map((_,index) => (
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
      
      <div className=" flex items-center justify-center px-4 mb-5 mt-5">
        <button
          className="flex justify-center items-center gap-2 text-white bg-gray-200  font-medium rounded-full text-xs px-5 w-full py-4 text-center mr-2 mb-2"
        >
        </button>


        <button
          className="flex justify-center items-center gap-2 text-white bg-gray-200 rounded-full  text-xs px-5 w-full py-4  mr-2 mb-2"
        >
        </button>

      </div>

    </div>
</div>

))}
 </div>     
 </>          
        ) : (
          <>
            {/* Show Locations */}
            {filteredData.length > 0 && (
              <div className="h-auto mb-9 mt-4 bg-gray-100">
                <div className="w-full max-w-screen-xl p-8 bg-white rounded-lg border border-gray-400 transition-transform transform ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                    {filteredData.map((location:any, index) => (
                      <div
                        key={index}
                        className="flex flex-grow gap-3 items-center p-4 border bg-white cursor-pointer shadow-lg rounded-lg hover:bg-gray-200 transition-all"
                      >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-geo-alt text-blue-600"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          </svg>
                        <h2 className="text-sm font-semibold">
                          {location.location}
                        </h2>
                      </div>
                    ))}
                    
                  </div>
      </div>
      </div>
            )}                
         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">       
        {filteredData.map((property:any, index) => (
                <div key={index} className="bg-white border mb-10 border-gray-300 w-[400px] rounded-[30px] overflow-hidden shadow-lg">
    
              <div className="cursor-pointer p-3" onClick={() => GotToNextPage(property)} >
               <div className="w-full h-[180px] relative">
                <Image
                  className="object-cover object-center rounded-[30px]"
                  src={`${ServiceUrl}/Product/?filename=${property.images[0]["name"]}`}
                  alt={property.subType}
                  layout="fill"
                />
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-row justify-between" >
                  <text className="text-gray-400 text-xs font-sans" >{`Added: ${timeSinceInsertion}` || 0 }</text>
                  <Image src="/verification.png" width={15} height={15} alt={""} />
                </div>
                <p className="text-xs text-gray-700 mb-2">Pkr
                  <span className="text-sm text-black font-medium font-sans" >{property.price}</span></p>
                <h2 className="text-sm font-semibold text-gray-900 mb-2"> {property.propertyType} - {property.subType}</h2>
                
                <div className="flex items-center gap-2 text-xs text-black mb-2">
                  <MdLocationOn />
                  {property.city}, {property.location}
                </div>
                
                  <div className="flex items-center font-sans text-xs gap-2 text-black mb-2">
                    <TbArrowAutofitHeight />
                    {property.Area_size}
                  </div>
               
                <div className="flex flex-row items-center text-sm text-gray-600 mb-2">
                  <div className="flex items-center text-xs text-black gap-2">
                    <MdOutlineShareLocation />
                    {property.subType}
                  </div>
                </div>


                <div className="flex flex-row items-center text-sm text-gray-600 mb-2">
                  <div className="flex items-center text-xs text-black gap-2">
                    <MdOutlineShareLocation />
                    {property.bedrooms} Bedrooms | {property.bathrooms}{" "}
                        Bathrooms
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


                <CallDialog call={property.mobile} title={title} isOpen={isDialogOpen} onClose={toggleDialog} />
                <EmailDailogBox item={property}  isOpen={isEmailDialogOpen} onClose={closeEmailDialog}  />
              </div>
            </div>

)
)}
</div>
</>
)}
      
        <ToastContainer />
  </div>       
      </main>
  );

}


function PropertyFilter() {
 


return(
  <>
    
    <SuspenseBoundary>
  <WrapPropertyFilter />
</SuspenseBoundary>
  </>
)


}

export default PropertyFilter;     


