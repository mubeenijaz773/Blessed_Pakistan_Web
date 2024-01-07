"use client";
import { useSearchParams } from "next/navigation";
import React, { useRef, useState  , useEffect} from "react";
import { ServiceUrl } from "../../../global";
import CallDialog from "../../Call_Dailogbox/page"
import { FaFileContract, FaMailBulk, FaMailchimp, FaPhoenixSquadron, FaPhoneSquare, FaPhoneSquareAlt } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight, BiImage, BiMailSend, BiVideo } from "react-icons/bi";
import { GoogleMap, LoadScript, MarkerF , OverlayView  } from '@react-google-maps/api';
import EmailDailogBox from "../../Email_Dailog/page"
import style from "../button.module.css"
import ReportDialogBox from "../reportDialog";
import {GetProductById } from "../../../action/Property"
import { DotSpinner} from "@uiball/loaders";
import Image from "next/image";
import Footer from "../../Footer/page";





const VideosSlider = ({ videos }) => {
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
          style={{ scrollLeft: scrollLeft }}
        >
          {videos.map((video) => (
            <div
              key={video.id}
              className="inline-block w-full h-[400px]  shadow-lg rounded-lg overflow-hidden"
            >
              <video
                src={`${ServiceUrl}/Product/?filename=${video.name}`}
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
              className="w-full h-full relative  flex-shrink-0"
              style={{
                width: `${100 / images?.length}%`,
              }}
            >
              <div className="w-full h-[400px] relative" >
              <Image
                src={`${ServiceUrl}/Product/?filename=${image?.name}`}
                alt={`Slide ${image?.name}`}
                className=" rounded  object-cover"
                layout="fill"
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


const PropertyDetails = ({params}) => {


  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Property images");
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const productId = params.id // Replace with the actual product ID
        const result = await GetProductById(productId);
        console.log(result , "products get ")

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
    <main className=" rounded-lg bg-white min-h-screen w-full ">   
    <div className="p-10" >
    {isLoading ? (
      <div className="w-full h-full  animate-pulse py-4" >
    <div className="flex flex-row justify-start gap-3 w-full mb-2">   
    <div className=" w-[100px] h-9 rounded-full bg-slate-200 text-lg"></div>
    <div className=" w-[100px] h-9 rounded-full bg-slate-200 text-lg"></div>
 </div>
      <div className="flex flex-row w-[100%]  gap-7  rounded-lg cursor-pointer ">
       
<div className="w-[70%] h-[400px]">
        <div className="mb-1 w-full h-[400px] rounded-lg bg-slate-200 text-lg"></div>
         <div className="w-[200px] h-9 rounded-full bg-slate-200 text-lg flex justify-start"></div>
     </div>

       <div className="w-[30%] h-[400px] flex-col justify-center items-center px-10 py-12 " >
       
        <div className="mb-1 w-[130px] h-5 rounded-lg bg-slate-200 text-lg mt-10"></div>
    
        <div className="flex justify-start gap-2 w-full mt-5">  
               <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                <div className="mb-1 h-6 w-[120px] rounded-lg bg-slate-200 text-lg"></div>
                </div>

        <div className="flex justify-start gap-2 w-full mt-5">  
               <div className="h-5 w-5 rounded-full bg-slate-200"></div>
                <div className="mb-1 h-6 w-[120px] rounded-lg bg-slate-200 text-lg"></div>
                </div>


                <div className="mb-2 w-full h-8 rounded-full bg-slate-200 text-lg mt-10 "></div>
                <div className="mb-2 w-full h-8 rounded-full bg-slate-200 text-lg mt-10"></div>
    
      </div>
      </div>

      </div>
    ) : (
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
         

      <Card data={data} />
     
          </>
        )}

      </div>



      {/* Videos tab Content  */}

      <div className="flex flex-grow justify-around">
        {selectedTab === "Property Videos" && (
          <>
            <VideosSlider videos={data?.videos} />
     

            <Card data={data} />
     
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
 




{isReportDialogOpen && <ReportDialogBox onClose={handleCloseDialog} />}



 <div className="flex flex-col" >
<div className="flex justify-between " >
<div>
<text className="text-black font-sans font-semibold text-xl" >Details & Description</text>
    <div className="border border-b-4 mt-1 w-[160px] rounded-lg border-blue-500 bg-blue-500 " /></div>

<button className="mt-10 w-auto flex gap-2 float-right  text-white 
        bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
          font-medium rounded-lg text-sm px-10  py-3 text-center mr-2 mb-2" onClick={handleButtonClick} >
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ban" viewBox="0 0 16 16">
  <path d="M15 8a6.973 6.973 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
</svg>
  <p className={style.text}>Report</p>
</button>

</div>

</div>


<div className="mt-10" >
<div className="grid grid-cols-2 md:grid-cols-2 gap-6">
             
     <div className="w-full flex flex-row justify-between font-sans font-xs px-4 py-5  bg-gray-100  rounded-full">
                <span className="font-semibold ">Property Type</span>{" "}
                {data?.propertyType}
     </div>
     <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100  rounded-full">
                <span className="font-semibold">Bedrooms</span> 
                
                {data?.bedrooms}
    </div>
    
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100  rounded-full">
                <span className="font-semibold">location</span> 
                
                {data?.location}
    </div>
 
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100  rounded-full">
                <span className="font-semibold">Price</span> 
                
                {data?.price}
    </div>
 

    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100  rounded-full">
                <span className="font-semibold">Purpose</span> 
                
                {data?.purpose}
    </div>

    
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100  rounded-full">
                <span className="font-semibold">City</span> 
                
                {data?.city}
    </div>

    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100  rounded-full">
                <span className="font-semibold">Title</span> 
                
                {data?.title}
    </div>
    
    <div className="w-full py-5 flex flex-row justify-between font-sans  px-4 bg-gray-100  rounded-full">
                <span className="font-semibold">Area Size</span> 
                
                {data?.Area_size}
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
                scaledSize: { width: 10, height: 10 },
              }}
            
            >
     
         <OverlayView
           position={{ lat: data?.Latitude, lng: data?.Longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
          
          <div className="bg-white w-[240px] h-[300px] rounded-lg overflow-hidden shadow-lg">
  <div className="w-full h-[150px] relative" >
  <Image
    src={`${ServiceUrl}/Product/?filename=${data?.images[0]['name']}`}
    alt={`Slide ${data?.images[0]['name']}`}
    className="object-cover"
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
<Footer/>
    </main>
  );
};

export default PropertyDetails;








const Card=({data})=>{
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEmailDialogOpen, setEmailDialogOpen] = useState(false);
  var title = "Contacts"

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };



  const openEmailDialog = () => {
    setEmailDialogOpen(true);
  };

  const closeEmailDialog = () => {
    setEmailDialogOpen(false);
  };
  







  return(
    <div className="bg-gray-100 border shadow-lg w-[400px] h-[400px] rounded " >

    <div className="bg-black flex justify-center gap-2 py-4 border border-b-2" >
    <FaFileContract className="w-4 h-4 mt-1 text-white"/>
    <text className="text-white font-bold font-sans">MAKE AN QUIRAY</text>
    </div>
    
    
    <div className="p-3">
    
    <div className="flex flex-col" >
         <text className="text-black font-sans font-semibold text-sm" >Contact Information</text>
          <div className="border border-b-4 mt-1 w-[100px] rounded-lg border-blue-500 bg-blue-500 " />
         </div>
    
    
    
    <div className="w-full py-3 mt-5 flex gap-2 flex-col  font-sans rounded  px-2 bg-gray-100">
                    <div className="flex gap-2">
                    <BiMailSend className="w-4 h-4"/>                               
                   <span className="font-semibold text-xs">Email*</span>               
                    </div>             
                    <span className="text-xs">
                    {data?.email}
                    </span>
        </div>
    
    
        <div className="w-full py-3 mt-2 flex gap-2 flex-col  font-sans rounded  px-2 bg-gray-100">
                    <div className="flex gap-2">
                   <FaPhoneSquareAlt className="w-4 h-4"/> 
                    <span className="font-semibold text-xs">Mobile*</span> 
                    
                    </div>
                    <span className="uppercase text-xs">
                    {data?.mobile}
                    </span>
        </div>
    
        <button     onClick={toggleDialog} type="button" className="mt-7 flex justify-center gap-2 w-full font-sans text-white bg-gradient-to-r from-blue-400 via-blue-500
           to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
            font-medium rounded-lg text-sm  py-2.5 text-center mr-2 mb-2">
              <FaPhoneSquare className="w-4 h-4 text-white mt-1" />
              Call</button>
    
<CallDialog call={data?.mobile} title={title} isOpen={isDialogOpen} onClose={toggleDialog} />
  
<EmailDailogBox item={data}  isOpen={isEmailDialogOpen} onClose={closeEmailDialog}  />
              <button onClick={openEmailDialog}  type="button" className="mt-5 flex justify-center gap-2 w-full font-sans text-white bg-gradient-to-r from-blue-400 via-blue-500
           to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800
            font-medium rounded-lg text-sm  py-2.5 text-center mr-2 mb-2">
              <FaMailBulk className="w-4 h-4 text-white mt-1" />
              Email</button>
    
    
    </div>
    
  
            </div>
  );
}


// call dailog 






