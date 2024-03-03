"use client"
import React, { useState , useEffect , useRef } from "react";

import {  FiChevronsUp } from "react-icons/fi";
import AgencyDialog from "@/Components/Dailogs/Agency_Dailog"
import BrowseProperties from "../BrowseProperties/page"
import { useRouter } from "next/navigation";
import DisplayLocations from "../Popular_Locations/page"
import DisplayProduct from "./Product";
import ProjectView from "../Projects_View/page"
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Footer from "../Footer/page"
import { ServiceUrl } from '@/app/global';
import { BiDollar, BiSearch, BiSolidCity, BiTrash } from "react-icons/bi";
import SearchFilter from './SearchFilter'
import DisplayAgencies from "../View_Agencies/page";
import Link from "next/link";


const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isAgencyLoading, setIsAgencyLoading] = useState(true);

  const [recentSearches, setRecentSearches] = useState([]);
  const [agency, setAgency] = useState([]);
 
  const [selectedOption, setSelectedOption] = useState('Sell');
  // const [userid, setUserid] = useState("");
  const router = useRouter();


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

    
    fetchRecentSearches(); // Call the async function to fetch data
    fetchAgencies()
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



 
  const fetchRecentSearches = async () => {
    try {
      const id = localStorage.getItem("_id");
      const response = await fetch(`${ServiceUrl}/Search/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });


      const data = await response.json();

      if (response.status === 200) {
        setRecentSearches(data["searchdata"]);
        setIsLoading(false)
      }else{
        console.log("Failed to fetch data");
        setIsLoading(false)   
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false)
    }
  };


// Get Agencies //////////////////


const fetchAgencies = async () => {
  try {
    const response = await fetch(`${ServiceUrl}/Fetch_Agency`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setAgency(data["agencies"]);

    setIsAgencyLoading(false);
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};





  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional smooth scrolling
    });
  };
  const toggleButtonColor = (option) => {
    setSelectedOption(option);
  };
  

function  GotoProjects(option){
  setSelectedOption(option);
  router.push("/ViewProjects");
}



const openAgencyDialog = (item) => {
  setSelectedItem(item);
};

const closeAgencyDialog = () => {
  setSelectedItem(null);
};





  return (
    <div className="w-full min-h-full    text-black lg:text-white bg-white lg:bg-transparent">
      {/*  Banner code  */}

      <div className=" h-full py-11 text-whitemax-w-screen-2xl mx-auto flex flex-col justify-center items-center">
       
      <div className="flex items-center justify-center gap-4 mt-9">
  <button
    className={`p-2 ${selectedOption === 'Sell' ? 'bg-white' : 'bg-black opacity-40 border border-white text-white'} text-black px-[35px] font-sans font-medium -md mr-4`}
    onClick={() => toggleButtonColor('Sell')}
  >
    Buy
  </button>
  <button
    className={`p-2 ${selectedOption === 'Rent' ? 'bg-white' : 'bg-black opacity-40 border border-white text-white'} px-[35px] text-black font-sans font-medium`}
    onClick={() => toggleButtonColor('Rent')}
  >
    Rent
  </button>
  <button
    className={`p-2 ${selectedOption === 'Projects' ? 'bg-white text-black' : 'bg-black opacity-40 border border-white text-white'} px-[35px] font-sans font-medium`}
    onClick={() => GotoProjects('Projects')}
  >
    Projects
  </button>
</div>



       <SearchFilter Purpose={selectedOption} />
       
       
      </div>

{/* Browse properties */}

<div className="bg-white p-10" >
      {/*  scrooll Arrows */}

      <div
        className={`fixed bottom-4 right-4 z-50 shadow-2xl transition-opacity duration-300 ${
          isVisible ? "" : "opacity-0"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg  dark:shadow-lg 
          text-white rounded-full  px-2 py-2 "
        >
          <FiChevronsUp size={20} />
        </button>
      </div>

{/* Property Filters */}

    
{/* purpose={selectedOption} */}
<BrowseProperties   purpose={selectedOption} /> 
{/*  recent searches */}



<RecentSearches recentSearches={recentSearches} isLoading={isLoading} />  





{/* Blessed Projects */}

<ProjectView />

{/* DisplayProperty  */}

  <DisplayProduct className='mt-[100px] ' />

{/*   Agencies */}


<DisplayAgencies Loading={isAgencyLoading} Agencies={agency} openAgencyDialog={openAgencyDialog}  />

{selectedItem && (
<AgencyDialog onClose={closeAgencyDialog} item={selectedItem} />
)}


 {/* popular locations */}

<DisplayLocations />




{/*  Footer  */}

</div>

<Footer />

    </div>
  );
};

export default Navbar;





// ///////////////////////////////////////////// Recent Searches //////////////////////////////////////////



function RecentSearches({ recentSearches ,isLoading }) {

  const scrollContainerRef = useRef(null);
 
   const scrollLeft = () => {
     if (scrollContainerRef.current) {
       scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
     }
   };
 
   const scrollRight = () => {
     if (scrollContainerRef.current) {
       scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
     }
   };
 
   return (
     <div className="relative  px-5 mt-10">
     <div className="max-w-full border border-slate-300 p-10 rounded-lg relative overflow-hidden">
  
     <h2 className="text-black font-bold font-sans text-2xl mb-10">Recent Searches</h2>
     {isLoading ? (
   <div className="loading-indicator flex flex-row flex-wrap gap-10">
   {[...Array(4)].map((_, index) => (
     <div
       key={index}
       className=" flex flex-row w-64 gap-2   p-4 mb-2 rounded-lg cursor-pointer   animate-pulse"     
     >
       <li className="flex flex-col items-center gap-2 w-[200px]">
      
          <div className="flex justify-start gap-2 w-full ">  
          <div className="h-4 w-4 rounded-full bg-slate-200"></div>
           <div className="mb-1 h-5 w-[90%] rounded-lg bg-slate-200 text-lg"></div>
           </div>
      
            <div className="mb-1 h-5 w-[100%] rounded-lg bg-slate-200 text-lg"></div>
      
            <div className="flex justify-start gap-2 w-full ">  
          <div className="h-4 w-4 rounded-full bg-slate-200"></div>
           <div className="mb-1 h-5 w-[90%] rounded-lg bg-slate-200 text-lg"></div>
      </div>

      <div className="flex justify-start gap-2 w-full ">  
           <div className="h-4 w-4 rounded-full bg-slate-200"></div>   
           <div className="mb-1 h-5 w-[90%] rounded-lg bg-slate-200 text-lg"></div>         
      </div>

       </li>
     </div>
   ))}
 </div>
      ) : recentSearches.length === 0 ? (
       <p className="text-center text-gray-500 p-9 font-sans">No recent searches</p>
     ) : (
       <div className="flex items-center">
       <BsArrowLeft
               onClick={scrollLeft}
               className="absolute left-2 top-1/2 z-50 border text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
             >
               &lt;
             </BsArrowLeft>
         <div
           ref={scrollContainerRef}
           style={{
             overflowX: 'hidden',
             scrollbarWidth: 'none', // Firefox
             '-ms-overflow-style': 'none', // IE and Edge
           }}
 
           className="flex flex-row overflow-x-auto  gap-4 w-[100%] "
         >
             {recentSearches.map((search, index) => (
                 <Link  key={index} href={`/ViewAllProperties/?city=${search.city}&propertyType=${search.propertyType}&minPrice=${search.min_price}&maxPrice=${search.max_price}&minAreaSize=${search.min_area}&maxAreaSize=${search.max_area}`} >
              
               <div
              
               className="border border-gray-500 bg-white hover:bg-gray-100 p-4 mb-2 rounded-lg hover:border-blue-500 hover:border-1 cursor-pointer " >
                 <li className="flex flex-row items-center gap-2 w-[200px]">
                   <div className="text-black">
                     <div className="flex flex-row mb-1">
                       <BiSearch className="w-4 h-4 text-blue-500" />
                       <p className="text-md font-semibold text-blue-700 font-sans ml-2 mt-[-5px]">
                         {search.propertyType  } For Sale
                       </p>
                     </div>
                     <p className="text-xs font-bold mb-2 ml-3">
                       {search.min_area} Marla - {search.max_area } Marla
                     </p>
                     <div className="flex flex-row mb-1 gap-2">
                       <BiSolidCity className="w-4 h-4 text-blue-500" />
                       <p className="text-black text-xs">{search.city }</p>
                     </div>
                     <div className="flex flex-row mb-1 gap-2">
                       <BiDollar className="w-4 h-4 text-blue-500" />
                       <p className="text-black text-xs">
                         {search.min_price } - {search.max_price  }
                       </p>
                     </div>
                   </div>
                 </li>
               </div>
               </Link>
             ))}
           </div>
       
           <BsArrowRight
               onClick={scrollRight}
               className="absolute right-2 top-1/2 border text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
             >
               &gt;
             </BsArrowRight>
         </div>
       
       )}
     </div>
  </div>
   );
 }
 
 