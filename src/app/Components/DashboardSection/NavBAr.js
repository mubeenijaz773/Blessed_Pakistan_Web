"use client"
import React, { useState , useEffect , useRef } from "react";

import {  FiChevronsUp } from "react-icons/fi";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import BrowseProperties from "../BrowseProperties/page"
import { useRouter } from "next/navigation";
import Link from "next/link";
import DisplayLocations from "../Popular_Locations/page"
import DisplayProduct from "./Product";
import ProjectView from "../Projects_View/page"
import { initiatePayment } from '../../action/jazzCash_payments';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Footer from "../Footer/page"
import {ServiceUrl} from "../../global"
import { BiDollar, BiSearch, BiSolidCity, BiTrash } from "react-icons/bi";
import SearchFilter from './SearchFilter'
import DisplayAgencies from "../View_Agencies/page";



const Navbar = () => {
  const [show, setshow] = useState(true);
  const [userid, setUserid] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");


  const [selectedOption, setSelectedOption] = useState('Sell');
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

 

  const [recentSearches, setRecentSearches] = useState([]);


  useEffect(() => {
    const id = localStorage.getItem("_id");
    setUserid(id);
    const userRole = localStorage.getItem("role");
    setRole(userRole)
    
    fetchData(); // Call the async function to fetch data
  }, []);

  const [isVisible, setIsVisible] = useState(false);

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

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional smooth scrolling
    });
  };

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



  const toggleButtonColor = (option) => {
    setSelectedOption(option);
  };
  

function  GotoProjects(option){
  setSelectedOption(option);
  router.push("/Components/ViewProjects");
}

const handlePayment = async () => {
  try {
    const orderId = '4444444'; // Replace with your actual order ID
    const amount = '100'; // Replace with your actual amount

    const paymentInfo = await initiatePayment(orderId, amount);

    // Handle paymentInfo (e.g., redirect to JazzCash payment page)
    console.log(paymentInfo);
  } catch (error) {
    // Handle errors
    console.error(error.message);
  }
};

  return (
    <div className="w-full  lg:h-18  text-black lg:text-white bg-white lg:bg-transparent">
      {/*  Banner code  */}

      <div className="h-[687px] text-white mt-[-150px] max-w-screen-2xl mx-auto flex flex-col justify-center items-center">
       
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

{/* /////////////////  main Search Filters ////////////////////////////////////////////// */}

       <SearchFilter Purpose={selectedOption} />
       
       
      </div>

{/* Browse properties */}

<div className="bg-white py-10" >
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

    
    
<BrowseProperties  Purpose={selectedOption}  /> 
{/*  recent searches */}
{/* Jazz Cash Check Out  */}

<div className="bg-blue-700">
      <h1>Payment Page</h1>
      <button onClick={handlePayment}>Initiate Payment</button>
    </div>
<RecentSearches recentSearches={recentSearches} />  




{/* Blessed Projects */}

<ProjectView />

{/* DisplayProperty  */}

  <DisplayProduct className='mt-[100px] ' searchTerm={searchTerm} />

{/*   Agencies */}


<DisplayAgencies />

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



function RecentSearches({ recentSearches }) {

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
     <div className="relative p-9 px-20">
     <h2 className="text-black font-bold font-sans text-2xl mb-10">Recent Searches</h2>
 
     {recentSearches.length === 0 ? (
       <p className="text-center text-gray-500 p-9 font-sans">No recent searches</p>
     ) : (
       <div className="flex items-center">
       <BsArrowLeft
               onClick={scrollLeft}
               className="absolute left-10 top-1/2 z-50 text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
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
             
             <Link href={`/Components/ViewAllProperties/?city=${search.city}&propertyType=${search.propertyType}&minPrice=${search.min_price}&maxPrice=${search.max_price}&minAreaSize=${search.min_area}&maxAreaSize=${search.max_area}`} >
              
           
             <div
               className="border border-gray-500 bg-white hover:bg-gray-100 p-4 mb-2 rounded-lg hover:border-blue-500 hover:border-1 cursor-pointer " key={index}>
                 <li className="flex flex-row items-center gap-2 w-[200px]">
                   <div className="text-black">
                     <div className="flex flex-row mb-1">
                       <BiSearch className="w-4 h-4 text-blue-500" />
                       <p className="text-md font-semibold text-blue-700 font-sans ml-2 mt-[-5px]">
                         {search.propertyType} For Sale
                       </p>
                     </div>
                     <p className="text-xs font-bold mb-2 ml-3">
                       {search.min_area} Marla - {search.max_area} Marla
                     </p>
                     <div className="flex flex-row mb-1 gap-2">
                       <BiSolidCity className="w-4 h-4 text-blue-500" />
                       <p className="text-black text-xs">{search.city}</p>
                     </div>
                     <div className="flex flex-row mb-1 gap-2">
                       <BiDollar className="w-4 h-4 text-blue-500" />
                       <p className="text-black text-xs">
                         {search.min_price} - {search.max_price}
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
               className="absolute right-8 top-1/2 text-blue-500 h-[40px] w-[40px] font-bold bg-white shadow-lg rounded-full p-3 hover:bg-gray-200"
             >
               &gt;
             </BsArrowRight>
         </div>
       
       )}
     </div>
   );
 }
 
 


// function RecentSearches({recentSearches}){
//   return(
//     <div className="relative p-9 ">

//       <div>
//       <h2 className="text-black font-bold ml-7 font-sans text-2xl mb-2 ">Recent Searches</h2>
//     {/* <div className="border border-b-4 border-blue-700 bg-blue-700 w-[100px] rounded-lg" /> */}
//     {recentSearches.length === 0 ? (
//       <p className="text-center text-gray-500 p-9 font-sans">No recent searches</p>
//     ) : (
//       <ul className=" mt-7 overflow-y-auto custom-scrollbar flex flex-row  flex-wrap gap-9 space-x-2">
//         {recentSearches.map((search, index) => (
//       <div className="border border-gray-500 bg-white hover:bg-gray-100 p-4 mb-2 rounded-lg hover:border-blue-500 hover:border-1 cursor-pointer w-auto " >
//         <li key={index} className=" flex flex-row items-center gap-2">
            
     
//       <div className="text-black">
//       <div className="flex flex-row mb-1 ">
//       <BiSearch className="w-4 h-4 text-blue-500" />
//       <p className=" text-md font-semibold text-blue-700  font-sans ml-2 mt-[-5px]">{search.propertyType} For Sale</p>
//       </div>
//    <p className="text-xs font-bold mb-2 ml-3">{search.min_area} Marla - {search.max_area} Marla </p>

//        <div className="flex flex-row mb-1  gap-2">
//     <BiSolidCity className="w-4 h-4 text-blue-500" /> 
//      <p className="text-black text-xs" >{search.city}</p> 
//      </div>

//      <div className="flex flex-row mb-1 gap-2 ">
//      <BiDollar className="w-4 h-4 text-blue-500" /> 
//      <p  className="text-black text-xs" >{search.min_price}  - {search.max_price}</p>
//      </div>
     
    
//       </div>
        
       
//           </li>
//         </div>
//         ))}
//       </ul>
//     )}
//       </div>

//   </div>
//   )
// }


