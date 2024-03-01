"use client";

import React, { useRef, useState  , useEffect} from "react";
import { ServiceUrl } from '@/app/global';
import CallDialog from "../../Call_Dailogbox/page"
import { FaFileContract, FaMailBulk,  FaPhoneSquare, FaPhoneSquareAlt } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight, BiImage, BiMailSend, BiVideo } from "react-icons/bi";
import { GoogleMap, LoadScript, MarkerF , OverlayView  } from '@react-google-maps/api';
import EmailDailogBox from "../../Email_Dailog/page"

import {FindProjectbyid } from "@/app/action/projects"
import { DotSpinner} from "@uiball/loaders";
import Image from "next/image";





const VideosSlider = (videos ) => {
  const sliderRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };


  return (
    <div className="bg-white ">
      <div className="container mx-auto">
        <div className="flex justify-between items-center ">      
        </div>
        <div
          className="overflow-x-auto whitespace-nowrap  row-container"
          id="slider"
          ref={sliderRef}
          // style={{ scrollLeft: scrollLeft }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="inline-block w-full h-[400px]  shadow-lg rounded-lg overflow-hidden"
            >
              <video
                src={`${ServiceUrl}/Add_Project/?filename=${video.name}`}
                controls
                className="w-full h-full object-cover"
              />
            </div>

          ))}
        </div>
        <div className="flex justify-center space-x-4">
            <button
              title="Scroll Left"
              onClick={slideLeft}
              className="bg-black hover:bg-white rounded hover:shadow-2xl hover:border  text-white hover:text-black p-3  focus:outline-none"
            >
              <BiChevronLeft className="w-4 h-4"  />
            </button>
            <button
              title="Scroll Right"
              onClick={slideRight}
              className="bg-black hover:bg-white rounded hover:shadow-2xl hover:border text-white hover:text-black p-3 focus:outline-none"
        >
              <BiChevronRight className="w-4 h-4" />
            </button>
          </div>
      </div>
    </div>
  );
};

//  Images List Slider

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images?.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full bg-white ">
      <div className="overflow-hidden w-full h-full relative">
        <div
          className="h-full flex transition-transform transform"
          style={{
            width: `${images?.length * 100}%`,
            transform: `translateX(-${(100 / images?.length) * currentIndex}%)`,
          }}
        >
          {images?.map((image, index) => (
            <div
              key={index}
              className="w-full h-full  flex-shrink-0"
              style={{
                width: `${100 / images?.length}%`,
              }}
            >
                   <div className="w-full h-[400px] relative" >
      <Image
                src={`${ServiceUrl}/Add_Project/?filename=${image?.name}`}
                alt={`Slide ${image?.name}`}
                className=" rounded object-cover"
              />
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 bottom-0 w-full h-full flex items-center justify-between">
      <div className="border border-black bg-black rounded-lg hover:bg-white hover:border-white cursor-pointer " >
  
        <button
          onClick={prevSlide}
          className="text-white text-2xl  p-4 focus:outline-none hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >
          &#8249;
        </button>
  
  </div>
        <div className="border border-black bg-black rounded-lg hover:bg-white hover:border-white cursor-pointer " >
        <button
          onClick={nextSlide}
          className="text-white text-2xl p-4 focus:outline-none hover:text-gray-500 transition duration-300 ease-in-out transform hover:scale-110 active:scale-95"
        >

          &#8250;
        </button>
        </div>
      </div>
    </div>
  );
};



// ///////////////////////////////////   Main Component /////////////////////////////////////////////


const PropertyDetails = ({params}:{params: any}) => {


  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Property images");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const projectId = params.id // Replace with the actual product ID
        const result = await FindProjectbyid(projectId);
        console.log(result , projectId , "project get ")

      if(result['status'] == 200){
          setProduct(result['Get']); // Assuming 'product' is the key in the result
          setIsLoading(false)
        }else if(result['status'] == 400){
          setIsLoading(false)
      }else{
        setIsLoading(false)
      }
      } catch (error) {
        console.error('Error fetching product:', error);
        setIsLoading(false)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts







  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const containerStyle = {
    width: '100%',
    height: '500px',
  };
  
  const center = {
    lat: 0, // Add your initial latitude here
    lng: 0, // Add your initial longitude here
  };
  




  const handleButtonClick = () => {
    setIsReportDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsReportDialogOpen(false);
  };



  // Inside your component
  const selectedTabStyle = "border-b-2 font-bold border-indigo-500 text-indigo-500 bg-gray-100 rounded font-sans";



  return (
    <div className="p-10 rounded-lg bg-white min-h-screen w-full ">
    
    
{isLoading ? (
      <div className="w-full h-full  animate-pulse py-4">
<div className="w-[100%] h-[400px]">

<div className="flex flex-row justify-start gap-3 w-full mb-2">   
      <div className=" w-[100px] h-9 rounded-full bg-slate-200 text-lg"></div>
      <div className=" w-[100px] h-9 rounded-full bg-slate-200 text-lg"></div>
   </div>

  <div className="mb-2 w-full h-[400px] rounded-lg bg-slate-200 text-lg"></div>
   <div className="w-[200px] h-9 rounded-full bg-slate-200 text-lg flex justify-start"></div>
</div>
</div>
):(
  <>
  



    {product?.map((data , index) => (

<>
    
      {/* ImAGES Tab content  */}
<div key={index} >



      <div className="mb-4 overflow-x-auto">
        
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 flex gap-1 font-sans text-gray-600 focus:outline-none ${
              selectedTab === "Property images" ? selectedTabStyle : ""
            }`}
            onClick={() => handleTabClick("Property images")}
          >
            <BiImage className="mt-1"/>
            Property images
          </button>
          <button
            className={`px-4 py-2 flex gap-1 font-sans  text-gray-600  focus:outline-none ${
              selectedTab === "Property Videos" ? selectedTabStyle : ""
            }`}
            onClick={() => handleTabClick("Property Videos")}
          >
             <BiVideo className="mt-1"/>
           
            Property Videos
          </button>
        </div>
      </div>


   
        
  





      <div className="flex flex-grow justify-around gap-7">
        {selectedTab === "Property images" && (
          <>
            <Slider images={data?.images} />
         

   
     
          </>
        )}

      </div>



      {/* Videos tab Content  */}

      <div className="flex flex-grow justify-around">
        {selectedTab === "Property Videos" && (
          <>
            <VideosSlider videos={data?.videos} />
     

     
          </>
        )}
      </div>


      <h2 className="text-3xl font-sans ml-4 mt-2 flex flex-grow gap-1 ">
          <text className="text-sm mt-3 font-sans">
          PkR
          </text>
           {data?.price} 
        </h2>



      <div className="mb-8 mt-[30px]  bg-white shadow-lg border rounded-tr-xl rounded-tl-xl ">
     
     <div className="w-full p-5 bg-gray-100">
       <text className="text-black font-sans font-semibold text-2xl" >OverView</text>
     </div>
    
<div className="p-5" >
 
 <div className="flex flex-col" >

<text className="text-black font-sans font-semibold text-xl" >Details & Description</text>
    <div className="border border-b-4 mt-1 w-[160px] rounded-lg border-blue-500 bg-blue-500 " /></div>

<div className="mt-10" >
<div className="grid grid-cols-2 md:grid-cols-2 gap-6">
             
     <div className="w-full flex flex-row justify-between font-sans font-xs px-4 py-5 rounded-full  bg-gray-100">
                <span className="font-semibold ">Project</span>{" "}
                {data?.name}
     </div>
     <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100 rounded-full">
                <span className="font-semibold">City</span> 
                
                {data?.city}
    </div>
    
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100 rounded-full">
                <span className="font-semibold">location</span> 
                
                {data?.location}
    </div>
 
   

 </div>
 
  </div>
   
  <div className="flex flex-col mt-10" >
     <text className="text-black font-sans font-semibold text-xl" >Description</text>
      <div className="border border-b-4 mt-1 w-[70px] rounded-lg border-blue-500 bg-blue-500 " />
     </div>


     <div className="w-full py-5 mt-10 flex flex-col justify-between font-sans  px-4 bg-gray-100 rounded-tl-lg rounded-tr-lg">
               {data?.description}
              
    </div>
     

      </div>
    </div>


{/* ////////////////////////////  Google Map ////////////////////////////////////// */}
    <div>
      <LoadScript googleMapsApiKey="AIzaSyAq-OloyVfWl2PTCxFlXQ0OGW_VvBmhCoQ">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={2}
        >
            <MarkerF
              position={{ lat: data?.Latitude, lng: data?.Longitude }}
              icon={{
                url: '/circle.png',
                // scaledSize: { width: 10, height: 10 },
              }}
            >
     
         <OverlayView
           position={{ lat: data?.Latitude, lng: data?.Longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
          
          <div className="bg-white w-[240px] h-[300px] rounded-lg overflow-hidden shadow-lg">
  <div className="w-full h-[150px] relative">
  <Image
    src={`${ServiceUrl}/Product/?filename=${data?.images[0]['name']}`}
    alt={`Slide ${data?.images[0]['name']}`}
    className=" object-cover"
    layout="fill"
  />
  </div>
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-2 text-gray-800">{data?.propertyType}</h2>
    <p className="text-gray-600 mb-2">
      {data?.bedrooms} Bedrooms • {data?.subType}
    </p>
    <p className="text-gray-600">
      <span className="text-gray-400">Location:</span> {data?.city}
    </p>
    <div className="mt-4 flex justify-between items-center">
      <p className="text-2xl font-semibold text-green-600">${data?.price}</p>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
        View Details
      </button>
    </div>
  </div>
</div>


            </OverlayView>
            </MarkerF>
         
        </GoogleMap>
      </LoadScript>
    
    </div>
    </div>
    </>

))}
  </>
)}

    </div>
  );
};

export default PropertyDetails;






